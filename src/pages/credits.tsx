'use client';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const CREDIT_ITEMS = [
  { role: "CRAFTED BY", name: "SHIVARAJ N KENGANNAVAR" },
  { role: "FRONTEND ARCHITECT", name: "React & Next.js" },
  { role: "VISUAL EXPERIENCES", name: "Three.js & GSAP" },
  { role: "BACKEND LOGIC", name: "Node.js & MongoDB" },
  { role: "BLOCKCHAIN DEV", name: "Solidity & Web3" },
  { role: "UI/UX DESIGN", name: "Figma & Creative CSS" },
  { role: "DATABASE MANAGEMENT", name: "MongoDB & SQL" },
  { role: "VERSION CONTROL", name: "Git & GitHub" },
  { role: "THE JOURNEY", name: "Continuing to Build..." },
];

const FAMOUS_LINES = [
  { text: "ಜಯತು ಜಯತು ಕರ್ನಾಟಕ ಮಾತೆ", lang: "Kannada" },
  { text: "ಸಂಕಲ್ಪವೊಂದಿದ್ದರೆ ಅಸಾಧ್ಯವಾದುದು ಯಾವುದೂ ಇಲ್ಲ", lang: "Kannada" },
  { text: "ಬದುಕು ಬದಲಾಗಲು ಒಂದು ಕ್ಷಣ ಸಾಕು", lang: "Kannada" },
  { text: "ನಿಮ್ಮ ಸಾಧನೆ ನಿಮಗಿಂತ ಹೆಚ್ಚಾಗಿ ಮಾತನಾಡಲಿ", lang: "Kannada" },
  { text: "The only way to do great work is to love what you do.", lang: "English" },
  { text: "Stay hungry, stay foolish.", lang: "English" },
  { text: "Innovation distinguishes between a leader and a follower.", lang: "English" },
];

export default function CreditsPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const creditsWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  useEffect(() => {
    // 1. Tubes Background Logic
    if (!canvasRef.current) return;
    const initTubes = async () => {
      const script = document.createElement('script');
      script.textContent = `
        import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        const app = TubesCursor(document.getElementById('canvas'), {
          tubes: { colors: ['#ff2a2a', '#ff6a00', '#ffffff'], lights: { intensity: 90, colors: ['#ff2a2a', '#ff6a00', '#ffffff', '#ff9999'] } }
        });
        window.tubesApp = app;
      `;
      script.type = 'module';
      document.head.appendChild(script);
    };
    initTubes();

    // 2. Start Scrolling Animation immediately and ensure it loops continuously
    setTimeout(() => {
      scrollTween.current = gsap.fromTo(creditsWrapperRef.current, 
        { y: '110vh' }, 
        { y: '-120%', duration: 25, ease: 'none', repeat: -1, repeatDelay: 0 }
      );
    }, 100);

    return () => (window as any).tubesApp?.dispose?.();
  }, []);

  const handleLineTrigger = () => {
    scrollTween.current?.pause();
    const randomLine = FAMOUS_LINES[Math.floor(Math.random() * FAMOUS_LINES.length)].text;
    setSelectedLine(randomLine);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-hidden font-sans">
      <canvas ref={canvasRef} id="canvas" className="fixed inset-0 z-0 opacity-40" />

      {/* 🎞️ SCROLLING CREDITS */}
      <div className="absolute inset-0 z-20 flex flex-col items-center">
        <div ref={creditsWrapperRef} className="flex flex-col items-center space-y-20 py-20">
          {CREDIT_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              onClick={handleLineTrigger}
              className="group flex flex-col items-center cursor-pointer transition-transform duration-500 hover:scale-110"
            >
              <span className="text-amber-500/60 text-[10px] tracking-[0.6em] mb-2 uppercase">{item.role}</span>
              <span className="text-white text-3xl font-light tracking-[0.2em] group-hover:text-amber-200 transition-colors">
                {item.name}
              </span>
            </div>
          ))}
          <div className="text-white/20 pt-40 tracking-[1em] text-[10px]">THE END</div>
        </div>
      </div>

      {/* 🎭 FAMOUS LINE OVERLAY */}
      {selectedLine && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="max-w-2xl text-center p-8">
            <div className="w-12 h-[1px] bg-amber-500 mx-auto mb-8" />
            <h2 className="text-white text-3xl md:text-5xl font-serif italic leading-relaxed mb-10 px-4">
              "{selectedLine}"
            </h2>
            <div className="w-12 h-[1px] bg-amber-500 mx-auto mb-10" />
            <button 
              onClick={() => { setSelectedLine(null); scrollTween.current?.play(); }}
              className="text-amber-500 text-[10px] tracking-[0.4em] uppercase hover:text-white transition-colors"
            >
              [ Return to Credits ]
            </button>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed bottom-10 right-10 z-[60] text-white/60 text-[10px] tracking-[0.3em] uppercase hover:text-white/80 transition-all duration-300 border border-white/20 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30"
      >
        Close & Exit
      </button>
    </div>
  );
}
