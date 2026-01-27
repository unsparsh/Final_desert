import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page5Props {
  isActive: boolean;
  onSlideshowComplete?: () => void;
}

// Images from public/assets/Slideshow folder
const images = [
  "/assets/Slideshow/1.jpg",
  "/assets/Slideshow/2.jpg",
  "/assets/Slideshow/3a.png",
  "/assets/Slideshow/3.jpg",
  "/assets/Slideshow/4a.jpg",
  "/assets/Slideshow/5.jpg",
];

const SLIDE_DURATION = 2500; // 2.5 seconds per slide

export const Page5: React.FC<Page5Props> = ({ isActive, onSlideshowComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0);
      hasCompletedRef.current = false;
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          
          // If we've shown all slides, trigger navigation
          if (nextIndex >= images.length) {
            if (!hasCompletedRef.current && onSlideshowComplete) {
              hasCompletedRef.current = true;
              setTimeout(() => {
                onSlideshowComplete();
              }, 500);
            }
            return prev; // Stay on last slide
          }
          
          return nextIndex;
        });
        setIsTransitioning(false);
      }, 400);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isActive, onSlideshowComplete]);

  return (
    <PageWrapper isActive={isActive}>
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : index === (currentIndex - 1 + images.length) % images.length
                ? 'opacity-0 scale-105'
                : 'opacity-0 scale-95'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${image})`,
                backgroundColor: 'hsl(var(--muted))',
              }}
            />
            {/* Subtle parallax overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30"
            />
          </div>
        ))}
        
        {/* Image counter */}
        <div className="absolute bottom-24 left-8 md:left-16 z-20">
          <p className="font-body text-sm tracking-[0.3em] text-foreground/60">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};
