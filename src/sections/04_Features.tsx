import { motion } from "motion/react";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MoonStar,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

type FeatureId = "plan" | "track" | "calendar" | "suggestions" | "women" | "reminders";

interface FeatureItem {
  id: FeatureId;
  title: string;
  short: string;
  summary: string;
  pillars: string[];
  icon: LucideIcon;
  evidence: string;
}

const features: FeatureItem[] = [
  {
    id: "plan",
    title: "خطة القضاء والنافلة",
    short: "حدّد الهدف واترك الحساب لتمرات",
    summary: "تختار عدد أيام القضاء والنافلة، وتمرات يتابع المنجز والمتبقي تلقائيًا من الأيام التي تسجلها فعليًا.",
    pillars: ["تحديد هدف القضاء والنافلة يدويًا", "تحديث المتبقي تلقائيًا من التقويم", "مزامنة الحالة مع حسابك"],
    icon: Sparkles,
    evidence: "العدادات تُحسب من الأيام المعلّمة (قضاء/نافلة) وليس من تقدير نظري.",
  },
  {
    id: "track",
    title: "تقدم يومي واضح بلا تعقيد",
    short: "كل يوم تسجله يظهر فورًا",
    summary: "عند تعليم يومك في التقويم، تتحدث نسبة الإنجاز وعدادات القضاء والنافلة مباشرة داخل الخطة.",
    pillars: ["نسبة إنجاز من إجمالي الهدف", "عداد منفصل للقضاء والنافلة", "تعديل نوع الصيام لكل يوم"],
    icon: TrendingUp,
    evidence: "بطاقة التقدم مرتبطة مباشرة بعدد الأيام التي تحددها في التقويم.",
  },
  {
    id: "calendar",
    title: "تقويم هجري/ميلادي يوجّه قرارك",
    short: "المناسبات والأحكام في واجهة واحدة",
    summary: "التقويم يعرض المواسم السنية، الأيام الممنوعة أو المكروهة، والحالة اليومية بشكل بصري واضح وسهل.",
    pillars: ["الأيام البيض والاثنين والخميس والمواسم", "تمييز الأيام غير المناسبة للصيام", "إرشاد شرعي مرتبط بكل يوم"],
    icon: CalendarDays,
    evidence: "يوجد تبديل هجري/ميلادي مع بطاقات معلومات وعلامات يومية للحالة.",
  },
  {
    id: "suggestions",
    title: "اقتراحات صيام مبنية على معايير واضحة",
    short: "الاختيار حسب طول النهار والطقس",
    summary: "تمرات يرتّب الأيام بوزن 60٪ لطول النهار و40٪ للطقس، ويقدّم النوافل السنية أولًا قبل بقية الأيام.",
    pillars: ["القضاء حتى رمضان القادم", "النافلة: الأيام السنية أولًا", "فلترة تلقائية للأيام غير المناسبة"],
    icon: MoonStar,
    evidence: "الاقتراحات تستبعد العيد والتشريق والجمعة المنفردة والأيام المحجوبة حسب الحالة.",
  },
  {
    id: "women",
    title: "مسار نسائي متكامل",
    short: "الدورة والحمل والنفاس ضمن نفس الرحلة",
    summary: "يوثق الحيض والحمل والنفاس، ويمنع الاقتراحات في الأيام غير المناسبة، ويضبط الخطة تلقائيًا عند الحاجة.",
    pillars: ["تسجيل فعلي للدورة والحمل والنفاس", "حجب التوصيات في الأيام غير المناسبة", "إضافة قضاء رمضان تلقائيًا عند اللزوم"],
    icon: HeartHandshake,
    evidence: "أيام الحيض/النفاس في رمضان تُزامن تلقائيًا كأيام قضاء متبقية.",
  },
  {
    id: "reminders",
    title: "تنبيهات قابلة للتحكم",
    short: "قبل الفجر والمغرب وموعد الدورة",
    summary: "التنبيهات تعمل بحسب اختيارك: تذكير صيام اليوم عند الفجر، وتذكير صيام الغد بعد المغرب، مع إعدادات كتم وتشغيل دقيقة.",
    pillars: ["تذكير صيام اليوم عند الفجر", "تذكير صيام الغد بعد المغرب", "تشغيل/إيقاف عام وكتم كامل"],
    icon: Bell,
    evidence: "يمكنك تفعيل كل نوع تنبيه بشكل مستقل من الإعدادات.",
  },
];

