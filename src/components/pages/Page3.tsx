import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page3Props {
  isActive: boolean;
}

const venues = [
  "LINCOLN CENTRE NEW YORK",
  "KENNEDY CENTRE WASHINGTON DC",
  "ROYAL ALBERT HALL LONDON",
  "QUEEN ELIZABETH HALL, LONDON",
  "THE BARBICAN, LONDON",
  "WOMAD FESTIVAL UK",
  "PHILHARMONIE PARIS",
  "INSTITUTE DU MONDE ARABE PARIS",
  "THEATRE DE LA VILLE PARIS",
  "SYDNEY OPERA HOUSE",
  "SYDNEY FESTIVAL",
  "KING ABDULAZIZ AUDITORIUM SAUDI ARABIA",
  "FEZ FESTIVAL MOROCCO",
  "NMACC MUMBAI",
];

const AUTO_SCROLL_DURATION = 13000; // 13 seconds total scroll time

export const Page3: React.FC<Page3Props> = ({ isActive }) => {
  const [showContent, setShowContent] = useState(false);
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
        <p className="font-display text-base md:text-lg lg:text-xl font-light text-muted-foreground mb-4 md:mb-6 text-center max-w-3xl">
          They have sold out concerts in the most prestigious venues worldwide
        </p>
        
        {/* To Name A Few - smaller text */}
        <p className="font-display text-xs md:text-sm text-muted-foreground/50 mb-8 uppercase tracking-[0.3em]">
          to name a few
        </p>
        
        {/* Vertical List of Venues */}
        <div className="flex flex-col items-center gap-4 md:gap-5 max-w-2xl">
          {venues.map((venue, index) => (
            <div 
              key={venue} 
              className="text-center"
            >
              <p className="font-display text-lg md:text-xl lg:text-2xl font-light text-foreground">
                {venue}
              </p>
            </div>
          ))}
        </div>
        
        {/* Extra spacing for scroll */}
        <div className="h-16 md:h-24" />
      </div>
    </PageWrapper>
  );
};
