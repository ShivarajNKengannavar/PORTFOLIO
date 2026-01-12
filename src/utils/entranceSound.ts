let hasPlayedEntranceSound = false;
let isAudioInitialized = false;

export const playEntranceSoundOnce = () => {
  if (!hasPlayedEntranceSound) {
    hasPlayedEntranceSound = true;
    
    // Create and initialize audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    
    // Resume context if suspended (critical for browser compatibility)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Create a simple entrance sound
    const now = audioContext.currentTime;
    
    // Layer 1: Low bass foundation
    const bassOscillator = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bassOscillator.connect(bassGain);
    bassGain.connect(audioContext.destination);
    
    // Layer 2: Mid-range harmony
    const midOscillator = audioContext.createOscillator();
    const midGain = audioContext.createGain();
    midOscillator.connect(midGain);
    midGain.connect(audioContext.destination);
    
    // Layer 3: High sparkle
    const sparkleOscillator = audioContext.createOscillator();
    const sparkleGain = audioContext.createGain();
    sparkleOscillator.connect(sparkleGain);
    sparkleGain.connect(audioContext.destination);
    
    // Layer 4: Sweep effect
    const sweepOscillator = audioContext.createOscillator();
    const sweepGain = audioContext.createGain();
    sweepOscillator.connect(sweepGain);
    sweepGain.connect(audioContext.destination);
    
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
    
    isAudioInitialized = true;
  }
};

// Initialize audio on any user interaction
export const initializeAudioOnInteraction = () => {
  if (!isAudioInitialized) {
    const events = ['click', 'keydown', 'touchstart', 'mousedown', 'pointerdown'];
    
    const handleInteraction = () => {
      playEntranceSoundOnce();
      // Remove all event listeners after first interaction
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction, true);
      });
    };
    
    // Add event listeners with capture to ensure they fire first
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, true);
    });
  }
};

// Reset the entrance sound flag for testing
export const resetEntranceSound = () => {
  hasPlayedEntranceSound = false;
  isAudioInitialized = false;
};