export default function Features() {
  const { dir, t } = useLanguage();
  const localizedFeatures = t.features.items.map((feature, index) => ({
    ...feature,
    icon: features[index].icon,
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = localizedFeatures[activeIndex];
  const ActiveIcon = activeFeature.icon;
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % localizedFeatures.length);
  };
  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + localizedFeatures.length) % localizedFeatures.length);
  };
  const selectFeature = (index: number) => {
    setActiveIndex(index);
  };
  const featureAt = (index: number) =>
    localizedFeatures[(index + localizedFeatures.length) % localizedFeatures.length];
  const slides = [
    { feature: featureAt(activeIndex - 1), position: "prev" as const },
    { feature: activeFeature, position: "active" as const },
    { feature: featureAt(activeIndex + 1), position: "next" as const },
  ];

  return (
    <section
      id="features"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFFCF8 52%, #FFFFFF 100%)",
        width: "100%",
        overflow: "hidden",
        padding: "clamp(58px, 10vw, 88px) 0 clamp(64px, 11vw, 96px)",
      }}
    >
      <div dir={dir} style={{ width: "100%", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 64, scale: 0.96, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false }}
          transition={{ duration: 0.95, ease }}
          style={{
            width: "100%",
            maxWidth: 980,
            margin: "0 auto clamp(18px, 4vw, 28px)",
            paddingInline: 24,
            textAlign: "center",
          }}
        >
          <span
            className="font-heading inline-flex rounded-full text-sm"
            style={{
              background: "rgba(124,61,42,0.08)",
              color: "#7C3D2A",
              padding: "8px 18px",
              marginBottom: 18,
            }}
          >
            {t.features.badge}
          </span>
          <h2
            className="font-heading text-[1.85rem] sm:text-[2.25rem] 2xl:text-[3.25rem]"
            style={{
              color: "#1C0D04",
              fontWeight: 700,
              lineHeight: 1.14,
              margin: 0,
            }}
          >
            {t.features.title}
          </h2>
          <p
            className="mt-4 hidden 2xl:block"
            style={{
              color: "#8B6E52",
              fontFamily: "var(--font-body)",
              fontSize: "1.08rem",
              lineHeight: 1.85,
              maxWidth: 720,
              marginInline: "auto",
              marginTop: 12,
            }}
          >
            {t.features.body}
          </p>
        </motion.div>

        <div className="hidden 2xl:block" style={{ width: "100%", maxWidth: 1600, margin: "0 auto", paddingInline: "clamp(18px, 4vw, 56px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 78, scale: 0.94, rotate: -1.5, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.88, ease }}
            style={{ width: "100%", margin: "0 auto" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: 640,
                margin: "0 auto",
                paddingBlock: 12,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "24px 0 auto",
                  height: 460,
                  borderRadius: 32,
                  background:
                    "radial-gradient(circle at 50% 20%, rgba(124,61,42,0.08), transparent 58%), radial-gradient(circle at 22% 40%, rgba(169,139,120,0.10), transparent 28%), radial-gradient(circle at 78% 40%, rgba(169,139,120,0.10), transparent 28%)",
                  filter: "blur(16px)",
                  pointerEvents: "none",
                }}
              />

              <div
                className="grid items-center gap-4 grid-cols-[minmax(240px,1fr)_minmax(720px,1.45fr)_minmax(240px,1fr)] gap-6"
                style={{ position: "relative", zIndex: 1 }}
              >
                {slides.map(({ feature, position }) => {
                  const Icon = feature.icon;
                  const isActive = position === "active";

                  return (
                    <motion.article
                      key={feature.id}
                      layout
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.55,
                        scale: isActive ? 1 : 0.84,
                        y: isActive ? 0 : 18,
                        rotate: isActive ? 0 : position === "prev" ? -4 : 4,
                        filter: isActive ? "blur(0px)" : "blur(1.4px)",
                      }}
                      transition={{
                        layout: { type: "spring", stiffness: 150, damping: 24 },
                        opacity: { duration: 0.18 },
                        scale: { duration: 0.24 },
                      }}
                      onClick={() => {
                        const index = localizedFeatures.findIndex((item) => item.id === feature.id);
                        if (index !== activeIndex) {
                          selectFeature(index);
                        }
                      }}
                      className={isActive ? "mx-auto w-full" : "mx-auto w-full cursor-pointer"}
                      style={{
                        width: "100%",
                        maxWidth: isActive ? 780 : 390,
                        minHeight: isActive ? 568 : 336,
                        marginInline: "auto",
                        padding: isActive ? "68px 62px 56px" : "34px 30px 30px",
                        border: "1px solid #E5D5C3",
                        borderRadius: isActive ? 32 : 28,
                        background: "#FFFFFF",
                        boxShadow: isActive
                          ? "0 32px 70px rgba(46,25,13,0.16)"
                          : "0 18px 40px rgba(46,25,13,0.08)",
                        textAlign: "center",
                        transformOrigin: "center center",
                        position: "relative",
                        zIndex: isActive ? 3 : 1,
                      }}
                    >
                      {isActive ? (
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: 16,
                            transform: "translateX(-50%)",
                            width: 132,
                            height: 5,
                            borderRadius: 999,
                            background: "linear-gradient(90deg, rgba(124,61,42,0.2) 0%, #7C3D2A 50%, rgba(124,61,42,0.2) 100%)",
                          }}
                        />
                      ) : null}

                      <div
                        className={
                          isActive
                            ? "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3D2A] shadow-[0_12px_22px_rgba(124,61,42,0.18)]"
                            : "mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#A98B78]"
                        }
                      >
                        <Icon className={isActive ? "h-5 w-5 text-white" : "h-4 w-4 text-white"} strokeWidth={1.9} />
                      </div>

                      <p className={isActive ? "mt-8 font-heading text-sm font-bold text-[#8A6046]" : "mt-5 font-heading text-sm font-bold text-[#8A6046]"}>
                        {feature.short}
                      </p>

                      <h3
                        className={
                          isActive
                            ? "mx-auto mt-5 max-w-[580px] font-heading text-[1.55rem] font-extrabold leading-[1.4] text-[#1F0E06] md:text-[2rem]"
                            : "mx-auto mt-3 max-w-[280px] font-heading text-[1.18rem] font-extrabold leading-[1.55] text-[#1F0E06]"
                        }
                      >
                        {feature.title}
                      </h3>

                      {isActive ? (
                        <>
                          <p className="mx-auto mt-7 max-w-[620px] text-[1.02rem] leading-9 text-[#7A5A42]">
                            {feature.summary}
                          </p>

                          <div
                            className="mx-auto w-full max-w-[620px] text-right"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 14,
                              marginTop: 44,
                            }}
                          >
                            {feature.pillars.map((pillar, i) => (
                              <motion.div
                                key={pillar}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.24, delay: i * 0.06 }}
                                className="flex min-h-[70px] items-center rounded-xl border border-[#EADACA] bg-[#FFFCF8] text-[0.97rem] leading-8 text-[#5F3F2D]"
                                style={{
                                  gap: 18,
                                  padding: "16px 36px",
                                }}
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E7D4BF] bg-[#F6EBDD]">
                                  <Check className="h-4 w-4 text-[#A5663F]" strokeWidth={2.3} />
                                </div>
                                <span className="block flex-1">{pillar}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div
                            className="mx-auto w-full max-w-[620px] rounded-2xl border border-[#E6D4C1] bg-white shadow-[0_8px_18px_rgba(124,61,42,0.06)]"
                            style={{
                              marginTop: 36,
                              padding: "24px 28px",
                            }}
                          >
                            <p className="font-heading text-[1rem] font-bold leading-8 text-[#3B2113]">
                              {feature.evidence}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="mx-auto mt-4 max-w-[280px] text-[0.95rem] leading-7 text-[#765945]" style={{ fontFamily: "var(--font-body)" }}>
                          {feature.short}
                        </p>
                      )}
                    </motion.article>
                  );
                })}
              </div>
            </div>
            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCC9B6] bg-white/90 text-[#7C3D2A] shadow-[0_4px_10px_rgba(46,25,13,0.08)] transition hover:border-[#C9AA92] hover:bg-[#FFFCF8]"
                aria-label={t.common.previous}
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCC9B6] bg-white/90 text-[#7C3D2A] shadow-[0_4px_10px_rgba(46,25,13,0.08)] transition hover:border-[#C9AA92] hover:bg-[#FFFCF8]"
                aria-label={t.common.next}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="2xl:hidden w-full mx-auto md:max-w-[700px]"
          initial={{ opacity: 0, y: 72, scale: 0.94, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.82, ease }}
          style={{ paddingInline: "clamp(18px, 4vw, 40px)", margin: "0 auto" }}
        >
          <motion.article
            key={activeFeature.id}
            initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.36, ease }}
            style={{
              border: "1px solid #E7D7C5",
              borderRadius: 16,
              background: "#FFFFFF",
              boxShadow: "0 18px 40px rgba(46,25,13,0.10)",
              padding: "clamp(22px, 3.5vw, 44px) clamp(18px, 3.5vw, 44px)",
              textAlign: "right",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "#7C3D2A",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 18px rgba(124,61,42,0.18)",
                  }}
                >
                  <ActiveIcon size={21} strokeWidth={1.9} />
                </div>
                <span
                  style={{
                    color: "#8A6046",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")} / {String(localizedFeatures.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <p
              style={{
                color: "#8A6046",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                fontWeight: 700,
                lineHeight: 1.7,
                margin: "0 0 10px",
              }}
            >
              {activeFeature.short}
            </p>

            <h3
              style={{
                color: "#1F0E06",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.35rem, 2.8vw, 1.9rem)",
                fontWeight: 800,
                lineHeight: 1.35,
                margin: "0 0 16px",
              }}
            >
              {activeFeature.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.88rem, 1.3vw, 1rem)",
                color: "#7A5A42",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              {activeFeature.summary}
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {activeFeature.pillars.map((pillar) => (
                <div
                  key={pillar}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    border: "1px solid #EADACA",
                    borderRadius: 10,
                    background: "#FFFCF8",
                    padding: "clamp(10px, 1.5vw, 16px) clamp(12px, 2vw, 20px)",
                    color: "#5F3F2D",
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.86rem, 1.2vw, 0.97rem)",
                    lineHeight: 1.65,
                  }}
                >
                  <Check
                    size={16}
                    strokeWidth={2.2}
                    style={{ color: "#A5663F", flexShrink: 0, marginTop: 3 }}
                  />
                  <span style={{ flex: 1 }}>{pillar}</span>
                </div>
              ))}
            </div>
          </motion.article>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 14,
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              style={{
                width: 42,
                height: 42,
                borderRadius: 8,
                border: "1px solid #DCC9B6",
                background: "#FFFFFF",
                color: "#7C3D2A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 14px rgba(46,25,13,0.08)",
              }}
              aria-label={t.common.previous}
            >
              <ChevronRight size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {localizedFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => selectFeature(index)}
                  aria-label={`${t.common.featureLabel} ${index + 1}`}
                  style={{
                    width: index === activeIndex ? 22 : 7,
                    height: 7,
                    borderRadius: 8,
                    border: 0,
                    background: index === activeIndex ? "#7C3D2A" : "#DECBB8",
                    transition: "width 0.2s ease, background 0.2s ease",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              style={{
                width: 42,
                height: 42,
                borderRadius: 8,
                border: "1px solid #DCC9B6",
                background: "#FFFFFF",
                color: "#7C3D2A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 14px rgba(46,25,13,0.08)",
              }}
              aria-label={t.common.next}
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
