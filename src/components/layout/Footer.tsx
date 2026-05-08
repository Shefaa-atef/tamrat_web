import logoUrl from "../../../assets/main/logo circle.svg";
import { APP_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        color: "#6D4B34",
        fontFamily: "var(--font-body)",
        fontSize: "0.92rem",
        lineHeight: 1.7,
        textDecoration: "none",
      }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const { dir, t } = useLanguage();
  const legalLinks = t.footer.legalLinks.map((link, index) => ({
    ...link,
    href: index === 0 ? APP_LINKS.privacyPolicy : APP_LINKS.accountDeletion,
  }));

  return (
    <footer
      dir={dir}
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 48%, #F7ECDE 100%)",
        borderTop: "1px solid #EADACA",
        padding: "0 clamp(20px, 5vw, 80px) 30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid rgba(124,61,42,0.12)",
            display: "grid",
            gap: 22,
            gridTemplateColumns: "minmax(0,1fr) auto",
            padding: "30px 0 24px",
          }}
          className="max-md:grid-cols-1"
        >
          <a
            href="#hero"
            aria-label={t.common.logoAlt}
            style={{
              alignItems: "center",
              color: "#1C0D04",
              display: "inline-flex",
              gap: 14,
              minWidth: 0,
              textDecoration: "none",
            }}
          >
            <img
              src={logoUrl}
              alt={t.common.logoAlt}
              style={{
                filter: "drop-shadow(0 8px 18px rgba(124,61,42,0.12))",
                height: 50,
                objectFit: "contain",
                width: 50,
              }}
            />
            <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
              <strong
                style={{
                  color: "#1C0D04",
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.12rem",
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                {t.common.appName}
              </strong>
              <span
                style={{
                  color: "#8B6E52",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                }}
              >
                {t.footer.tagline}
              </span>
            </span>
          </a>

          <a
            href={APP_LINKS.contactEmail}
            target="_blank"
            rel="noreferrer"
            style={{
              alignItems: "center",
              background: "#FFFFFF",
              border: "1px solid #E2CCB5",
              borderRadius: 8,
              boxShadow: "0 10px 26px rgba(46,25,13,0.07)",
              color: "#7C3D2A",
              display: "inline-flex",
              fontFamily: "var(--font-heading)",
              fontSize: "0.93rem",
              fontWeight: 800,
              gap: 8,
              justifyContent: "center",
              padding: "12px 16px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t.footer.contact}
            <span
              dir="ltr"
              style={{
                color: "#9A7256",
                fontFamily: "var(--font-body)",
                fontSize: "0.86rem",
                fontWeight: 600,
              }}
            >
              {APP_LINKS.supportEmail}
            </span>
          </a>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "grid",
            gap: 18,
            gridTemplateColumns: "1fr auto",
            paddingTop: 22,
          }}
          className="max-md:grid-cols-1"
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 20px",
            }}
          >
            {t.footer.productLinks.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
            {legalLinks.map((link) => (
              <FooterLink key={link.href + link.label} {...link} />
            ))}
          </div>

          <p
            style={{
              color: "#9A7256",
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
