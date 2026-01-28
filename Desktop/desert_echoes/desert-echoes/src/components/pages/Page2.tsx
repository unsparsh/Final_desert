import React, { useEffect, useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';

interface Page2Props {
  isActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Page2: React.FC<Page2Props> = ({ isActive, videoRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMuted } = useAudio();

  // Handle mute state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, videoRef]);

  useEffect(() => {
    if (isActive) {
      // Slower fade-in animation
      setTimeout(() => setIsVisible(true), 500);

      // When page becomes active, ensure video is playing
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
        if (videoRef.current.paused) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(console.error);
        }
      }
    } else {
      setIsVisible(false);
    }
  }, [isActive, isMuted, videoRef]);

  // Keep video playing continuously while on this page
  useEffect(() => {
    if (!isActive || !videoRef.current) return;

    const checkAndPlay = () => {
      if (videoRef.current && videoRef.current.paused && isActive) {
        videoRef.current.play().catch(console.error);
      }
    };

    // Check periodically to ensure video keeps playing
    const interval = setInterval(checkAndPlay, 1000);

    return () => clearInterval(interval);
  }, [isActive, videoRef]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
    >
      {/* Semi-transparent overlay to make text readable but video visible */}
      <div 
        className="absolute inset-0 bg-black/30"
      />
      
      {/* Text Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div
          className={`text-center max-w-4xl transition-all duration-1500 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-light text-foreground leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Welcome to the world of
          </h2>
          <p className="font-display text-4xl md:text-6xl lg:text-8xl font-normal tracking-[0.2em] text-primary mt-4 md:mt-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            CARAVANA
          </p>
        </div>
      </div>
    </div>
  );
};
