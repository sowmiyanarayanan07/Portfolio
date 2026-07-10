"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/personal";

/**
 * FloatingMenu - the bottom-center pill menu button from the reference site.
 * Clicking it opens a full-screen dark navigation overlay with stagger animations.
 */
export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Detect scroll to show/hide
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  return (
    <>
      {/* Floating pill button */}
      <motion.div
        className="fixed bottom-6 left-1/2 z-[300]"
        style={{ translateX: "-50%" }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="pill-btn pill-btn-yellow"
          style={{
            fontSize: "0.9rem",
            fontWeight: "600",
            letterSpacing: "0.05em",
            gap: "1rem",
            paddingLeft: "1.75rem",
            paddingRight: "1.75rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span>Menu</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ display: "inline-block", fontSize: "1.1rem", lineHeight: 1 }}
          >
            {isOpen ? "×" : "≡"}
          </motion.span>
        </button>
      </motion.div>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#1e1e1e",
              zIndex: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Nav links */}
            <nav aria-label="Main navigation">
              <ul
                style={{
                  listStyle: "none",
                  textAlign: "center",
                  marginBottom: "3rem",
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ marginBottom: "1rem" }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      style={{
                        fontSize: "clamp(2rem, 6vw, 4rem)",
                        fontWeight: "800",
                        color: "#f0ece4",
                        letterSpacing: "-0.02em",
                        background: "none",
                        border: "none",
                        cursor: "none",
                        transition: "color 0.2s ease, opacity 0.2s ease",
                        lineHeight: 1.1,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#f5e432";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#f0ece4";
                      }}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Email at bottom of menu */}
            <motion.a
              href={`mailto:${personal.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                color: "rgba(240,236,228,0.5)",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
              }}
            >
              {personal.email}
            </motion.a>

            {/* Close hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                position: "absolute",
                bottom: "5rem",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#f0ece4",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Press ESC to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
