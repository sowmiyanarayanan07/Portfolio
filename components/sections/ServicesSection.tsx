"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ParticleRippleBackground } from "./ParticleRippleBackground";

/**
 * ServicesSection - Yellow background section with profile photo and role pills.
 * Replicates the "Brand Designer | Web Designer | Product Designer" section
 * with dotted background pattern.
 */
export function ServicesSection() {
  const roles = [
    { label: "Data Scientist", delay: 0 },
    { label: "ML Engineer", delay: 0.1 },
    { label: "AI Developer", delay: 0.2 },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top > viewportHeight) {
        // Section is completely below the viewport (user is in Hero section) -> reset state
        setIsRevealed(false);
      } else if (rect.top <= viewportHeight * 0.75) {
        // Section has entered the viewport -> reveal state
        setIsRevealed(true);
      }
      // If rect.bottom < 0 (user scrolls down further to About section),
      // we intentionally do nothing, keeping isRevealed = true to prevent blanking out.
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalBars = 5;

  const curtainVariants = {
    hidden: {
      scaleY: 1,
      transition: {
        duration: 0.3, // Fast cover-up when scrolling out
        ease: "easeOut" as const,
      },
    },
    visible: (index: number) => ({
      scaleY: 0,
      transition: {
        duration: 2.0, // Slow, premium reveal
        delay: index * 0.15,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  const imageVariants = {
    hidden: {
      scale: 1.15,
      transition: {
        duration: 0.3, // Fast zoom reset when scrolling out
        ease: "easeOut" as const,
      },
    },
    visible: {
      scale: 1,
      transition: {
        duration: 2.2, // Slow zoom reveal
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: "#f5f4f0",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      {/* Interactive canvas particle background */}
      <ParticleRippleBackground parentRef={sectionRef} />
      {/* 5-Column Curtain Reveal Overlay (staggered bars) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 100,
          display: "grid",
          gridTemplateColumns: `repeat(${totalBars}, 1fr)`,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {Array.from({ length: totalBars }).map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={curtainVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
            style={{
              height: "100%",
              backgroundColor: "var(--cream)", // Fades/slides from the Hero background
              transformOrigin: "bottom", // Collapses downwards
            }}
          />
        ))}
      </div>

      {/* Dynamic particle grid canvas functions as the background pattern */}

      {/* Decorative brush strokes / scribble lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", opacity: 0.6 }}
        >
          <path
            d="M-50 250 C150 80 350 400 550 200 C750 0 850 350 1050 180 C1250 10 1350 260 1500 220"
            stroke="white"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M-50 280 C100 150 300 380 500 240 C700 100 900 320 1100 200 C1300 80 1400 240 1500 200"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Content wrapper */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "4rem clamp(1.5rem, 5vw, 4rem) 0",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Role pills row - positioned above photo like reference */}
        <ScrollReveal
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
          yOffset={30}
          duration={1.2}
          once={false}
          animateOverride={isRevealed}
        >
          {roles.map((role) => (
            <span
              key={role.label}
              className="pill-btn pill-btn-dark"
              style={{
                fontSize: "clamp(0.85rem, 2vw, 1.15rem)",
                fontWeight: "700",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              {role.label}
            </span>
          ))}
        </ScrollReveal>

        {/* Profile photo - centered */}
        <div
          style={{
            width: "clamp(240px, 35vw, 400px)",
            aspectRatio: "3 / 4.5",
            position: "relative",
            borderRadius: "0",
            overflow: "hidden",
          }}
        >
          {/* Image Zoom Animation synced with full-section curtain */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Image
              src="/Portfolio/low mb.png"
              alt="SOWMIYA NARAYANAN S - Aspiring Data Scientist"
              fill
              unoptimized
              style={{ objectFit: "cover", objectPosition: "top center" }}
              sizes="(max-width: 768px) 70vw, 400px"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
