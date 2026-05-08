import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);

  const visibleRef  = useRef(false);
  const hoveringRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.15 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visibleRef.current) { visibleRef.current = true; setVisible(true); }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const next =
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") !== null ||
        t.closest("button") !== null ||
        t.getAttribute("role") === "button";
      if (next !== hoveringRef.current) { hoveringRef.current = next; setHovering(next); }
    };

    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    const onEnter = () => { visibleRef.current = true;  setVisible(true);  };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ width: hovering ? 0 : 6, height: hovering ? 0 : 6, opacity: hovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-accent"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:           hovering ? 48 : 32,
            height:          hovering ? 48 : 32,
            backgroundColor: hovering ? "rgba(201,123,75,0.15)" : "transparent",
            borderColor:     hovering ? "#C97B4B" : "rgba(244,201,126,0.35)",
            borderWidth:     hovering ? 2 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-full border"
          style={{
            boxShadow: hovering
              ? "0 0 16px rgba(201,123,75,0.4), 0 0 32px rgba(201,123,75,0.15)"
              : "none",
          }}
        />
      </motion.div>
    </>
  );
}
