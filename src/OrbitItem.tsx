import { motion } from "framer-motion";
import { useMemo } from "react";

type OrbitItemProps = {
  label: string;
  slug: string;
};

export default function OrbitItem({ label, slug }: OrbitItemProps) {
  const iconSrc = useMemo(() => {
    try {
      return new URL(`../assets/skills/${slug}.svg`, import.meta.url).href;
    } catch {
      return null;
    }
  }, [slug]);

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      className="
        w-14 h-14
        rounded-full
        flex items-center justify-center
        backdrop-blur-md
        border border-orange-400/30
        bg-orange-500/10
        shadow-[0_0_25px_rgba(255,120,40,0.25)]
      "
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt={label}
          className="w-7 h-7 object-contain select-none"
          draggable={false}
        />
      ) : (
        <span className="text-xs font-medium text-orange-200">
          {label}
        </span>
      )}
    </motion.div>
  );
}
