import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import OrbitingSkills from "@/components/ui/orbiting-skills";

// Organized by categories for easy navigation
const skillCategories = {
  "LANGUAGES": ["java", "python", "c", "c++"],
  "FRONTEND": ["react", "css", "html5"],
  "BACKEND": ["flask", "django"],
  "DEVOPS": ["firebase", "vercel", "docker"],
  "TOOLS": ["git", "postman", "ffmpeg"],
  "PLATFORMS": ["github", "visualstudiocode", "androidstudio"],
  "DATABASES": ["mongodb", "postgresql", "mysql", "sqlite"],
  "AI_ML": ["tensorflow", "pytorch", "scikitlearn", "opencv", "ollama"]
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get active skills based on category
  const activeSkillsList = activeCategory ? skillCategories[activeCategory as keyof typeof skillCategories] : Object.values(skillCategories).flat();

  // Transform your skills into config format required by OrbitingSkills
  const orbitingConfig = useMemo(() => {
    return activeSkillsList.map((skill, index) => {
      const totalSkills = activeSkillsList.length;
      const halfSkills = Math.ceil(totalSkills / 2);
      const isInner = index < halfSkills;
      
      const orbitIndex = isInner ? index : index - halfSkills;
      const skillsInOrbit = isInner ? halfSkills : totalSkills - halfSkills;
      const phaseShift = (orbitIndex * (Math.PI * 2)) / skillsInOrbit;
      
      const color = isInner ? 'orange' : 'black';
      
      // --- ICON URL LOGIC ---
      let iconName = skill;
      if (skill === "c++") iconName = "cplusplus";
      if (skill === "c#") iconName = "csharp";
      
      // List of icons that are naturally black and need to be forced to white
      // to be visible on your dark background.
      const darkIcons = ["github", "vercel", "flask", "nextjs", "express", "ollama", "linux", "apple"];
      
      let cdnUrl = `https://cdn.simpleicons.org/${iconName}`;
      
      // If it's a known dark icon, ask the CDN for the white version
      if (darkIcons.includes(iconName.toLowerCase())) {
        cdnUrl += "/white";
      }

      const localIcons: Record<string, string> = {
        'visualstudiocode': '/assets/skills/visualstudiocode.svg',
        'java': '/assets/skills/java.svg'
      };
      
      const imgUrl = localIcons[skill] || cdnUrl;

      return {
        id: skill,
        orbitRadius: isInner ? 100 : 180,
        size: isInner ? 45 : 55,
        speed: isInner ? 0.3 : -0.2,
        imgUrl: imgUrl,
        phaseShift: phaseShift,
        glowColor: color as 'orange' | 'black',
        label: skill.charAt(0).toUpperCase() + skill.slice(1)
      };
    });
  }, [activeSkillsList]);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-16 md:py-20 px-6 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute w-[600px] h-[600px] -top-40 -left-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-[500px] h-[500px] top-1/3 -right-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute w-[400px] h-[400px] bottom-20 left-1/4 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-bodoni italic font-bold text-[clamp(3.2rem,8vw,6.5rem)] tracking-[-0.02em] leading-[0.92] mb-4"
          >
            Technical <span className="aurora-text">Skills </span>
          </motion.h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeCategory === null
                ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]'
                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Skills
          </button>
          {Object.keys(skillCategories).map((categoryName) => (
            <button
              key={categoryName}
              onClick={() => setActiveCategory(categoryName)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === categoryName
                  ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {categoryName}
            </button>
          ))}
        </motion.div>

        {/* ORBITING SKILLS VISUALIZATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[500px] flex items-center justify-center"
        >
          <OrbitingSkills customSkills={orbitingConfig} />
        </motion.div>

        {/* Skills count indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground font-mono text-sm">
            <span className="font-bold text-xl mr-2 text-white">
              {activeSkillsList.length}
            </span>
            {activeCategory ? `${activeCategory} TECHNOLOGIES` : 'TOTAL TECHNOLOGIES'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;