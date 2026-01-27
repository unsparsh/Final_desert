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
      
      {/* Contact Content */}
      <div className={`relative z-10 h-full flex flex-col items-center justify-center px-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="text-center max-w-2xl">
          <h2 className="font-display text-2xl md:text-4xl font-light text-white mb-8 uppercase tracking-[0.2em]">
            Booking Contact
          </h2>
          
          <div className="space-y-4">
            <p className="font-display text-xl md:text-2xl text-white font-light">
              Nadja Reiche
            </p>
            <p className="font-body text-sm md:text-base text-white/80 uppercase tracking-[0.15em]">
              Bookings
            </p>
            <p className="font-display text-lg md:text-xl text-primary font-light">
              CARAVANA
            </p>
            
            <div className="pt-6 space-y-2">
              <a 
                href="mailto:nadja@caravana.world"
                className="block font-body text-base md:text-lg text-white hover:text-primary transition-colors"
              >
                nadja@caravana.world
              </a>
              <a 
                href="tel:+4915144694744"
                className="block font-body text-base md:text-lg text-white/80 hover:text-primary transition-colors"
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
        className={`absolute bottom-6 right-6 z-20 font-body text-xs text-white/50 hover:text-white/80 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        made by <span className="text-primary/70 hover:text-primary">unsparsh</span>
      </a>
    </PageWrapper>
  );
};

