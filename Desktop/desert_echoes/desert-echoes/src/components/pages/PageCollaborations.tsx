import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface PageCollaborationsProps {
  isActive: boolean;
}

// All collaborators in a single list for vertical display
const collaborators = [
  { name: "George Harrison", subtitle: "from The Beatles" },
  { name: "Sir Mick Jagger", subtitle: "" },
  { name: "Sting", subtitle: "" },
  { name: "Wouter Kellerman", subtitle: "Multi Grammy Award Winner Flutist" },
  { name: "Zakir Hussain", subtitle: "Multi Grammy Award Winner Tabla Player" },
  { name: "Ravi Shankar", subtitle: "Multi Grammy Award Winner Sitar Player" },
  { name: "Vishwa Mohan Bhatt", subtitle: "Multi Grammy Award Winner Slide Guitar Player" },
  { name: "Yossi Fine", subtitle: "Grammy Award Winner & Multi Platinum Album Holder" },
  { name: "Pina Bausch", subtitle: "Multiple Award Winning Dancer & Choreographer" },
  { name: "Andres Marin", subtitle: "One of the Greatest Names in Flamenco Dance" },
  { name: "Zingaro de Bartabas", subtitle: "A 3-Year Residence at Highly Prestigious Paris" },
];

const AUTO_SCROLL_DURATION = 13000; // 13 seconds total scroll time

export const PageCollaborations: React.FC<PageCollaborationsProps> = ({ isActive }) => {
  const [showContent, setShowContent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowContent(true), 300);
      
      // Start auto-scroll animation
      startTimeRef.current = undefined;
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / AUTO_SCROLL_DURATION, 1);
        
        setScrollProgress(progress);
        
        // Scroll the container
        if (scrollContainerRef.current) {
          const scrollHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
          scrollContainerRef.current.scrollTop = scrollHeight * progress;
        }
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      // Delay scroll start by 1 second to let initial content be visible
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 1000);
      
    } else {
      setShowContent(false);
      setScrollProgress(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div 
        ref={scrollContainerRef}
        className={`w-full h-full flex flex-col items-center px-6 md:px-12 lg:px-16 py-8 overflow-hidden transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Intro text */}
        <p className="font-display text-base md:text-lg lg:text-xl font-light text-muted-foreground mb-4 md:mb-6 italic text-center max-w-3xl">
          Performed with some of the most prestigious musicians in on-stage collaborations
        </p>
        
        {/* To Name A Few - smaller text */}
        <p className="font-display text-xs md:text-sm text-muted-foreground/50 mb-8 uppercase tracking-[0.3em]">
          to name a few
        </p>
        
        {/* Vertical List of Collaborators */}
        <div className="flex flex-col items-center gap-4 md:gap-5 max-w-2xl">
          {collaborators.map((artist, index) => (
            <div 
              key={artist.name} 
              className="text-center"
            >
              <p className="font-display text-lg md:text-xl lg:text-2xl font-light text-foreground">
                {artist.name}
              </p>
              {artist.subtitle && (
                <p className="font-display text-xs md:text-sm text-muted-foreground/60 font-light">
                  {artist.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {/* Outro text */}
        <p className="font-display text-sm md:text-base lg:text-lg font-light text-primary/80 mt-10 md:mt-12 italic max-w-2xl text-center leading-relaxed">
          Hypnotising viewers in all corners of the globe with their mystical & ecstatic musical performances that deeply touch the heart & soul
        </p>
        
        {/* Extra spacing for scroll */}
        <div className="h-16 md:h-24" />
      </div>
    </PageWrapper>
  );
};


