import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import iphoneFrame from "../../assets/644645cfb354cb60be6900a5_iPhone14-space-black.svg";

import scrCalendar from "../../assets/light_theme_app/calendar_page.png";
import scrPlan from "../../assets/light_theme_app/plan_page.png";
import scrSuggested from "../../assets/light_theme_app/suggested_days.png";
import scrCycle from "../../assets/light_theme_app/cycle_page.png";
import scrFastDetailMonday from "../../assets/light_theme_app/fast_detail_monday.png";
import scrFasts from "../../assets/light_theme_app/fasts_all days nafelah and sunnah.png";
import scrProfile from "../../assets/light_theme_app/profile_page.png";
import scrCards from "../../assets/light_theme_app/cards_and markers in calendar.png";
import { useLanguage } from "@/lib/i18n";

// ─── Screen data ──────────────────────────────────────────────────────────────
const screens = [
  {
    src: scrCalendar,
    title: "تقويم يربط التاريخ بحكم الصيام",
    desc: "بدّل بين الميلادي والهجري، وافتح أي يوم لترى المناسبة، حالة الصيام، الفجر والمغرب، مدة الصوم والطقس.",
    value: "قرار اليوم أمامك: هل أصوم؟ لماذا؟ وكم ستطول ساعات الصيام؟",
  },
  {
    src: scrPlan,
    title: "خطة قضاء ونافلة بالأرقام",
    desc: "حدّد هدف القضاء والنافلة، وتمرات يحسب المجموع والمتبقي وما أنجزته من الأيام التي علّمتها في التقويم.",
    value: "بدل عدّ الأيام يدويًا، تعرف كم بقي عليك وما الذي تحقّق فعلًا.",
  },
  {
    src: scrSuggested,
    title: "اقتراحات مرتبة لا عشوائية",
    desc: "القضاء يُرتّب حسب طول النهار والطقس حتى رمضان القادم، والنافلة تقدّم الأيام السنية أولًا ثم أسهل الأيام.",
    value: "كل بطاقة تشرح سبب الترشيح: المناسبة، ساعات الصوم، الحرارة، ونسبة الراحة.",
  },
  {
    src: scrCycle,
    title: "متابعة الدورة والحمل والنفاس",
    desc: "تسجّلين بداية الدورة أو الحمل أو النفاس، فيتضح إن كان الصيام مناسبًا اليوم، وتظهر تفاصيل الدورة نفسها: طولها، مدة الحيض، وموعدها القادم.",
    value: "الأيام غير المناسبة تُحجب من الاقتراحات، وأيام رمضان الفائتة تُضاف للقضاء عند اللزوم.",
  },
  {
    src: scrFastDetailMonday,
    title: "تفاصيل لكل مناسبة صيام",
    desc: "لكل مناسبة صفحة توضّح سبب الصيام، تفاصيل التاريخ والمدة والنوع، مع إمكانية تفعيل تذكير خاص بها.",
    value: "عرفة، الاثنين والخميس، شوال، الأيام البيض وغيرها تظهر كفرص صيام مشروحة وليست مجرد أسماء.",
  },
  {
    src: scrFasts,
    title: "كل أنواع الصيام في مكان واحد",
    desc: "تتنقل بين الكل والفرض والسنة، وتفتح بطاقة المناسبة لتفاصيل التاريخ والمدة والتنبيه.",
    value: "القضاء، رمضان، شوال، الأيام البيض، والاثنين والخميس مرتبة بدون بحث منفصل.",
  },
  {
    src: scrProfile,
    title: "إعدادات تؤثر على الحساب",
    desc: "تضبط طريقة الحساب والمدينة والجنس، وتفعّل ميزة الدورة عند الحاجة ليبقى التقويم والتنبيهات مناسبين لك.",
    value: "ليست صفحة شكلية: هذه الاختيارات تغيّر أوقات الصلاة، الطقس، والحالات التي تظهر في الخطة.",
  },
  {
    src: scrCards,
    title: "علامات التقويم تشرح السبب",
    desc: "ترى معنى كل لون ونقطة: ممنوع أو مكروه، طقس جيد، يوم قصير، صمت هذا اليوم، ودورة متوقعة أو حيض/نفاس.",
    value: "لا يظهر الحكم كرمز غامض؛ كل علامة لها شرح داخل الشاشة.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// ─── iPhone component ─────────────────────────────────────────────────────────
// SVG viewBox 439×892 — screen insets: 5.24% sides, 2.24% top/bottom, rx 9%
function IPhone({ src }: { src: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "439 / 892" }}>
      <div
        className="absolute overflow-hidden"
        style={{
          left: "5.24%", top: "2.24%",
          right: "5.24%", bottom: "2.24%",
          borderRadius: "9%",
        }}
      >
        {/* Layer 1 — back screenshot: normal position */}
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={`bg-${src}`}
            src={src}
            alt=""
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.56, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-top select-none"
            style={{ clipPath: "inset(0 0 99.1% 0)" }}
          />
        </AnimatePresence>

        {/* Layer 2 — front screenshot: same size, shifted down so its camera shows below the mockup notch */}
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={`fg-${src}`}
            src={src}
            alt=""
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.56, ease: "easeInOut" }}
            className="absolute w-full h-full object-cover object-top select-none"
            style={{ top: ".9%" }}
          />
        </AnimatePresence>
      </div>

      {/* SVG frame overlay */}
      <img
        src={iphoneFrame}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Screenshots() {
  const { dir, language, t } = useLanguage();
  const localizedScreens = t.screenshots.screens.map((screen, index) => ({
    ...screen,
    src: screens[index]?.src ?? scrCalendar,
  }));
  const screenCount = localizedScreens.length;
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeProgress = screenCount > 1 ? active / (screenCount - 1) : 0;
  const phoneScale = 1 + activeProgress * 0.22;

  // Desktop sticky viewport is driven by hidden scroll steps.
  useEffect(() => {
    let syncFrame = 0;

    const syncActiveFromScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActive(closestIndex);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) return;
          setActive(index);
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    syncFrame = window.requestAnimationFrame(syncActiveFromScroll);

    return () => {
      if (syncFrame) window.cancelAnimationFrame(syncFrame);
      observer.disconnect();
    };
  }, [dir, screenCount]);

  return (
    <section
      id="screenshots"
      className="relative flex justify-center"
      style={{
        background: "#FFFFFF",
        width: "100%",
        paddingTop: 120,
        paddingBottom: 120,
        paddingLeft: "clamp(18px, 5.5vw, 80px)",
        paddingRight: "clamp(18px, 5.5vw, 80px)",
      }}
    >
      {/* Top melt from white */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-white to-transparent z-10" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,123,75,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto" style={{ maxWidth: 1320, width: "100%" }}>

        {/* ── Heading ── */}
        <motion.div
          dir={dir}
          initial={{ opacity: 0, y: 64, scale: 0.96, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.98, ease }}
          className="pt-10 pb-16 md:pb-14"
          style={{ paddingTop: 0 }}
        >
          <div
            style={{
              width: "min(100%, 1040px)",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              className="font-heading mb-5"
              style={{
                display: "inline-block",
                borderRadius: 999,
                padding: "6px 18px",
                fontSize: "0.85rem",
                fontWeight: 600,
                background: "rgba(124,61,42,0.08)",
                color: "#7C3D2A",
                letterSpacing: "0.02em",
              }}
            >
              {t.screenshots.badge}
            </span>

            <h2
              className="font-heading 2xl:whitespace-nowrap"
              style={{
                fontWeight: 700,
                fontSize: "clamp(2.1rem, 3.8vw, 3.25rem)",
                color: "#1C0D04",
                lineHeight: 1.15,
                marginBottom: "0.7rem",
              }}
            >
              {t.screenshots.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.98rem, 1.4vw, 1.1rem)",
                color: "#8B6E52",
                lineHeight: 1.85,
              }}
            >
              {t.screenshots.body}
            </p>
          </div>
        </motion.div>

        {/* ── Tablet + Desktop: sticky scroll animation (md+) ── */}
        <div className="hidden md:block" style={{ marginTop: 12, position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            {/* ── Tablet viewport: 2-col, phone right / text left (md to 2xl) ── */}
            <div
              className="2xl:hidden w-full"
              style={{ maxWidth: 900, margin: "0 auto" }}
            >
              <div
                className="flex items-center gap-14"
                dir={dir}
                style={{ width: "100%" }}
              >
                {/* Phone — visual right in RTL flex */}
                <div style={{ width: 260, flexShrink: 0 }}>
                  <motion.div
                    animate={{ scale: phoneScale }}
                    transition={{ scale: { duration: 0.62, ease } }}
                    style={{
                      filter: "drop-shadow(0 28px 44px rgba(124,61,42,0.17))",
                      transformOrigin: "center center",
                    }}
                  >
                    <IPhone src={localizedScreens[active].src} />
                  </motion.div>
                </div>

                {/* Text — visual left in RTL flex */}
                <div style={{ flex: 1, perspective: 1600 }}>
                  <motion.div
                    key={`tablet-text-${language}-${active}`}
                    initial={{ opacity: 0, y: -44, rotateX: -88, scale: 0.92, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.72, ease }}
                    dir={dir}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className="mb-4 font-heading text-xs font-semibold tracking-[0.25em]"
                      style={{ color: "#B88C68" }}
                    >
                      {String(active + 1).padStart(2, "0")}
                    </div>
                    <h3
                      className="font-heading"
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                        color: "#1C0D04",
                        lineHeight: 1.3,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {localizedScreens[active].title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.98rem",
                        color: "#7D6149",
                        lineHeight: 1.82,
                        marginBottom: "1rem",
                      }}
                    >
                      {localizedScreens[active].desc}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.92rem",
                        color: "#7C3D2A",
                        lineHeight: 1.75,
                        borderRight: "3px solid #B86C46",
                        paddingRight: "0.9rem",
                      }}
                    >
                      {localizedScreens[active].value}
                    </p>
                    <div
                      className="mt-5 h-[2px] rounded-full"
                      style={{ width: 42, background: "#B86C46" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── Desktop viewport: original 3-col (2xl+) ── */}
            <div
              className="hidden 2xl:block relative w-full"
              style={{ maxWidth: 1220, margin: "0 auto", minHeight: 620 }}
            >
              <div
                className="grid items-center"
                style={{
                  width: "100%",
                  gridTemplateColumns: "330px 390px 330px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 72,
                }}
              >
                {/* Left screen details panel */}
                <div className="flex justify-center" style={{ gridColumn: 1, perspective: 1600 }}>
                  <motion.div
                    key={`left-${language}-${active}`}
                    initial={{ opacity: 0, y: -44, rotateX: -88, scale: 0.92, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.72, ease }}
                    dir={dir}
                    className="w-full rounded-xl px-7 py-6"
                    style={{
                      background: "transparent",
                      minHeight: 260,
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="mb-4 font-heading text-xs font-semibold tracking-[0.25em]" style={{ color: "#B88C68" }}>
                      {String(active + 1).padStart(2, "0")}
                    </div>
                    <h3
                      className="font-heading"
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(1.35rem, 1.7vw, 1.7rem)",
                        color: "#1C0D04",
                        lineHeight: 1.3,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {localizedScreens[active].title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.98rem",
                        color: "#7D6149",
                        lineHeight: 1.82,
                      }}
                    >
                      {localizedScreens[active].desc}
                    </p>
                    <div className="mt-5 h-[2px] rounded-full" style={{ width: 42, background: "#B86C46" }} />
                  </motion.div>
                </div>

                {/* Center phone */}
                <div style={{ gridColumn: 2, width: 390, justifySelf: "center", paddingTop: 72 }}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 42,
                      scale: 0.94,
                      filter: "blur(10px) drop-shadow(0 36px 56px rgba(124,61,42,0.17))",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: phoneScale,
                      filter: "blur(0px) drop-shadow(0 36px 56px rgba(124,61,42,0.17))",
                    }}
                    transition={{
                      opacity: { duration: 0.46, ease },
                      y: { duration: 0.62, ease },
                      scale: { duration: 0.62, ease },
                      filter: { duration: 0.5, ease },
                    }}
                    style={{
                      transformOrigin: "center center",
                    }}
                  >
                    <IPhone src={localizedScreens[active].src} />
                  </motion.div>
                </div>

                {/* Right benefit panel */}
                <div className="flex justify-center" style={{ gridColumn: 3, perspective: 1600 }}>
                  <motion.div
                    key={`right-${language}-${active}`}
                    initial={{ opacity: 0, y: -44, rotateX: -88, scale: 0.92, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.72, ease }}
                    dir={dir}
                    className="w-full rounded-xl px-7 py-6"
                    style={{
                      background: "transparent",
                      minHeight: 260,
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className="font-heading mb-4"
                      style={{
                        display: "inline-block",
                        borderRadius: 999,
                        padding: "6px 18px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        background: "rgba(124,61,42,0.08)",
                        color: "#7C3D2A",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {t.screenshots.benefitLabel}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.98rem",
                        color: "#6F533D",
                        lineHeight: 1.85,
                        marginBottom: "1.1rem",
                      }}
                    >
                      {localizedScreens[active].value}
                    </p>
                    <div
                      className="h-[2px] rounded-full"
                      style={{ width: 56, background: "#B86C46" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Shared scroll steps — drive active index for both tablet and desktop */}
          <div style={{ position: "relative", zIndex: 1 }} aria-hidden="true">
            {localizedScreens.map((screen, i) => (
              <div
                key={`step-${screen.src}`}
                ref={(el) => { stepRefs.current[i] = el; }}
                data-index={i}
                style={{ height: "88vh" }}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile only: static stacked cards (< md) ── */}
        <div className="md:hidden space-y-16 pb-24" dir={dir}>
          {localizedScreens.map((screen, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 86, scale: 0.9, rotate: -2, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.88, ease }}
              className="flex flex-col items-center gap-8"
            >
              <div
                className="w-[200px]"
                style={{ filter: "drop-shadow(0 24px 36px rgba(124,61,42,0.14))" }}
              >
                <IPhone src={screen.src} />
              </div>
              <div className="text-center w-full">
                <div
                  className="mb-3 font-heading text-xs font-semibold tracking-widest"
                  style={{ color: "#7C3D2A" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#1C0D04",
                    marginBottom: "0.75rem",
                  }}
                >
                  {screen.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "#8B6E52",
                    lineHeight: 1.85,
                  }}
                >
                  {screen.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom melt to white */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
