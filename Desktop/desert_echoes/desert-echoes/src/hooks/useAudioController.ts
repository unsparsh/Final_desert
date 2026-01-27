import { useRef, useCallback, useEffect, useState } from 'react';

interface AudioControllerOptions {
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const useAudioController = (options: AudioControllerOptions = {}) => {
  const { fadeInDuration = 1000, fadeOutDuration = 1000 } = options;
  
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const pageAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);
  const [backgroundVolume, setBackgroundVolume] = useState(1);
  
  const fadeAudio = useCallback((
    audio: HTMLAudioElement,
    targetVolume: number,
    duration: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      const startVolume = audio.volume;
      const volumeDiff = targetVolume - startVolume;
      const steps = 20;
      const stepDuration = duration / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        audio.volume = Math.max(0, Math.min(1, startVolume + volumeDiff * progress));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          audio.volume = targetVolume;
          resolve();
        }
      }, stepDuration);
    });
  }, []);
  
  const initBackgroundAudio = useCallback((src: string) => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
    }
    
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    backgroundAudioRef.current = audio;
    
    return audio;
  }, []);
  
  const playBackgroundAudio = useCallback(async () => {
    if (!backgroundAudioRef.current) return;
    
    try {
      await backgroundAudioRef.current.play();
      await fadeAudio(backgroundAudioRef.current, backgroundVolume, fadeInDuration);
      setIsBackgroundPlaying(true);
    } catch (error) {
      console.log('Audio autoplay blocked, waiting for user interaction');
    }
  }, [fadeAudio, fadeInDuration, backgroundVolume]);
  
  const pauseBackgroundAudio = useCallback(async () => {
    if (!backgroundAudioRef.current) return;
    
    await fadeAudio(backgroundAudioRef.current, 0, fadeOutDuration);
    backgroundAudioRef.current.pause();
    setIsBackgroundPlaying(false);
  }, [fadeAudio, fadeOutDuration]);
  
  const crossFadeToPageAudio = useCallback(async (pageAudioSrc: string) => {
    // Fade out background
    if (backgroundAudioRef.current && isBackgroundPlaying) {
      await fadeAudio(backgroundAudioRef.current, 0, fadeOutDuration);
    }
    
    // Create and play page audio
    if (pageAudioRef.current) {
      pageAudioRef.current.pause();
    }
    
    const pageAudio = new Audio(pageAudioSrc);
    pageAudio.volume = 0;
    pageAudioRef.current = pageAudio;
    
    await pageAudio.play();
    await fadeAudio(pageAudio, 1, fadeInDuration);
    
    // When page audio ends, resume background
    pageAudio.addEventListener('ended', async () => {
      await fadeAudio(pageAudio, 0, fadeOutDuration);
      pageAudio.pause();
      
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.currentTime = backgroundAudioRef.current.currentTime;
        await backgroundAudioRef.current.play();
        await fadeAudio(backgroundAudioRef.current, backgroundVolume, fadeInDuration);
      }
    });
  }, [fadeAudio, fadeInDuration, fadeOutDuration, isBackgroundPlaying, backgroundVolume]);
  
  const resumeBackgroundAudio = useCallback(async () => {
    if (pageAudioRef.current) {
      await fadeAudio(pageAudioRef.current, 0, fadeOutDuration);
      pageAudioRef.current.pause();
      pageAudioRef.current = null;
    }
    
    if (backgroundAudioRef.current) {
      await backgroundAudioRef.current.play();
      await fadeAudio(backgroundAudioRef.current, backgroundVolume, fadeInDuration);
      setIsBackgroundPlaying(true);
    }
  }, [fadeAudio, fadeInDuration, fadeOutDuration, backgroundVolume]);
  
  const setVolume = useCallback((volume: number) => {
    setBackgroundVolume(volume);
    if (backgroundAudioRef.current && isBackgroundPlaying) {
      backgroundAudioRef.current.volume = volume;
    }
  }, [isBackgroundPlaying]);
  
  useEffect(() => {
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
      if (pageAudioRef.current) {
        pageAudioRef.current.pause();
      }
    };
  }, []);
  
  return {
    initBackgroundAudio,
    playBackgroundAudio,
    pauseBackgroundAudio,
    crossFadeToPageAudio,
    resumeBackgroundAudio,
    setVolume,
    isBackgroundPlaying,
  };
};
