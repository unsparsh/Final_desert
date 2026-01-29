import React from 'react';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-3xl">
        {/* Title */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-[0.2em] mb-4">
          CARAVANA
        </h1>
        
        {/* Subtitle */}
        <p className="font-display text-base md:text-lg lg:text-xl font-light text-muted-foreground tracking-[0.15em] mb-12 max-w-xl">
          A musical caravan journeying through the sands of Rajasthan
        </p>
        
        {/* Start Button */}
        <button
          onClick={onStart}
          className="group relative px-10 py-5 md:px-14 md:py-6 border border-primary/50 rounded-full 
                     bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm
                     hover:border-primary hover:bg-primary/20 
                     transition-all duration-500 ease-out
                     hover:scale-105 active:scale-100"
        >
          {/* Button glow effect */}
          <span className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          
          {/* Button text */}
          <span className="relative font-display text-sm md:text-base lg:text-lg font-light text-primary tracking-[0.25em] uppercase">
            Press to dive in
          </span>
          
          {/* Animated sub-text */}
          <span className="block relative font-display text-xs md:text-sm font-light text-muted-foreground tracking-[0.15em] mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
            the soothing waves of Rajasthani classical music
          </span>
        </button>
        
        {/* Pulsing indicator */}
        <div className="mt-16 flex flex-col items-center animate-bounce opacity-40">
          <svg 
            className="w-6 h-6 text-primary/60" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* Decorative bottom line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
};
