import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

const ProjectCard3D = ({ project, index }: ProjectCard3DProps) => {
  return (
    <article 
      className="card-3d group"
      style={{ '--index': index } as React.CSSProperties}
    >
      {/* Background gradient layer */}
      <div className={`card-bg ${project.gradientClass}`} />
      
      {/* Content - visible on expansion */}
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-subtitle">{project.subtitle}</p>
        </div>

        <p className="card-description">{project.description}</p>

        {/* Progress */}
        <div className="card-progress-wrapper">
          <span className="card-progress-label">{project.progressLabel}</span>
          <div className="card-progress-bar">
            <div 
              className="card-progress-fill" 
              style={{ '--progress': `${project.progressValue}%` } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="card-stats">
          {project.stats.map((stat, i) => (
            <div key={i} className="card-stat">
              <span className="card-stat-value">{stat.value}</span>
              <span className="card-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="card-techs">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="card-tech">{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <a 
            href={project.liveUrl || project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card-btn card-btn-primary"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Project</span>
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card-btn card-btn-ghost"
          >
            <Github className="w-4 h-4" />
            <span>Source</span>
          </a>
        </div>
      </div>

      {/* Vertical title strip - always visible */}
      <div className="card-strip">
        <span className="card-strip-title">{project.title}</span>
        <span className="card-strip-number">0{index + 1}</span>
      </div>
    </article>
  );
};

export default ProjectCard3D;
