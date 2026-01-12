import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsDivider() {
  const ref = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const section = ref.current;
    const text = textRef.current;

    if (!section || !text) return;

    // Initial position: Start with the beginning of the text at the right edge of the screen
    gsap.set(text, { x: "100vw" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // Increase this percentage (e.g., 600%) to make the text move SLOWER
        end: "+=500%", 
        scrub: 1, // Smoothing: higher = more "weight" to the movement
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(text, {
      // Move text to the left until its entire width has passed the screen
      // -100% moves it based on its own length, 0vw is the left edge
      x: "-100%", 
      xPercent: 0, 
      ease: "none", // CRITICAL: "none" ensures constant speed relative to scroll
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-screen h-screen overflow-hidden bg-black"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="/textures/grain.avif"
          alt="divider"
          className="w-full h-full object-cover opacity-80"
          draggable={false}
        />
      </div>

      {/* TEXT LAYER */}
      <div className="relative z-10 flex items-center h-full pointer-events-none">
        <h1
          ref={textRef}
          className="
            font-serif 
            text-white 
            /* Huge text size to match video */
            text-[12vw] 
            leading-none
            tracking-tighter
            italic
            whitespace-nowrap
            will-change-transform
          "
        >
          And Doing Things GenZ Waaaay Since 2022
        </h1>
      </div>
    </section>
  );
}