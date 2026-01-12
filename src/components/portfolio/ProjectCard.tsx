import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [progressWidth, setProgressWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgressWidth(project.progressValue);
      }, 300 + index * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, project.progressValue, index]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card group p-6 md:p-8 transition-all duration-500"
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(45, 212, 191, 0.1)' 
          : '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Animated gradient overlay on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(45, 212, 191, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <motion.h3 
            className={`text-2xl md:text-3xl font-bold mb-2 ${project.gradientClass}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-sm md:text-base font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {project.subtitle}
          </motion.p>
        </div>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {project.description}
        </motion.p>

        {/* Progress Section */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <p className="text-xs md:text-sm text-muted-foreground mb-3">
            {project.progressLabel}
          </p>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ 
                duration: 1.5, 
                delay: 0.6 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-3 md:gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          {project.stats.map((stat, statIndex) => (
            <div key={statIndex} className="stat-badge group/stat">
              <span className={`text-lg md:text-2xl font-bold ${project.gradientClass} transition-transform duration-300 group-hover/stat:scale-110`}>
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground mt-1 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Technologies */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="tech-pill font-mono"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                delay: 0.8 + index * 0.1 + techIndex * 0.05,
                duration: 0.3
              }}
              whileHover={{ y: -3 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 + index * 0.1 }}
        >
          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <ExternalLink className="w-4 h-4" />
            View Project
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Github className="w-4 h-4" />
            Source
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
