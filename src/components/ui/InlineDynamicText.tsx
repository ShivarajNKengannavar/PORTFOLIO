import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll } from "framer-motion";

// Context-aware word sets
const WORD_SETS = {
  hero: ["CREATIVITY", "VISION", "IDEAS", "EXPERIENCES", "IMAGINATION"],
  projects: ["SYSTEM", "PRODUCT", "PLATFORM", "ARCHITECTURE", "INTERFACE"],
  contact: ["COLLABORATION", "IMPACT", "CONNECTION", "PARTNERSHIP", "GROWTH"],
};

export default function InlineDynamicText() {
  const { scrollY } = useScroll();
  const [index, setIndex] = useState(0);
  const [currentContext, setCurrentContext] = useState<keyof typeof WORD_SETS>("hero");
  const wordRef = useRef<HTMLSpanElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  // 🔒 Lock width to longest word across all sets
  const maxChars = useMemo(() => {
    const allWords = [...WORD_SETS.hero, ...WORD_SETS.projects, ...WORD_SETS.contact];
    return Math.max(...allWords.map((w) => w.length));
  }, []);

  // 🔥 Context-aware word switching
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = latest;
      
      // Define section boundaries
      const heroEnd = viewportHeight * 0.8; // 80% of viewport
      const projectsStart = viewportHeight * 2.5; // Around projects section
      const contactStart = viewportHeight * 5; // Around contact section
      
      // Determine context based on scroll position
      if (scrollPosition < heroEnd) {
        setCurrentContext("hero");
      } else if (scrollPosition < contactStart) {
        setCurrentContext("projects");
      } else {
        setCurrentContext("contact");
      }
    });

    return unsubscribe;
  }, [scrollY]);

  // Reset index when context changes
  useEffect(() => {
    setIndex(0);
  }, [currentContext]);

  useEffect(() => {
    const id = setInterval(() => {
      const currentWords = WORD_SETS[currentContext];
      setIndex((i) => (i + 1) % currentWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = wordRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  };

  return (
    <div className="text-center space-y-2">
      {/* LINE 1 */}
      <p 
        className="text-white/80 text-[clamp(1.8rem,4vw,2rem)] leading-tight uppercase"
        style={{
          fontFamily: "Thunder-BlackLC, sans-serif",
        }}
      >
        SHAPING MY UNIVERSE WITH
      </p>

      {/* LINE 2 */}
      <p 
        className="text-white/80 text-[clamp(2rem,4vw,2.6rem)] leading-tight flex justify-center items-center gap-[0.4ch] whitespace-nowrap uppercase"
        style={{
          fontFamily: "Thunder-BlackLC, sans-serif",
        }}
      >
        {/* 🔥 DYNAMIC WORD */}
        <span
          ref={wordRef}
          onMouseMove={handleMouseMove}
          className="relative inline-flex justify-center text-orange-400"
          style={{ 
            width: `${maxChars}ch`,
            fontFamily: "Thunder-BlackLC, sans-serif",
          }}
        >
          {/* Static ambient glow */}
          <span
            className="absolute inset-0 blur-xl opacity-40 pointer-events-none"
            style={{ background: "rgba(255,140,60,0.35)" }}
          />

          {/* Cursor-reactive glow */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(
                120px circle at ${glow.x}% ${glow.y}%,
                rgba(255,140,60,0.55),
                transparent 60%
              )`,
            }}
            transition={{ duration: 0.15 }}
          />

          {/* LETTER-LEVEL MORPH */}
          <AnimatePresence mode="wait">
            <motion.span
              key={WORD_SETS[currentContext][index]}
              className="relative inline-flex"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.035 } },
                exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
              }}
            >
              {WORD_SETS[currentContext][index].split("").map((char, i) => {
                const isLastLetter = i === WORD_SETS[currentContext][index].split("").length - 1;
                return (
                  <motion.span
                    key={`${char}-${i}`}
                    className="inline-block"
                    variants={{
                      hidden: { 
                        y: "100%", 
                        opacity: 0,
                        filter: "blur(8px)",
                        scale: 0.8
                      },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1,
                        transition: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                          ...(isLastLetter && {
                            onComplete: () => {
                              // Elastic settle for last letter
                              setTimeout(() => {
                                // This will be handled by whileInView animation
                              }, 450);
                            }
                          })
                        },
                      },
                      exit: {
                        y: "-100%",
                        opacity: 0,
                        filter: "blur(4px)",
                        scale: 0.9,
                        transition: {
                          duration: 0.35,
                          ease: [0.4, 0, 1, 1],
                        },
                      },
                    }}
                    whileInView={isLastLetter ? {
                      scale: [1, 1.15, 1.05, 1],
                      transition: {
                        duration: 0.6,
                        ease: [0.68, -0.55, 0.265, 1.55], // Elastic easing
                        delay: 0.5
                      }
                    } : undefined}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </motion.span>
          </AnimatePresence>
        </span>
      </p>
    </div>
  );
}
