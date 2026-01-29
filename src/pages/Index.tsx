import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HarmoniumPagination } from '@/components/HarmoniumPagination';
import { SandTransition } from '@/components/SandTransition';
import { LandingScreen } from '@/components/LandingScreen';
import { PlayPauseToggle } from '@/components/PlayPauseToggle';
import { AudioProvider } from '@/contexts/AudioContext';
import { Page1 } from '@/components/pages/Page1';
import { Page2 } from '@/components/pages/Page2';
import { PageCollaborations } from '@/components/pages/PageCollaborations';
import { Page3 } from '@/components/pages/Page3';
import { Page4 } from '@/components/pages/Page4';
import { Page5 } from '@/components/pages/Page5';
import { Page6 } from '@/components/pages/Page6';
import { Page7 } from '@/components/pages/Page7';
import { Page8 } from '@/components/pages/Page8';
import { Page9 } from '@/components/pages/Page9';
import { Page10 } from '@/components/pages/Page10';
import { PageQuotes } from '@/components/pages/PageQuotes';
import { Page12 } from '@/components/pages/Page12';

const TOTAL_PAGES = 13; // Total pages in the presentation
const SWIPE_THRESHOLD = 50;
const WHEEL_THRESHOLD = 30;
const DEBOUNCE_TIME = 800;
const AUTO_SLIDE_DURATION = 13000; // Default: 13 seconds for auto-slide

// Custom timing for specific pages (in milliseconds)
const getPageDuration = (pageIndex: number): number => {
  switch (pageIndex) {
    case 2: return 22000;  // Page 3 (Collaborations) - 22 seconds (+6s)
    case 3: return 19000;  // Page 4 (Venues) - 19 seconds (+6s)
    case 5: return 17000;  // Page 6 - 17 seconds
    case 6: return 17000;  // Page 7 - 17 seconds
    case 10: return 14000; // Page 11 (Attendance) - 14 seconds
    default: return AUTO_SLIDE_DURATION;
  }
};

