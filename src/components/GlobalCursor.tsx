import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // scroll velocity → cursor scale
  const { scrollY } = useScroll();
  const lastScroll = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const render = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.18;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.18;

      const velocity = Math.min(
        Math.abs(scrollY.get() - lastScroll.current) * 0.02,
        0.6
      );
      lastScroll.current = scrollY.get();

      cursor.style.transform = `
        translate3d(${mouse.current.x - 18}px, ${mouse.current.y - 18}px, 0)
        scale(${1 + velocity})
      `;

      rafId = requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.body.style.cursor = "none";
    rafId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "auto";
    };
  }, [scrollY]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full"
      style={{
        width: 36,
        height: 36,
        background: "hsl(var(--foreground))",
        mixBlendMode: "difference",
        color: "#000",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.15em",
      }}
    />
  );
}
