import { useEffect, useRef } from 'react';

interface CustomCursorProps {
  children: React.ReactNode;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide native cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    const animate = () => {
      // Linear interpolation (lerp) for weighted, smooth movement
      const lerpFactor = 0.15; // Adjust for more/less lag
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerpFactor;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerpFactor;

      // Apply transform
      cursor.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

      // Scale on hover
      const scale = isHoveringRef.current ? 1.5 : 1;
      cursor.style.width = `${20 * scale}px`;
      cursor.style.height = `${20 * scale}px`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference rounded-full bg-white"
        style={{
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
      {/* Page Content */}
      {children}
    </>
  );
};

export default CustomCursor;
