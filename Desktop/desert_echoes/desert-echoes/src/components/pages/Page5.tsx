import React, { useEffect, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useAudio } from '@/contexts/AudioContext';

interface Page5Props {
  isActive: boolean;
  onSlideshowComplete?: () => void;
}

// Video path - use the available video or replace with page5_video.mp4 when provided
const VIDEO_PATH = '/assets/videos/page12_quotes.mp4';

export const Page5: React.FC<Page5Props> = ({ isActive, onSlideshowComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedRef = useRef(false);
  const { isMuted } = useAudio();

  useEffect(() => {
    if (!isActive) {
      hasCompletedRef.current = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return;
    }

    // Start video when page becomes active
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [isActive, isMuted]);

  // Handle mute changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleVideoEnd = () => {
    if (!hasCompletedRef.current && onSlideshowComplete) {
      hasCompletedRef.current = true;
      onSlideshowComplete();
    }
  };

  return (
    <PageWrapper isActive={isActive}>
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted={isMuted}
          onEnded={handleVideoEnd}
        >
          <source src={VIDEO_PATH} type="video/mp4" />
        </video>

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
      </div>
    </PageWrapper>
  );
};

