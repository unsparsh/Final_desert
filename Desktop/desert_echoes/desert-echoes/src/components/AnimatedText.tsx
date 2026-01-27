import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  isActive: boolean;
  delay?: number;
  className?: string;
  variant?: 'fade' | 'reveal' | 'slide' | 'typewriter';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  isActive,
  delay = 0,
  className,
  variant = 'reveal',
  as: Component = 'p',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);
    }
  }, [isActive, delay]);
  
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-8 blur-sm';
    
    switch (variant) {
      case 'fade':
        return 'animate-fade-in';
      case 'reveal':
        return 'animate-text-reveal';
      case 'slide':
        return 'animate-slide-up';
      case 'typewriter':
        return 'animate-fade-in';
      default:
        return 'animate-text-reveal';
    }
  };
  
  return (
    <Component
      className={cn(
        "transition-all duration-1000 ease-out",
        getAnimationClass(),
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {text}
    </Component>
  );
};

interface StaggeredTextProps {
  lines: string[];
  isActive: boolean;
  baseDelay?: number;
  staggerDelay?: number;
  className?: string;
  lineClassName?: string;
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  lines,
  isActive,
  baseDelay = 0,
  staggerDelay = 200,
  className,
  lineClassName,
}) => {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <AnimatedText
          key={index}
          text={line}
          isActive={isActive}
          delay={baseDelay + index * staggerDelay}
          className={lineClassName}
          variant="reveal"
        />
      ))}
    </div>
  );
};
