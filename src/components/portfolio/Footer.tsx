import { motion } from "framer-motion";
import { Heart, Film } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000000] border-t border-white/10 min-h-[200px]">
      {/* Footer Content ON Waves */}
      <div className="absolute top-32 left-0 right-0 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="font-playfair text-2xl font-bold text-white mb-2"
              >
                Shivaraj N Kengannavar
              </motion.p>
              <p className="font-montserrat text-sm text-white">
                © {currentYear} All rights reserved.
              </p>
            </div>

            {/* Made With Love */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 font-montserrat text-sm text-white"
            >
              <span>Crafted with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-orange-400 fill-orange-400" />
              </motion.div>
              <span>and creativity</span>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Back to Top */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 font-montserrat text-sm text-white hover:text-orange-300 transition-colors"
              >
                Back to Top ↑
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Animation - Multiple Ocean Waves at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="wave-container">
          {/* Wave 1 - Back wave (darkest) */}
          <svg className="wave wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6a00" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient1)"
            >
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                  M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z;
                  M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z;
                  M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z
                "
              />
            </path>
          </svg>
          
          {/* Wave 2 - Middle wave (medium) */}
          <svg className="wave wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6a00" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
              fill="url(#waveGradient2)"
            >
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                values="
                  M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z;
                  M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z;
                  M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z
                "
              />
            </path>
          </svg>
          
          {/* Wave 3 - Front wave (lightest) */}
          <svg className="wave wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6a00" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z"
              fill="url(#waveGradient3)"
            >
              <animate
                attributeName="d"
                dur="4s"
                repeatCount="indefinite"
                values="
                  M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z;
                  M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z;
                  M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z
                "
              />
            </path>
          </svg>
        </div>
      </div>

      {/* Dark Gradient Below Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </footer>
  );
};

export default Footer;