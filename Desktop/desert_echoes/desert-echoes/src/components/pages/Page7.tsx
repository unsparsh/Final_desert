import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page7Props {
  isActive: boolean;
}

export const Page7: React.FC<Page7Props> = ({ isActive }) => {
  const [showPara1, setShowPara1] = useState(false);
  const [showPara2, setShowPara2] = useState(false);
  const [showPara3, setShowPara3] = useState(false);
  const [showValues, setShowValues] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowPara1(true), 300);
      setTimeout(() => setShowPara2(true), 2000);
      setTimeout(() => setShowPara3(true), 4000);
      setTimeout(() => setShowValues(true), 6000);
    } else {
      setShowPara1(false);
      setShowPara2(false);
      setShowPara3(false);
      setShowValues(false);
    }
  }, [isActive]);

  return (
    <PageWrapper 
      isActive={isActive}
      backgroundImage="/assets/Images/PAGE_7_PHOTO.jpg"
      overlayOpacity={0.6}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="space-y-5 md:space-y-6">
          <p 
            className={`font-display text-base md:text-lg lg:text-xl font-light text-foreground/90 leading-relaxed transition-all duration-1000 ${
              showPara1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '0 2px 20px hsl(var(--background) / 0.9)' }}
          >
            Songs honouring Sufi Saints, Hindu deities, tell ancient folk stories and simple village life.
          </p>
          
          <p 
            className={`font-display text-lg md:text-xl lg:text-2xl font-light text-primary italic leading-relaxed transition-all duration-1000 ${
              showPara2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '0 2px 20px hsl(var(--background) / 0.9)' }}
          >
            Their music acts as a spiritual and cultural bridge
          </p>
          
          <p 
            className={`font-body text-sm md:text-base lg:text-lg font-light text-foreground/85 leading-relaxed transition-all duration-1000 ${
              showPara3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '0 2px 20px hsl(var(--background) / 0.9)' }}
          >
            The relevance of this could not hold any higher importance in our times today, in our torn-world of separation we find today.
          </p>
          
          <p 
            className={`font-body text-sm md:text-base lg:text-lg font-light text-foreground/80 leading-relaxed transition-all duration-1000 ${
              showPara3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '0 2px 20px hsl(var(--background) / 0.9)' }}
          >
            The Manganiyars being torch-bearers of some of these key components of a healthy society —
          </p>

          <div 
            className={`flex flex-wrap justify-center gap-3 md:gap-4 pt-4 transition-all duration-1000 ${
              showValues ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {['Unity', 'Community', 'Togetherness', 'Tolerance', 'Acceptance'].map((value, index) => (
              <span 
                key={value}
                className="font-display text-lg md:text-xl lg:text-2xl font-light text-primary px-3 py-1 border border-primary/30 rounded-full"
                style={{ 
                  transitionDelay: showValues ? `${index * 150}ms` : '0ms',
                  textShadow: '0 2px 10px hsl(var(--background) / 0.8)'
                }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
