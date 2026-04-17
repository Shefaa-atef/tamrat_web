import logoUrl from "../../../assets/main/logo circle.svg";
import { APP_LINKS } from "@/lib/constants";

const footerLinks = [
  { label: "سياسة الخصوصية", href: APP_LINKS.privacyPolicy },
  { label: "حذف الحساب", href: APP_LINKS.accountDeletion },
  { label: "تواصل معنا", href: `mailto:${APP_LINKS.supportEmail}` },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        background: "#1C0D04",
        color: "#FFF8EF",
        padding: "34px clamp(20px, 5vw, 80px)",
        borderTop: "1px solid rgba(255,248,239,0.08)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <a
          href="#hero"
          aria-label="Tamrat"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <img
            src={logoUrl}
            alt="Tamrat"
            style={{ width: 42, height: 42, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            تمرات
          </span>
        </a>

        <nav
          aria-label="روابط قانونية"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          {footerLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              style={{
                color: "rgba(255,248,239,0.78)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p
          style={{
            color: "rgba(255,248,239,0.54)",
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          © 2026 تمرات. كل الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
