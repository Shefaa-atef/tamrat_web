import { motion } from "motion/react";
import { Calendar, Sparkles, BookOpen } from "lucide-react";
import iphoneFrame from "../../assets/644645cfb354cb60be6900a5_iPhone14-space-black.svg";
import planScreenshot from "../../assets/light_theme_app/plan_page.png";

const features = [
  { icon: Calendar, label: "تخطيط ذكي", desc: "اقتراحات مخصصة لأفضل أيام الصيام" },
  { icon: Sparkles, label: "متابعة سهلة", desc: "تتبع تقدمك وإنجازاتك بوضوح" },
  { icon: BookOpen, label: "تقويم هجري", desc: "تذكيرات دقيقة بالمناسبات الدينية" },
];

const headlineText = "رفيقك الذكي في رحلة الصيام";
const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 55, damping: 16 } as const;

export default function ValueProp() {
  return (
    <section
      id="what"
      className="relative overflow-hidden bg-white"
      style={{
        paddingTop: 120,
        paddingBottom: 140,
        paddingLeft: "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
      }}
    >
      {/* Subtle warm ambient — stays light, works on white */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "0%",
          top: "20%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,113,36,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          right: "5%",
          top: "10%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,113,36,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Grid */}
      <div
        className="relative mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] items-center"
        style={{ maxWidth: 1320, gap: "clamp(32px, 4vw, 40px)" }}
      >

        {/* TEXT */}
        <div className="order-2 md:order-1" dir="rtl" style={{ width: "100%", maxWidth: 760, justifySelf: "center" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            style={{ marginBottom: 24 }}
          >
            <span
              className="font-heading inline-flex rounded-full text-sm"
              style={{
                background: "rgba(124,61,42,0.08)",
                color: "#7C3D2A",
                padding: "8px 18px",
              }}
            >
              ما هو تطبيق تمرات؟
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-heading md:whitespace-nowrap"
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            style={{
              fontSize: "clamp(1.9rem, 3.35vw, 3.35rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#1A0800",
              marginBottom: 20,
            }}
          >
            {headlineText}
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              lineHeight: 1.95,
              color: "#4A2010",
              marginBottom: 40,
            }}
          >
            تطبيق مصمم بعناية لصيام القضاء والنوافل — نظّم أيامك، تابع
            تقدمك، وابقَ على المسار بهدوء تام.
          </motion.p>

          {/* Feature strips */}
          <div style={{ borderTop: "1px solid #EDD9C8" }}>
            {features.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.1, ease }}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 0",
                  borderBottom: "1px solid #EDD9C8",
                  cursor: "default",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 13,
                    background: "linear-gradient(135deg, #7C3D2A 0%, #C17124 100%)",
                    boxShadow: "0 4px 14px rgba(193,113,36,0.30)",
                  }}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                </motion.div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="font-heading"
                    style={{ fontWeight: 700, fontSize: "0.97rem", color: "#1A0800", marginBottom: 3 }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.84rem",
                      color: "#6B3A1F",
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </p>
                </div>

                <span
                  className="group-hover:opacity-100"
                  style={{ flexShrink: 0, color: "#C17124", fontSize: "1rem", opacity: 0, transition: "opacity 0.25s" }}
                >
                  ←
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PHONE */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.88 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.08 }}
          className="order-1 md:order-2"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div
              style={{
                width: "clamp(260px, 28vw, 360px)",
                position: "relative",
                filter:
                  "drop-shadow(0 32px 60px rgba(193,113,36,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
              }}
            >
              {/* Clipping container */}
              <div
                style={{
                  position: "absolute",
                  top: "2.24%",
                  left: "5.24%",
                  width: "89.5%",
                  height: "95.5%",
                  borderRadius: "9%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={planScreenshot}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    clipPath: "inset(0 0 99.1% 0)",
                  }}
                />
                <img
                  src={planScreenshot}
                  alt="شاشة الخطة في تمرات"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: ".9%",
                    left: 0,
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>

              {/* iPhone SVG frame */}
              <img
                src={iphoneFrame}
                alt=""
                aria-hidden="true"
                style={{ position: "relative", width: "100%", pointerEvents: "none", userSelect: "none" }}
              />
            </div>

            {/* Shadow beneath phone */}
            <div
              style={{
                width: "50%",
                height: 18,
                borderRadius: 999,
                background: "rgba(193,113,36,0.18)",
                filter: "blur(18px)",
                marginTop: 20,
              }}
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
