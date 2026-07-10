"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { KineticTypography } from "@/components/layout/KineticTypography";
import { personal } from "@/data/personal";

/**
 * HeroSection - Full-viewport opening section.
 * Large bold name centered, role label on left, location on right.
 * Matches the reference site's hero exactly.
 */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax effect on hero text on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 10;

      const titleEl = container.querySelector<HTMLElement>(".hero-title");
      if (titleEl) {
        titleEl.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-scroll to Services section (#about) 2s after loader completes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Safely scroll only if the user hasn't already scrolled down manually
      if (window.scrollY < 50) {
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 4500); // 2.5s loader + 2s presentation

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
        borderLeft: "1px solid rgba(0,0,0,0.07)",
        borderRight: "1px solid rgba(0,0,0,0.07)",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Signature mark at top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <svg
          width="100"
          height="75"
          viewBox="0 0 200 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Signature"
        >
          {/* Path 1: Cursive letters */}
          <path
            d="M 50,85 C 45,55 58,40 56,65 C 54,90 64,85 66,55 C 68,25 76,40 76,75 C 76,105 84,105 84,85 C 84,65 88,95 88,95"
            stroke="#c4784a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Path 2: Underline slash */}
          <path
            d="M 58,92 C 65,95 72,95 78,92 L 145,68"
            stroke="#c4784a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Horizontal separator line through center */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.08)",
          transformOrigin: "center",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: "100%", position: "relative", textAlign: "center" }}
      >
        {/* Role label - left */}
        <motion.div
          variants={itemVariants}
          style={{
            position: "absolute",
            left: "clamp(1.5rem, 5vw, 4rem)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <span
            className="label-text"
            style={{ color: "var(--text-primary)", opacity: 0.7 }}
          >
            {personal.tagline}
          </span>
        </motion.div>

        {/* Main name */}
        <motion.div variants={itemVariants}>
          <h1
            className="hero-title display-xl"
            style={{
              color: "var(--text-primary)",
              transition: "transform 0.3s ease",
              willChange: "transform",
              paddingLeft: "clamp(1rem, 8vw, 8rem)",
              paddingRight: "clamp(1rem, 8vw, 8rem)",
            }}
          >
            <KineticTypography text="SOWMIYA" style={{ display: "block" }} />
            <KineticTypography text="NARAYANAN S" style={{ display: "block" }} />
          </h1>
        </motion.div>

        {/* Location - right */}
        <motion.div
          variants={itemVariants}
          style={{
            position: "absolute",
            right: "clamp(1.5rem, 5vw, 4rem)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <span
            className="label-text"
            style={{ color: "var(--text-primary)", opacity: 0.7 }}
          >
            {personal.location}
          </span>
        </motion.div>

        {/* CTA button - Curious? */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.button
            onClick={() => {
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="pill-btn"
            style={{
              backgroundColor: "#5bb8f5",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "500",
              border: "none",
            }}
            whileHover={{ scale: 1.05, backgroundColor: "#4aa8e8" }}
            whileTap={{ scale: 0.97 }}
            data-cursor-hover
          >
            Curious?
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
