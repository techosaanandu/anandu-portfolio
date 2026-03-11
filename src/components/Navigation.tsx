"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = ["home", "about", "techstack", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActive(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: " Home" },
    { id: "about", label: " Bio" },
    { id: "techstack", label: " Core" },
    { id: "projects", label: " Projects" },
    { id: "contact", label: " Contact" },
  ];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-100 w-full max-w-fit px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="pointer-events-auto flex items-center gap-2 p-2 bg-[#0c0c0c]/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        {/* Logo / Home Indicator */}
        <div className="px-4 py-2 border-r border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_#00ffcc]"></div>
          <span className="text-xs font-black tracking-widest text-white/50 uppercase">ANANDU</span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative px-5 py-2 group transition-all duration-500"
              onClick={() => setActive(item.id)}
            >
              <span className={`relative z-10 text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-500 ${active === item.id ? "text-teal-400 font-bold" : "text-gray-400 group-hover:text-white"
                }`}>
                {item.label}
              </span>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>

              {/* Active Indicator (pill) */}
              {active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-linear-to-r from-teal-500/20 to-indigo-500/20 border border-teal-500/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Status indicator */}
        <div className="pl-4 pr-6 py-2 border-l border-white/10 text-[9px] font-mono whitespace-nowrap hidden lg:block">
          <span className="text-teal-400 opacity-60">LINK_STATUS: </span>
          <span className="text-white brightness-125 animate-pulse">OPTIMIZED</span>
        </div>
      </motion.nav>
    </div>
  );
}
