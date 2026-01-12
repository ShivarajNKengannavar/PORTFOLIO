'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroLoaderProps {
  onComplete?: () => void;
}

const WELCOME_TEXTS = [
  'Welcome',
  'ಸ್ವಾಗತ',
  'स्वागत है',
  'வரவேற்கிறோம்',
  'స్వాగతం',
  'സ്വാഗതം',
  'স্বাগতম',
  'સ્વાગત છે',
  'स्वागत आहे',
  'ਸੁਆਗਤ ਹੈ',
];

// Generate random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tubesAppRef = useRef<any>(null);
  const [clicked, setClicked] = useState(false);

  // ---------------------------
  // Audio preload
  // ---------------------------
  useEffect(() => {
    const introAudio = new Audio('/sounds/intro.wav');
    introAudio.volume = 0.15; // subtle
    audioRef.current = introAudio;

    // Preload glitch audio
    const glitchAudio = new Audio('/sounds/glitch.mp3');
    glitchAudio.volume = 0.3;
    (window as any).glitchAudio = glitchAudio;
  }, []);

  // ---------------------------
  // 18_Tubes_Cursor_Animation_CWM (exact original)
  // ---------------------------
  useEffect(() => {
    if (!canvasRef.current) return;

    let disposed = false;
    let app: any;

    const initTubesCursor = async () => {
      // Create the exact script from the original
      const script = document.createElement('script');
      script.textContent = `
        import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        
        const app = TubesCursor(document.getElementById('canvas'), {
          tubes: {
            colors: ['#ff2a2a', '#ff6a00', '#ffffff'],
            lights: {
              intensity: 90,
              colors: ['#ff2a2a', '#ff6a00', '#ffffff', '#ff9999']
            }
          }
        });

        document.body.addEventListener('click', () => {
          const colors = randomColors(3);
          const lightsColors = randomColors(4);
          console.log(colors, lightsColors);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lightsColors);
        });

        function randomColors(count) {
          return new Array(count)
            .fill(0)
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
        }

        // Make app available globally for cleanup
        window.tubesApp = app;
      `;

      // Use type="module" to handle ES import
      script.type = 'module';
      document.head.appendChild(script);

      // Wait a bit for the module to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (disposed) return;

      // Get app from global scope
      app = (window as any).tubesApp;
      if (app) {
        tubesAppRef.current = app;
      }
    };

    initTubesCursor();

    return () => {
      disposed = true;
      if (app && app.dispose) {
        app.dispose();
      }
    };
  }, []);

  // ---------------------------
  // Initial button entrance
  // ---------------------------
  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
      }
    );

    gsap.to(buttonRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  // ---------------------------
  // Initial button entrance & glitch lines
  // ---------------------------
  useEffect(() => {
    if (!buttonRef.current) return;

    // Create 325 vertical glitch lines for extra wide button
    const createGlitchLines = () => {
      const button = buttonRef.current;
      if (!button) return;

      for (let i = 0; i < 325; i++) {
        const span = document.createElement('span');
        
        // Position each span horizontally with 2px gap
        span.style.left = `${i * 2}px`;
        
        // Add a random animation delay for wave effect on hover
        span.style.transitionDelay = `${Math.random() * 0.5}s`;
        
        // Append span to the button
        button.appendChild(span);
      }
    };

    // Create glitch lines
    createGlitchLines();
    
    // Animate the button entrance
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
      }
    );

    // Premium cursor hover effect
    const handleMouseEnter = () => {
      gsap.to(buttonRef.current, { scale: 1.04, duration: 0.3 });
      // Play glitch audio on hover
      const glitchAudio = (window as any).glitchAudio;
      if (glitchAudio) {
        glitchAudio.currentTime = 0;
        glitchAudio.play().catch(() => {});
      }
    };

    const handleMouseLeave = () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });
    };

    // Premium skip button hover effect
    const handleSkipMouseEnter = () => {
      gsap.fromTo(
        skipRef.current,
        { letterSpacing: '0.3em' },
        { letterSpacing: '0.45em', duration: 0.3 }
      );
    };

    const handleSkipMouseLeave = () => {
      gsap.to(skipRef.current, {
        letterSpacing: '0.3em',
        duration: 0.3,
      });
    };

    buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
    buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

    if (skipRef.current) {
      skipRef.current.addEventListener('mouseenter', handleSkipMouseEnter);
      skipRef.current.addEventListener('mouseleave', handleSkipMouseLeave);
    }

    // Animate hint once (not infinite pulse)
    if (hintRef.current) {
      gsap.fromTo(
        hintRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 1 }
      );
    }

    // Animate skip button entrance (premium timing)
    if (skipRef.current) {
      gsap.to(skipRef.current, {
        opacity: 1,
        duration: 1,
        delay: 2.5,
        ease: 'power2.out',
      });
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', handleMouseEnter);
        buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (skipRef.current) {
        skipRef.current.removeEventListener('mouseenter', handleSkipMouseEnter);
        skipRef.current.removeEventListener('mouseleave', handleSkipMouseLeave);
      }
    };
  }, []);

  // ---------------------------
  // Click → language sequence
  // ---------------------------
  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // Stop glitch audio when entering welcome sequence
    const glitchAudio = (window as any).glitchAudio;
    if (glitchAudio) {
      glitchAudio.pause();
      glitchAudio.currentTime = 0;
    }

    // Play subtle intro sound
    audioRef.current?.play().catch(() => {});

    const tl = gsap.timeline();

    // Fade out button
    tl.to(buttonRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: 'power3.inOut',
    });

    // Fade out hint
    if (hintRef.current) {
      tl.to(hintRef.current, {
        opacity: 0,
        duration: 0.4,
      }, "-=0.4");
    }

    // Ceremonial welcome sequence
    WELCOME_TEXTS.forEach((text) => {
      tl.set(welcomeRef.current, { textContent: text });
      tl.fromTo(
        welcomeRef.current,
        { opacity: 0, y: 12, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
      tl.to(welcomeRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        delay: 0.6,
      });
    });

    // Fade out tubes with the intro
    tl.to(canvasRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, "-=0.4");

    // Fade out audio naturally
    if (audioRef.current) {
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    // Final fade out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        tubesAppRef.current?.dispose?.();
        onComplete?.();
      },
    });
  };

  // ---------------------------
  // Skip intro functionality
  // ---------------------------
  const skipIntro = () => {
    audioRef.current?.pause();
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        tubesAppRef.current?.dispose?.();
        onComplete?.();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121212]"
    >
      {/* Premium overlay for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none premium-overlay" />

      {/* Tubes background */}
      <canvas
        ref={canvasRef}
        id="canvas"
        className="fixed inset-0 z-0"

      />

      {/* Foreground */}
      <div className="relative z-10 text-center">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="btn"
        >
          SHIVARAJ N KENGANNAVAR
        </button>

        {!clicked && (
          <p ref={hintRef} className="mt-8 text-white/50 text-xs tracking-widest select-none">
            CLICK TO ENTER
          </p>
        )}

        <div
          ref={welcomeRef}
          className="absolute inset-0 flex items-center justify-center text-white text-xl tracking-wide pointer-events-none"
        />
      </div>

      {/* Premium skip button */}
      <button
        ref={skipRef}
        onClick={skipIntro}
        className="skip-btn"
        style={{ zIndex: 150 }}
      >
        Skip Intro
      </button>
    </div>
  );
};

export default IntroLoader;
