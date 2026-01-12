import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DragCursorProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const DragCursor = ({ containerRef }: DragCursorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsDragging(false);
    };

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="drag-cursor"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${isDragging ? 0.85 : 1})`,
      }}
    >
      <div className="drag-cursor-inner flex items-center gap-2">
        <ChevronLeft className="w-4 h-4" />
        <span>{isDragging ? 'Dragging' : 'Drag Me'}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};

interface DraggableSliderProps {
  children: React.ReactNode;
  className?: string;
}

const DraggableSlider = ({ children, className = '' }: DraggableSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastX = useRef(0);
  const lastTime = useRef(Date.now());
  const momentumRef = useRef<number>();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      setVelocity((lastX.current - e.pageX) / dt * 15);
    }
    lastX.current = e.pageX;
    lastTime.current = now;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    if (!sliderRef.current || Math.abs(velocity) < 0.5) return;

    let currentVelocity = velocity;
    const friction = 0.95;

    const momentum = () => {
      if (!sliderRef.current || Math.abs(currentVelocity) < 0.5) return;
      
      sliderRef.current.scrollLeft += currentVelocity;
      currentVelocity *= friction;
      momentumRef.current = requestAnimationFrame(momentum);
    };

    momentum();
  }, [velocity]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    return () => {
      if (momentumRef.current) {
        cancelAnimationFrame(momentumRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <DragCursor containerRef={containerRef} />
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto hide-scrollbar slider-container py-8 px-4"
        style={{ cursor: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableSlider;
