import { useRef, useState } from "react";
import { AnimatePresence, motion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

function useTooltipVisibility() {
  const [open, setOpen] = useState(false);
  return {
    open,
    handlers: {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    },
  };
}

/* ── Tooltip ───────────────────────────────────────────────────── */

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode | string;
  className?: string;
  side?: "top" | "bottom";
}

export function Tooltip({ children, content, className, side = "top" }: TooltipProps) {
  const { open, handlers } = useTooltipVisibility();

  return (
    <span className="relative inline-block" {...handlers}>
      <span className="cursor-default">{children}</span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: side === "top" ? 8 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: side === "top" ? 8 : -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 pointer-events-none left-1/2 -translate-x-1/2",
              side === "top" ? "bottom-full mb-3" : "top-full mt-3",
              "min-w-[220px] max-w-[280px]",
              "bg-surface-alt border border-secondary/25 rounded-2xl",
              "shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-4",
              className
            )}
          >
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-3 h-3",
                "bg-surface-alt border border-secondary/25 rotate-45",
                side === "top"
                  ? "bottom-[-7px] border-t-0 border-l-0"
                  : "top-[-7px] border-b-0 border-r-0"
              )}
            />
            {typeof content === "string"
              ? <p className="text-sm text-muted leading-relaxed">{content}</p>
              : content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ── AudienceTooltipCard ───────────────────────────────────────── */

interface AudienceTooltipCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export function AudienceTooltipCard({ icon, title, description, highlight = false }: AudienceTooltipCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("flex items-center gap-2 mb-1", highlight ? "text-accent" : "text-secondary")}>
        <span className="w-5 h-5">{icon}</span>
        <span className={cn("text-sm font-semibold", highlight ? "text-accent" : "text-cream")}>
          {title}
        </span>
      </div>
      <p className="text-xs text-muted leading-relaxed">{description}</p>
      {highlight && (
        <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      )}
    </div>
  );
}

/* ── MagneticTooltip ───────────────────────────────────────────── */

interface MagneticTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function MagneticTooltip({ children, content }: MagneticTooltipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { open, handlers } = useTooltipVisibility();

  const x = useSpring(0, { stiffness: 180, damping: 18 });
  const tooltipX = useTransform(x, (v) => `calc(-50% + ${v * 0.3}px)`);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
  };

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={() => { handlers.onMouseLeave(); x.set(0); }}
      onMouseMove={onMouseMove}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            style={{ x: tooltipX }}
            className={cn(
              "absolute z-50 pointer-events-none bottom-full mb-3 left-1/2",
              "bg-surface-alt border border-secondary/25 rounded-2xl",
              "shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-4 min-w-[220px] max-w-[280px]"
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
