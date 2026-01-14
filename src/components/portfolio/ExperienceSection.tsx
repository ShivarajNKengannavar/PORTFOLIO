"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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
    tags: ["Gen AI Certified","Cloud Infrastructure"],
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
          scrub: 1,
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
      {/* BACKGROUND TEXTURES */}
      <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-20 pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="relative h-[25vh] w-full flex flex-col items-center justify-end pb-8 z-20 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none text-white mb-4"
          >
             <br/> <span className="text-white/100">My Journey</span>
          </motion.h2>
          <div className="h-1 w-20 bg-orange-500 mb-4" />
          
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
                  <StatItem icon={<Code />} value="10+" label="Projects" />
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
  return (
    <div 
      className="flex-shrink-0 group relative h-[55vh] md:h-[450px] w-[85vw] md:w-[600px] rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer border border-white/10"
      style={{ backgroundColor: experience.color }} 
    >
        {/* IMAGE SIDE (Right 50%) - Removed mask-linear-fade */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40 z-10" />
            <img 
                src={experience.img} 
                alt={experience.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        {/* TEXT CONTENT SIDE (Left 50%) */}
        {/* 'items-start' and 'text-left' ensures left alignment */}
        <div className="relative z-20 h-full flex flex-col justify-between p-6 md:p-10 w-1/2 text-left items-start">
            <div className="w-full">
                {/* Header Row */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg shadow-sm">
                        {i < 3 ? <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                    </div>
                    <span className="text-white/90 font-mono text-xs md:text-sm tracking-wider uppercase font-semibold">
                        {experience.period}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight drop-shadow-md text-left">
                    {experience.title}
                </h3>
                
                {/* Organization */}
                <p className="text-white/95 font-medium text-lg md:text-xl mb-3 italic text-left">
                    {experience.org}
                </p>
                
                {/* Description - Removed justify for cleaner left align */}
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-medium text-left">
                    {experience.desc}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 w-full justify-start">
                {experience.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-black/30 backdrop-blur-md text-white text-xs md:text-sm font-semibold rounded-full border border-white/20 shadow-sm">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );
}

function StatItem({ icon, value, label }: { icon: any, value: string, label: string }) {
    return (
        <div className="experience-stat group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="text-orange-400 mb-3 transform transition-transform group-hover:scale-110 [&>svg]:w-6 [&>svg]:h-6">
                {icon}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
                {value}
            </div>
            <div className="text-[10px] md:text-xs text-white/50 font-mono uppercase tracking-widest text-center">
                {label}
            </div>
        </div>
    )
}