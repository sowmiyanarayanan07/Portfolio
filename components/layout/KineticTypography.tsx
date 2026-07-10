"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticLetterProps {
  char: string;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  letterClassName?: string;
  letterStyle?: React.CSSProperties;
  radius: number;
  strength: number;
  mode: "repel" | "attract";
  yStrengthFactor: number;
}

function MagneticLetter({
  char,
  mouseRef,
  letterClassName,
  letterStyle,
  radius,
  strength,
  mode,
  yStrengthFactor,
}: MagneticLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // Motion values for offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  // Spring settings - fast, responsive and snappy (no lag)
  const springConfig = { damping: 18, stiffness: 140, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springRotate = useSpring(rotate, springConfig);

  // Center coordinate of letter page-relative
  const centerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateCenter = () => {
      const rect = el.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY + rect.height / 2,
      };
    };

    // Calculate initial position once layout has settled
    const timeoutId = setTimeout(updateCenter, 150);

    window.addEventListener("resize", updateCenter);
    // Re-verify positions if scroll changes page layout flow
    window.addEventListener("scroll", updateCenter, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter);
    };
  }, []);

  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const mCoords = mouseRef.current;
      if (!mCoords) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const { x: mX, y: mY } = mCoords;
      const { x: cX, y: cY } = centerRef.current;

      // Skip calculation if positions aren't initialized yet
      if (cX === 0 && cY === 0) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const dx = mX - cX;
      const dy = mY - cY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        const factor = 1 - distance / radius; // 1 at center, 0 at outer edge
        const ux = dx / (distance || 1);
        const uy = dy / (distance || 1);

        let targetX = 0;
        let targetY = 0;

        if (mode === "repel") {
          targetX = -ux * strength * factor;
          targetY = -uy * (strength * yStrengthFactor) * factor;
        } else {
          targetX = ux * strength * factor;
          targetY = uy * (strength * yStrengthFactor) * factor;
        }

        const targetRotate = -ux * 8 * factor;
        const targetScale = 1 + 0.1 * factor;

        x.set(targetX);
        y.set(targetY);
        rotate.set(targetRotate);
        scale.set(targetScale);
      } else {
        x.set(0);
        y.set(0);
        rotate.set(0);
        scale.set(1);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [radius, strength, mode, yStrengthFactor, mouseRef]);

  return (
    <motion.span
      ref={ref}
      className={letterClassName}
      style={{
        display: "inline-block",
        x: springX,
        y: springY,
        scale: springScale,
        rotate: springRotate,
        transformOrigin: "center",
        whiteSpace: char === " " ? "pre" : "normal",
        willChange: "transform",
        ...letterStyle,
      }}
    >
      {char}
    </motion.span>
  );
}

interface KineticTypographyProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  letterClassName?: string;
  letterStyle?: React.CSSProperties;
  radius?: number;
  strength?: number;
  mode?: "repel" | "attract";
  yStrengthFactor?: number;
}

export function KineticTypography({
  text,
  className,
  style,
  letterClassName,
  letterStyle,
  radius = 150,
  strength = 25,
  mode = "repel",
  yStrengthFactor = 0.15, // Keep vertical offset extremely subtle by default (15% of X offset)
}: KineticTypographyProps) {
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.pageX, y: e.pageY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const letters = text.split("");

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {letters.map((char, index) => (
        <MagneticLetter
          key={index}
          char={char}
          mouseRef={mouseRef}
          letterClassName={letterClassName}
          letterStyle={letterStyle}
          radius={radius}
          strength={strength}
          mode={mode}
          yStrengthFactor={yStrengthFactor}
        />
      ))}
    </div>
  );
}
