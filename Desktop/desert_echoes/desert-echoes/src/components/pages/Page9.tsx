import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page9Props {
  isActive: boolean;
}

// Region data with countries and positions on the flat world map (as percentages)
const regions = [
  {
    name: 'EUROPE',
    countries: [
      'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Belgium',
      'Austria', 'Switzerland', 'Portugal', 'Denmark', 'Sweden', 'Norway',
      'Ireland', 'Hungary', 'Scotland', 'Russia'
    ],
    color: '#D4AF37',
    position: { x: 52, y: 30 }, // Europe on flat map
  },
  {
    name: 'ASIA',
    countries: [
      'China', 'Japan', 'Hong Kong', 'Malaysia', 'Singapore', 'Thailand',
      'Korea', 'India', 'Nepal', 'Bhutan', 'Indonesia', 'Bangladesh'
    ],
    color: '#C75B5B',
    position: { x: 78, y: 45 }, // Asia on flat map
  },
  {
    name: 'MIDDLE EAST & AFRICA',
    countries: [
      'Iran', 'Iraq', 'Oman', 'Pakistan', 'Turkey', 'Saudi Arabia',
      'United Arab Emirates', 'Qatar', 'Kazakhstan', 'Morocco', 'Tunisia', 'Kenya'
    ],
    color: '#4A9E96',
    position: { x: 55, y: 55 }, // Middle East/Africa on flat map
  },
  {
    name: 'UNITED STATES',
    countries: [
      'New York', 'New Jersey', 'San Francisco', 'Los Angeles', 'Washington',
      'Chicago', 'Michigan', 'Boston', 'Miami', 'Houston'
    ],
    color: '#8E6BAD',
    position: { x: 20, y: 35 }, // USA on flat map
  },
];

const AUTO_NAV_DURATION = 5000;

// User's custom 3D world map image
const WORLD_MAP_IMAGE = '/assets/Images/SL-070722-51460-10.jpg';

export const Page9: React.FC<Page9Props> = ({ isActive }) => {
  const [activeRegion, setActiveRegion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setIsVisible(true), 300);
      setActiveRegion(0);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setActiveRegion(prev => (prev + 1) % regions.length);
    }, AUTO_NAV_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, activeRegion]);

  const currentRegion = regions[activeRegion];

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className={`w-full h-full flex flex-col transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Region Title */}
        <div className="text-center pt-4 md:pt-6">
          <h2 
            className="font-display text-xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] transition-all duration-500"
            style={{ color: currentRegion.color }}
          >
            {currentRegion.name}
          </h2>
          <p className="font-display text-xs text-muted-foreground/50 mt-1 tracking-[0.2em]">
            PERFORMANCES & TOURS
          </p>
        </div>

        {/* Region Navigation */}
        <div className="flex justify-center gap-2 mt-3">
          {regions.map((region, index) => (
            <button
              key={index}
              onClick={() => setActiveRegion(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeRegion === index ? 'scale-110' : 'opacity-40'
              }`}
              style={{ backgroundColor: region.color }}
            />
          ))}
        </div>

        {/* Main Content - World Map and Countries */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 md:px-8 py-4">
          {/* 3D World Map Image with Markers */}
          <div className="relative w-full max-w-2xl">
            {/* World Map Image */}
            <img 
              src={WORLD_MAP_IMAGE}
              alt="World Map"
              className="w-full h-auto object-contain"
              style={{
                filter: 'brightness(0.9) contrast(1.1)',
              }}
            />
            
            {/* Region Markers */}
            {regions.map((region, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-500 ${
                  activeRegion === index ? 'scale-100' : 'scale-75 opacity-40'
                }`}
                style={{
                  left: `${region.position.x}%`,
                  top: `${region.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Pulse ring for active */}
                {activeRegion === index && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: region.color,
                      width: '24px',
                      height: '24px',
                      marginLeft: '-8px',
                      marginTop: '-8px',
                      opacity: 0.4,
                    }}
                  />
                )}
                {/* Marker dot */}
                <div 
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-lg"
                  style={{ 
                    backgroundColor: region.color,
                    boxShadow: activeRegion === index 
                      ? `0 0 10px ${region.color}, 0 0 20px ${region.color}50` 
                      : 'none',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Countries List - Below the map */}
          <div className="w-full max-w-2xl mt-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {currentRegion.countries.map((country, index) => (
                <div
                  key={country}
                  className="py-1.5 px-2 rounded border text-center transition-all duration-300"
                  style={{
                    borderColor: `${currentRegion.color}40`,
                    backgroundColor: `${currentRegion.color}08`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  <span 
                    className="font-display text-xs font-light"
                    style={{ color: currentRegion.color }}
                  >
                    {country}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex justify-center pb-4">
          <div className="w-24 h-0.5 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${((activeRegion + 1) / regions.length) * 100}%`,
                backgroundColor: currentRegion.color,
              }}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};



