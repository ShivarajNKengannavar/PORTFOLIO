import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InteractiveIconProps {
  icon: ReactNode;
  name: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const InteractiveIcon = ({ 
  icon, 
  name, 
  description, 
  size = "md", 
  className = "",
  onClick 
}: InteractiveIconProps) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12 md:w-14 md:h-14", 
    lg: "w-16 h-16 md:w-20 md:h-20"
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6 md:w-7 md:h-7",
    lg: "w-8 h-8 md:w-10 md:h-10"
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => {
        // Play hover sound
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
          // Silent fail if audio doesn't work
        }
      }}
    >
      {/* Icon Container */}
      <motion.div
        whileHover={{ 
          scale: 1.2, 
          rotate: 5,
          backgroundColor: "rgba(255, 140, 60, 0.2)",
          borderColor: "rgba(255, 140, 60, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={onClick}
        className={`
          ${sizeClasses[size]}
          rounded-full
          flex items-center justify-center
          transition-all duration-300
          bg-white/10
          border border-white/20
          hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-orange-600/20
          hover:border-orange-400/50
        `}
      >
        <div className={`${iconSizes[size]} text-white/80 hover:text-orange-400 transition-all duration-300`}>
          {icon}
        </div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-4 py-2
          bg-black/90
          backdrop-blur-md
          border border-orange-400/30
          rounded-lg
          pointer-events-none
          whitespace-nowrap
          z-50
          opacity-0
        `}
      >
        <div className="text-orange-400 font-semibold text-sm mb-1">
          {name}
        </div>
        {description && (
          <div className="text-white/70 text-xs">
            {description}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveIcon;
