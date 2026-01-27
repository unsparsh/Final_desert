import React, { useEffect, useState, useCallback } from 'react';

interface SandParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  scatterX: number;
  scatterY: number;
  delay: number;
  duration: number;
}

interface SandTransitionProps {
  isActive: boolean;
  direction: 'up' | 'down';
  onComplete?: () => void;
}

export const SandTransition: React.FC<SandTransitionProps> = ({
  isActive,
  direction,
  onComplete,
}) => {
  const [particles, setParticles] = useState<SandParticle[]>([]);
  
  const generateParticles = useCallback(() => {
    const newParticles: SandParticle[] = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 100;
      const y = direction === 'up' ? 100 + Math.random() * 20 : -20 - Math.random() * 20;
      
      newParticles.push({
        id: i,
        x,
        y,
        size: Math.random() * 4 + 2,
        scatterX: (Math.random() - 0.5) * 200,
        scatterY: direction === 'up' 
          ? -(Math.random() * 150 + 50) 
          : (Math.random() * 150 + 50),
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.8 + 0.7,
      });
    }
    
    return newParticles;
  }, [direction]);
  
  useEffect(() => {
    if (isActive) {
      setParticles(generateParticles());
      
      const timeout = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [isActive, generateParticles, onComplete]);
  
  if (!isActive || particles.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: `hsl(38, ${35 + Math.random() * 15}%, ${65 + Math.random() * 20}%)`,
            '--scatter-x': `${particle.scatterX}px`,
            '--scatter-y': `${particle.scatterY}px`,
            animation: `sand-scatter ${particle.duration}s ease-out ${particle.delay}s forwards`,
            opacity: 0.8,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Sand wave effect */}
      <div 
        className="absolute inset-x-0 h-32"
        style={{
          top: direction === 'up' ? 'auto' : '-8rem',
          bottom: direction === 'up' ? '-8rem' : 'auto',
          background: `linear-gradient(${direction === 'up' ? '0deg' : '180deg'}, 
            transparent 0%, 
            hsl(38, 35%, 75%, 0.3) 50%, 
            transparent 100%)`,
          animation: `${direction === 'up' ? 'slide-up' : 'fade-in'} 0.8s ease-out`,
        }}
      />
    </div>
  );
};
