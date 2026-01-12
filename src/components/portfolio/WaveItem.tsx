import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { useEffect } from "react";

interface WaveItemProps {
  project: Project;
  index: number;
}

const gradientMap: Record<string, string> = {
  "gradient-text-cyan": "gradient-cyan",
  "gradient-text-purple": "gradient-purple",
  "gradient-text-blue": "gradient-blue",
  "gradient-text-orange": "gradient-orange",
};

const WaveItem = ({ project, index }: WaveItemProps) => {
  const gradientClass = gradientMap[project.gradientClass] || "gradient-cyan";

  return (
    <article 
      className={`wave-item ${gradientClass}`}
      style={{ '--index': index + 1 } as React.CSSProperties}
      tabIndex={0}
    >
      {/* Background image layer */}
      <div 
        className="wave-item-bg" 
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Vertical strip - always visible */}
      <div className="wave-item-strip">
        <span className="wave-item-strip-title">{project.title}</span>
        <span className="wave-item-strip-number">0{index + 1}</span>
      </div>

      {/* Expanded content */}
      <div className="wave-item-content">
        <h3 className="wave-item-title">{project.title}</h3>
        <p className="wave-item-subtitle">{project.subtitle}</p>
        <p className="wave-item-description">{project.description}</p>

        {/* Progress */}
        <div className="wave-item-progress">
          <span className="wave-item-progress-label">{project.progressLabel}</span>
          <div className="wave-item-progress-bar">
            <div 
              className="wave-item-progress-fill"
              style={{ '--progress': `${project.progressValue}%` } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="wave-item-stats">
          {project.stats.map((stat, i) => (
            <div key={i} className="wave-item-stat">
              <span className="wave-item-stat-value">{stat.value}</span>
              <span className="wave-item-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="wave-item-techs">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="wave-item-tech">{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="wave-item-actions">
          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wave-item-btn wave-item-btn-primary"
          >
            <ExternalLink size={14} />
            <span>View Project</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wave-item-btn wave-item-btn-ghost"
          >
            <Github size={14} />
            <span>Source</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default WaveItem;
