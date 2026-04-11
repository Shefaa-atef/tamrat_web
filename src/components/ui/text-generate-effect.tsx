import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  /** Duration per word fade-in (seconds) */
  duration?: number;
  /** Stagger delay between words (seconds) */
  staggerDelay?: number;
  /** Blur each word as it fades in */
  filter?: boolean;
}

/**
 * Words fade + blur in one by one.
 * Used in: Hero headline, Download CTA headline.
 */
export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  staggerDelay = 0.12,
  filter = true,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(staggerDelay),
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("font-heading", className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-cream"
            style={{
              opacity: 0,
              filter: filter ? "blur(12px)" : "none",
              display: "inline-block",
              marginRight: "0.25em",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
