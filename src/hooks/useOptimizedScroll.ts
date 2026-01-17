import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

interface UseOptimizedScrollProps {
  onScroll?: (lenis: Lenis) => void;
  enabled?: boolean;
}

export const useOptimizedScroll = ({ 
  onScroll, 
  enabled = true 
}: UseOptimizedScrollProps = {}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const optimizedScroll = useCallback((lenis: Lenis) => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      
      // Throttle scroll events to 60fps
      rafId.current = requestAnimationFrame(() => {
        onScroll?.(lenis);
        tickingRef.current = false;
      });
    }
  }, [onScroll]);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
      syncTouch: true,
      wheelEventsTarget: window,
    });

    lenisRef.current = lenis;

    // Connect to GSAP if available
    if (typeof window !== 'undefined' && (window as any).gsap) {
      (window as any).gsap.ticker.add((time: number) => {
        lenis.raf(time);
      });
      (window as any).gsap.ticker.lagSmoothing(true);
    } else {
      // Fallback RAF
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Performance optimizations
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const handleResize = () => {
      lenis.resize();
    };

    // Optimized scroll event
    lenis.on('scroll', () => optimizedScroll(lenis));

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, [enabled, optimizedScroll]);

  return {
    lenis: lenisRef.current,
    scrollTo: useCallback((target: number | string | HTMLElement, options?: any) => {
      lenisRef.current?.scrollTo(target, options);
    }, []),
    stop: useCallback(() => {
      lenisRef.current?.stop();
    }, []),
    start: useCallback(() => {
      lenisRef.current?.start();
    }, []),
  };
};

export default useOptimizedScroll;
