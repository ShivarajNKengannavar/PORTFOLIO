import { motion } from "framer-motion";
import {
  User,
  Sparkles,
  FolderGit2,
  Briefcase,
  Mail
} from "lucide-react";

const items = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail }
];

export default function PillNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-orange-500/20 shadow-[0_0_40px_rgba(255,140,60,0.15)]">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ scale: 1, y: 0 }}
              whileHover={{ 
                scale: 1.3,
                y: -8,
                boxShadow: "0 0 20px rgba(255, 140, 60, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2
                px-4 py-2 rounded-xl
                text-sm font-medium text-white/80
                hover:text-white
                transition
                relative
                hover:shadow-[0_0_20px_rgba(255,140,60,0.3)]
                origin-bottom
              "
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              <span className="absolute inset-0 rounded-xl bg-orange-500/10 opacity-0 hover:opacity-100 transition" />
              <Icon className="w-4 h-4 text-orange-400" />
              <span className="relative">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
