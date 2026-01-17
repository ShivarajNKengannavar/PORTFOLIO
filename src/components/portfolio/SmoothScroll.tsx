import { useEffect, useRef, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2, // Faster on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1, // More responsive on mobile
      touchMultiplier: isMobile ? 1.5 : 2, // Optimized for touch
      infinite: false,
      // Mobile-specific optimizations
      syncTouch: true, // Better touch synchronization
      // Performance optimizations
      autoResize: true, // Better responsive handling
    });

    lenisRef.current = lenis;

    // Connect GSAP ScrollTrigger with Lenis
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const gsap = (window as any).gsap;
      const ScrollTrigger = gsap.ScrollTrigger;
      
      if (ScrollTrigger) {
        // Update ScrollTrigger on Lenis scroll
        lenis.on('scroll', ScrollTrigger.update);
        
        // Connect GSAP ticker to Lenis RAF
        gsap.ticker.add((time: number) => {
          lenis.raf(time);
        });
        
        // Disable lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);
      }
    } else {
      // Fallback RAF loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Basic cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      if (lenisRef.current) {
        const isMobile = window.innerWidth <= 768;
        // Update Lenis settings on resize - destroy and recreate
        lenisRef.current.destroy();
        
        const newLenis = new Lenis({
          duration: isMobile ? 1.0 : 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: isMobile ? 0.8 : 1,
          touchMultiplier: isMobile ? 1.5 : 2,
          infinite: false,
          syncTouch: true,
          autoResize: true,
        });
        
        lenisRef.current = newLenis;
        
        // Reconnect GSAP if available
        if (typeof window !== 'undefined' && (window as any).gsap) {
          const gsap = (window as any).gsap;
          const ScrollTrigger = gsap.ScrollTrigger;
          
          if (ScrollTrigger) {
            newLenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time: number) => {
              newLenis.raf(time);
            });
            gsap.ticker.lagSmoothing(0);
          }
        } else {
          function raf(time: number) {
            newLenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
