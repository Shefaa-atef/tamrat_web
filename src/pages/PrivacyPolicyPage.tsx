import { motion } from "motion/react";
import {
  ArrowRight,
  Bell,
  CalendarHeart,
  CheckCircle2,
  Cloud,
  Database,
  HeartPulse,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logoUrl from "../../assets/main/logo circle.svg";
import { APP_LINKS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

type PolicyRow = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const policyRows: PolicyRow[] = [
  {
    title: "ما البيانات التي تستخدمها تمرات؟",
    body:
      "نستخدم المعلومات التي تدخلها أو تختارها داخل التطبيق: الاسم، البريد الإلكتروني، تاريخ الميلاد، المدينة، طريقة حساب الصلاة، الجنس، أهداف خطة الصوم، سجل الأيام التي صمتها، أيام رمضان الفائتة، تفضيلات الإشعارات، اللغة، المظهر، وسجلات الدورة أو الحمل أو النفاس الاختيارية.",
    icon: Database,
  },
  {
    title: "أين تبقى البيانات؟",
    body:
      "تبقى أغلب البيانات على جهازك. عند تسجيل الدخول، تتم مزامنة بيانات الحساب والصوم والدورة مع Supabase حتى تستطيع استعادتها ومتابعة خطتك من الحساب نفسه.",
    icon: ShieldCheck,
  },
  {
    title: "الموقع والمواقيت",
    body:
      "إذا اخترت استخدام موقعك، يطلب التطبيق موقعا حديثا أو منخفض الدقة لاختيار أقرب مدينة مدعومة وطريقة حساب الصلاة. نخزن اسم المدينة أو الإحداثيات التقريبية اللازمة للمواقيت، ولا نخزن مسارا مباشرا لتحركاتك.",
    icon: MapPin,
  },
  {
    title: "الخدمات الخارجية",
    body:
      "تعتمد تمرات على Supabase للحساب والمزامنة وإعادة تعيين كلمة المرور وحذف الحساب، وGoogle Sign-In إذا اخترت الدخول بجوجل، وAladhan لبيانات الصلاة والتقويم الهجري، وOpen-Meteo للطقس، وFirebase Cloud Messaging لإيصال الإشعارات.",
    icon: Cloud,
  },
  {
    title: "الإشعارات والمنبهات الدقيقة",
    body:
      "تطلب تمرات أذونات الإشعارات والمنبهات الدقيقة حتى تصل تذكيرات الصوم والسحور والإفطار والأذان والدورة في وقتها. يمكنك إيقاف التذكيرات من تمرات أو من إعدادات النظام في أي وقت.",
    icon: Bell,
  },
  {
    title: "الدورة والحمل والنفاس",
    body:
      "هذه البيانات اختيارية وتستخدم فقط لتخصيص تجربة الصيام والتقويم داخل تمرات. لا تقدم تمرات تشخيصا طبيا، ولا تغني المعلومات داخل التطبيق عن استشارة الطبيب.",
    icon: HeartPulse,
  },
  {
    title: "الأمان والمشاركة",
    body:
      "لا نبيع بياناتك الشخصية. نستخدم رموز الدخول والتخزين الآمن داخل التطبيق لحماية الجلسة قدر الإمكان، ونستخدم البيانات فقط لتقديم وظائف التطبيق وتحسين تجربة الصيام والتنبيهات.",
    icon: LockKeyhole,
  },
];

const quickFacts = [
  "لا نبيع بياناتك الشخصية",
  "حذف الحساب متاح من التطبيق أو البريد",
  "بيانات الدورة والحمل اختيارية",
];

const deleteSubject = encodeURIComponent("حذف حساب تمرات");
const deleteBody = encodeURIComponent(
  "السلام عليكم فريق تمرات،\n\nأرغب بحذف حسابي في تمرات والبيانات المتزامنة المرتبطة به.\n\nالبريد المسجل في الحساب:\nسبب الطلب، اختياري:\n\nشكرا لكم."
);
const deletionMailto = `mailto:${APP_LINKS.supportEmail}?subject=${deleteSubject}&body=${deleteBody}`;

function PolicyRowCard({ row, index }: { row: PolicyRow; index: number }) {
  const Icon = row.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.035 }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8D8C7",
        borderRadius: 8,
        boxShadow: "0 12px 28px rgba(46,25,13,0.06)",
        display: "grid",
        gap: 16,
        gridTemplateColumns: "48px minmax(0, 1fr)",
        padding: "22px",
      }}
      className="max-sm:grid-cols-1"
    >
      <div
        style={{
          alignItems: "center",
          background: "#FFF4E8",
          border: "1px solid #E8D1B9",
          borderRadius: 8,
          color: "#7C3D2A",
          display: "flex",
          height: 48,
          justifyContent: "center",
          width: 48,
        }}
      >
        <Icon size={21} strokeWidth={1.85} />
      </div>

      <div>
        <h2
          style={{
            color: "#1C0D04",
            fontFamily: "var(--font-heading)",
            fontSize: "1.16rem",
            fontWeight: 800,
            lineHeight: 1.45,
            margin: "0 0 8px",
          }}
        >
          {row.title}
        </h2>
        <p
          style={{
            color: "#6D4B34",
            fontFamily: "var(--font-body)",
            fontSize: "0.96rem",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          {row.body}
        </p>
      </div>
    </motion.article>
  );
}

