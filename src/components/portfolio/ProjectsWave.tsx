import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Simple Interactive Grid Pattern Component
const InteractiveGridPattern = ({ className }: { className?: string }) => {
  // Use a more professional, softer orange color
  const projectOrange = "#ff8c4b"; // Softer, more professional orange
  
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* SOLID ORANGE BLOCK BACKGROUND */}
      <div className="absolute inset-0" style={{ backgroundColor: projectOrange }} />
      
      {/* White grid overlay on top of orange */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 animate-pulse" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
      }} />
    </div>
  );
};

// Register GSAP Plugin for the specific easing used in your zip file
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("cubic", "0.83, 0, 0.17, 1");
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  gradient: string;
  projectLink?: string;
  sourceLink?: string;
  image?: string;
  category?: string;
  color?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "SecureStego",
    subtitle: "Multi-Media Steganography Suite",
    description: "A steganography solution concealing secrets within images, audio, and video with AES-256 encryption.",
    techStack: ["Python", "Flask", "React"],
    gradient: "from-lavender via-accent to-rose",
    sourceLink: "https://github.com/ShivarajNKengannavar?tab=repositories",
    image: "https://images.unsplash.com/photo-1614064548237-096f735f344f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Security",
    color: "#ff8c4b"
  },
  {
    id: 2,
    title: "hiREsume",
    subtitle: "AI-Powered Career Platform",
    description: "Intelligent resume screening using NLP to match talents with opportunities.",
    techStack: ["LangChain", "ChromaDB", "React"],
    gradient: "from-accent via-lavender to-cerulean",
    sourceLink: "https://github.com/ShivarajNKengannavar/hiREsume-AI---Complete-Career-Optimization-Platform",
    image: "https://images.unsplash.com/photo-1653038417332-6db0ff9d4bfb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "AI/ML",
    color: "#ff8c4b"
  },
  {
    id: 3,
    title: "Precision Fertilizer",
    subtitle: "Sustainable Agriculture Innovation",
    description: "ML solution optimizing fertilizer recommendations for healthier crops.",
    techStack: ["Scikit-learn", "Pandas", "Flask"],
    gradient: "from-rose via-lavender to-accent",
    sourceLink: "https://github.com/ShivarajNKengannavar/Plant-Advisory-and-Disease-Detection-System",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Agriculture",
    color: "#ff8c4b"
  },
  {
    id: 4,
    title: "GreenHub",
    subtitle: "Online Nursery Management",
    description: "Digital ecosystem designed to streamline nursery operations and e-commerce.",
    techStack: ["TypeScript", "MySQL"],
    gradient: "from-green-600 to-lime-500",
    sourceLink: "https://github.com/ShivarajNKengannavar/ONLINE-NURSERY-MANAGEMENT-SYSTEM",
    image: "https://images.unsplash.com/photo-1745601690159-19501e01b816?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "E-Commerce",
    color: "#ff8c4b"
  },
  {
    id: 5,
    title: "PyroGuard AI",
    subtitle: "Fire Detection & Segmentation",
    description: "Computer vision system for real-time fire identification",
    techStack: ["PyTorch", "OpenCV"],
    gradient: "from-red-600 to-orange-500",
    sourceLink: "https://github.com/ShivarajNKengannavar/REAL-TIME-FIRE-DETECTION-AND-SEGMENTATION",
    image: "https://images.unsplash.com/photo-1608723724615-d04aec3d1fa7?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Computer Vision",
    color: "#ff8c4b"
  },
  {
    id: 6,
    title: "VAIDYA",
    subtitle: "Disease Prediction System",
    description: "Healthcare assistant leveraging ML to bridge symptom recognition and clinical guidance.",
    techStack: ["Scikit-Learn", "Flask", "Pandas"],
    gradient: "from-purple-600 to-pink-500",
    sourceLink: "https://github.com/ShivarajNKengannavar/VAIDYA---Disease-Prediction-Drug-Recommendation",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Healthcare",
    color: "#ff8c4b"
  },
];

