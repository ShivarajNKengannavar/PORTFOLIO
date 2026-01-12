import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticHoverOptions {
  strength?: number;
  distance?: number;
}

export const useMagneticHover = ({ strength = 0.3, distance = 100 }: MagneticHoverOptions = {}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 100) {
      const pullStrength = (1 - distance / 100) * strength;
      x.set(deltaX * pullStrength);
      y.set(deltaY * pullStrength);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [strength, x, y]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    window.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    window.removeEventListener('mousemove', handleMouseMove);
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  return {
    ref,
    isHovered,
    motionValue: {
      x: springX,
      y: springY,
    },
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};
