import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page4Props {
  isActive: boolean;
}

const accolades = [
  "Grammy-nominated artists",
  "Featured in UNESCO World Heritage performances",
  "40+ years of musical legacy",
  "Collaborated with world-renowned composers",
  "Ambassadors of Rajasthani folk music",
];

export const Page4: React.FC<Page4Props> = ({ isActive }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      accolades.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, 500 + index * 400);
      });
    } else {
      setVisibleItems([]);
    }
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6 md:space-y-8">
          {accolades.map((accolade, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-x-0 blur-0'
                  : 'opacity-0 -translate-x-12 blur-sm'
              }`}
            >
              <p className="font-display text-xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed">
                {accolade}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
