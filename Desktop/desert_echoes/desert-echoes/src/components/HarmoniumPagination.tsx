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
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === currentPage;
        
        return (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={cn(
              "transition-all duration-300 ease-out rounded-full",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "hover:bg-primary/60",
              isActive 
                ? "w-2.5 h-2.5 bg-primary" 
                : "w-1.5 h-1.5 bg-foreground/40"
            )}
            aria-label={`Go to page ${index + 1}`}
            aria-current={isActive ? 'page' : undefined}
          />
        );
      })}
    </div>
  );
};

