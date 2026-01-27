import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface PageCollaborationsProps {
  isActive: boolean;
}

// Group collaborators by category for better layout
const legendaryArtists = [
  { name: "George Harrison", subtitle: "The Beatles" },
  { name: "Sir Mick Jagger", subtitle: "" },
  { name: "Sting", subtitle: "" },
];

const grammyWinners = [
  { name: "Wouter Kellerman", subtitle: "Multi Grammy Award Winner Flutist" },
  { name: "Zakir Hussain", subtitle: "Multi Grammy Award Winner Tabla" },
  { name: "Ravi Shankar", subtitle: "Multi Grammy Award Winner Sitar" },
  { name: "Vishwa Mohan Bhatt", subtitle: "Multi Grammy Award Winner Slide Guitar" },
  { name: "Yossi Fine", subtitle: "Grammy Winner & Multi Platinum" },
];

const performers = [
  { name: "Pina Bausch", subtitle: "Award Winning Choreographer" },
  { name: "Andres Marin", subtitle: "Flamenco Legend" },
  { name: "Zingaro de Bartabas", subtitle: "3-Year Paris Residence" },
];

export const PageCollaborations: React.FC<PageCollaborationsProps> = ({ isActive }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [showLegends, setShowLegends] = useState(false);
  const [showGrammy, setShowGrammy] = useState(false);
  const [showPerformers, setShowPerformers] = useState(false);
  const [showOutro, setShowOutro] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowIntro(true), 200);
      setTimeout(() => setShowLegends(true), 800);
      setTimeout(() => setShowGrammy(true), 1500);
      setTimeout(() => setShowPerformers(true), 2500);
      setTimeout(() => setShowOutro(true), 3500);
    } else {
      setShowIntro(false);
      setShowLegends(false);
      setShowGrammy(false);
      setShowPerformers(false);
      setShowOutro(false);
    }
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 py-6">
        {/* Intro text */}
        <p
          className={`font-display text-sm md:text-base lg:text-lg font-light text-muted-foreground mb-4 md:mb-6 transition-all duration-700 italic text-center ${
            showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Performed with some of the most prestigious musicians
        </p>
        
        {/* Main Grid Layout */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          
          {/* Legendary Artists Column */}
          <div
            className={`text-center transition-all duration-700 ${
              showLegends ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="border-b border-primary/30 pb-2 mb-3">
              <span className="text-primary/70 text-xs uppercase tracking-[0.2em]">Legends</span>
            </div>
            {legendaryArtists.map((artist, index) => (
              <div 
                key={artist.name} 
                className="mb-2 md:mb-3"
                style={{
                  transitionDelay: showLegends ? `${index * 150}ms` : '0ms',
                }}
              >
                <p className="font-display text-lg md:text-xl lg:text-2xl font-light text-foreground">
                  {artist.name}
                </p>
                {artist.subtitle && (
                  <p className="font-body text-xs text-muted-foreground/60">{artist.subtitle}</p>
                )}
              </div>
            ))}
          </div>

          {/* Grammy Winners Column */}
          <div
            className={`text-center transition-all duration-700 ${
              showGrammy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="border-b border-primary/30 pb-2 mb-3">
              <span className="text-primary/70 text-xs uppercase tracking-[0.2em]">Grammy Winners</span>
            </div>
            {grammyWinners.map((artist, index) => (
              <div 
                key={artist.name} 
                className="mb-2"
                style={{
                  transitionDelay: showGrammy ? `${index * 100}ms` : '0ms',
                }}
              >
                <p className="font-display text-base md:text-lg lg:text-xl font-light text-foreground">
                  {artist.name}
                </p>
                <p className="font-body text-[10px] md:text-xs text-muted-foreground/50">{artist.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Performers Column */}
          <div
            className={`text-center transition-all duration-700 ${
              showPerformers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="border-b border-primary/30 pb-2 mb-3">
              <span className="text-primary/70 text-xs uppercase tracking-[0.2em]">Dance & Theatre</span>
            </div>
            {performers.map((artist, index) => (
              <div 
                key={artist.name} 
                className="mb-2 md:mb-3"
                style={{
                  transitionDelay: showPerformers ? `${index * 150}ms` : '0ms',
                }}
              >
                <p className="font-display text-lg md:text-xl lg:text-2xl font-light text-foreground">
                  {artist.name}
                </p>
                <p className="font-body text-xs text-muted-foreground/60">{artist.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Outro text */}
        <p
          className={`font-display text-xs md:text-sm lg:text-base font-light text-primary/80 mt-6 md:mt-8 transition-all duration-1000 italic max-w-2xl text-center leading-relaxed ${
            showOutro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Hypnotising viewers in all corners of the globe with their mystical & ecstatic musical performances that deeply touch the heart & soul
        </p>
      </div>
    </PageWrapper>
  );
};
