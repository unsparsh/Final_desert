import React, { useRef, useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useAudio } from '@/contexts/AudioContext';

interface Page8Props {
  isActive: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  audioRef?: React.RefObject<HTMLVideoElement>;
}

export const Page8: React.FC<Page8Props> = ({ isActive, onVideoStart, onVideoEnd, audioRef }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMuted } = useAudio();
  const wasMutedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Store current mute state and pause main audio
      if (audioRef?.current) {
        wasMutedRef.current = audioRef.current.muted;
        audioRef.current.muted = true;
      }
      
      video.currentTime = 0;
      video.play().then(() => {
        onVideoStart?.();
      }).catch(console.error);
    } else {
      video.pause();
    }
  }, [isActive, onVideoStart, audioRef]);

  const handleVideoEnd = () => {
    // Resume main audio if it wasn't muted before
    if (audioRef?.current && !isMuted) {
      audioRef.current.muted = false;
    }
    onVideoEnd?.();
  };

  return (
    <PageWrapper isActive={isActive}>
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          onEnded={handleVideoEnd}
          poster="/placeholder.svg"
        >
          <source src="/assets/videos/page8_clip.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background)/0.4)_100%)]" />
      </div>
    </PageWrapper>
  );
};
