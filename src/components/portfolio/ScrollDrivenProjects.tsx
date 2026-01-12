"use client";

import { useRef, useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("cubic", "0.83, 0, 0.17, 1");

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  metrics: Array<{ label: string; value: string }>;
  techStack: string[];
  gradient: string;
  projectLink?: string;
  sourceLink?: string;
}

/* ---------------- PROJECT DATA (UNCHANGED) ---------------- */

const projects: Project[] = [
  {
    id: 1,
    title: "SecureStego",
    subtitle: "Multi-Media Steganography Suite",
    description:
      "A pioneering steganography solution that elegantly conceals secrets within images, audio, and video.",
    impact: "Achieving 99% data integrity",
    techStack: ["Python", "Flask", "OpenCV"],
    gradient: "from-lavender via-accent to-rose",
    metrics: [
      { label: "Integrity", value: "99%" },
      { label: "Media", value: "3+" },
      { label: "Encryption", value: "AES-256" },
    ],
    projectLink: "https://github.com/shivarajnk/securestego",
    sourceLink: "https://github.com/shivarajnk/securestego",
  },
  // keep the rest EXACTLY as you already have
];

/* ---------------- CARD ---------------- */

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <div className="card-wrapper" data-index={index}>
      <div className="parent">
        <div className="card">
          <div className="logo">
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
          </div>

          <div className="glass" />

          <div className="content">
            <span className="title">{project.title}</span>
            <span className="text">{project.subtitle}</span>
          </div>

          <div className="bottom">
            <div className="social-buttons-container">
              <a
                href={project.sourceLink}
                target="_blank"
                className="social-button social-button1"
              >
                <Github size={15} />
              </a>

              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  className="social-button social-button2"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            <div className="view-more">
              <button className="view-more-button">View more</button>
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN SECTION ---------------- */

export default function ScrollDrivenProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLDivElement>(".card-wrapper");

    gsap.set(cards, {
      rotationX: 65,
      rotationZ: -45,
      y: 300,
      opacity: 0,
      transformOrigin: "center",
    });

    gsap.set(cards[0], {
      rotationX: 0,
      rotationZ: 0,
      y: 0,
      opacity: 1,
    });

    const showCard = (next: number) => {
      if (isAnimating.current || next === currentIndex.current) return;
      isAnimating.current = true;

      const current = cards[currentIndex.current];
      const target = cards[next];

      gsap
        .timeline({
          defaults: { ease: "cubic", duration: 1 },
          onComplete: () => {
            currentIndex.current = next;
            isAnimating.current = false;
          },
        })
        .to(current, {
          rotationX: -65,
          rotationZ: 45,
          y: -300,
          opacity: 0,
        })
        .fromTo(
          target,
          {
            rotationX: 65,
            rotationZ: -45,
            y: 300,
            opacity: 0,
          },
          {
            rotationX: 0,
            rotationZ: 0,
            y: 0,
            opacity: 1,
          },
          "-=0.6"
        );
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const nextIndex = Math.min(
        projects.length - 1,
        Math.floor(scrollY / vh)
      );
      showCard(nextIndex);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center py-20">
          <h2 className="font-bodoni italic font-bold text-[clamp(3.2rem,8vw,6.5rem)]">
            Featured Projects
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            A curated collection of innovative solutions
          </p>
        </div>

        <div className="relative min-h-screen">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
