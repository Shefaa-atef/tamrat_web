import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroHighlightProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Full-height wrapper with a subtle dot-grid background.
 * Wrap your hero text inside this for the dot-pattern ambiance.
 */
export function HeroHighlight({
  children,
  className,
  containerClassName,
}: HeroHighlightProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full",
        containerClassName
      )}
    >
      {/* Dot grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,61,42,0.35) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Radial fade vignette over the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0A0705 80%)",
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Inline text with an animated amber underline that draws from left to right.
 * Use inside headings for emphasis.
 *
 * Example:
 * ```tsx
 * <Highlight>simple, intentional, and personal.</Highlight>
 * ```
 */
export function Highlight({ children, className }: HighlightProps) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 3px", opacity: 0.72, filter: "blur(4px)" }}
      whileInView={{ backgroundSize: "100% 3px", opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: false }}
      transition={{ duration: 1.35, ease: "easeOut", delay: 0.18 }}
      className={cn("relative inline-block pb-0.5", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, #C97B4B, #F4C97E)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
      }}
    >
      {children}
    </motion.span>
  );
}
