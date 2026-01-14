import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowIntensity?: "sm" | "md" | "lg";
  shadowIntensity?: "sm" | "md" | "lg";
  borderRadius?: string;
  blurIntensity?: "sm" | "md" | "lg";
  draggable?: boolean;
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className, glowIntensity = "md", shadowIntensity = "md", borderRadius = "12px", blurIntensity = "md", draggable = false, ...props }, ref) => {
    const getGlowClass = () => {
      switch (glowIntensity) {
        case "sm": return "shadow-lg";
        case "md": return "shadow-xl";
        case "lg": return "shadow-2xl";
        default: return "shadow-xl";
      }
    };

    const getBlurClass = () => {
      switch (blurIntensity) {
        case "sm": return "backdrop-blur-sm";
        case "md": return "backdrop-blur-md";
        case "lg": return "backdrop-blur-lg";
        default: return "backdrop-blur-md";
      }
    };

    const getShadowColor = () => {
      switch (shadowIntensity) {
        case "sm": return "rgba(255, 255, 255, 0.1)";
        case "md": return "rgba(255, 255, 255, 0.2)";
        case "lg": return "rgba(255, 255, 255, 0.3)";
        default: return "rgba(255, 255, 255, 0.2)";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          getGlowClass(),
          getBlurClass(),
          draggable && "cursor-move",
          className
        )}
        style={{
          borderRadius,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: `0 8px 32px ${getShadowColor()}`,
          ...props.style
        }}
        {...props}
      >
        {/* Animated gradient overlay for liquid effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 animate-pulse" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {props.children}
        </div>
      </div>
    );
  }
);

LiquidGlassCard.displayName = "LiquidGlassCard";

export { LiquidGlassCard };
