import { Fragment, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { Bell, Sparkles, TrendingUp, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface StepItem {
  n: number;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const BRAND = "#7C3D2A";
const ease = [0.22, 1, 0.36, 1] as const;

const steps: StepItem[] = [
  {
    n: 1,
    title: "سجّل بياناتك",
    desc: "أضف أيام قضائك أو نوافلك مرة واحدة ليبدأ التطبيق معك من واقعك الحقيقي.",
    icon: UserPlus,
  },
  {
    n: 2,
    title: "احصل على خطة ذكية",
    desc: "تمرات تقترح مسارًا عمليًا يناسب وقتك وطاقتك بدل التخطيط اليدوي المرهق.",
    icon: Sparkles,
  },
  {
    n: 3,
    title: "تابع تقدمك يومًا بعد يوم",
    desc: "كل صيام تسجله يتحول إلى تقدّم واضح يحفزك أن تكمل بثبات واطمئنان.",
    icon: TrendingUp,
  },
  {
    n: 4,
    title: "استمر بتذكيرات لطيفة",
    desc: "تنبيهات هادئة تبقيك على المسار حتى تُكمل آخر يوم في خطتك بإذن الله.",
    icon: Bell,
  },
];

/* ── Horizontal animated connector line ── */
function HLine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      style={{
        flex: 1,
        height: 3,
        background: "rgba(124,61,42,0.12)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        alignSelf: "center",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to left, #7C3D2A, #A05438)",
          transformOrigin: "right",
          scaleX: progress,
        }}
      />
    </div>
  );
}

/* ── Numbered circle ── */
function StepCircle({ n, active }: { n: number; active: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid rgba(124,61,42,0.18)",
          background: "rgba(124,61,42,0.05)",
        }}
      />
      {/* active fill */}
      <motion.div
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.45 }}
        transition={{ duration: 0.55, ease }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3D2A, #A05438)",
          boxShadow: "0 6px 22px rgba(124,61,42,0.45)",
        }}
      />
      {/* label */}
      <motion.span
        animate={{ color: active ? "#fff" : BRAND }}
        transition={{ duration: 0.4 }}
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: "1.05rem",
          letterSpacing: "-0.01em",
        }}
      >
        {String(n).padStart(2, "0")}
      </motion.span>
    </div>
  );
}

/* ── Step card ── */
function StepCard({
  step,
  active,
  isCurrent,
}: {
  step: StepItem;
  active: boolean;
  isCurrent: boolean;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.18,
        y: active ? 0 : 34,
        scale: active ? 1 : 0.92,
        filter: active ? "blur(0px)" : "blur(2px)",
      }}
      transition={{ duration: 0.72, ease }}
      style={{
        background: isCurrent ? "rgba(124,61,42,0.045)" : "transparent",
        border: `1.5px solid ${active ? "rgba(124,61,42,0.18)" : "rgba(124,61,42,0.07)"}`,
        borderRadius: 22,
        padding: "22px 18px",
        textAlign: "right",
        transition: "background 0.5s, border-color 0.5s",
      }}
    >
      {/* icon box */}
      <div style={{ position: "relative", width: 46, height: 46, marginBottom: 14 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: "rgba(124,61,42,0.08)",
          }}
        />
        <motion.div
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: "linear-gradient(135deg, #7C3D2A, #A05438)",
            boxShadow: "0 4px 14px rgba(124,61,42,0.38)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ color: active ? "#fff" : BRAND }}
            transition={{ duration: 0.4 }}
          >
            <Icon size={20} strokeWidth={1.75} />
          </motion.div>
        </div>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "clamp(0.88rem, 1.35vw, 1.06rem)",
          color: "#1C0D04",
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
          color: "#8B6E52",
          lineHeight: 1.85,
          margin: 0,
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

