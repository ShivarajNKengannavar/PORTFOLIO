import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';
import coverImage from '@/assets/cover-innovations.png';

gsap.registerPlugin(ScrollTrigger);

const MoreProjectsSection = () => {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const coverContainerRef = useRef<HTMLDivElement>(null);
  const coverPartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);

  useLayoutEffect(() => {
    const pinWrapper = pinWrapperRef.current;
    const coverContainer = coverContainerRef.current;
    const coverParts = coverPartRefs.current.filter(Boolean) as HTMLDivElement[];
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!pinWrapper || !coverContainer || coverParts.length === 0 || !cardsContainer || cards.length === 0) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Initial state: Cover slices joined, cards hidden behind with rotation
      gsap.set(coverParts, {
        xPercent: 0,
        opacity: 1,
        z: 100,
      });

      // Cards start hidden BEHIND slices with rotateY
      gsap.set(cards, {
        rotateY: -90,
        opacity: 1,
        z: -50,
        transformOrigin: 'center center',
      });

      gsap.set(cardsContainer, {
        gap: '0px',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapper,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Split the image (slices move apart) - 0% to 25%
      tl.to(coverParts[0], {
        xPercent: -30,
        ease: 'power2.inOut',
        duration: 0.25,
      }, 0);

      tl.to(coverParts[1], {
        xPercent: 0,
        ease: 'power2.inOut',
        duration: 0.25,
      }, 0);

      tl.to(coverParts[2], {
        xPercent: 30,
        ease: 'power2.inOut',
        duration: 0.25,
      }, 0);

      // Phase 2: Rotate cards in from behind slices (staggered) - 20% to 50%
      tl.to(cards[0], {
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.2,
      }, 0.2);

      tl.to(cards[1], {
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.2,
      }, 0.25);

      tl.to(cards[2], {
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.2,
      }, 0.3);

      // Phase 3: Move slices out of the way completely - 40% to 55%
      tl.to(coverParts[0], {
        xPercent: -120,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.15,
      }, 0.4);

      tl.to(coverParts[2], {
        xPercent: 120,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.15,
      }, 0.4);

      tl.to(coverParts[1], {
        opacity: 0,
        z: -100,
        ease: 'power2.inOut',
        duration: 0.1,
      }, 0.45);

      // Phase 4: Add gap between cards - 50% to 60%
      tl.to(cardsContainer, {
        gap: '24px',
        duration: 0.1,
        ease: 'power2.inOut',
      }, 0.5);

      // Phase 5: Flip cards with stagger - 60% to 100%
      tl.to({}, {
        duration: 0.4,
        onUpdate: function () {
          const progress = this.progress();
          const newFlipped = [0, 1, 2].map((index) => {
            const cardThreshold = index * 0.3;
            return progress > cardThreshold;
          });
          setFlippedCards(newFlipped);
        },
      }, 0.6);
    }, pinWrapper);

    return () => ctx.revert();
  }, []);

  const moreProjects = projects.slice(3, 6);

  return (
    <div ref={pinWrapperRef} className="relative bg-background">
      <section className="relative min-h-screen overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-foreground">More</span>{' '}
              <span className="text-gradient-secondary">Innovations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pushing boundaries in healthcare, safety, and digital ecosystems.
            </p>
          </div>

          {/* Cover Image & Cards Container */}
          <div 
            className="relative w-full max-w-7xl flex justify-center items-center"
            style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}
          >
            {/* Cover Image Slices - 3 parts */}
            <div
              ref={coverContainerRef}
              className="absolute inset-0 z-20 flex overflow-visible"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  ref={(el) => (coverPartRefs.current[index] = el)}
                  className="cover-part flex-1 overflow-hidden rounded-lg shadow-2xl"
                  style={{
                    backgroundImage: `url(${coverImage})`,
                    backgroundSize: '300% 100%',
                    backgroundPosition: `${index * 50}% center`,
                    minHeight: '500px',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
                  {/* Center text only on middle slice */}
                  {index === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">More Innovations</h3>
                        <p className="text-lg md:text-xl opacity-90 drop-shadow-md">Scroll to discover</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cards Container */}
            <div
              ref={cardsContainerRef}
              className="flex flex-col md:flex-row justify-center items-stretch z-10 w-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {moreProjects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="project-card-wrapper flex-1 min-h-[500px] overflow-visible"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  <ProjectCard project={project} isFlipped={flippedCards[index]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoreProjectsSection;
