import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logoUrl from "../../../assets/main/logo circle.svg";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0);
  const { dir, isArabic, t, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 10);
      setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="navbar"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          dir={dir}
          style={{
            position: "fixed",
            inset: "0 0 auto 0",
            zIndex: 110,
            background: atTop ? "transparent" : "rgba(255,247,240,0.88)",
            backdropFilter: atTop ? "none" : "blur(18px)",
            WebkitBackdropFilter: atTop ? "none" : "blur(18px)",
            boxShadow: atTop ? "none" : "0 1px 0 rgba(193,113,36,0.12)",
            transition: "background 0.35s, box-shadow 0.35s",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 40px",
            }}
          >
            <a href="#hero" aria-label={t.common.logoAlt}>
              <img
                src={logoUrl}
                alt={t.common.logoAlt}
                style={{ width: 44, height: 44, objectFit: "contain" }}
              />
            </a>

            <nav
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="hidden md:flex md:items-center md:gap-7"
            >
              {t.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: "rgba(122,80,56,0.85)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#4A2D1E";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "rgba(122,80,56,0.85)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexDirection: isArabic ? "row" : "row-reverse",
              }}
            >
              <motion.button
                type="button"
                onClick={toggleLanguage}
                whileHover={{ y: -1, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label={t.common.languageButtonLabel}
                style={{
                  alignItems: "center",
                  background: "#FFFFFF",
                  border: "1px solid rgba(226,204,181,0.95)",
                  borderRadius: "50%",
                  boxShadow: "0 8px 18px rgba(124,61,42,0.12)",
                  color: "#7C3D2A",
                  cursor: "pointer",
                  display: "inline-flex",
                  fontFamily: "var(--font-heading)",
                  fontSize: 13,
                  fontWeight: 800,
                  height: 44,
                  justifyContent: "center",
                  lineHeight: 1,
                  width: 44,
                }}
              >
                {t.common.languageButton}
              </motion.button>

              <a
                href="#download"
                className="hidden md:inline-flex"
                style={{
                  background: "linear-gradient(135deg, #C17124 0%, #8F5218 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "8px 22px",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.opacity = "1";
                }}
              >
                {t.nav.download}
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  flexDirection: "column",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                }}
                className="flex md:hidden flex-col"
                aria-label={t.nav.toggleMenu}
              >
                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "rgba(122,80,56,0.85)",
                    borderRadius: 1,
                    transition: "all 0.3s",
                    transform: mobileMenuOpen
                      ? "rotate(45deg) translate(8px, 8px)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "rgba(122,80,56,0.85)",
                    borderRadius: 1,
                    transition: "all 0.3s",
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "rgba(122,80,56,0.85)",
                    borderRadius: 1,
                    transition: "all 0.3s",
                    transform: mobileMenuOpen
                      ? "rotate(-45deg) translate(8px, -8px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  background: "rgba(255,247,240,0.95)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  borderTop: "1px solid rgba(193,113,36,0.12)",
                }}
                className="md:hidden"
              >
                {t.nav.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    style={{
                      fontFamily: "inherit",
                      fontSize: 14,
                      color: "rgba(122,80,56,0.85)",
                      textDecoration: "none",
                      padding: "14px 40px",
                      borderBottom: "1px solid rgba(193,113,36,0.08)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background = "rgba(193,113,36,0.05)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
