import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export function FloatingNav({ navItems, className }: FloatingNavProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 100;
      setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn("fixed inset-x-0 top-4 z-50 mx-auto w-fit", className)}
        >
          <div
            className={cn(
              "flex items-center gap-8 rounded-full px-8 py-3",
              "border border-[#6A422C]/20",
              "bg-[#FFF7F0]/74 backdrop-blur-xl",
              "shadow-[0_10px_28px_rgba(70,35,20,0.16)]"
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-1.5 text-sm",
                  "text-[#7A5038] transition-colors duration-200 hover:text-[#4A2D1E]"
                )}
              >
                {item.icon ? (
                  <span className="text-[#A96945] transition-colors group-hover:text-[#7C3D2A]">
                    {item.icon}
                  </span>
                ) : null}
                {item.name}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#A96945] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
