import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page10Props {
  isActive: boolean;
}

const concertHalls = [
  { venue: "Royal Albert Hall London", attendance: "4,800" },
  { venue: "Sydney Opera House", attendance: "2,670" },
  { venue: "Kennedy Centre Washington DC", attendance: "2,400" },
  { venue: "Philharmonie Paris", attendance: "2,400" },
  { venue: "Lincoln Centre New York", attendance: "2,200" },
  { venue: "NMACC Mumbai", attendance: "2,000" },
  { venue: "The Barbican, London", attendance: "1,650" },
  { venue: "King Abdulaziz Auditorium Saudi Arabia", attendance: "930" },
  { venue: "Queen Elizabeth Hall, London", attendance: "916" },
  { venue: "Theatre De La Ville Paris", attendance: "901" },
  { venue: "Institute Du Monde Arabe Paris", attendance: "420" },
];

const festivals = [
  { venue: "NH7 Festival", attendance: "100,000" },
  { venue: "Sydney Festival", attendance: "60,000" },
  { venue: "WOMAD Festival UK", attendance: "40,000" },
  { venue: "Wonderfruit", attendance: "28,000" },
  { venue: "Kingfisher Festival", attendance: "20,000" },
  { venue: "Fez Festival Morocco", attendance: "10,000" },
  { venue: "RIFF Festival", attendance: "5,000" },
];

export const Page10: React.FC<Page10Props> = ({ isActive }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center px-4 md:px-8">
        {/* Title */}
        <h2 
          className={`font-display text-lg md:text-2xl lg:text-3xl font-light text-center text-foreground mb-2 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          A Snippet of Attendance Numbers in Selected Prominent Performances
        </h2>
        
        {/* Two Column Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Concert Halls Column */}
          <div>
            <h3 className="font-display text-base md:text-xl font-light text-primary mb-3 md:mb-4 uppercase tracking-[0.15em]">
              Concert Halls
            </h3>
            <div className="space-y-1 md:space-y-2">
              {concertHalls.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-baseline border-b border-primary/10 pb-1"
                  style={{ 
                    transitionDelay: `${400 + index * 50}ms`,
                  }}
                >
                  <span className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {item.venue}
                  </span>
                  <span className="font-display text-sm md:text-lg text-primary font-light ml-2">
                    {item.attendance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Festivals Column */}
          <div>
            <h3 className="font-display text-base md:text-xl font-light text-primary mb-3 md:mb-4 uppercase tracking-[0.15em]">
              Festivals
            </h3>
            <div className="space-y-1 md:space-y-2">
              {festivals.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-baseline border-b border-primary/10 pb-1"
                  style={{ 
                    transitionDelay: `${400 + index * 50}ms`,
                  }}
                >
                  <span className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {item.venue}
                  </span>
                  <span className="font-display text-sm md:text-lg text-primary font-light ml-2">
                    {item.attendance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

