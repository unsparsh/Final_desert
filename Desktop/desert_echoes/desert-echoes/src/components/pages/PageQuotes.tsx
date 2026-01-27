import React, { useRef, useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useAudio } from '@/contexts/AudioContext';

interface PageQuotesProps {
  isActive: boolean;
  audioRef?: React.RefObject<HTMLVideoElement>;
}

const quotes = [
  {
    text: "Impossible to sit still, so buoyant and compelling were the work's lively rhythmic currents",
    source: "New York Times"
  },
  {
    text: "Rapturous, jaw dropping, compelling, tranquil",
    source: "New York Times"
  },
  {
    text: "One of the world's most mesmerising live performance experiences",
    source: "The Guardian London"
  },
  {
    text: "Standing ovations again and again",
    source: "Wall Street Journal"
  },
  {
    text: "Enthralling and mesmerizing",
    source: "The Times of India"
  },
  {
    text: "Soul-touching",
    source: "The Herald Sun Melbourne"
  },
  {
    text: "We were all seduced!",
    source: "The Washington Post"
  },
  {
    text: "True to the nature of a dream, where one is constantly slipping in and out of consciousness",
    source: "The Straits Times Singapore"
  },
  {
    text: "They were fantastic – if you can ever get along to see a show, I highly recommend it. You'll never see anything else like it",
    source: "Word Press"
  },
  {
    text: "Preserving the Passion of India's Roots Music at its Best",
    source: "New York Times"
  },
  {
    text: "This is world music transcending linguistic barriers through joyous sounds and rhythm",
    source: "The Sydney Morning Herald"
  },
];

const QUOTE_DURATION = 5000; // 5 seconds per quote

export const PageQuotes: React.FC<PageQuotesProps> = ({ isActive, audioRef }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMuted } = useAudio();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Mute main audio
      if (audioRef?.current) {
        audioRef.current.muted = true;
      }
      
      video.currentTime = 0;
      video.play().catch(console.error);
      setCurrentQuote(0);
      setIsAnimating(true);
    } else {
      video.pause();
      setIsAnimating(false);
    }
  }, [isActive, audioRef]);

  // Quote rotation timer
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, QUOTE_DURATION);

    return () => clearInterval(interval);
  }, [isActive]);

  // Resume audio when video ends or page changes
  const handleVideoEnd = () => {
    if (audioRef?.current && !isMuted) {
      audioRef.current.muted = false;
    }
  };

  return (
    <PageWrapper isActive={isActive}>
      <div className="relative w-full h-full">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          loop
          onEnded={handleVideoEnd}
        >
          <source src="/assets/videos/page12_quotes.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Quote Container */}
        <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16">
          <div 
            key={currentQuote}
            className={`text-center max-w-4xl transition-all duration-1000 ${
              isAnimating ? 'animate-quote-slide' : 'opacity-0'
            }`}
          >
            <p className="font-display text-xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-6">
              "{quotes[currentQuote].text}"
            </p>
            <p className="font-body text-sm md:text-base uppercase tracking-[0.2em] text-white/80">
              — {quotes[currentQuote].source}
            </p>
          </div>
        </div>

        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes quoteSlide {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          85% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
        .animate-quote-slide {
          animation: quoteSlide 5s ease-in-out;
        }
      `}</style>
    </PageWrapper>
  );
};
