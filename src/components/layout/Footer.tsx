import logoUrl from "../../../assets/main/logo circle.svg";
import { APP_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="site-footer__link"
      style={{
        color: "#6D4B34",
        fontFamily: "var(--font-body)",
        fontSize: "clamp(0.75rem, 1.8vw, 0.92rem)",
        lineHeight: 1.6,
        textDecoration: "none",
        display: "block",
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
      className="site-footer"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 48%, #F7ECDE 100%)",
        borderTop: "1px solid #EADACA",
        padding: "clamp(12px, 3vw, 30px) clamp(12px, 3vw, 80px)",
      }}
    >
      <div
        className="site-footer__inner"
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <div
          className="site-footer__brand-row max-sm:grid-cols-1 max-sm:gap-2"
          style={{
            alignItems: "center",
            borderBottom: "1px solid rgba(124,61,42,0.12)",
            display: "grid",
            gap: "clamp(12px, 2vw, 22px)",
            gridTemplateColumns: "minmax(0,1fr) auto",
            padding: "clamp(16px, 3vw, 30px) 0 clamp(16px, 3vw, 24px)",
          }}
        >
          <a
            href="#hero"
            aria-label={t.common.logoAlt}
            className="site-footer__brand"
            style={{
              alignItems: "center",
              color: "#1C0D04",
              display: "inline-flex",
              gap: "clamp(8px, 2vw, 14px)",
              minWidth: 0,
              textDecoration: "none",
            }}
          >
            <img
              src={logoUrl}
              alt={t.common.logoAlt}
              className="site-footer__logo"
              style={{
                filter: "drop-shadow(0 8px 18px rgba(124,61,42,0.12))",
                height: "clamp(40px, 8vw, 50px)",
                objectFit: "contain",
                width: "clamp(40px, 8vw, 50px)",
              }}
            />
            <span
              className="site-footer__brand-text"
              style={{ display: "grid", gap: "clamp(1px, 0.5vw, 3px)", minWidth: 0 }}
            >
              <strong
                className="site-footer__brand-name"
                style={{
                  color: "#1C0D04",
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(0.9rem, 2.2vw, 1.12rem)",
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                {t.common.appName}
              </strong>
              <span
                className="site-footer__tagline"
                style={{
                  color: "#8B6E52",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.88rem)",
                  lineHeight: 1.5,
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
            className="site-footer__contact"
            style={{
              alignItems: "center",
              background: "#FFFFFF",
              border: "1px solid #E2CCB5",
              borderRadius: 8,
              boxShadow: "0 10px 26px rgba(46,25,13,0.07)",
              color: "#7C3D2A",
              display: "inline-flex",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.75rem, 1.8vw, 0.93rem)",
              fontWeight: 800,
              gap: "clamp(4px, 1vw, 8px)",
              justifyContent: "center",
              padding: "clamp(8px, 1.5vw, 12px) clamp(10px, 2vw, 16px)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t.footer.contact}
            <span
              dir="ltr"
              className="site-footer__contact-email"
              style={{
                color: "#9A7256",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.7rem, 1.5vw, 0.86rem)",
                fontWeight: 600,
              }}
            >
              {APP_LINKS.supportEmail}
            </span>
          </a>
        </div>

        <div
          className="site-footer__bottom max-sm:grid-cols-1 max-sm:text-center"
          style={{
            alignItems: "center",
            display: "grid",
            gap: "clamp(10px, 2vw, 18px)",
            gridTemplateColumns: "1fr auto",
            paddingTop: "clamp(14px, 2vw, 22px)",
          }}
        >
          <div
            className="site-footer__links max-sm:flex-col max-sm:gap-2"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(8px, 2vw, 12px) clamp(12px, 2.5vw, 20px)",
              justifyContent: "center",
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
            className="site-footer__copyright"
            style={{
              color: "#9A7256",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.7rem, 1.5vw, 0.82rem)",
              lineHeight: 1.6,
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
