import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import SidebarMenu from "./SidebarMenu";

const navLinks = [
  { 
    name: "About", 
    href: "#about",
    description: "Learn more about my background and journey"
  },
  { 
    name: "Skills", 
    href: "#skills",
    description: "Explore my technical expertise and capabilities"
  },
  { 
    name: "Projects", 
    href: "#projects",
    description: "View my portfolio of work and achievements"
  },
  { 
    name: "Experience", 
    href: "#experience",
    description: "Discover my professional experience and milestones"
  },
  { 
    name: "Contact", 
    href: "#contact",
    description: "Get in touch and connect with me"
  },
  { 
    name: "Hire Me", 
    href: "#hire-me", 
    isButton: true,
    description: "Let's work together on your next project"
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { playClickSound, playHoverSound, playSuccessSound } = useSoundEffects();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.98)"]
  );
  
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

  useEffect(() => {
    // Track if user has scrolled
    const handleUserScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        // Clear active section when scrolling back to top
        setActiveSection("");
      }
    };

    // Use Intersection Observer for reliable detection
    const observerOptions = {
      root: null,
      rootMargin: '-20%',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          const sectionId = entry.target.id;
          console.log('Intersection Observer detected:', sectionId, 'ratio:', entry.intersectionRatio);
          console.log('Setting active section to:', sectionId);
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections
    const observeSections = () => {
      navLinks.forEach(link => {
        const element = document.getElementById(link.href.replace("#", ""));
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Initial observation
    observeSections();
    
    // Re-observe after a short delay to catch dynamically loaded elements
    setTimeout(observeSections, 100);

    window.addEventListener("scroll", handleUserScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleUserScroll);
    };
  }, [hasScrolled]);

  const scrollToSection = (href: string) => {
  if (href === "#hire-me") {
    // Open email client with pre-filled message
    const email = "gagan@example.com"; // Replace with your actual email
    const subject = "Hiring Inquiry - Portfolio Contact";
    const body = `Hi Gagan,

I came across your portfolio and I'm interested in discussing a potential opportunity.

[Please share your project details, timeline, and budget here]

Looking forward to hearing from you!

Best regards`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    playSuccessSound(); // Play success sound for email action
  } else {
    const element = document.querySelector(href);
    if (element) {
      // Instant scroll for navigation - feels premium and responsive
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'auto' // Instant scroll instead of smooth
      });
      playClickSound(); // Play click sound for navigation
    }
  }
  setIsOpen(false);
};

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            setIsSidebarOpen(!isSidebarOpen);
            playClickSound();
          }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={playHoverSound}
          className="font-serif text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent cursor-pointer tracking-wide"
          style={{
            textShadow: "0 0 30px rgba(255,140,60,0.3)",
          }}
        >
          SHIVARAJ N KENGANNAVAR
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              whileHover={{ y: -4, scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHoverSound}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative font-sans text-sm font-semibold transition-all duration-300 ${
                link.isButton
                  ? "px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40"
                  : activeSection === link.href.replace("#", "")
                  ? "text-orange-400"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                boxShadow: link.isButton ? "0 8px 32px rgba(255,140,60,0.4)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!link.isButton) {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(255,140,60,0.3)";
                  e.currentTarget.style.textShadow = "0 0 20px rgba(255,140,60,0.6)";
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,140,60,0.15), rgba(255,140,60,0.08))";
                  e.currentTarget.style.borderRadius = "12px";
                  e.currentTarget.style.padding = "8px 20px";
                  e.currentTarget.style.transform = "scale(1.12)";
                  e.currentTarget.style.transition = "all 0.3s ease-out";
                  e.currentTarget.style.border = "1px solid rgba(255,140,60,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!link.isButton) {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.textShadow = "none";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderRadius = "0";
                  e.currentTarget.style.padding = "0";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.border = "none";
                }
              }}
            >
              {link.name}
              {activeSection === link.href.replace("#", "") && !link.isButton && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full"
                  style={{
                    boxShadow: "0 0 20px rgba(255,140,60,0.6)",
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(!isOpen);
            playClickSound();
          }}
          onHoverStart={playHoverSound}
          className="md:hidden w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="py-6 space-y-3">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(link.href)}
              onHoverStart={playHoverSound}
              className={`block w-full text-left font-sans font-semibold py-4 px-5 rounded-xl transition-all duration-300 ${
                link.isButton
                  ? "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-lg shadow-orange-500/25 text-center"
                  : activeSection === link.href.replace("#", "")
                  ? "text-orange-400 bg-orange-400/10"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                boxShadow: link.isButton ? "0 8px 32px rgba(255,140,60,0.4)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!link.isButton) {
                  e.currentTarget.style.boxShadow = "0 0 25px rgba(255,140,60,0.25)";
                  e.currentTarget.style.textShadow = "0 0 15px rgba(255,140,60,0.4)";
                  e.currentTarget.style.background = "rgba(255,140,60,0.08)";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.transition = "all 0.3s ease-out";
                  e.currentTarget.style.border = "1px solid rgba(255,140,60,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!link.isButton) {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.textShadow = "none";
                  e.currentTarget.style.background = activeSection === link.href.replace("#", "") ? "rgba(255,140,60,0.1)" : "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.border = "none";
                }
              }}
            >
              {link.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sidebar Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isSidebarOpen ? 1 : 0,
          pointerEvents: isSidebarOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={() => {
          setIsSidebarOpen(false);
          playClickSound();
        }}
      />

      {/* Sidebar Menu */}
      <motion.div
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : -400,
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 h-full w-80 z-[70] overflow-hidden"
      >
        <SidebarMenu className="h-full" />
        
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsSidebarOpen(false);
            playClickSound();
          }}
          onHoverStart={playHoverSound}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;