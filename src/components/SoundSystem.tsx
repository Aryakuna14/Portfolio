import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playBoot: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playClick: () => {},
  playHover: () => {},
  playBoot: () => {},
  playSuccess: () => {},
});

export function useSounds() {
  return useContext(SoundContext);
}

// Pure Web Audio API sound synthesizer — no files needed
function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(
  ctx: AudioContext,
  freq: number,
  type: OscillatorType,
  duration: number,
  gain: number,
  delay: number = 0,
  freqEnd?: number
) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  if (freqEnd !== undefined) {
    oscillator.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + delay + duration);
  }

  gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
  gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  oscillator.start(ctx.currentTime + delay);
  oscillator.stop(ctx.currentTime + delay + duration + 0.05);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Lazy-init audio context on first interaction
  const ensureCtx = useCallback((): AudioContext | null => {
    if (audioCtx) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }
    const ctx = createAudioContext();
    if (ctx) setAudioCtx(ctx);
    return ctx;
  }, [audioCtx]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    // Bubbly click: deep pop that sweeps up
    playTone(ctx, 300, 'sine', 0.12, 0.05, 0, 1200);
    // Secondary smaller bubble
    playTone(ctx, 500, 'sine', 0.08, 0.03, 0.06, 1400);
  }, [isMuted, ensureCtx]);

  const playHover = useCallback(() => {
    if (isMuted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    // Bubbly hover: soft, quick upward sweep
    playTone(ctx, 450, 'sine', 0.08, 0.015, 0, 900);
  }, [isMuted, ensureCtx]);

  const playBoot = useCallback(() => {
    if (isMuted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    // Ascending boot-up chime sequence
    playTone(ctx, 220, 'sine', 0.15, 0.06, 0.0);
    playTone(ctx, 330, 'sine', 0.15, 0.06, 0.15);
    playTone(ctx, 440, 'sine', 0.2, 0.06, 0.3);
    playTone(ctx, 660, 'sine', 0.3, 0.08, 0.5, 880);
    // Low drone
    playTone(ctx, 55, 'sawtooth', 0.8, 0.02, 0.0);
  }, [isMuted, ensureCtx]);

  const playSuccess = useCallback(() => {
    if (isMuted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    playTone(ctx, 523, 'sine', 0.12, 0.06);
    playTone(ctx, 659, 'sine', 0.12, 0.06, 0.12);
    playTone(ctx, 784, 'sine', 0.2, 0.08, 0.24);
  }, [isMuted, ensureCtx]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playClick, playHover, playBoot, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
}
