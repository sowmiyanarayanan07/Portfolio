"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen - page load animation.
 * Shows a brief animated intro before the main content appears.
 * Replicates the loading animation from premium portfolio sites.
 */
export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#1e1e1e",
            zIndex: 9000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated Hand-drawn Signature SVG */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "280px",
              height: "210px",
            }}
          >
            <svg
              width="280"
              height="210"
              viewBox="0 0 200 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              {/* Path 1: Cursive letters */}
              <motion.path
                d="M 50,85 C 45,55 58,40 56,65 C 54,90 64,85 66,55 C 68,25 76,40 76,75 C 76,105 84,105 84,85 C 84,65 88,95 88,95"
                stroke="#c4784a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.4,
                  ease: "easeInOut",
                }}
              />
              {/* Path 2: Underline slash */}
              <motion.path
                d="M 58,92 C 65,95 72,95 78,92 L 145,68"
                stroke="#c4784a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: 1.1,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
