import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  color?: string;
  className?: string;
}

/**
 * Place as the FIRST child of a `relative` container.
 * Listens on the parent element (not window) — one handler per card, not one per cursor move.
 * Caches the parent's bounding rect via ResizeObserver to avoid layout reads on the hot path.
 */
export function GlowingEffect({
  spread = 200,
  glow = false,
  disabled = false,
  color = "#C97B4B",
  className,
}: GlowingEffectProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const el = glowRef.current?.parentElement;
    if (!el) return;

    let rect = el.getBoundingClientRect();
    const ro = new ResizeObserver(() => { rect = el.getBoundingClientRect(); });
    ro.observe(el);

    const onMove = (e: PointerEvent) => {
      if (!glowRef.current) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background =
        `radial-gradient(circle ${spread}px at ${x}px ${y}px, ${color}50, transparent 70%)`;
    };

    const onLeave = () => {
      if (!glowRef.current || glow) return;
      glowRef.current.style.opacity = "0";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [color, disabled, glow, spread]);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
        glow ? "opacity-40" : "opacity-0",
        className
      )}
      style={
        glow
          ? { background: `radial-gradient(circle ${spread}px at 50% 50%, ${color}40, transparent 70%)` }
          : undefined
      }
    />
  );
}
