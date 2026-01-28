import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page12Props {
  isActive: boolean;
}

const backgroundImages = [
  '/assets/Images/PAGE_13-a.jpg',
  '/assets/Images/PAGE_13-b.png',
];

export const Page12: React.FC<Page12Props> = ({ isActive }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
      setCurrentImage(0);
    }
  }, [isActive]);

  // Image rotation
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive}>
      {/* Background Images with crossfade */}
      {backgroundImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Contact Content - LEFT ALIGNED, TOP LEFT CORNER */}
      <div className={`absolute top-12 left-12 md:top-16 md:left-16 z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="text-left max-w-md">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white mb-8 tracking-[0.15em]">
            BOOKING CONTACT
          </h2>
          
          <div className="space-y-4">
            <p className="font-display text-xl md:text-2xl text-white font-light">
              NADJA REICHE
            </p>
            <p className="font-display text-sm md:text-base text-white/80 tracking-[0.15em]">
              BOOKINGS
            </p>
            <p className="font-display text-lg md:text-xl text-primary font-light">
              CARAVANA
            </p>
            
            <div className="pt-6 space-y-2">
              <a 
                href="mailto:nadja@caravana.world"
                className="block font-display text-base md:text-lg text-white hover:text-primary transition-colors"
              >
                NADJA@CARAVANA.WORLD
              </a>
              <a 
                href="tel:+4915144694744"
                className="block font-display text-base md:text-lg text-white/80 hover:text-primary transition-colors"
              >
                +49 151 4469 4744
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Made by unsparsh - Bottom Right */}
      <a
        href="https://www.linkedin.com/in/unsparsh/"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute bottom-16 right-6 z-20 font-display text-xs text-white/50 hover:text-white/80 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        MADE BY <span className="text-primary/70 hover:text-primary">UNSPARSH</span>
      </a>
    </PageWrapper>
  );
};


