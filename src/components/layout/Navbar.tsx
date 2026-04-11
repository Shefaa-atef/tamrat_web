import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../../../assets/main/logo circle.svg";

const NAV_LINKS = [
  { label: "المميزات", href: "#features" },
  { label: "كيف يعمل", href: "#how-it-works" },
  { label: "الفئات المستهدفة", href: "#audience" },
  { label: "داخل التطبيق", href: "#screenshots" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0);

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
          dir="rtl"
        >
          {/* flex row: logo on right (RTL), CTA on left (RTL), nav absolutely centered */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 40px",
            }}
          >
            {/* Logo — right in RTL */}
            <a href="#hero" aria-label="Tamrat">
              <img
                src={logoUrl}
                alt="Tamrat"
                style={{ width: 44, height: 44, objectFit: "contain" }}
              />
            </a>

            {/* Nav — absolute center, hidden on mobile */}
            <nav
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="hidden md:flex md:items-center md:gap-7"
            >
              {NAV_LINKS.map((link) => (
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
                  onMouseEnter={e => (e.currentTarget.style.color = "#4A2D1E")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(122,80,56,0.85)")}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Hamburger Menu — mobile only */}
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
              aria-label="Toggle menu"
            >
              <span
                style={{
                  width: 24,
                  height: 2,
                  background: "rgba(122,80,56,0.85)",
                  borderRadius: 1,
                  transition: "all 0.3s",
                  transform: mobileMenuOpen ? "rotate(45deg) translate(8px, 8px)" : "none",
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
                  transform: mobileMenuOpen ? "rotate(-45deg) translate(8px, -8px)" : "none",
                }}
              />
            </button>

            {/* CTA — left in RTL */}
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
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              تحميل
            </a>
          </div>

          {/* Mobile Menu Dropdown */}
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
                {NAV_LINKS.map((link) => (
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
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(193,113,36,0.05)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
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
