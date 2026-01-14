"use client";

import { useRef, FC, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Utility for merging tailwind classes (if you don't have a utils file, you can keep this here)
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextRevealProps {
  text?: string;
  className?: string;
  children?: ReactNode;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className, children }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (text) {
    return (
      <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
        <div
          className={
            "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
          }
        >
          <p
            ref={targetRef}
            className={
              "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl"
            }
          >
            {text.match(/./g)!.map((char, i) => {
              const start = i / text.length;
              const end = start + 1 / text.length;
              return (
                <TextRevealCard
                  key={i}
                  range={[start, end]}
                  progress={scrollYProgress}
                >
                  {char}
                </TextRevealCard>
              );
            })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <p
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl"
          }
        >
          {/* @ts-ignore */}
          {children.split(" ").map((word, i) => {
            const start = i / children!.toString().split(" ").length;
            const end = start + 1 / children!.toString().split(" ").length;
            return (
              <TextRevealCard
                key={i}
                range={[start, end]}
                progress={scrollYProgress}
              >
                {word}
              </TextRevealCard>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface TextRevealCardProps {
  children: ReactNode;
  range: [number, number];
  progress: any;
}

const TextRevealCard: FC<TextRevealCardProps> = ({
  children,
  range,
  progress,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};
