import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Code, Users, Award, Sparkles } from "lucide-react";
import { TextReveal } from "@/registry/magicui/text-reveal";
import AudienceSwitcher from "@/components/ui/AudienceSwitcher";

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  delay 
}: { 
  icon: React.ElementType; 
  value: string; 
  label: string; 
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
      onMouseEnter={() => {
        // Play hover sound if available
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
      }}
      onMouseLeave={() => {
        // Optional: Add leave sound
      }}
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center border border-orange-400/50"
      >
        <Icon className="w-7 h-7 text-orange-400" />
      </motion.div>
      <h4 className="text-3xl font-serif text-white font-bold tracking-[-0.02em] leading-[0.92] mb-1">{value}</h4>
      <p className="text-white/80 text-sm font-inter tracking-normal">{label}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        backgroundColor: "#000000"
      }}
    >
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-lavender/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse-glow delay-1000" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-bodoni italic font-bold text-[clamp(3.2rem,8vw,6.5rem)] tracking-[-0.02em] leading-[0.92] mb-4">
            About <span className="aurora-text">Me</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* About Content */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="space-y-4 font-inter text-muted-foreground leading-relaxed tracking-normal">
              
                 </div>
            
            {/* Audience Switcher */}
            <div className="mt-8">
              <AudienceSwitcher />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;