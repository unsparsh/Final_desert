import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useAudio } from '@/contexts/AudioContext';

interface Page1Props {
  isActive: boolean;
  audioRef?: React.RefObject<HTMLVideoElement>;
  isPaused?: boolean;
}

// YouTube video timestamps (in seconds)
const YOUTUBE_CLIPS = [
  { start: 42, end: 51 },   // 0:42 - 0:51 (9 seconds)
  { start: 69, end: 77 },   // 1:09 - 1:17 (8 seconds)
];

const YOUTUBE_VIDEO_ID = 'TQrxavU5dTI';

export const Page1: React.FC<Page1Props> = ({ isActive, audioRef, isPaused = false }) => {
  const [showCaravana, setShowCaravana] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const [showIndia, setShowIndia] = useState(false);
  const playerRef = useRef<any>(null);
  const clipTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { isMuted } = useAudio();

  // Initialize YouTube Player API
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Wait for API to load then create player
    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('youtube-player-page1', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            mute: 1, // YouTube video always muted - audio comes from Manganiyars
            start: YOUTUBE_CLIPS[0].start,
            cc_load_policy: 0, // Hide captions
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.mute(); // Always keep YouTube muted
              if (isActive && !isPaused) {
                playClipSequence();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (clipTimerRef.current) clearTimeout(clipTimerRef.current);
    };
  }, []);

  const playClipSequence = () => {
    if (!playerRef.current) return;

    const playClip = (clipIndex: number) => {
      const clip = YOUTUBE_CLIPS[clipIndex % YOUTUBE_CLIPS.length];
      const clipDuration = (clip.end - clip.start) * 1000;

      playerRef.current.seekTo(clip.start, true);
      playerRef.current.playVideo();

      // Schedule next clip
      clipTimerRef.current = setTimeout(() => {
        playClip((clipIndex + 1) % YOUTUBE_CLIPS.length);
      }, clipDuration);
    };

    playClip(0);

    // Start Manganiyars audio
    if (audioRef?.current) {
      audioRef.current.currentTime = 195; // 3:15 in seconds
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch(console.error);
    }
  };

  // Handle pause/resume
  useEffect(() => {
    if (!isActive) return;

    if (isPaused) {
      // Pause everything
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      }
      if (audioRef?.current) {
        audioRef.current.pause();
      }
      if (clipTimerRef.current) clearTimeout(clipTimerRef.current);
    } else {
      // Resume everything
      if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      }
      if (audioRef?.current && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [isPaused, isActive, audioRef]);

  // Handle mute state changes for audio
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, audioRef]);

  useEffect(() => {
    if (isActive) {
      // Staggered text animations - SLOWER, 3 stages
      setTimeout(() => setShowCaravana(true), 1000);  // Stage 1: 1s
      setTimeout(() => setShowCenter(true), 2500);    // Stage 2: 2.5s
      setTimeout(() => setShowIndia(true), 4000);     // Stage 3: 4s

      // Start playing video if player is ready and not paused
      if (playerRef.current && playerRef.current.playVideo && !isPaused) {
        playClipSequence();
      }
    } else {
      setShowCaravana(false);
      setShowCenter(false);
      setShowIndia(false);

      // Pause video when not active
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      }
      if (clipTimerRef.current) clearTimeout(clipTimerRef.current);
    }
  }, [isActive]);

  return (
    <PageWrapper isActive={isActive} overlayOpacity={0.3}>
      {/* Background YouTube Video - Desert & Camel (always muted) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          id="youtube-player-page1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.78vh]"
        />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/40" />
      
      {/* Text Content */}
      <div className="relative z-10 w-full h-full">
        <div
          className={`absolute top-12 right-12 md:top-16 md:right-16 transition-all duration-1500 ${
            showCaravana ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] text-foreground">
            CARAVANA
          </h1>
        </div>
        
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1500 ${
            showCenter ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="text-center max-w-4xl px-8">
            <p className="font-display text-xl md:text-3xl lg:text-4xl font-light text-foreground/90 ">
              Music of the Desert of Rajasthan
            </p>
          </div>
        </div>
        
        <div
          className={`absolute bottom-12 right-12 md:bottom-16 md:right-16 transition-all duration-1500 ${
            showIndia ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-light tracking-[0.5em] text-foreground/80">
            INDIA
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

// Extend Window interface for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