function SidePanel() {
  return (
    <aside
      style={{
        display: "grid",
        gap: 14,
        alignSelf: "start",
      }}
      className="lg:sticky lg:top-24"
    >
      <div
        style={{
          background: "#1C0D04",
          borderRadius: 8,
          boxShadow: "0 20px 46px rgba(46,25,13,0.16)",
          color: "#FFF8EF",
          padding: 22,
        }}
      >
        <CalendarHeart
          size={24}
          strokeWidth={1.8}
          style={{ color: "#F4C97E", marginBottom: 14 }}
        />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.18rem",
            fontWeight: 800,
            lineHeight: 1.45,
            margin: "0 0 8px",
          }}
        >
          ملخص سريع
        </h2>
        <div style={{ display: "grid", gap: 10 }}>
          {quickFacts.map((fact) => (
            <div
              key={fact}
              style={{
                alignItems: "flex-start",
                display: "flex",
                gap: 9,
              }}
            >
              <CheckCircle2
                size={17}
                strokeWidth={2}
                style={{ color: "#F4C97E", flexShrink: 0, marginTop: 4 }}
              />
              <span
                style={{
                  color: "rgba(255,248,239,0.82)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                }}
              >
                {fact}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={`mailto:${APP_LINKS.supportEmail}`}
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8D8C7",
          borderRadius: 8,
          boxShadow: "0 12px 28px rgba(46,25,13,0.06)",
          color: "#1C0D04",
          display: "grid",
          gap: 8,
          padding: 20,
          textDecoration: "none",
        }}
      >
        <Mail size={22} strokeWidth={1.8} style={{ color: "#7C3D2A" }} />
        <strong
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            fontWeight: 800,
          }}
        >
          تواصل معنا
        </strong>
        <span
          dir="ltr"
          style={{
            color: "#8B6E52",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            overflowWrap: "anywhere",
            textAlign: "right",
          }}
        >
          {APP_LINKS.supportEmail}
        </span>
      </a>
    </aside>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main
      dir="rtl"
      style={{
        background:
          "linear-gradient(180deg, #FEF8EE 0%, #FFFFFF 32%, #FFF8EF 100%)",
        minHeight: "100vh",
        padding: "112px clamp(20px, 5vw, 80px) 84px",
      }}
    >
      <section style={{ margin: "0 auto", maxWidth: 1180 }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          style={{
            alignItems: "center",
            display: "grid",
            gap: 32,
            gridTemplateColumns: "minmax(0, 1fr) auto",
            marginBottom: 32,
          }}
          className="max-md:grid-cols-1"
        >
          <div>
            <a
              href="#hero"
              style={{
                alignItems: "center",
                color: "#7C3D2A",
                display: "inline-flex",
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                fontWeight: 800,
                gap: 8,
                marginBottom: 24,
                textDecoration: "none",
              }}
            >
              <ArrowRight size={17} />
              العودة للرئيسية
            </a>

            <span
              style={{
                background: "rgba(124,61,42,0.08)",
                border: "1px solid rgba(124,61,42,0.10)",
                borderRadius: 8,
                color: "#7C3D2A",
                display: "inline-flex",
                fontFamily: "var(--font-heading)",
                fontSize: "0.88rem",
                fontWeight: 800,
                padding: "8px 15px",
              }}
            >
              آخر تحديث: 17 نيسان 2026
            </span>

            <h1
              style={{
                color: "#1C0D04",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.25rem, 5vw, 4.4rem)",
                fontWeight: 900,
                lineHeight: 1.12,
                margin: "20px 0 18px",
              }}
            >
              سياسة الخصوصية
            </h1>
            <p
              style={{
                color: "#6D4B34",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.18rem)",
                lineHeight: 1.95,
                margin: 0,
                maxWidth: 820,
              }}
            >
              توضح هذه الصفحة كيف يتعامل تطبيق تمرات مع البيانات التي تختارها داخل التطبيق، وكيف تستخدمها تمرات لتقديم التقويم، خطة الصوم، التذكيرات، ومزامنة الحساب.
            </p>
          </div>

          <div
            style={{
              alignItems: "center",
              background: "#FFFFFF",
              border: "1px solid #E8D8C7",
              borderRadius: 8,
              boxShadow: "0 18px 42px rgba(46,25,13,0.08)",
              display: "flex",
              height: 116,
              justifyContent: "center",
              width: 116,
            }}
          >
            <img
              src={logoUrl}
              alt="Tamrat"
              style={{
                filter: "drop-shadow(0 12px 24px rgba(124,61,42,0.12))",
                height: 78,
                objectFit: "contain",
                width: 78,
              }}
            />
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gap: 22,
            gridTemplateColumns: "minmax(0, 1fr) 320px",
          }}
          className="max-lg:grid-cols-1"
        >
          <div style={{ display: "grid", gap: 14 }}>
            {policyRows.map((row, index) => (
              <PolicyRowCard key={row.title} row={row} index={index} />
            ))}

            <motion.section
              id="account-deletion"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,61,42,0.08), rgba(244,201,126,0.16))",
                border: "1px solid #DFC6AF",
                borderRadius: 8,
                display: "grid",
                gap: 18,
                gridTemplateColumns: "54px minmax(0, 1fr)",
                padding: "26px 24px",
              }}
              className="max-sm:grid-cols-1"
            >
              <div
                style={{
                  alignItems: "center",
                  background: "#7C3D2A",
                  borderRadius: 8,
                  color: "#FFFFFF",
                  display: "flex",
                  height: 54,
                  justifyContent: "center",
                  width: 54,
                }}
              >
                <Trash2 size={23} strokeWidth={1.85} />
              </div>

              <div>
                <h2
                  style={{
                    color: "#1C0D04",
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.35rem, 2.4vw, 2rem)",
                    fontWeight: 900,
                    lineHeight: 1.35,
                    margin: "0 0 10px",
                  }}
                >
                  حذف الحساب والبيانات
                </h2>
                <p
                  style={{
                    color: "#6D4B34",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.98rem",
                    lineHeight: 1.9,
                    margin: "0 0 18px",
                  }}
                >
                  يمكنك حذف حساب تمرات والبيانات المتزامنة من داخل التطبيق عبر الملف الشخصي ثم حذف الحساب. إذا لم تستطع الوصول إلى التطبيق، أرسل طلبا من بريد حسابك المسجل وسنساعدك في التحقق من الحساب وحذف البيانات المتزامنة المرتبطة به.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <a
                    href={deletionMailto}
                    style={{
                      alignItems: "center",
                      background: "#7C3D2A",
                      borderRadius: 8,
                      color: "#FFFFFF",
                      display: "inline-flex",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.94rem",
                      fontWeight: 800,
                      gap: 8,
                      padding: "12px 16px",
                      textDecoration: "none",
                    }}
                  >
                    <Mail size={17} />
                    طلب حذف الحساب
                  </a>
                  <a
                    href={`mailto:${APP_LINKS.supportEmail}`}
                    style={{
                      alignItems: "center",
                      background: "#FFFFFF",
                      border: "1px solid #DCC2AA",
                      borderRadius: 8,
                      color: "#7C3D2A",
                      display: "inline-flex",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.94rem",
                      fontWeight: 800,
                      padding: "12px 16px",
                      textDecoration: "none",
                    }}
                  >
                    تواصل معنا
                  </a>
                </div>
              </div>
            </motion.section>
          </div>

          <SidePanel />
        </div>
      </section>
    </main>
  );
}
