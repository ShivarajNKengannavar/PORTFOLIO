import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsDivider() {
  const ref = useRef(null);
  const textRef = useRef(null);

  const words = ["Living", "Rent", "Free", "in", "the", "IDE", "Since", "2022"];

  useLayoutEffect(() => {
    const section = ref.current;
    const text = textRef.current;

    if (!section || !text) return;

    // 1. Initial State: Start with FIRST word off-screen to the right
    gsap.set(text, { x: "70vw" });

    // 2. Calculate distance to center the LAST word
    // We want the total movement to be: 
    // (Start Position) + (Text Width) - (Last Word Width / 2) - (Viewport Width / 2)
    // But since we are animating 'x', we just need to move left enough.
    
    const getEndPosition = () => {
      const textWidth = text.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // We want to stop when the right edge of the text is in the middle of the screen
      // The "end" x value should place the rightmost edge at: windowWidth / 2 + (lastWordWidth / 2)
      // Simplified approximation: Move until the end of the strip is at the center
      return -(textWidth - (windowWidth / 2) - (windowWidth * 0.1)); // 0.1 buffer for the last word size
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: "+=400%",    // Increased for slower movement
        scrub: 3,         // Smooth catch-up effect
        pin: true,        // Pin the section in place
        anticipatePin: 1,
        invalidateOnRefresh: true, // Recalculate if the window resizes
      },
    });

    // 3. The Movement: Slide all the way to the left
    tl.to(text, {
      x: getEndPosition, 
      ease: "power1.out", // Slight ease out to make the "stop" feel natural
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-screen h-screen overflow-hidden bg-black flex items-center"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img
          src="/textures/grain.avif"
          alt="texture"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* TEXT CONTAINER */}
      <div className="relative z-10 w-full overflow-visible">
        <h1
          ref={textRef}
          className="
            flex 
            whitespace-nowrap 
            will-change-transform
            font-serif 
            text-white 
            text-[12vw] 
            leading-none
            tracking-tighter 
            italic 
            font-bold
            /* Standard Gap instead of large margins */
            gap-[2vw] 
          "
        >
          {words.map((word, i) => (
            <span key={i}>
              {word}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}