import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page11Props {
  isActive: boolean;
}

const pressItems = [
  {
    publication: "The Guardian",
    quote: "A mesmerizing journey through the soundscapes of Rajasthan",
    year: "2023",
  },
  {
    publication: "The New York Times",
    quote: "Transcendent... a musical experience that defies boundaries",
    year: "2022",
  },
  {
    publication: "Le Monde",
    quote: "Une célébration de la tradition musicale indienne",
    year: "2023",
  },
  {
    publication: "BBC Music Magazine",
    quote: "The finest ambassadors of Rajasthani folk tradition",
    year: "2022",
  },
  {
    publication: "Rolling Stone India",
    quote: "Timeless artistry meets contemporary relevance",
    year: "2023",
  },
];

export const Page11: React.FC<Page11Props> = ({ isActive }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      pressItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, 300 + index * 250);
      });
    } else {
      setVisibleItems([]);
    }
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className="max-w-5xl mx-auto w-full">
        <h2 
          className={`font-display text-2xl md:text-3xl font-light text-center text-muted-foreground mb-12 uppercase tracking-[0.3em] transition-all duration-700 ${
            visibleItems.length > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Press
        </h2>
        
        <div className="space-y-8">
          {pressItems.map((item, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-primary/60 shrink-0">
                  {item.publication}
                </span>
                <p className="font-display text-lg md:text-2xl lg:text-3xl font-light text-foreground italic flex-1">
                  "{item.quote}"
                </p>
                <span className="font-body text-xs text-muted-foreground shrink-0">
                  {item.year}
                </span>
              </div>
              
              <div 
                className="h-px bg-border/30 mt-6 transition-transform duration-700 origin-left"
                style={{
                  transform: visibleItems.includes(index) ? 'scaleX(1)' : 'scaleX(0)',
                  transitionDelay: '300ms',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