// Video path - using pre-clipped video
const PAGE2_CLIP_PATH = '/assets/videos/page2_clip_compressed.mp4';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('down');
  const [showSandTransition, setShowSandTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  
  const touchStartY = useRef(0);
  const lastNavigationTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const manganiyarsVideoRef = useRef<HTMLVideoElement>(null);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const navigateToPage = useCallback((targetPage: number, direction?: 'up' | 'down', skipDebounce?: boolean) => {
    const now = Date.now();
    if (!skipDebounce && now - lastNavigationTime.current < DEBOUNCE_TIME) return;
    if (targetPage < 0 || targetPage >= TOTAL_PAGES) return;
    if (targetPage === currentPage) return;
    
    lastNavigationTime.current = now;
    setIsTransitioning(true);
    setTransitionDirection(direction || (targetPage > currentPage ? 'down' : 'up'));
    setShowSandTransition(true);
    
    // Change page after sand animation starts
    setTimeout(() => {
      setCurrentPage(targetPage);
    }, 300);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [currentPage]);

  // Auto-slide timer for all pages (except Page5 which has its own slideshow timer)
  useEffect(() => {
    // Clear any existing timer
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
      autoSlideTimerRef.current = null;
    }

    // Don't auto-slide if paused, on the last page, or landing screen is still showing
    // Also skip Page5 (index 5) and PageQuotes (index 11) as they have their own slideshow-based navigation
    if (showLanding || isPaused || currentPage >= TOTAL_PAGES - 1 || currentPage === 5 || currentPage === 11) {
      return;
    }

    // Set timer for auto-slide with custom duration per page
    autoSlideTimerRef.current = setTimeout(() => {
      navigateToPage(currentPage + 1, 'down', true);
    }, getPageDuration(currentPage));

    return () => {
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current);
      }
    };
  }, [currentPage, isPaused, showLanding, navigateToPage]);

  // Handler for Page5 slideshow completion (goes to page 6)
  const handleSlideshowComplete = useCallback(() => {
    if (!isPaused) {
      navigateToPage(6, 'down', true);
    }
  }, [navigateToPage, isPaused]);

  // Handler for Page8 slideshow completion (goes to page 9)
  const handlePage8SlideshowComplete = useCallback(() => {
    if (!isPaused) {
      navigateToPage(9, 'down', true);
    }
  }, [navigateToPage, isPaused]);

  // Handler for PageQuotes completion (goes to page 12)
  const handleQuotesComplete = useCallback(() => {
    if (!isPaused) {
      navigateToPage(12, 'down', true);
    }
  }, [navigateToPage, isPaused]);

  // Handle start experience from landing screen
  const handleStartExperience = useCallback(() => {
    setShowLanding(false);
    setHasInteracted(true);
    if (manganiyarsVideoRef.current) {
      manganiyarsVideoRef.current.currentTime = 195;
      manganiyarsVideoRef.current.play().catch(console.error);
    }
  }, []);

  // Start audio on first user interaction (browser autoplay policy)
  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (manganiyarsVideoRef.current && currentPage === 0) {
        manganiyarsVideoRef.current.currentTime = 195;
        manganiyarsVideoRef.current.play().catch(console.error);
      }
    }
  }, [hasInteracted, currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES - 1) {
      navigateToPage(currentPage + 1, 'down');
    }
  }, [currentPage, navigateToPage]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0) {
      navigateToPage(currentPage - 1, 'up');
    }
  }, [currentPage, navigateToPage]);

  // Toggle pause/play
  const handleTogglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (Math.abs(e.deltaY) > WHEEL_THRESHOLD) {
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleNext, handlePrev]);

  // Touch navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleSandTransitionComplete = () => {
    setShowSandTransition(false);
  };

  // Handle video ended to loop the clipped video
  const handleVideoEnded = useCallback(() => {
    if (manganiyarsVideoRef.current) {
      manganiyarsVideoRef.current.currentTime = 0;
      manganiyarsVideoRef.current.play().catch(console.error);
    }
  }, []);

  // Don't auto-play on mount - wait for landing screen interaction
  useEffect(() => {
    // Video will be started by handleStartExperience
  }, []);

  // Determine if video should be visible (on Page 1 for audio or Page 2 for video)
  const showVideo = currentPage === 0 || currentPage === 1;

  return (
    <AudioProvider>
      <div 
        ref={containerRef}
        className="fixed inset-0 overflow-hidden bg-background cursor-default select-none"
        onClick={handleFirstInteraction}
      >
        {/* Shared Manganiyars Video Element - plays audio on Page1, video+audio on Page2 */}
        <video
          ref={manganiyarsVideoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ 
            opacity: currentPage === 1 ? 1 : 0,
            zIndex: currentPage === 1 ? 5 : -1,
            pointerEvents: currentPage === 1 ? 'auto' : 'none'
          }}
          playsInline
          preload="auto"
          autoPlay
          onEnded={handleVideoEnded}
          loop
        >
          <source src={PAGE2_CLIP_PATH} type="video/mp4" />
        </video>

        {/* Sand Transition Effect */}
        <SandTransition 
          isActive={showSandTransition}
          direction={transitionDirection}
          onComplete={handleSandTransitionComplete}
        />
        
        {/* Pages */}
        <Page1 
          isActive={currentPage === 0} 
          audioRef={manganiyarsVideoRef}
          isPaused={isPaused}
        />
        <Page2 isActive={currentPage === 1} videoRef={manganiyarsVideoRef} />
        <PageCollaborations isActive={currentPage === 2} />
        <Page3 isActive={currentPage === 3} />
        <Page4 isActive={currentPage === 4} />
        <Page5 isActive={currentPage === 5} onSlideshowComplete={handleSlideshowComplete} audioRef={manganiyarsVideoRef} />
        <Page6 isActive={currentPage === 6} />
        <Page7 isActive={currentPage === 7} />
        <Page8 isActive={currentPage === 8} audioRef={manganiyarsVideoRef} onSlideshowComplete={handlePage8SlideshowComplete} />
        <Page9 isActive={currentPage === 9} />
        <Page10 isActive={currentPage === 10} />
        <PageQuotes isActive={currentPage === 11} audioRef={manganiyarsVideoRef} onSlideshowComplete={handleQuotesComplete} />
        <Page12 isActive={currentPage === 12} />
        
        {/* Harmonium-style Pagination */}
        <HarmoniumPagination
          totalPages={TOTAL_PAGES}
          currentPage={currentPage}
          onPageChange={(page) => navigateToPage(page)}
        />
        

        
        {/* Play/Pause Toggle Button - Bottom Right */}
        <PlayPauseToggle isPaused={isPaused} onToggle={handleTogglePause} />
        
        {/* Landing Screen - shown on initial load */}
        {showLanding && <LandingScreen onStart={handleStartExperience} />}
      </div>
    </AudioProvider>
  );
};

export default Index;