const ProjectsWave = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Replicates the splitTextIntoSpans logic from your script.js
  const renderSplitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block translate-y-[200px]">
        {char === " " ? "\u00A0\u00A0" : char}
      </span>
    ));
  };

  // Replicates initializeCards from your script.js
  const initializeCards = () => {
    if (!sliderRef.current) return;
    const cards = Array.from(sliderRef.current.querySelectorAll(".project-card"));
    
    gsap.to(cards, {
      y: (i) => -15 + 15 * i + "%",
      z: (i) => 15 * i,
      opacity: 1,
      duration: 1,
      ease: "cubic",
      stagger: -0.1,
    });
  };

  useEffect(() => {
    initializeCards();
    // Set the initial active card text (the last card in the stack) to visible
    if (sliderRef.current) {
      const lastCard = sliderRef.current.querySelector(".project-card:last-child");
      if (lastCard) {
        gsap.set(lastCard.querySelectorAll("h1 span"), { y: 0 });
      }
    }
  }, []);

  // Replicates the Click Event Listener from your script.js
  const handleSliderClick = () => {
    if (isAnimating || !sliderRef.current) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    const cards = Array.from(slider.querySelectorAll(".project-card"));
    const lastCard = cards[cards.length - 1];
    const nextCard = cards[cards.length - 2];

    // Animate out current title
    gsap.to(lastCard.querySelectorAll("h1 span"), {
      y: 200,
      duration: 0.75,
      ease: "cubic",
    });

    // Animate out current card and move to back
    gsap.to(lastCard, {
      y: "+=150%",
      duration: 0.75,
      ease: "cubic",
      onComplete: () => {
        slider.prepend(lastCard);
        initializeCards();
        gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });

        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      },
    });

    // Animate in next title
    if (nextCard) {
      gsap.to(nextCard.querySelectorAll("h1 span"), {
        y: 0,
        duration: 1,
        ease: "cubic",
        stagger: 0.05,
      });
    }
  };

  return (
    <section id="projects" className="relative z-30 w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* ORANGE BLOCK CONTAINER - Contains everything */}
      <div 
        className="relative w-full min-h-screen p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: '#ff8c4b' }} // Softer, more professional orange
      >
        {/* White grid overlay inside orange block - Mobile optimized */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            clipPath: 'polygon(0% 25px, 100% 25px, 100% calc(100% - 25px), 0% calc(100% - 25px))'
          }}
        />
        {/* Vertical lines only at top and bottom edges - Mobile optimized */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 25px, 0% 25px, 0% calc(100% - 25px), 100% calc(100% - 25px), 100% 100%, 0% 100%)'
          }}
        />
        
        {/* Subtle overlay for depth - Mobile optimized */}
        <div className="absolute inset-0 animate-pulse" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 50%)'
        }} />
        
        {/* ================= COMPACT TITLE - Mobile optimized ================= */}
        <div className="relative z-20 py-2 sm:py-4 px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 tracking-tight">
              Featured Projects
            </h2>
            <div className="w-12 h-1 sm:w-16 bg-white mx-auto mb-2 sm:mb-3"></div>
            <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed px-4">
              A curated collection of innovative solutions and creative work
            </p>
          </motion.div>
        </div>

        {/* ================= DRAG INSTRUCTION - Mobile optimized ================= */}
        <div className="relative z-20 py-1 sm:py-2 px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-white/60 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 px-4">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 11-3 0m6 0a1.5 1.5 0 11-3 0m-3 6a1.5 1.5 0 11-3 0m6 0a1.5 1.5 0 01-3 0M12 10.5a1.5 1.5 0 11-3 0m6 0a1.5 1.5 0 11-3 0m-3 6a1.5 1.5 0 11-3 0m6 0a1.5 1.5 0 01-3 0" />
              </svg>
              Drag cards to explore projects
            </p>
          </motion.div>
        </div>

        {/* ================= STACKED PROJECTS SECTION - Mobile optimized ================= */}
        <div className="relative z-20 px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Stacked Projects Container */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0.3}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="absolute w-[240px] sm:w-[260px] md:w-[280px] group cursor-grab active:cursor-grabbing shadow-2xl"
                  style={{
                    // Stack cards on top of each other with slight offset
                    top: `${index * 2}px`,
                    left: `${index * 2}px`,
                    zIndex: 1000
                  }}

                  whileDrag={{ 
                    scale: 1.1, 
                    zIndex: 1000
                  }}
                >
                  <div 
                    className="relative rounded-2xl overflow-hidden border transition-all duration-500"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      borderWidth: '2px'
                    }}
                  >
                    {/* Project Image Section */}
                    <div className='relative h-44 overflow-hidden'>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      {/* Floating Category Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span 
                          className="px-2 py-1 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                      {/* GitHub Icon */}
                      <div className="absolute top-3 right-3 z-20">
                        <a 
                          href={project.sourceLink}
                          target="_blank"
                          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg transition-colors duration-300 border border-white/80 hover:scale-110"
                          style={{
                            borderColor: project.color
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={14} className="text-gray-800" />
                        </a>
                      </div>
                    </div>
                    {/* Project Content */}
                    <div className='p-4 relative z-10'>
                      <div className='mb-2'>
                        <h3 
                          className='text-lg font-bold mb-1 transition-colors duration-300'
                          style={{
                            color: '#1f2937'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = project.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#1f2937';
                          }}
                        >
                          {project.title}
                        </h3>
                        <p className='text-xs text-gray-600 leading-relaxed line-clamp-2'>
                          {project.description}
                        </p>
                      </div>
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.techStack.slice(0, 3).map(tech => (
                          <span 
                            key={tech} 
                            className="px-2 py-0.5 bg-white/80 backdrop-blur-sm border rounded-full text-xs font-medium transition-all duration-300"
                            style={{
                              borderColor: `${project.color}50`,
                              color: '#374151'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = project.color;
                              e.currentTarget.style.color = project.color;
                              e.currentTarget.style.backgroundColor = project.color + '20';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = `${project.color}50`;
                              e.currentTarget.style.color = '#374151';
                              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {/* Action Link */}
                      <a
                        href={project.sourceLink}
                        target="_blank"
                        className='inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
                        style={{
                          color: project.color
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Project
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CALL TO ACTION SECTION - Mobile optimized ================= */}
        <div className="relative z-20 py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white px-4">
                Many More To Discover
              </h3>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-4">
                Explore my complete collection of innovative projects
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <a 
                  href="https://github.com/ShivarajNKengannavar"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-white text-orange-600 font-semibold rounded-lg transition-colors duration-200 hover:scale-105"
                >
                  <Github size={18} className="sm:hidden" />
                  <Github size={20} className="hidden sm:block" />
                  See GitHub
                </a>
                <button className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold rounded-lg transition-colors duration-200">
                  Discover More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsWave;
