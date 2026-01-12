import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AUDIENCES = [
  {
    key: "everyone",
    label: "For Everyone",
    content: [
      "I build digital systems with clarity and intention.",
      "My work focuses on thoughtful design, solid engineering, and experiences that feel reliable and human.",
      "I care deeply about how things work, how they scale, and how they feel to use."
    ],
  },
  {
    key: "recruiters",
    label: "For Recruiters",
    content: [
      "I’m a full-stack engineer who takes ownership from idea to delivery.",
      "I communicate clearly, work well across teams, and ship production-ready systems you can rely on.",
      "My focus is long-term value, maintainability, and consistency."
    ],
  },
  {
    key: "designers",
    label: "For Designers",
    content: [
      "I respect design systems and the thinking behind them.",
      "I translate visual intent into clean, responsive, accessible interfaces without losing nuance.",
      "Spacing, motion, and interaction details matter to me."
    ],
  },
  {
    key: "pms",
    label: "For PMs",
    content: [
      "I think in outcomes, not just features.",
      "I ask the right questions early and understand trade-offs clearly.",
      "My goal is to reduce ambiguity and help teams move forward with confidence."
    ],
  },
  {
    key: "developers",
    label: "For Developers",
    content: [
      "I value clean architecture, readable code, and predictable systems.",
      "I enjoy building things that are easy to reason about, extend, and maintain.",
      "Good abstractions and shared ownership matter to me."
    ],
  },
];

export default function AudienceSwitcher() {
  const [active, setActive] = useState(AUDIENCES[0]);

  return (
    <section className="relative mt-12">
      <div className="max-w-5xl mx-auto px-6">

        {/* Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {AUDIENCES.map((item) => (
            <button
              key={item.key}
              onMouseEnter={() => setActive(item)}
              onClick={() => setActive(item)}
              className={`px-6 py-2 rounded-full transition-all duration-300
                ${
                  active.key === item.key
                    ? "bg-orange-500/15 text-orange-400 border border-orange-400/30"
                    : "bg-white/5 text-white/70 hover:text-white border border-white/20"
                }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <div className="glass-card p-8 rounded-3xl max-w-3xl mx-auto">
                <div className="space-y-3">
                  {active.content.map((line, i) => (
                    <p
                      key={i}
                      className="justified text-white/85 text-lg leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
