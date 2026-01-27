import React from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  isActive,
  className,
  backgroundImage,
  backgroundVideo,
  backgroundColor = 'bg-background',
  overlayOpacity = 0.4,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center transition-all duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none",
        !backgroundImage && !backgroundVideo && backgroundColor,
        className
      )}
    >
      {/* Background Video */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      
      {/* Background Image */}
      {backgroundImage && !backgroundVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Overlay */}
      {(backgroundImage || backgroundVideo) && (
        <div 
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        {children}
      </div>
    </div>
  );
};
