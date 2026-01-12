import { playEntranceSoundOnce, initializeAudioOnInteraction } from './entranceSound';

// Initialize audio immediately when this module loads
const initAudio = () => {
  // Try to play immediately (may fail due to browser autoplay policies)
  try {
    playEntranceSoundOnce();
  } catch (error) {
    // Expected to fail in most browsers
    console.log('Immediate audio initialization failed (expected):', error);
  }
  
  // Set up user interaction listeners as fallback
  initializeAudioOnInteraction();
};

// Initialize immediately
if (typeof window !== 'undefined') {
  // Run immediately when script loads
  initAudio();
  
  // Also try on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
  } else {
    // DOM already loaded
    initAudio();
  }
  
  // Also try on window load
  window.addEventListener('load', initAudio);
}
