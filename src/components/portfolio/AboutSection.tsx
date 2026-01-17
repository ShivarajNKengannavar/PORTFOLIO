import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import AudienceSwitcher from "@/components/ui/AudienceSwitcher";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-12 px-6 overflow-hidden bg-black" // Tight padding for a compact layout
    >
      {/* Background Orbs - Reduced size and intensity for a cleaner feel */}
      <div className="absolute top-0 left-10 w-48 h-48 rounded-full bg-lavender/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse-glow delay-1000" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10" 
        >
          <h2 className="font-bodoni italic font-bold text-[clamp(2.5rem,7vw,4.5rem)] tracking-tight leading-none mb-4">
            About <span className="aurora-text">Me</span>
          </h2>
          
          {/* Academic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 rounded-full backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-300 font-semibold text-sm">B.Tech CSE</span>
            </div>
            <div className="h-4 w-px bg-orange-400/30"></div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">8.76</span>
              <span className="text-orange-300 text-sm font-medium">CGPA</span>
            </div>
            <div className="h-4 w-px bg-orange-400/30"></div>
            <div className="flex items-center gap-2">
              <span className="text-orange-300 text-sm">Graduating</span>
              <span className="text-white font-semibold text-sm">July 2026</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Unified Content Container */}
        <div className="flex flex-col items-center">
          
          {/* Section Divider - Moved above Audience Switcher */}
          <div className="section-divider mx-auto mb-10" />
          
          {/* Audience Switcher is now the primary focal point */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full mb-10"
          >
            <AudienceSwitcher />
          </motion.div>

          {/* Signature Paragraph - Kept at the bottom as requested */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-inter text-white/70 text-base md:text-lg leading-relaxed max-w-2xl text-center italic"
          >
            "I don't chase trends or build for demos. I focus on systems that hold up under real use — 
            code that stays readable, interfaces that stay calm, and decisions that make sense months later."
          </motion.p>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;