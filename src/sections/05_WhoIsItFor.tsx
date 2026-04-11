import { AnimatePresence, motion } from "motion/react";
import { Moon, Plane, Sparkles, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type WordId = "women" | "elderly" | "travelers" | "everyone";

interface WordItem {
  id: WordId;
  word: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

const words: WordItem[] = [
  {
    id: "women",
    word: "النساء",
    desc: "يساعد النساء على تسهيل قضاء أيام رمضان الفائتة بسبب حمل أو نفاس أو دورة شهرية، عن طريق اختيار أفضل أيام للقضاء من الوقت الحالي إلى رمضان القادم.",
    icon: Moon,
    color: "#D87A94",
  },
  {
    id: "elderly",
    word: "كبار السن",
    desc: "لو كنت مريضًا أو كبير سن  ستستفيد من تطبيقنا عن طريق اختيار أيام للقضاء سهلة ومريحة وقصيرة النهار.",
    icon: Heart,
    color: "#C17124",
  },
  {
    id: "travelers",
    word: "المسافرين",
    desc: "لو كنت مسافرًا يفطر رمضان في ترحاله، ستستفيد من تطبيقنا عن طريق اختيار أيام للقضاء سهلة ومريحة وقصيرة النهار.",
    icon: Plane,
    color: "#27A0D3",
  },
  {
    id: "everyone",
    word: "كل مسلم",
    desc: "تطبيقنا مفتاح لك لدخول باب الريان؛ فيه تذكيرات لكل يوم سنة صيامه. فقط حدد عدد أيام النافلة التي تريد صيامها، وضع منبهًا للأيام المقترحة. وبإمكانك وضع منبه لأي مناسبة دينية تريد سواء كانت يوم عرفة أو رمضان وغيرها من المناسبات.",
    icon: Sparkles,
    color: "#F69231",
  },
];

/* ── Pulsing dot indicator ── */
function PulseDot({ color }: { color: string }) {
  return (
    <span
      style={{
        position: "absolute",
        bottom: -10,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 6,
        height: 6,
      }}
    >
      {/* outer ping ring */}
      <motion.span
        animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
        }}
      />
      {/* solid center dot */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          opacity: 0.7,
          flexShrink: 0,
        }}
      />
    </span>
  );
}

/* ── Single interactive word ── */
function InteractiveWord({
  item,
  active,
  supportsHover,
  onEnter,
  onLeave,
  onClick,
}: {
  item: WordItem;
  active: boolean;
  supportsHover: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    /* Anchor span — only wraps the word itself, no "و" */
    <span style={{ position: "relative", display: "inline-block" }}>
      <motion.button
        type="button"
        onMouseEnter={() => supportsHover && onEnter()}
        onMouseLeave={() => supportsHover && onLeave()}
        onFocus={onEnter}
        onClick={onClick}
        aria-expanded={active}
        aria-label={`تفاصيل ${item.word}`}
        animate={{
          color: active ? item.color : "rgba(28,13,4,0.8)",
          backgroundColor: active ? `${item.color}18` : "rgba(0,0,0,0)",
        }}
        whileHover={{
          backgroundColor: `${item.color}12`,
          color: item.color,
        }}
        transition={{ duration: 0.22 }}
        style={{
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          border: "none",
          cursor: "pointer",
          padding: "2px 8px",
          borderRadius: 10,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {item.word}
      </motion.button>

      {/* Pulsing dot */}
      <PulseDot color={item.color} />

      {/* Tooltip:
          outer div  → handles position (translateX stays here, never touched by motion)
          inner motion.div → handles animation (y, scale only)                        */}
      <AnimatePresence>
        {active && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 20px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.26, ease }}
              style={{
                width: 340,
                maxWidth: "82vw",
                whiteSpace: "normal",
                wordBreak: "break-word",
                background: "rgba(255, 250, 247, 0.98)",
                border: `1.5px solid ${item.color}30`,
                borderRadius: 22,
                padding: "18px 20px",
                boxShadow: `0 20px 60px ${item.color}22, 0 4px 16px rgba(0,0,0,0.07)`,
                backdropFilter: "blur(16px)",
                textAlign: "right",
              }}
            >
              {/* icon + label row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#1C0D04",
                  }}
                >
                  {item.word}
                </span>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    flexShrink: 0,
                    boxShadow: `0 4px 12px ${item.color}44`,
                  }}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>

              {/* arrow tip pointing down */}
              <div
                style={{
                  position: "absolute",
                  bottom: -7,
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: 13,
                  height: 13,
                  background: "rgba(255,250,247,0.98)",
                  border: `1.5px solid ${item.color}30`,
                  borderTop: "none",
                  borderLeft: "none",
                }}
              />

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "0.88rem",
                  color: "#6D513B",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ══════════════════════════════════════════
   Main section
══════════════════════════════════════════ */
export default function WhoIsItFor() {
  const [active, setActive] = useState<WordId | null>(null);
  const [supportsHover, setSupportsHover] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setSupportsHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <section
      id="audience"
      style={{
        background: "#FDFAF6",
        padding: "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)",
        overflow: "visible",
        position: "relative",
      }}
    >
      {/* Soft radial warm glow in center — same language as section 07 */}
      <div aria-hidden style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(184,108,70,0.11) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Top separator line */}
      <div aria-hidden style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(100%, 960px)",
        height: 1,
        background: "linear-gradient(to right, transparent, #DDD5C4, transparent)",
      }} />
      {/* Bottom separator line */}
      <div aria-hidden style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(100%, 960px)",
        height: 1,
        background: "linear-gradient(to right, transparent, #DDD5C4, transparent)",
      }} />

      <motion.div
        ref={containerRef}
        dir="rtl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease }}
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "clamp(4px, 0.6vw, 10px)",
          rowGap: 24,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 2.6vw, 2.8rem)",
          color: "#1C0D04",
          lineHeight: 1.4,
          overflow: "visible",
        }}
      >
        <span>تمرات مخصص لـ</span>

        {words.map((item, i) => (
          <span
            key={item.id}
            style={{ display: "inline-flex", alignItems: "center", gap: "clamp(3px, 0.4vw, 6px)", whiteSpace: "nowrap" }}
          >
            {i > 0 && (
              <span style={{ color: "#C17124", fontWeight: 500 }}>و</span>
            )}
            <InteractiveWord
              item={item}
              active={active === item.id}
              supportsHover={supportsHover}
              onEnter={() => setActive(item.id)}
              onLeave={() => setActive(null)}
              onClick={() => setActive((prev) => (prev === item.id ? null : item.id))}
            />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
