"use client"
import React, { useEffect, useState, memo, useRef } from 'react';
import { Code } from 'lucide-react';

// --- Type Definitions ---
type GlowColor = 'orange' | 'black' | 'cyan' | 'purple';

export interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  imgUrl?: string;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, imgUrl, label, glowColor } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 50 : 20, 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2.5
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer 
          border border-white/10
          ${isHovered ? 'scale-125 shadow-2xl border-white/30' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          // Dark Glass background (Solved the 'white background' issue)
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(4px)',
          boxShadow: isHovered
            ? `0 0 20px ${glowColor === 'orange' ? '#ff6a00' : '#ffffff'}40`
            : '0 4px 10px rgba(0,0,0,0.5)'
        }}
      >
        {imgUrl ? (
          <img 
            src={imgUrl} 
            alt={label} 
            // FIX: Removed 'invert' so original colors are preserved
            className="w-full h-full object-contain" 
          /> 
        ) : (
          <div className="w-full h-full rounded-full bg-white/20" />
        )}

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-900 rounded-md text-[10px] font-bold text-white tracking-widest uppercase border border-white/20 shadow-xl whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    orange: {
      primary: 'rgba(255, 107, 53, 0.4)',
      secondary: 'rgba(255, 107, 53, 0.1)',
      border: 'rgba(255, 107, 53, 0.2)'
    },
    black: {
      primary: 'rgba(255, 255, 255, 0.15)', 
      secondary: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    cyan: { primary: '#06b6d4', secondary: '#06b6d433', border: '#06b6d4' },
    purple: { primary: '#9333ea', secondary: '#9333ea33', border: '#9333ea' }
  };

  const colors = glowColors[glowColor as keyof typeof glowColors] || glowColors.orange;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 40%, ${colors.secondary} 70%, transparent 100%)`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      {/* Static ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${colors.border}` }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills({ customSkills }: { customSkills?: SkillConfig[] }) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSkills = customSkills || []; 

  useEffect(() => {
    if (isPaused) return; 

    let animationFrameId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]); 

  const orbitConfigs = [
    { radius: 100, glowColor: 'orange', delay: 0 },
    { radius: 180, glowColor: 'black', delay: 1.5 }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        // Global Pause on Container Hover
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Center Icon */}
        <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-white/10">
           <Code className="w-8 h-8 text-white" />
           <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Render Rings */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor as any}
            animationDelay={config.delay}
          />
        ))}

        {/* Render Skills */}
        {activeSkills.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}