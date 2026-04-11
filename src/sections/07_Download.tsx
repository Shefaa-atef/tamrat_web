import { motion } from "motion/react";
import appStoreUrl from "../../assets/65144f8ecf9d72aa76b2238b_app-app-store.svg";
import googlePlayUrl from "../../assets/65144f926f1e360eb8835962_app-google-play.svg";
import logoUrl from "../../assets/main/logo circle.svg";
import { APP_LINKS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Download() {
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
          alt="تمرات"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          style={{ width: 72, height: 72, marginBottom: 28 }}
        />

        {/* Heading */}
        <motion.h2
          className="font-heading"
          dir="rtl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
            fontWeight: 700,
            color: "#1C0D04",
            lineHeight: 1.18,
            marginBottom: 18,
          }}
        >
          حمّل تمرات وابدأ اليوم
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          dir="rtl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "#8B6E52",
            lineHeight: 1.85,
            marginBottom: 48,
            maxWidth: 420,
          }}
        >
          كل يوم تصومه يُقرّبك — ابدأ منظمًا، وابقَ على المسار.
        </motion.p>

        {/* Store badges — no cards, just logos */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.3 }}
          style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href={APP_LINKS.appStore}
            whileHover={{ y: -4, opacity: 0.85 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label="تحميل من App Store"
            style={{ display: "block" }}
          >
            <img src={appStoreUrl} alt="App Store" style={{ height: 52, width: "auto" }} />
          </motion.a>

          <motion.a
            href={APP_LINKS.playStore}
            whileHover={{ y: -4, opacity: 0.85 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label="تحميل من Google Play"
            style={{ display: "block" }}
          >
            <img src={googlePlayUrl} alt="Google Play" style={{ height: 52, width: "auto" }} />
          </motion.a>
        </motion.div>

        {/* Coming soon */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "#C4A98A",
            letterSpacing: "0.05em",
            marginTop: 22,
          }}
        >
          متوفر قريبًا على iOS و Android
        </motion.p>
      </div>
    </section>
  );
}
