"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  animateOverride?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  style,
  delay = 0,
  duration = 0.8,
  yOffset = 50,
  once = true,
  animateOverride,
}: ScrollRevealProps) {
  const revealVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      transition: {
        duration: 0.3, // Fast reset when scrolling out of view
        ease: "easeOut" as const,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] as const, // Smooth custom ease curve
      },
    },
  };

  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      animate={animateOverride !== undefined ? (animateOverride ? "visible" : "hidden") : undefined}
      whileInView={animateOverride === undefined ? "visible" : undefined}
      viewport={animateOverride === undefined ? { once: once, margin: "-10% 0px -10% 0px" } : undefined}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
