import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { StaggeredText } from '@/components/AnimatedText';

interface Page3Props {
  isActive: boolean;
}

const venues = [
  "Royal Albert Hall, London",
  "Sydney Opera House, Australia",
  "Carnegie Hall, New York",
  "Barbican Centre, London",
  "Theatre de la Ville, Paris",
  "National Concert Hall, Dublin",
  "Konzerthaus, Berlin",
  "Concertgebouw, Amsterdam",
];

export const Page3: React.FC<Page3Props> = ({ isActive }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [showVenues, setShowVenues] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowIntro(true), 300);
      setTimeout(() => setShowVenues(true), 1200);
    } else {
      setShowIntro(false);
      setShowVenues(false);
    }
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className="max-w-5xl mx-auto text-center">
        {/* Intro text */}
        <p
          className={`font-display text-lg md:text-xl lg:text-2xl font-light text-muted-foreground mb-12 transition-all duration-1000 italic ${
            showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          They have sold out concerts in the most prestigious venues worldwide
        </p>
        
        <p
          className={`font-display text-xs md:text-sm text-muted-foreground/50 mb-8 tracking-[0.3em] transition-all duration-700 delay-500 ${
            showIntro ? 'opacity-100' : 'opacity-0'
          }`}
        >
          TO NAME A FEW
        </p>
        
        {/* Venues - Single Column */}
        <div
          className={`flex flex-col items-center gap-4 md:gap-5 transition-all duration-1000 ${
            showVenues ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {venues.map((venue, index) => (
            <div
              key={venue}
              className="transition-all duration-700"
              style={{
                transitionDelay: showVenues ? `${index * 120}ms` : '0ms',
                opacity: showVenues ? 1 : 0,
                transform: showVenues ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              <p className="font-display text-lg md:text-xl lg:text-2xl font-light text-foreground">
                {venue}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
