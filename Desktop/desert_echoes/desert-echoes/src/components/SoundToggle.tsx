import React from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-background/60 backdrop-blur-md border border-foreground/20 hover:bg-background/80 hover:border-foreground/40 transition-all duration-300 group"
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
      title={isMuted ? 'Click to unmute' : 'Click to mute'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
      )}
      
      {/* Subtle pulse animation when muted to draw attention */}
      {isMuted && (
        <span className="absolute inset-0 rounded-full border-2 border-foreground/30 animate-ping opacity-30" />
      )}
    </button>
  );
};
