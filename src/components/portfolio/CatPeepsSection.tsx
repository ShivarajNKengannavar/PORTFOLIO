import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function CatPeepsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay / pause on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full flex justify-center mt-20 mb-28 overflow-hidden">
      {/* ===== TEXT BEHIND VIDEO ===== */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-12">
        <pre
          className="
            text-orange-400
            text-[28px]
            font-sans
            leading-relaxed
            text-center
            opacity-90
            select-none
            font-medium
          "
          style={{
            textShadow:
              "0 0 30px rgba(255,140,60,0.5), 0 0 60px rgba(255,140,60,0.3)",
          }}
        >

        </pre>
      </div>

      {/* ===== AMBIENT ORANGE GLOW ===== */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div
          className="w-[900px] h-[520px] rounded-3xl blur-[90px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(255,140,60,0.45) 0%, rgba(255,140,60,0.25) 35%, transparent 70%)",
          }}
        />
      </div>

      {/* ===== VIDEO ===== */}
      <motion.video
        ref={videoRef}
        src="/textures/cat-peeps.webm"
        muted
        loop
        playsInline
        preload="metadata"
        className="
          relative
          z-10
          w-full
          max-w-[900px]
          h-auto
          rounded-3xl
          object-contain
        "
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{
          y: -6,
          boxShadow: "0 30px 80px rgba(255,140,60,0.25)",
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
