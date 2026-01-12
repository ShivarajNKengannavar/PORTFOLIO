import { useRef, useEffect, useState, useCallback } from 'react';

interface GradientOrb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  opacity: number;
  driftPhase: number;
  driftSpeed: number;
}

export default function GradientOrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const orbsRef = useRef<GradientOrb[]>([]);
  const mouseRef = useRef({ x: -300, y: -300, targetX: -300, targetY: -300 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize gradient orbs
  const initOrbs = useCallback((width: number, height: number) => {
    const orbs: GradientOrb[] = [];
    const orbCount = Math.min(15, Math.floor((width * height) / 40000)); // Low density
    
    // Warm cinematic color palette
    const colors = [
      '255, 107, 53',   // Burnt orange
      '210, 105, 30',   // Rust
      '244, 164, 96',   // Soft peach
      '255, 140, 90',   // Light orange
      '220, 120, 60',   // Warm amber
    ];
    
    for (let i = 0; i < orbCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      orbs.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 150 + 100, // Large orbs (100-250px)
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.2,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.0002 + 0.0001, // Very slow drift
      });
    }
    
    orbsRef.current = orbs;
    setIsInitialized(true);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear with dark background
    ctx.fillStyle = 'rgba(10, 10, 10, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Smooth mouse movement with interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;
    
    const time = Date.now() * 0.001;
    
    // Update and draw orbs
    orbsRef.current.forEach((orb) => {
      // Subtle drift animation
      const driftX = Math.sin(time * orb.driftSpeed + orb.driftPhase) * 20;
      const driftY = Math.cos(time * orb.driftSpeed * 0.7 + orb.driftPhase) * 15;
      
      // Calculate distance from mouse
      const dx = mouseRef.current.x - orb.x;
      const dy = mouseRef.current.y - orb.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 250; // Large, soft influence radius
      
      let targetX = orb.baseX + driftX;
      let targetY = orb.baseY + driftY;
      
      if (distance < maxDistance) {
        // Soft attraction to cursor
        const influence = (1 - distance / maxDistance) * 0.3;
        const angle = Math.atan2(dy, dx);
        targetX += Math.cos(angle) * influence * 50;
        targetY += Math.sin(angle) * influence * 50;
      }
      
      // Smooth interpolation to target position
      orb.x += (targetX - orb.x) * 0.02;
      orb.y += (targetY - orb.y) * 0.02;
      
      // Create large, soft radial gradient
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, orb.size
      );
      
      // Multi-stop gradient for metaball blending
      const [r, g, b] = orb.color.split(', ').map(Number);
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${orb.opacity})`);
      gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${orb.opacity * 0.7})`);
      gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${orb.opacity * 0.4})`);
      gradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, ${orb.opacity * 0.2})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      // Draw orb with blend mode for metaball effect
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(
        orb.x - orb.size,
        orb.y - orb.size,
        orb.size * 2,
        orb.size * 2
      );
    });
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current.targetX = -300;
    mouseRef.current.targetY = -300;
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initOrbs(canvas.width, canvas.height);
  }, [initOrbs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize orbs
    initOrbs(canvas.width, canvas.height);
    
    // Start animation
    animate();
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleMouseMove, handleMouseLeave, handleResize, initOrbs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
