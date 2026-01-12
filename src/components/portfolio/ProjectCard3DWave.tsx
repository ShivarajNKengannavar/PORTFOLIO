import ProjectCard3D from "./ProjectCard3D";
import { projects } from "@/data/projects";

const Projects3DWave = () => {
  return (
    <section className="projects-3d-section">
      {/* Background grid */}
      <div className="projects-bg-grid" />
      
      {/* Floating orbs */}
      <div className="projects-orb projects-orb-1" />
      <div className="projects-orb projects-orb-2" />

      {/* Header */}
      <div className="projects-header">
        <span className="projects-badge">Featured Work</span>
        <h2 className="projects-title">
          Projects That <span className="projects-title-accent">Define Excellence</span>
        </h2>
        <p className="projects-subtitle">
          A curated collection of innovative solutions spanning AI, security, 
          healthcare, and sustainable technology.
        </p>
      </div>

      {/* 3D Wave Container */}
      <div className="wave-container">
        <div className="wave-cards">
          {projects.map((project, index) => (
            <ProjectCard3D key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* GitHub link */}
      <div className="projects-footer">
        <a
          href="https://github.com/ShivarajNKengannavar?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-github-link"
        >
          View All Projects on GitHub
          <span className="projects-arrow">→</span>
        </a>
      </div>
    </section>
  );
};

export default Projects3DWave;
