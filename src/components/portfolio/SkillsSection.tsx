import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { IconCloud } from "@/components/ui/IconCloud";

// Organized by categories for easy navigation
const skillCategories = {
  "LANGUAGES": [
    "java",
    "python",
    "c",
    "c++"
  ],
  "FRONTEND": [
    "react",
    "css",
    "html5", 
    
  ],
  "BACKEND": [
    "flask",
    "django",
    "streamlit"
   
  ],
  "DEVOPS": [
    "firebase",
    "vercel",
    "docker"
    
  ],
  "TOOLS": [  
    "git",   
    "postman",
    "ffmpeg",
    "tesseract",
    "yolo"
  ],
  "PLATFORMS": [
    "github",
    "visualstudiocode",
    "androidstudio",
    "vscode"
  ],
  "DATABASES": [
    "mongodb",
    "postgresql",
    "mysql",
    "sqlite",
    "oracle"
  ],
  "DESIGN": [
    "figma"
  ],
  "AI_ML": [
    "tensorflow",
    "pytorch",
    "scikitlearn",
    "opencv",
    "rag",
    "llm",
    "ollama"
  ]
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get all skills and images
  const allSkills = Object.values(skillCategories).flat();
  const allImages = allSkills.map(skill => `https://cdn.simpleicons.org/${skill}/${skill}`);
  
  // Get active skills
  const activeSkills = activeCategory ? skillCategories[activeCategory] : allSkills;

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        backgroundColor: "#000000"
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      
      {/* Floating Gradient Orbs */}
      <div className="floating-glow w-[600px] h-[600px] -top-40 -left-40 bg-black/30 animate-pulse-slow" />
      <div className="floating-glow w-[500px] h-[500px] top-1/3 -right-40 bg-black/20 animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="floating-glow w-[400px] h-[400px] bottom-20 left-1/4 bg-black/20 animate-pulse-slow" style={{ animationDelay: "4s" }} />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="label mb-4"
          >
            Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-lg"
          >
            Technical <span className="text-gradient">Skills Overview</span>
          </motion.h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <motion.button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === null
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Skills
          </motion.button>
          {Object.keys(skillCategories).map((categoryName, index) => (
            <motion.button
              key={categoryName}
              onClick={() => setActiveCategory(categoryName)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === categoryName
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryName}
            </motion.button>
          ))}
        </motion.div>

        {/* Icon Cloud Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-[600px] aspect-square mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl backdrop-blur-sm border border-primary/10" />
          
          {/* Solar System Rings */}
          <div className="absolute inset-[10%] rounded-full border border-dashed border-primary/20" />
          <div className="absolute inset-[25%] rounded-full border border-dashed border-primary/15" />
          <div className="absolute inset-[40%] rounded-full border border-dashed border-primary/10" />
          <div className="absolute inset-[55%] rounded-full border border-dashed border-primary/5" />
          
          {/* Center Category Display */}
          <motion.div
            key={activeCategory || 'all'}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-md border border-primary/30 shadow-2xl bg-gradient-to-br from-primary/20 to-accent/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground font-heading text-lg font-bold text-center leading-tight px-4">
                  {activeCategory || 'ALL'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Icon Cloud */}
          <div className="relative w-full h-full">
            <IconCloud 
              images={allImages}
              skills={allSkills}
              activeSkills={activeSkills}
            />
          </div>
        </motion.div>

        {/* Skills count indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            <span className="font-heading text-2xl font-bold mr-2 text-primary">
              {activeSkills.length}
            </span>
            {activeCategory ? `${activeCategory} Technologies` : 'All Technologies'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
