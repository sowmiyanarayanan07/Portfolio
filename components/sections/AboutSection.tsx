"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * AboutSection - Dark background with scroll-triggered text color reveal.
 * Words start as faded/gray and become bright white as user scrolls through.
 * Replicates the "4+ years of crafting meaningful products..." section.
 */
export function AboutSection() {
  const textRef = useRef<HTMLDivElement>(null);

  const words =
    "2+ years of building intelligent data solutions, AI-driven models, and real-world insights that actually matter.".split(
      " "
    );

  useEffect(() => {
    const textContainer = textRef.current;
    if (!textContainer) return;

    const wordEls = textContainer.querySelectorAll<HTMLSpanElement>(".scroll-word");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -20% 0px" }
    );

    wordEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // GSAP scroll-triggered word reveal (sequential)
  useEffect(() => {
    const textContainer = textRef.current;
    if (!textContainer) return;

    const wordEls =
      textContainer.querySelectorAll<HTMLSpanElement>(".scroll-word");

    const handleScroll = () => {
      const containerRect = textContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // How far through the section we've scrolled (0 to 1)
      const progress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - containerRect.top) /
            (viewportHeight + containerRect.height)
        )
      );

      // Reveal words proportionally
      const revealCount = Math.floor(progress * wordEls.length * 2.2);

      wordEls.forEach((word, i) => {
        if (i < revealCount) {
          word.style.color = "#f0ece4";
        } else {
          word.style.color = "rgba(240, 236, 228, 0.18)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      style={{
        backgroundColor: "var(--dark)",
        position: "relative",
        zIndex: 2,
        padding: "10rem clamp(1.5rem, 8vw, 8rem)",
      }}
    >
      <div
        ref={textRef}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
            fontWeight: "700",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="scroll-word"
              style={{
                display: "inline-block",
                color: "rgba(240, 236, 228, 0.18)",
                marginRight: "0.3em",
                transition: "color 0.3s ease",
                willChange: "color",
              }}
            >
              {/* Bold the first few words */}
              {i === 0 ? (
                <strong style={{ color: "inherit", fontWeight: 800 }}>
                  {word}
                </strong>
              ) : (
                word
              )}
            </span>
          ))}
        </p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "2rem",
            textAlign: "left",
          }}
        >
          {[
            { number: "4+", label: "Projects Built" },
            { number: "2", label: "Internships" },
            { number: "4", label: "Certifications" },
            { number: "8.05", label: "CGPA" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: "800",
                  color: "#f0ece4",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(240, 236, 228, 0.5)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
