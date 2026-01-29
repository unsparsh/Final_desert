import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useAudio } from '@/contexts/AudioContext';

interface Page8Props {
  isActive: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  onSlideshowComplete?: () => void;
  audioRef?: React.RefObject<HTMLVideoElement>;
}

// Images from public/assets/Slideshow folder
// Add more photos to this folder and they will be included
const images = [
  "/assets/Slideshow/1.jpg",
  "/assets/Slideshow/2...jpg",
  "/assets/Slideshow/3...jpg",
  "/assets/Slideshow/4.jpg",
  "/assets/Slideshow/5...jpg",
  "/assets/Slideshow/6....jpg",
  "/assets/Slideshow/7...jpg",
  "/assets/Slideshow/8...jpg",
  "/assets/Slideshow/9.jpg",
  "/assets/Slideshow/10.jpg",
  "/assets/Slideshow/11.jpg",
];

const SLIDE_DURATION = 4000; // 4 seconds per slide - more time to view each image

export const Page8: React.FC<Page8Props> = ({ isActive, onVideoStart, onVideoEnd, onSlideshowComplete, audioRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMuted } = useAudio();
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0);
      hasCompletedRef.current = false;
      return;
    }

    onVideoStart?.();

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        // When slideshow reaches end, navigate to next page
        if (nextIndex >= images.length) {
          if (!hasCompletedRef.current && onSlideshowComplete) {
            hasCompletedRef.current = true;
            setTimeout(() => onSlideshowComplete(), 500);
          }
          return prev; // Stay on last slide
        }
        return nextIndex;
      });
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isActive, onVideoStart]);

  return (
    <PageWrapper isActive={isActive}>
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${image})`,
                backgroundColor: 'hsl(var(--muted))',
              }}
            />
          </div>
        ))}
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background)/0.4)_100%)]" />
        
        {/* Image counter */}
        <div className="absolute bottom-24 left-8 md:left-16 z-20">
          <p className="font-display text-sm tracking-[0.3em] text-foreground/60">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

