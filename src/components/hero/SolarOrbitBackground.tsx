import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function SolarOrbitBackground() {
  /* ---------------- Mouse Parallax ---------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Depth layers */
  const backX = useTransform(mouseX, v => v * 0.25);
  const backY = useTransform(mouseY, v => v * 0.25);

  const midX = useTransform(mouseX, v => v * 0.5);
  const midY = useTransform(mouseY, v => v * 0.5);

  const frontX = useTransform(mouseX, v => v * 0.8);
  const frontY = useTransform(mouseY, v => v * 0.8);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-[900px] h-[900px]">

        {/* ---------------- Atmospheric glow ---------------- */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(255,120,0,0.35), transparent 65%)",
          }}
        />

        {/* ---------------- BACK ORBITS ---------------- */}
        <motion.div style={{ x: backX, y: backY }}>
          <Orbit size={780} speed={42} thickness={1} />
          <Orbit size={640} speed={34} thickness={1} />
        </motion.div>

        {/* ---------------- MID ORBITS ---------------- */}
        <motion.div style={{ x: midX, y: midY }}>
          <Orbit size={500} speed={26} thickness={1.2} />
          <Orbit size={380} speed={22} thickness={1.2} />
        </motion.div>

        {/* ---------------- FRONT ORBITS ---------------- */}
        <motion.div style={{ x: frontX, y: frontY }}>
          <Orbit size={260} speed={18} thickness={1.5} />
        </motion.div>

        {/* ---------------- SOLAR CORE ---------------- */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            boxShadow: [
              "0 0 40px rgba(255,120,0,0.6)",
              "0 0 70px rgba(255,80,0,0.8)",
              "0 0 40px rgba(255,120,0,0.6)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(circle, #ffcc80 0%, #ff7a18 55%, #ff4500 100%)",
          }}
        />
      </div>
    </div>
  );
}

/* ======================================================
   ORBIT COMPONENT (shimmer + hue drift)
====================================================== */

function Orbit({
  size,
  speed,
  thickness,
}: {
  size: number;
  speed: number;
  thickness: number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {/* Rim */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          filter: [
            "hue-rotate(0deg)",
            "hue-rotate(25deg)",
            "hue-rotate(45deg)",
            "hue-rotate(0deg)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          border: `${thickness}px solid transparent`,
          background:
            "linear-gradient(135deg, rgba(255,160,90,0.45), rgba(255,80,0,0.15)) border-box",
          WebkitMask:
            "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Heat shimmer */}
      <motion.div
        className="absolute inset-0 rounded-full blur-[2px] opacity-40"
        animate={{
          scaleX: [1, 1.02, 0.98, 1],
          scaleY: [1, 0.98, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,0,0.25), transparent 70%)",
        }}
      />
    </motion.div>
  );
}
