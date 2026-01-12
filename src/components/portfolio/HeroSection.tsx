import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import introVideo from "@/assets/video/hero-bg.webm";
import loopVideo from "@/assets/video/hero_bg.webm";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  playEntranceSoundOnce,
  initializeAudioOnInteraction,
} from "@/utils/entranceSound";
import InlineDynamicText from "@/components/ui/InlineDynamicText";
import ButtonCreativeRight from "@/components/portfolio/ButtonCreativeRight";
import ButtonHoverRight from "@/components/ui/ButtonHoverRight";

const CinematicTagline = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: [0.85, 1, 0.85],
        y: [0, -4, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="text-white/60 text-sm tracking-wide uppercase"
      style={{
        fontFamily: "Thunder-BlackLC, sans-serif",
        textShadow: "0 0 24px rgba(255,140,60,0.25)",
      }}
    >
      FULL-STACK DEVELOPER
      CRAFTING IMMERSIVE DIGITAL SYSTEMS
      <br className="hidden sm:block" />
      AT THE INTERSECTION OF ENGINEERING, DESIGN, AND INTELLIGENCE.
    </motion.p>
  );
};

export default function HeroSection() {
  const [showIntro, setShowIntro] = useState(true);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  const {
    playClickSound,
    playHoverSound,
    playSuccessSound,
  } = useSoundEffects();

  useEffect(() => {
    const introVid = introVideoRef.current;
    const loopVid = loopVideoRef.current;

    if (!introVid || !loopVid) return;

    initializeAudioOnInteraction();

    try {
      playEntranceSoundOnce();
    } catch {}

    introVid.play().catch(() => {});
    loopVid.play().catch(() => {});
    loopVid.pause();

    const handleIntroEnd = () => {
      setShowIntro(false);
      loopVid.currentTime = 0;
      loopVid.play().catch(() => {});
    };

    introVid.addEventListener("ended", handleIntroEnd);
    return () => introVid.removeEventListener("ended", handleIntroEnd);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundColor: "#000000"
      }}
    >
      {/* ================= BACKGROUND VIDEOS ================= */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Intro video */}
        <motion.video
          ref={introVideoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain opacity-90"
          animate={{ opacity: showIntro ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <source src={introVideo} type="video/webm" />
        </motion.video>

        {/* Loop video */}
        <motion.video
          ref={loopVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain opacity-90"
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <source src={loopVideo} type="video/webm" />
        </motion.video>
      </div>

      {/* ================= SOFT OVERLAY ================= */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))"
      }} />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex items-end justify-center px-6 pb-40">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orange-400 tracking-wide mb-3 text-sm uppercase"
            style={{
              fontFamily: "Thunder-BlackLC, sans-serif",
            }}
          >
            
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="
              text-white
              leading-tight
              mb-6
              text-[clamp(2.8rem,6vw,5rem)]
              uppercase
            "
            style={{
              fontFamily: "Thunder-BlackLC, sans-serif",
            }}
          >
          </motion.h1>

          {/* ===== DYNAMIC TAGLINE ===== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-6"
          >
            <InlineDynamicText />
          </motion.div>

         

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHoverSound}
              onClick={() => {
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
                playClickSound();
              }}
            >
              <ButtonHoverRight />
            </motion.div>

            <motion.a
              href="/Shivaraj_N_Kengannavar_Resume.pdf"
              download
              onHoverStart={playHoverSound}
              onClick={playSuccessSound}
            >
              <ButtonCreativeRight />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ================= BOTTOM FADE ================= */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: "linear-gradient(to top, #000000, transparent)"
      }} />
    </section>
  );
}
