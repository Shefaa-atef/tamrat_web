import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MaskContainerProps {
  children: React.ReactNode;
  revealText?: React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}

/**
 * Circular spotlight reveal: cursor movement writes the mask style directly to the DOM
 * (no React state update per frame). Only `isHovered` triggers a re-render for the
 * background color animation.
 */
export function MaskContainer({
  children,
  revealText,
  size = 8,
  revealSize = 520,
  className,
}: MaskContainerProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const maskLayerRef  = useRef<HTMLDivElement>(null);
  const isHoveredRef  = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const writeMask = (x: number, y: number) => {
      const r = isHoveredRef.current ? revealSize : size;
      const val = `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, transparent 100%)`;
      if (!maskLayerRef.current) return;
      maskLayerRef.current.style.setProperty("-webkit-mask-image", val);
      maskLayerRef.current.style.setProperty("mask-image", val);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      writeMask(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onEnter = (e: MouseEvent) => {
      isHoveredRef.current = true;
      setIsHovered(true);
      const rect = el.getBoundingClientRect();
      writeMask(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      setIsHovered(false);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [revealSize, size]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      animate={{ backgroundColor: isHovered ? "#F5ECD7" : "#0A0705" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Mask layer — written imperatively, no per-frame re-render */}
      <div
        ref={maskLayerRef}
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{
          WebkitMaskImage: `radial-gradient(circle ${size}px at 50% 50%, black 0%, transparent 100%)`,
          maskImage:        `radial-gradient(circle ${size}px at 50% 50%, black 0%, transparent 100%)`,
        }}
      >
        <div className="text-bg pointer-events-none select-none text-center px-6">
          {revealText}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}
