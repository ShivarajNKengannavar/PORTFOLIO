"use client"; // Premium 3D Experience Logic Enabled

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Code, Users, Award, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: "Freelance Mentor",
    org: "Independent",
    period: "2024 – Present",
    desc: "Guiding next generation of developers through personalized mentorship.",
    tags: ["Mentored 30+ students", "100% Success"],
    color: "#ff6a2a",
    // HD Image: Mentorship / Coding / collaboration
    img: "https://images.unsplash.com/photo-1643981509466-c37ac9d10045?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 0,
    title: "Full Stack Intern",
    org: "SHLR TECHNOSOFT Priv Ltd",
    period: "Feb 2026 – May 2026",
    desc: "Engineered 4 high-scale SaaS applications. Successfully deployed one with active real-world users; remaining 3 scheduled for imminent launch.",
    tags: ["Node.js", "Angular", "Redis", "Brevo"],
    color: "#00d2ff",
    // HD Image: SaaS / Dashboard / Engineering
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1426&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Java Intern",
    org: "Besant Technologies",
    period: "2025",
    desc: "Built backend systems and worked on real-world Java applications.",
    tags: ["5+ Projects", "MySQL Integration"],
    color: "#5196fd",
    // HD Image: Backend / Server / Code
    img: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "OCI Certified",
    org: "Oracle Cloud",
    period: "2025",
    desc: "Certified in Oracle Cloud Infrastructure, Generative AI foundations.",
    tags: ["Gen AI Certified", "Cloud Infrastructure"],
    color: "#f13029ff",
    // HD Image: Cloud / AI / Data
    img: "https://images.unsplash.com/photo-1662947774804-917520490b35?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;

      const totalWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = totalWidth - windowWidth;

      gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 0.5, // Reduced for better performance
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative h-screen bg-neutral-950 overflow-hidden flex flex-col"
    >
      {/* BACKGROUND TEXTURES & DEPTH */}
      <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-10 pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-neutral-950">
        {/* Animated Gradient Orbs for depth */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="relative h-[28vh] w-full flex flex-col items-center justify-end pb-12 z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-orange-500 font-mono text-[10px] tracking-[0.6em] uppercase font-bold mb-4 block">
            Professional Chronicle
          </span>
          <h2 className="font-serif text-[clamp(3rem,6vw,6rem)] font-black leading-none text-white tracking-tighter italic">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">Journey</span>
          </h2>
          <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-6 opacity-50" />
        </motion.div>
      </div>

      {/* --- SCROLL TRACK --- */}
      <div className="flex-1 w-full relative">
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center px-8 md:px-20 gap-8 md:gap-16 w-max will-change-transform z-10"
        >

          <div className="w-[5vw] flex-shrink-0" />

          {/* --- CARDS --- */}
          {experiences.map((exp, i) => (
            <Card key={i} experience={exp} i={i} />
          ))}

          {/* --- FINAL STATS --- */}
          <div className="flex-shrink-0 w-[85vw] md:w-[40vw] pr-20 flex flex-col justify-center items-center">
            <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
              <StatItem icon={<Code />} value="15+" label="Projects" />
              <StatItem icon={<Users />} value="30+" label="Mentees" />
              <StatItem icon={<Award />} value="OCI" label="Certified" />
              <StatItem icon={<Sparkles />} value="99%" label="Satisfaction" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- SUBCOMPONENTS ---

function Card({ experience, i }: { experience: any; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse Position for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transforms for Rotation & Parallax
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Parallax for Background Image (Moves slightly)
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["2%", "-2%"]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["2%", "-2%"]);
  
  // Parallax for Glass Panel (Moves more)
  const glassX = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
  const glassY = useTransform(mouseYSpring, [-0.5, 0.5], ["15px", "-15px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1200px"
      }}
      className={`hero-card-${i} flex-shrink-0 group relative h-[60vh] md:h-[520px] w-[85vw] md:w-[460px] transition-all duration-300`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-card-${i} {
          --card-shape: shape(
            from 13.4% 3.1%,
            line to 82.9% 3.1%,
            curve to 94.9% 14.5% with 94.9% 3.1%,
            line to 94.9% 18.1%,
            curve to 82.4% 36.1% with 94.9% 26.9% / 85.2% 27.8%,
            curve to 94.9% 53.7% with 79.4% 45.2% / 94.9% 44.9%,
            line to 94.9% 85.5%,
            curve to 84% 96% with 94.9% 96%,
            line to 13.4% 96%,
            curve to 3.2% 85.5% with 3.2% 96%,
            line to 3.2% 12.8%,
            curve to 13.4% 3.1% with 3.2% 3.1%
          );
        }

        .hero-card-${i}::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.15);
          clip-path: var(--card-shape);
          transform: translateZ(-20px);
        }

        .hero-card-${i}::after {
          content: "";
          position: absolute;
          inset: 1.5px;
          background: #0a0a0a;
          clip-path: var(--card-shape);
          transform: translateZ(-10px);
        }

        .hero-card__content-${i} {
          position: absolute;
          inset: 1.5px;
          z-index: 2;
          clip-path: var(--card-shape);
          background: #0a0a0a;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .hero-card__cut-glow-${i} {
          position: absolute;
          right: 0;
          top: 15%;
          width: 40%;
          height: 50%;
          background: radial-gradient(
            ellipse at right,
            ${experience.color}44,
            ${experience.color}11 50%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 1;
          transform: translateZ(30px);
        }

        .hero-card__dot-${i} {
          position: absolute;
          left: 26.5%;
          top: 18%;
          width: 4%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: ${experience.color};
          z-index: 4;
          box-shadow: 0 0 20px ${experience.color};
          transform: translateZ(60px);
        }

        .hero-card__line-${i} {
          position: absolute;
          left: 21.8%;
          height: 2px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
          z-index: 4;
          transform: translateZ(50px);
        }

        .hero-card__line-one-${i} {
          top: 33.5%;
          width: 45%;
        }

        .hero-card__line-two-${i} {
          top: 38.1%;
          width: 30%;
          background: rgba(255, 255, 255, 0.08);
        }
      `}} />
      
      <div className={`hero-card__content-${i}`}>
        {/* Parallax Background */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-1000"
        >
          <img 
            src={experience.img} 
            alt={experience.title} 
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </motion.div>

        {/* Decorative Elements (Floating) */}
        <div className={`hero-card__cut-glow-${i}`} />
        <div className={`hero-card__dot-${i}`} />
        <div className={`hero-card__line-${i} hero-card__line-one-${i}`} />
        <div className={`hero-card__line-${i} hero-card__line-two-${i}`} />

        {/* Main Content with Parallax Glass */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
          <motion.div 
            style={{ x: glassX, y: glassY, translateZ: "40px" }}
            className="relative mt-10"
          >
            {/* The Glass Panel */}
            <div className="relative p-6 md:p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/[0.1] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-700 group-hover:bg-white/[0.08] group-hover:border-white/[0.2]">
              
              {/* Shine Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="p-3 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl"
                    style={{ backgroundColor: `${experience.color}33` }}
                  >
                    {experience.id === 1 ? <Briefcase className="w-6 h-6" style={{ color: experience.color }} /> : <GraduationCap className="w-6 h-6" style={{ color: experience.color }} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/40 font-mono text-[10px] tracking-[0.5em] uppercase font-black mb-1">
                      Chronicle
                    </span>
                    <span className="text-white font-mono text-xs font-bold tracking-widest">
                      {experience.period}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-none tracking-tighter italic">
                  {experience.title}
                </h3>
                <p className="text-base md:text-lg font-bold italic mb-5" style={{ color: experience.color }}>
                  {experience.org}
                </p>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed line-clamp-4 font-medium tracking-wide">
                  {experience.desc}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-4">
            {experience.tags.map((tag: string, idx: number) => (
              <span 
                key={idx} 
                className="px-4 py-1.5 text-white/60 text-[10px] font-black rounded-full border border-white/[0.05] bg-white/[0.03] hover:bg-white/[0.1] hover:text-white transition-all duration-300 uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ icon, value, label }: { icon: any, value: string, label: string }) {
  return (
    <div className="experience-stat group relative flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl transition-all duration-700 hover:bg-white/[0.05] hover:border-white/[0.15] hover:-translate-y-3 shadow-2xl">
      {/* Inner Glow and Reflection */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 text-orange-500 mb-5 transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-[15deg] [&>svg]:w-8 [&>svg]:h-8 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
        {icon}
      </div>
      <div className="relative z-10 text-4xl font-black text-white mb-1 tracking-tighter">
        {value}
      </div>
      <div className="relative z-10 text-[9px] text-white/30 font-mono uppercase tracking-[0.5em] font-black text-center">
        {label}
      </div>
    </div>
  );
}
