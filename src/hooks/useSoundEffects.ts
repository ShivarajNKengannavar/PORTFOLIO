import { useRef, useCallback } from 'react';

export const useSoundEffects = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const isInitialized = useRef(false);

  const initAudioContext = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Resume audio context if it was suspended
      if (audioContext.current.state === 'suspended') {
        audioContext.current.resume();
      }
    }
    isInitialized.current = true;
    return audioContext.current;
  }, []);

  const playEntranceSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      
      // Create an enthusiastic entrance sound with multiple layers
      const now = ctx.currentTime;
      
      // Layer 1: Low bass foundation
      const bassOscillator = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOscillator.connect(bassGain);
      bassGain.connect(ctx.destination);
      
      // Layer 2: Mid-range harmony
      const midOscillator = ctx.createOscillator();
      const midGain = ctx.createGain();
      midOscillator.connect(midGain);
      midGain.connect(ctx.destination);
      
      // Layer 3: High sparkle
      const sparkleOscillator = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkleOscillator.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      
      // Layer 4: Sweep effect
      const sweepOscillator = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweepOscillator.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      
      // Configure bass (low, warm foundation)
      bassOscillator.type = 'sine';
      bassOscillator.frequency.setValueAtTime(110, now); // A2
      bassOscillator.frequency.exponentialRampToValueAtTime(55, now + 0.8); // Drop to A1
      
      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      bassGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      
      // Configure mid (harmonic progression)
      midOscillator.type = 'triangle';
      midOscillator.frequency.setValueAtTime(220, now); // A3
      midOscillator.frequency.setValueAtTime(277, now + 0.2); // C#4
      midOscillator.frequency.setValueAtTime(330, now + 0.4); // E4
      midOscillator.frequency.setValueAtTime(440, now + 0.6); // A4
      
      midGain.gain.setValueAtTime(0, now);
      midGain.gain.linearRampToValueAtTime(0.1, now + 0.1);
      midGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      
      // Configure sparkle (high, bright accents)
      sparkleOscillator.type = 'sine';
      sparkleOscillator.frequency.setValueAtTime(880, now); // A5
      sparkleOscillator.frequency.setValueAtTime(1109, now + 0.1); // C#6
      sparkleOscillator.frequency.setValueAtTime(1319, now + 0.2); // E6
      sparkleOscillator.frequency.setValueAtTime(1760, now + 0.3); // A6
      
      sparkleGain.gain.setValueAtTime(0, now);
      sparkleGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      
      // Configure sweep (dramatic rise)
      sweepOscillator.type = 'sawtooth';
      sweepOscillator.frequency.setValueAtTime(55, now); // A1
      sweepOscillator.frequency.exponentialRampToValueAtTime(1760, now + 0.6); // Sweep to A6
      
      sweepGain.gain.setValueAtTime(0, now);
      sweepGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      sweepGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
      
      // Start all oscillators
      bassOscillator.start(now);
      bassOscillator.stop(now + 1.5);
      
      midOscillator.start(now + 0.1);
      midOscillator.stop(now + 1.2);
      
      sparkleOscillator.start(now + 0.2);
      sparkleOscillator.stop(now + 0.8);
      
      sweepOscillator.start(now);
      sweepOscillator.stop(now + 0.7);
      
    } catch (error) {
      console.log('Entrance sound failed:', error);
    }
  }, [initAudioContext]);

  const playClickSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      
      // Create a simple click sound using Web Audio API
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Configure the click sound
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  }, [initAudioContext]);

  const playHoverSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      
      // Create a subtle hover sound
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Configure the hover sound
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  }, [initAudioContext]);

  const playSuccessSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      
      // Create a success sound (ascending tones)
      const oscillator1 = ctx.createOscillator();
      const oscillator2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // First tone
      oscillator1.frequency.setValueAtTime(523, ctx.currentTime); // C5
      oscillator1.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
      
      // Second tone
      oscillator2.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
      oscillator2.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator1.start(ctx.currentTime);
      oscillator1.stop(ctx.currentTime + 0.2);
      oscillator2.start(ctx.currentTime + 0.1);
      oscillator2.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  }, [initAudioContext]);

  const playDownloadSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;
      
      // Create a download sound with ascending tones
      const downloadOscillator = ctx.createOscillator();
      const downloadGain = ctx.createGain();
      downloadOscillator.connect(downloadGain);
      downloadGain.connect(ctx.destination);
      
      // Configure download sound (ascending chime)
      downloadOscillator.type = 'sine';
      downloadOscillator.frequency.setValueAtTime(523, now); // C5
      downloadOscillator.frequency.setValueAtTime(659, now + 0.1); // E5
      downloadOscillator.frequency.setValueAtTime(784, now + 0.2); // G5
      downloadOscillator.frequency.setValueAtTime(1047, now + 0.3); // C6
      
      downloadGain.gain.setValueAtTime(0, now);
      downloadGain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      downloadGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      downloadOscillator.start(now);
      downloadOscillator.stop(now + 0.5);
      
    } catch (error) {
      console.log('Download sound failed:', error);
    }
  }, [initAudioContext]);

  return {
    playEntranceSound,
    playClickSound,
    playHoverSound,
    playSuccessSound,
    playDownloadSound,
  };
};
