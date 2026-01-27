import React from 'react';
import { cn } from '@/lib/utils';

interface HarmoniumPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const HarmoniumPagination: React.FC<HarmoniumPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Harmonium key pattern: alternating wide and narrow keys
  const getKeyWidth = (index: number) => {
    // Pattern similar to harmonium: groups of keys
    const pattern = [1, 0.7, 1, 0.7, 1, 1, 0.7, 1, 0.7, 1, 0.7, 1];
    return pattern[index % pattern.length];
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-end gap-0.5">
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === currentPage;
        const keyWidth = getKeyWidth(index);
        const isNarrow = keyWidth < 1;
        
        return (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={cn(
              "relative transition-all duration-500 ease-out group",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isNarrow ? "z-10" : "z-0"
            )}
            style={{
              width: isNarrow ? '8px' : '14px',
              height: isActive ? (isNarrow ? '32px' : '40px') : (isNarrow ? '24px' : '32px'),
            }}
            aria-label={`Go to page ${index + 1}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Key body */}
            <div
              className={cn(
                "absolute inset-0 rounded-b-sm transition-all duration-300",
                isNarrow 
                  ? "bg-secondary/80" 
                  : "bg-foreground/10",
                isActive && !isNarrow && "bg-primary/60",
                isActive && isNarrow && "bg-primary/80",
                "group-hover:bg-primary/40"
              )}
              style={{
                boxShadow: isActive 
                  ? '0 4px 12px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--foreground) / 0.1)' 
                  : 'inset 0 1px 0 hsl(var(--foreground) / 0.05)',
              }}
            />
            
            {/* Key highlight */}
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1 rounded-t-sm",
                isActive ? "bg-primary/80" : "bg-foreground/5",
                "group-hover:bg-primary/50"
              )}
            />
            
            {/* Active indicator glow */}
            {isActive && (
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse-glow"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
