import { motion } from "motion/react";
import {
  Bell,
  Cloud,
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

type PolicyBlock = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const policyBlocks: PolicyBlock[] = [
  {
    title: "البيانات التي نخزنها",
    body:
      "تخزن تمرات المعلومات التي تدخلها أو تختارها داخل التطبيق، مثل الاسم والبريد الإلكتروني وتاريخ الميلاد والمدينة المختارة وطريقة حساب الصلاة والجنس وأهداف خطة الصوم وسجل الأيام التي صمتها وأيام رمضان الفائتة وتفضيلات الإشعارات واللغة والمظهر، إضافة إلى سجلات الدورة أو الحمل أو النفاس الاختيارية.",
    icon: ShieldCheck,
  },
  {
    title: "الموقع",
    body:
      "إذا اخترت استخدام موقعك، يطلب التطبيق موقعا حديثا أو منخفض الدقة فقط لاختيار أقرب مدينة مدعومة وطريقة حساب الصلاة. نخزن اسم المدينة أو الإحداثيات التقريبية اللازمة للمواقيت، ولا نخزن مسارا مباشرا لتحركاتك.",
    icon: MapPin,
  },
  {
    title: "الخدمات التي يعتمد عليها التطبيق",
    body:
      "نستخدم Supabase لتسجيل الحساب والمزامنة وإعادة تعيين كلمة المرور وحذف الحساب، وGoogle Sign-In إذا اخترت الدخول بجوجل، وAladhan لبيانات الصلاة والتقويم الهجري، وOpen-Meteo للطقس، وFirebase Cloud Messaging لإيصال الإشعارات.",
    icon: Cloud,
  },
  {
    title: "الإشعارات والمنبهات الدقيقة",
    body:
      "تطلب تمرات أذونات الإشعارات والمنبهات الدقيقة حتى تصل تذكيرات الصوم والسحور والإفطار والأذان والدورة في وقتها. يمكنك إيقاف التذكيرات من التطبيق أو من إعدادات النظام في أي وقت.",
    icon: Bell,
  },
  {
    title: "بيانات الدورة والحمل والنفاس",
    body:
      "هذه البيانات اختيارية وتستخدم فقط لتخصيص تجربة الصيام والتقويم داخل تمرات. لا تقدم تمرات تشخيصا طبيا، ولا ينبغي اعتبار المعلومات الصحية داخل التطبيق بديلا عن نصيحة الطبيب.",
    icon: HeartPulse,
  },
  {
    title: "الأمان والمشاركة",
    body:
      "لا نبيع بياناتك الشخصية. تبقى أغلب البيانات على جهازك، وتتم مزامنة بيانات الحساب والصوم والدورة مع Supabase عند تسجيل الدخول فقط. تستخدم رموز الدخول والتخزين الآمن داخل التطبيق لحماية الجلسة قدر الإمكان.",
    icon: LockKeyhole,
  },
];

const englishSummary = [
  "Tamrat stores profile, fasting-plan, selected city, notification, language/theme, and optional cycle, pregnancy, and postpartum data that you enter or choose in the app.",
  "Tamrat uses Supabase, Google Sign-In, Aladhan, Open-Meteo, and Firebase Cloud Messaging to provide account, prayer-time, weather, and notification features.",
  "Tamrat does not sell personal data. You can request account and synced-data deletion from inside the app or by email.",
];

const deleteSubject = encodeURIComponent("Delete my Tamrat account");
const deleteBody = encodeURIComponent(
  "Hello Tamrat team,\n\nPlease delete my Tamrat account and synced data.\n\nAccount email:\nReason, optional:\n\nThank you."
);
const deletionMailto = `mailto:${APP_LINKS.supportEmail}?subject=${deleteSubject}&body=${deleteBody}`;

function PolicyCard({ block, index }: { block: PolicyBlock; index: number }) {
  const Icon = block.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.52, ease, delay: index * 0.04 }}
      style={{
        border: "1px solid #EADACA",
        borderRadius: 8,
        background: "#FFFFFF",
        boxShadow: "0 12px 30px rgba(46,25,13,0.07)",
        padding: "22px 20px",
        minHeight: 224,
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
          marginBottom: 16,
          boxShadow: "0 8px 18px rgba(124,61,42,0.18)",
        }}
      >
        <Icon size={19} strokeWidth={1.8} />
      </div>
      <h2
        style={{
          color: "#1C0D04",
          fontFamily: "var(--font-heading)",
          fontSize: "1.12rem",
          fontWeight: 800,
          lineHeight: 1.45,
          margin: "0 0 10px",
        }}
      >
        {block.title}
      </h2>
      <p
        style={{
          color: "#71513A",
          fontFamily: "var(--font-body)",
          fontSize: "0.95rem",
          lineHeight: 1.9,
          margin: 0,
        }}
      >
        {block.body}
      </p>
    </motion.article>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #FEF8EE 0%, #FFFFFF 34%, #FDFAF6 100%)",
        padding: "112px clamp(20px, 5vw, 80px) 86px",
      }}
    >
      <section style={{ maxWidth: 1120, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            justifyItems: "center",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <img
            src={logoUrl}
            alt="Tamrat"
            style={{ width: 74, height: 74, objectFit: "contain", marginBottom: 22 }}
          />
          <span
            style={{
              background: "rgba(124,61,42,0.08)",
              border: "1px solid rgba(124,61,42,0.10)",
              borderRadius: 8,
              color: "#7C3D2A",
              display: "inline-flex",
              fontFamily: "var(--font-heading)",
              fontSize: "0.88rem",
              fontWeight: 700,
              padding: "8px 16px",
              marginBottom: 18,
            }}
          >
            آخر تحديث: 17 نيسان 2026
          </span>
          <h1
            style={{
              color: "#1C0D04",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.1rem, 5vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.16,
              margin: "0 0 18px",
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
              maxWidth: 820,
              margin: 0,
            }}
          >
            توضح هذه الصفحة كيف يتعامل تطبيق تمرات مع البيانات التي تدخلها أو تختارها، وما الخدمات التي يعتمد عليها، وكيف يمكنك التحكم في بياناتك أو طلب حذف حسابك.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 22,
          }}
        >
          {policyBlocks.map((block, index) => (
            <PolicyCard key={block.title} block={block} index={index} />
          ))}
        </div>

        <motion.section
          id="account-deletion"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          style={{
            border: "1px solid #E4D1BD",
            borderRadius: 8,
            background: "#1C0D04",
            color: "#FFF8EF",
            padding: "clamp(24px, 4vw, 36px)",
            margin: "26px 0",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                background: "rgba(255,248,239,0.12)",
                color: "#F4C97E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Trash2 size={20} strokeWidth={1.8} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.35rem, 2.6vw, 2rem)",
                  fontWeight: 800,
                  lineHeight: 1.35,
                  margin: "0 0 10px",
                }}
              >
                حذف الحساب والبيانات
              </h2>
              <p
                style={{
                  color: "rgba(255,248,239,0.78)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.98rem",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                يمكنك حذف حساب تمرات والبيانات المتزامنة من داخل التطبيق عبر الملف الشخصي ثم حذف الحساب. إذا لم تستطع الوصول إلى التطبيق، أرسل طلبا من بريد حسابك المسجل وسنساعدك في التحقق من الحساب وحذف البيانات المتزامنة المرتبطة به.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href={deletionMailto}
              style={{
                alignItems: "center",
                background: "#FFF8EF",
                borderRadius: 8,
                color: "#1C0D04",
                display: "inline-flex",
                fontFamily: "var(--font-heading)",
                fontSize: "0.94rem",
                fontWeight: 800,
                gap: 8,
                padding: "11px 16px",
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
                border: "1px solid rgba(255,248,239,0.28)",
                borderRadius: 8,
                color: "#FFF8EF",
                display: "inline-flex",
                fontFamily: "var(--font-heading)",
                fontSize: "0.94rem",
                fontWeight: 700,
                padding: "11px 16px",
                textDecoration: "none",
              }}
            >
              {APP_LINKS.supportEmail}
            </a>
          </div>
        </motion.section>

        <section
          dir="ltr"
          lang="en"
          style={{
            border: "1px solid #EADACA",
            borderRadius: 8,
            background: "#FFFFFF",
            boxShadow: "0 12px 30px rgba(46,25,13,0.06)",
            padding: "24px 22px",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              color: "#1C0D04",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: 800,
              margin: "0 0 14px",
            }}
          >
            English summary
          </h2>
          <ul
            style={{
              color: "#71513A",
              display: "grid",
              gap: 10,
              fontFamily: "var(--font-body)",
              fontSize: "0.94rem",
              lineHeight: 1.75,
              margin: 0,
              paddingInlineStart: 20,
            }}
          >
            {englishSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
