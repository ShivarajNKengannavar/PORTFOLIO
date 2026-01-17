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
    const getEndPosition = () => {
      const textWidth = text.scrollWidth;
      const windowWidth = window.innerWidth;
      return -(textWidth - (windowWidth / 2) - (windowWidth * 0.1));
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: "+=400%",
        scrub: 1, // Reduced scrub for better performance
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(text, {
      x: getEndPosition, 
      ease: "power1.out",
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
      <div className="absolute inset-0 z-0 opacity-60">
        <img
          src="/textures/grain.avif"
          alt="texture"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div className="relative z-10 w-full overflow-visible">
        <h1
          ref={textRef}
          className="flex whitespace-nowrap font-serif text-white text-[12vw] leading-none tracking-tighter italic font-bold gap-[2vw]"
        >
          {words.map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </h1>
      </div>
    </section>
  );
}
