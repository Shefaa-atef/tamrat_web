import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HoverItem {
  title: string;
  description: string;
  link?: string;
  icon?: React.ReactNode;
}

interface HoverEffectProps {
  items: HoverItem[];
  className?: string;
}

export function HoverEffect({ items, className }: HoverEffectProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  // useId ensures each HoverEffect grid has a unique layoutId — prevents
  // Framer Motion from animating the highlight across separate grids on the page.
  const uid = useId();

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8", className)}>
      {items.map((item, idx) => {
        const Wrapper = item.link ? "a" : "div";
        return (
          <Wrapper
            key={item.title + idx}
            {...(item.link ? { href: item.link } : {})}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <AnimatePresence>
              {hoveredIdx === idx && (
                <motion.span
                  layoutId={`hoverBg-${uid}`}
                  className="absolute inset-0 rounded-3xl bg-secondary/15 block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                />
              )}
            </AnimatePresence>

            <div
              className={cn(
                "relative z-10 rounded-2xl h-full p-6 overflow-hidden",
                "bg-surface border border-primary/20",
                "group-hover:border-secondary/40 transition-colors duration-300"
              )}
            >
              {item.icon && <div className="mb-4 text-secondary">{item.icon}</div>}
              <h4 className="font-heading text-xl text-cream font-semibold tracking-wide">
                {item.title}
              </h4>
              <p className="mt-3 text-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
