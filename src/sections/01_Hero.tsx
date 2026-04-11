import Lottie from "lottie-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logoAnimation from "../../assets/tamrat.json";

export default function Hero() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    let timerId: number | undefined;

    const startHeroAnimation = () => {
      timerId = window.setTimeout(() => {
        setCanAnimate(true);
      }, 80);
    };

    if (document.readyState === "complete") {
      startHeroAnimation();
    } else {
      window.addEventListener("load", startHeroAnimation, { once: true });
    }

    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener("load", startHeroAnimation);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden md:min-h-screen"
      style={{ background: 'linear-gradient(160deg, #FEF8EE 0%, #FAF0E0 45%, #F5E8D4 100%)' }}
    >
      {/* Dot grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,61,42,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Warm amber glow — top center */}
      <div aria-hidden className="pointer-events-none absolute"
        style={{
          top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 700, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(244,201,126,0.38) 0%, rgba(201,123,75,0.18) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Secondary warm glow — bottom */}
      <div aria-hidden className="pointer-events-none absolute"
        style={{
          bottom: '5%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,61,42,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-20 grid min-h-[100svh] w-full place-items-center px-4 py-24 sm:px-6 sm:py-20 md:min-h-screen">
        <div className="flex w-full max-w-[1200px] flex-col items-center justify-center pt-6 text-center sm:pt-0 sm:-translate-y-[4vh] md:-translate-y-[8vh]">
          <motion.div
            className="pointer-events-none mb-[-4.25rem] sm:mb-[-3.75rem] md:mb-[-3.5rem]"
            initial={{ opacity: 0, y: 22, scale: 0.9, filter: "blur(10px)" }}
            animate={
              canAnimate
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: 22, scale: 0.9, filter: "blur(10px)" }
            }
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: "clamp(280px, 92vw, 1080px)",
              maxWidth: "100%",
              filter: "drop-shadow(0 18px 34px rgba(124, 61, 42, 0.12))",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <Lottie
                key={canAnimate ? "hero-lottie-play" : "hero-lottie-idle"}
                animationData={logoAnimation}
                loop={false}
                autoplay={canAnimate}
                style={{ display: "block", marginTop: "-2%", marginBottom: "-12%" }}
              />
            </div>
          </motion.div>

          <motion.p
            className="font-heading mt-0 max-w-[18ch] sm:max-w-none px-2 sm:px-0"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={
              canAnimate
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 14, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.8,
              delay: 0.52,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(1.45rem, 2.9vw, 3.15rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: "clamp(-28px, -2.4vw, -10px)",
              color: "#7C3D2A",
              letterSpacing: "0.01em",
              textShadow: "0 8px 20px rgba(124, 61, 42, 0.12)",
            }}
          >
            رفيقك الذكي لصيامٍ أسهل وثباتٍ أجمل
          </motion.p>
        </div>
      </div>
    </section>
  );
}
