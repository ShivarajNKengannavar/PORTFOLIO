import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = [
  "project",
  "pipeline",
  "model",
  "system",
  "interface",
  "solution",
];

export default function DynamicWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 1800); // faster rotation

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block w-[11ch] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.55, // softer feel
            ease: [0.22, 1, 0.36, 1], // cinematic easing
          }}
          className="absolute left-0 top-0 font-semibold text-orange-400"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