/* ── Shared section header ── */
function SectionHeader({
  compact = false,
  badge,
  title,
  body,
  dir,
  textAlign,
}: {
  compact?: boolean;
  badge: string;
  title: string;
  body: string;
  dir: "rtl" | "ltr";
  textAlign: "right" | "left";
}) {
  return (
    <div dir={dir} style={{ textAlign, marginBottom: compact ? 26 : 48 }}>
      <span
        style={{
          background: "rgba(124,61,42,0.08)",
          color: BRAND,
          padding: compact ? "7px 14px" : "8px 18px",
          borderRadius: compact ? 8 : 999,
          fontSize: compact ? "0.8rem" : "0.88rem",
          fontWeight: 600,
          fontFamily: "var(--font-heading)",
          display: "inline-block",
          marginBottom: compact ? 12 : 16,
        }}
      >
        {badge}
      </span>
      <h2
        style={{
          color: "#1C0D04",
          fontWeight: 700,
          fontSize: compact ? "1.62rem" : "clamp(1.9rem, 3.5vw, 3rem)",
          lineHeight: compact ? 1.22 : 1.15,
          margin: "0 0 10px",
          fontFamily: "var(--font-heading)",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "#8B6E52",
          fontSize: compact ? "0.92rem" : "clamp(0.95rem, 1.6vw, 1.1rem)",
          lineHeight: compact ? 1.75 : 1.7,
          fontFamily: "var(--font-body)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main section
══════════════════════════════════════════ */
export default function HowItWorks() {
  const { dir, isArabic, t } = useLanguage();
  const localizedSteps = t.howItWorks.steps.map((step, index) => ({
    ...step,
    icon: steps[index].icon,
  }));
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Connector line fill progress (0 → 1) between each pair of steps
  const line1 = useTransform(scrollYProgress, [0.08, 0.30], [0, 1]);
  const line2 = useTransform(scrollYProgress, [0.38, 0.58], [0, 1]);
  const line3 = useTransform(scrollYProgress, [0.67, 0.87], [0, 1]);
  const lineValues = [line1, line2, line3];

  // Drive which step is "active" from scroll position (reversible)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.06) setActiveStep(-1);
    else if (v < 0.33) setActiveStep(0);
    else if (v < 0.61) setActiveStep(1);
    else if (v < 0.89) setActiveStep(2);
    else setActiveStep(3);
  });

  return (
    <div id="how-it-works">
      {/* ════════════ DESKTOP ════════════ */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: "300vh" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(32px, 6vw, 100px)",
          }}
        >
          <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>
            <SectionHeader
              badge={t.howItWorks.badge}
              title={t.howItWorks.title}
              body={t.howItWorks.body}
              dir={dir}
              textAlign={isArabic ? "right" : "left"}
            />

            {/* Step circles + connectors */}
            <div
              dir={dir}
              style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
            >
              {localizedSteps.map((step, i) => (
                <Fragment key={step.n}>
                  <StepCircle n={step.n} active={i <= activeStep} />
                  {i < steps.length - 1 && <HLine progress={lineValues[i]} />}
                </Fragment>
              ))}
            </div>

            {/* Step cards */}
            <div
              dir={dir}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
              }}
            >
              {localizedSteps.map((step, i) => (
                <StepCard
                  key={step.n}
                  step={step}
                  active={i <= activeStep}
                  isCurrent={i === activeStep}
                />
              ))}
            </div>

            {/* Subtle scroll hint */}
            <motion.p
              animate={{ opacity: activeStep < 0 || activeStep === 3 ? 0 : 0.45 }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: "center",
                marginTop: 40,
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: BRAND,
                letterSpacing: "0.06em",
              }}
            >
              {t.howItWorks.scrollHint}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ════════════ MOBILE ════════════ */}
      <div
        className="md:hidden"
        style={{
          background: "#fff",
          padding: "64px clamp(18px, 5vw, 28px) 72px",
        }}
      >
        <div dir={dir} style={{ maxWidth: 460, margin: "0 auto" }}>
          <SectionHeader
            compact
            badge={t.howItWorks.badge}
            title={t.howItWorks.title}
            body={t.howItWorks.body}
            dir={dir}
            textAlign={isArabic ? "right" : "left"}
          />

          <div style={{ display: "grid", gap: 12 }}>
            {localizedSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.n}
                  initial={{ opacity: 0, y: 64, x: 18, scale: 0.94, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: false, margin: "-45px" }}
                  transition={{ duration: 0.74, delay: i * 0.07, ease }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "42px minmax(0, 1fr)",
                    gap: 12,
                    alignItems: "start",
                    border: "1px solid #E8D9C9",
                    borderRadius: 8,
                    background: i === 0 ? "#FFFCF8" : "#FFFFFF",
                    boxShadow: "0 10px 24px rgba(46,25,13,0.07)",
                    padding: "14px 12px",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #7C3D2A, #A05438)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 15px rgba(124,61,42,0.24)",
                    }}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <div style={{ minWidth: 0, textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <h3
                        style={{
                          color: "#1C0D04",
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.02rem",
                          fontWeight: 800,
                          lineHeight: 1.45,
                          margin: 0,
                        }}
                      >
                        {step.title}
                      </h3>

                      <span
                        style={{
                          flexShrink: 0,
                          color: BRAND,
                          background: "rgba(124,61,42,0.08)",
                          border: "1px solid rgba(124,61,42,0.10)",
                          borderRadius: 8,
                          fontFamily: "var(--font-heading)",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          padding: "3px 7px",
                        }}
                      >
                        {String(step.n).padStart(2, "0")}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "#8B6E52",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.86rem",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.92, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.68, ease }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 18,
            }}
          >
            {localizedSteps.map((step) => (
              <span
                key={step.n}
                style={{
                  width: step.n === 1 ? 24 : 8,
                  height: 8,
                  borderRadius: 8,
                  background: step.n === 1 ? BRAND : "#DECBB8",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
