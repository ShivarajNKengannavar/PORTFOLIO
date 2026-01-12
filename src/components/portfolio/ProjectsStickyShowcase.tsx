import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./project-cards.css";

gsap.registerPlugin(ScrollTrigger);

// Sync ScrollTrigger with Lenis
ScrollTrigger.defaults({
  scroller: document.body,
});

export default function ProjectsStickyShowcase({ title, projects }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !container || !header || cards.length !== 3) return;
    if (window.innerWidth < 1000) return;

    ScrollTrigger.getAll().forEach(t => t.kill());

    // State flags
    let gapCompleted = false;
    let flipCompleted = false;

    // Initial state - stack cards physically
    gsap.set(cards[0], {
      x: 0,
      scale: 0.98,
      zIndex: 1,
    });

    gsap.set(cards[1], {
      x: 0,
      scale: 1,
      zIndex: 3,
    });

    gsap.set(cards[2], {
      x: 0,
      scale: 0.98,
      zIndex: 1,
    });

    gsap.set(header, {
      opacity: 0,
      y: 40,
    });

    // Timeline for gap animation (cards separate)
    const gapTL = gsap.timeline({ paused: true });
    gapTL.to(container, { gap: 30, duration: 1, ease: "power1.out" }, 0);
    gapTL.to(cards[0], { x: -30, borderRadius: 20, duration: 1, ease: "power1.out" }, 0);
    gapTL.to(cards[2], { x: 30, borderRadius: 20, duration: 1, ease: "power1.out" }, 0);
    gapTL.to(cards, { borderRadius: 20, duration: 1, ease: "power1.out" }, 0);

    // Timeline for flip animation (cards flip to back)
    const flipTL = gsap.timeline({ paused: true });
    flipTL.to(cards, {
      rotationY: 180,
      duration: 1,
      ease: "power1.out",
      stagger: 0.1,
    }, 0);
    flipTL.to(cards[0], { y: -30, rotationZ: -15, duration: 1, ease: "power1.out" }, 0);
    flipTL.to(cards[2], { y: -30, rotationZ: 15, duration: 1, ease: "power1.out" }, 0);

    // Update header opacity and position based on scroll progress
    function updateHeader(progress: number) {
      if (progress < 0.1) {
        gsap.set(header, { opacity: 0, y: 40 });
      } else if (progress >= 0.1 && progress <= 0.35) {
        const mapped = gsap.utils.mapRange(0.1, 0.35, 0, 1, progress);
        gsap.set(header, { opacity: mapped, y: 40 * (1 - mapped) });
      } else {
        gsap.set(header, { opacity: 1, y: 0 });
      }
    }

    // Update card container width based on scroll progress
    function updateCardWidth(progress: number) {
      if (progress <= 0.35) {
        const widthPercent = gsap.utils.mapRange(0, 0.35, 75, 60, progress);
        gsap.set(container, { width: `${widthPercent}%` });
      } else {
        gsap.set(container, { width: '60%' });
      }
    }

    // Handle gap animation trigger based on scroll progress
    function handleGapAnimation(progress: number) {
      if (progress >= 0.45 && !gapCompleted) {
        gapTL.play();
        gapCompleted = true;
      } else if (progress < 0.45 && gapCompleted) {
        gapTL.reverse();
        gapCompleted = false;
      }
    }

    // Handle flip animation trigger based on scroll progress
    function handleFlipAnimation(progress: number) {
      if (progress >= 0.7 && !flipCompleted) {
        flipTL.play();
        flipCompleted = true;
      } else if (progress < 0.7 && flipCompleted) {
        flipTL.reverse();
        flipCompleted = false;
      }
    }

    // Main ScrollTrigger
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 4}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        updateHeader(progress);
        updateCardWidth(progress);
        handleGapAnimation(progress);
        handleFlipAnimation(progress);
      }
    });

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 220);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      scrollTriggerInstance.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="project-container">
      <header className="sticky-header">
        <h2 ref={headerRef}>{title}</h2>
      </header>
      
      <div ref={containerRef} className="cards-wrapper">
        {projects.map((p: any, i: number) => (
          <div
            key={p.title}
            ref={el => (cardsRef.current[i] = el!)}
            className={`project-card card${i + 1}`}
          >
            <div className="front">
              <img src={p.image} alt={p.title} />
              <div className="image-gradient">
                <h3>{p.title}</h3>
              </div>
            </div>

            <div className="back">
              <h3>{i + 1}</h3>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
