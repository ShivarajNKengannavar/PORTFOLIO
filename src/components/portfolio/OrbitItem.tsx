import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useMagneticHover } from './useMagneticHover';
import { useEffect, useState } from 'react';

interface OrbitItemProps {
  skill: string;
  angle: number;
  radius: number;
  index: number;
  total: number;
  rotationSpeed: number;
  scrollYProgress: number;
}

const skillSlugMap: Record<string, string> = {
  'Python': 'python',
  'Java': 'java',
  'C++': 'cpp',
  'C': 'c',
  'SQL': 'sql',
  'HTML': 'html5',
  'CSS': 'css',
  'LLM': 'llm',
  'RAG': 'rag',
  'Streamlit': 'streamlit',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'MongoDB': 'mongodb',
  'Docker': 'docker',
  'Oracle Cloud': 'oracle',
  'Git': 'git',
  'YOLO': 'yolo',
  'FFmpeg': 'ffmpeg',
  'Figma': 'figma',
  'Postman': 'postman',
  'VS Code': 'vscode',
  'TensorFlow': 'tensorflow',
  'PyTorch': 'pytorch',
};

export const OrbitItem = ({ 
  skill, 
  angle, 
  radius, 
  index, 
  total, 
  rotationSpeed,
  scrollYProgress 
}: OrbitItemProps) => {
  const [hasSvg, setHasSvg] = useState(false);
  const slug = skillSlugMap[skill] || skill.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const { ref, isHovered, motionValue, handlers } = useMagneticHover({
    strength: 0.2,
    distance: 80,
  });
  
  useEffect(() => {
    // Check if SVG exists
    const img = new Image();
    img.onload = () => setHasSvg(true);
    img.onerror = () => setHasSvg(false);
    img.src = `/logos/${slug}.svg`;
  }, [slug]);
  
  const scrollY = useMotionValue(0);
  const scrollInfluence = useTransform(
    scrollY,
    [0, 1],
    [1, 0.3] // Slow down to 30% speed when fully scrolled
  );
  
  const adjustedRotationSpeed = useTransform(
    scrollInfluence,
    (value) => rotationSpeed * value
  );
  
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const counterRotation = useTransform(
    adjustedRotationSpeed,
    (speed) => -speed * 100
  );
  
  const rotationValue = useTransform(counterRotation, (value) => value);
  
  return (
    <motion.div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: (index / total) * 0.3,
        type: 'spring',
        stiffness: 200,
      }}
    >
      <motion.div
        ref={ref}
        className="relative"
        style={{
          transform: `translate(${motionValue.x.get()}px, ${motionValue.y.get()}px)`,
        }}
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        {...handlers}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`
            relative flex items-center justify-center
            w-16 h-16 rounded-full
            backdrop-blur-md
            border
            transition-all duration-300
            ${isHovered 
              ? 'bg-orange-500/20 border-orange-400/60 shadow-[0_0_30px_rgba(255,120,40,0.4)]' 
              : 'bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            }
          `}
        >
          {hasSvg ? (
            <img
              src={`/logos/${slug}.svg`}
              alt={skill}
              className="w-8 h-8 object-contain"
              style={{
                filter: isHovered ? 'brightness(1.2)' : 'brightness(0.9)',
              }}
            />
          ) : (
            <span className="text-white text-xs font-medium text-center px-1">
              {skill.length > 8 ? skill.substring(0, 6) + '...' : skill}
            </span>
          )}
          
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs rounded-full whitespace-nowrap font-medium"
            >
              {skill}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
