import { motion } from "motion/react";
import appStoreUrl from "../../assets/65144f8ecf9d72aa76b2238b_app-app-store.svg";
import googlePlayUrl from "../../assets/65144f926f1e360eb8835962_app-google-play.svg";
import logoUrl from "../../assets/main/logo circle.svg";
import { APP_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Download() {
  const { dir, t } = useLanguage();

  return (
    <section
      id="download"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FDFAF6",
        padding: "140px clamp(24px, 5vw, 80px) 140px",
        textAlign: "center",
      }}
    >
      {/* Soft radial warm glow in center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,108,70,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top separator line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100%, 960px)",
          height: 1,
          background: "linear-gradient(to right, transparent, #DDD5C4, transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Logo */}
        <motion.img
          src={logoUrl}
          alt={t.download.logoAlt}
          initial={{ opacity: 0, y: 26, scale: 0.58, rotate: -12, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.82, ease }}
          style={{ width: 72, height: 72, marginBottom: 28 }}
        />

        {/* Heading */}
        <motion.h2
          className="font-heading"
          dir={dir}
          initial={{ opacity: 0, y: 68, scale: 0.94, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.95, ease, delay: 0.08 }}
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
            fontWeight: 700,
            color: "#1C0D04",
            lineHeight: 1.18,
            marginBottom: 18,
          }}
        >
          {t.download.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          dir={dir}
          initial={{ opacity: 0, y: 44, scale: 0.97, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.82, ease, delay: 0.18 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "#8B6E52",
            lineHeight: 1.85,
            marginBottom: 48,
            maxWidth: 420,
          }}
        >
          {t.download.body}
        </motion.p>

        {/* Store badges — no cards, just logos */}
        <motion.div
          initial={{ opacity: 0, y: 42, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.78, ease, delay: 0.28 }}
          style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href={APP_LINKS.appStore}
            whileHover={{ y: -4, opacity: 0.85 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label={t.download.appStoreLabel}
            style={{ display: "block" }}
          >
            <img src={appStoreUrl} alt="App Store" style={{ height: 52, width: "auto" }} />
          </motion.a>

          <motion.a
            href={APP_LINKS.playStore}
            whileHover={{ y: -4, opacity: 0.85 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label={t.download.playStoreLabel}
            style={{ display: "block" }}
          >
            <img src={googlePlayUrl} alt="Google Play" style={{ height: 52, width: "auto" }} />
          </motion.a>
        </motion.div>

        {/* Coming soon */}
        <motion.p
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.66, delay: 0.38 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "#C4A98A",
            letterSpacing: "0.05em",
            marginTop: 22,
          }}
        >
          {t.download.availability}
        </motion.p>
      </div>
    </section>
  );
}
