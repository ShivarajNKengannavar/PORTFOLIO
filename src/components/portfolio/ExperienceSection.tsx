"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, GraduationCap, Award, Users, Target, Rocket, Star, Code, Sparkles } from "lucide-react";

const experiences = [
  {
    title: "Freelance Technical Mentor",
    organization: "Independent",
    period: "2024 – Present",
    description: "Guiding next generation of developers through personalized mentorship and project-based learning.",
    highlights: [
      "Mentored 30+ students",
      "20% improvement in student outcomes",
      "100% project deployment success",
    ],
    color: "#ff6a2a",
    link: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Java Intern",
    organization: "Besant Technologies, Bengaluru",
    period: "2025",
    description: "Built backend systems and worked on real-world Java applications with strong OOP and database integration.",
    highlights: [
      "Built 5+ Java applications",
      "Optimized execution time by 15%",
      "Hands-on MySQL integration",
    ],
    color: "#5196fd",
    link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "OCI Generative AI Certified",
    organization: "Oracle Cloud",
    period: "2025",
    description: "Certified in Oracle Cloud Infrastructure Generative AI foundations.",
    highlights: ["OCI Foundations", "Generative AI Certified"],
    color: "#8f89ff",
    link: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "B.Tech in Computer Science",
    organization: "CMR University, Bengaluru",
    period: "2022 – 2026",
    description: "Strong foundation in computer science, AI/ML, and full-stack development.",
    highlights: ["CGPA: 8.76", "AI / ML Focus"],
    color: "#ed649e",
    link: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=500&auto=format&fit=crop",
  },
];

export default function ExperienceSection() {
  const container = useRef(null);
  const [isParallaxActive, setIsParallaxActive] = useState(false);
  const [allCardsVisible, setAllCardsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax scroll management
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const containerTop = container.current?.offsetTop || 0;
      const containerHeight = container.current?.offsetHeight || 0;
      const viewportHeight = window.innerHeight;
      
      // Check if we're in the experience section
      const sectionStart = containerTop - viewportHeight;
      const sectionEnd = containerTop + containerHeight - viewportHeight;
      
      if (scrollPosition >= sectionStart && scrollPosition <= sectionEnd && !allCardsVisible) {
        setIsParallaxActive(true);
        
        // Calculate parallax scroll amount
        const parallaxProgress = (scrollPosition - sectionStart) / (sectionEnd - sectionStart);
        const maxScroll = sectionEnd - sectionStart;
        
        // Smooth scroll to parallax position
        if (isParallaxActive) {
          window.scrollTo({
            top: sectionStart + (parallaxProgress * maxScroll),
            behavior: 'smooth'
          });
        }
        
        // Check if all cards are visible (when progress reaches 1)
        if (parallaxProgress >= 0.95) {
          setAllCardsVisible(true);
          setIsParallaxActive(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isParallaxActive, allCardsVisible]);

  return (
    <section
      ref={container}
      id="experience"
      className={`relative text-white min-h-screen transition-all duration-300 ${
        isParallaxActive ? 'scroll-parallax-active' : ''
      }`}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Header */}
      <div className="h-screen w-full grid place-content-center relative" style={{ backgroundColor: "#000000" }}>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 experience-animate-in"
        >
          <h2 className="font-serif text-[clamp(3rem,7vw,5.8rem)] font-bold leading-[0.95] mb-4">
            Experience
          </h2>
          <div className="section-divider" />
          <p className="text-white/60 mt-6 text-lg">
            My professional journey and achievements
          </p>
        </motion.div>
      </div>

      {/* Stacking Cards */}
      <div className="relative">
        {experiences.map((exp, i) => {
          const targetScale = 1 - (experiences.length - i) * 0.05;
          return (
            <Card
              key={`exp_${i}`}
              i={i}
              experience={exp}
              progress={smoothProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
              isParallaxActive={isParallaxActive}
            />
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="experience-stats">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="experience-stat"
          >
            <Code className="w-8 h-8 mx-auto mb-3 text-orange-400 experience-stat-icon" />
            <div className="text-2xl font-bold text-white mb-1">30+</div>
            <div className="text-sm text-white/60">Projects Delivered</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="experience-stat"
          >
            <Users className="w-8 h-8 mx-auto mb-3 text-orange-400 experience-stat-icon" />
            <div className="text-2xl font-bold text-white mb-1">30+</div>
            <div className="text-sm text-white/60">Students Mentored</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="experience-stat"
          >
            <Award className="w-8 h-8 mx-auto mb-3 text-orange-400 experience-stat-icon" />
            <div className="text-2xl font-bold text-white mb-1">OCI</div>
            <div className="text-sm text-white/60">Certified Developer</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="experience-stat"
          >
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-orange-400 experience-stat-icon" />
            <div className="text-2xl font-bold text-white mb-1">99%</div>
            <div className="text-sm text-white/60">Client Satisfaction</div>
          </motion.div>
        </div>
      </div>

      {/* Education Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="glass-card inline-block px-8 py-4">
          <p className="font-montserrat text-white/80">
            <span className="text-lavender font-semibold">B.Tech in Computer Science</span>
            {" "}• CMR University, Bengaluru • CGPA: 8.70
          </p>
        </div>
      </motion.div>
    </section>
  );
}

interface CardProps {
  i: number;
  experience: any;
  progress: any;
  range: [number, number];
  targetScale: number;
  isParallaxActive: boolean;
}

function Card({ i, experience, progress, range, targetScale, isParallaxActive }: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: experience.color,
          scale,
          top: `${i * 25}px`,
        }}
        className="experience-card flex flex-col relative h-[450px] w-[70%] rounded-2xl lg:p-10 sm:p-6 p-4"
      >
        <div className="experience-card-content">
          <div className="experience-header flex items-start justify-between mb-6 p-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{experience.title}</h2>
              <p className="text-white/80 text-lg">{experience.organization}</p>
              <p className="text-white/60">{experience.period}</p>
            </div>
            <div className="experience-icon">
              {i < 3 ? (
                <Briefcase className="w-6 h-6 text-white" />
              ) : (
                <GraduationCap className="w-6 h-6 text-white" />
              )}
            </div>
          </div>

          <div className="flex h-full gap-8">
            <div className="w-[45%]">
              <p className="text-white/90 leading-relaxed mb-4">{experience.description}</p>
              
              {experience.highlights && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Key Skills:</h4>
                  <div className="experience-skills">
                    {experience.highlights.map((highlight: string, idx: number) => (
                      <span
                        key={idx}
                        className="experience-skill"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="experience-image w-[55%] h-full">
              <img
                src={experience.link}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
