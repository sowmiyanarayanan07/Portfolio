"use client";

import { motion } from "framer-motion";
import { services } from "@/data/personal";

/**
 * SkillsSection - Animated marquee of service/skill names scrolling horizontally.
 * Transitions from dark background to cream to create the section separator effect.
 */
export function SkillsSection() {
  // Duplicate items for seamless marquee loop
  const marqueeItems = [...services, ...services, ...services, ...services];

  return (
    <section
      style={{
        backgroundColor: "var(--cream)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Top curved separator from dark section */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "var(--dark)",
          position: "relative",
          height: "80px",
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            d="M0 0 L1440 0 L1440 20 Q720 80 0 20 Z"
            fill="#f0ece4"
          />
        </svg>
      </div>

      {/* Section label */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "4rem clamp(1.5rem, 5vw, 4rem) 2rem",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="label-text"
          style={{
            color: "rgba(0,0,0,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
          }}
        >
          Building expertise through
        </motion.p>
      </div>

      {/* Marquee row 1 */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div
          style={{
            display: "flex",
            gap: "0",
            whiteSpace: "nowrap",
          }}
        >
          <div
            className="animate-marquee"
            style={{
              display: "flex",
              gap: "0",
              flexShrink: 0,
            }}
          >
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0 2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4.5rem)",
                    fontWeight: "800",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--yellow)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee row 2 - reverse direction */}
      <div style={{ overflow: "hidden", position: "relative", marginTop: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0",
              flexShrink: 0,
              animation: "marquee 25s linear infinite reverse",
            }}
          >
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0 2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4.5rem)",
                    fontWeight: "800",
                    color: "rgba(0,0,0,0.08)",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: "1400px",
          margin: "5rem auto 0",
          padding: "0 clamp(1.5rem, 5vw, 4rem) 6rem",
          display: "grid",
          gridTemplateColumns: "var(--skills-grid-cols, 1fr 1fr)",
          gap: "var(--skills-grid-gap, 4rem)",
        }}
      >
        {/* Technical Skills */}
        <div>
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            Technical Skills
          </h3>
          <ul style={{ listStyle: "none" }}>
            {[
              "Python Programming",
              "Machine Learning",
              "Data Analysis",
              "MySQL",
              "Java",
              "HTML",
              "CSS",
              "Pandas & NumPy",
            ].map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-primary)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Soft Skills + Education */}
        <div>
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            Soft Skills
          </h3>
          <ul style={{ listStyle: "none", marginBottom: "3rem" }}>
            {[
              "Root Cause Analysis",
              "Adaptability",
              "Pattern Recognition",
              "Teamwork",
              "Problem Solving",
              "Critical Thinking",
            ].map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--yellow-dark)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {skill}
              </motion.li>
            ))}
          </ul>

          {/* Education */}
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            Education
          </h3>
          {[
            {
              degree: "B.Tech – AI & Data Science",
              school: "RVS College of Engineering",
              detail: "CGPA: 8.05 · 2022–2026",
            },
            {
              degree: "Higher Secondary – CS",
              school: "Chidambaram Matric School",
              detail: "78% · 2022",
            },
          ].map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                padding: "1rem 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.2rem",
                }}
              >
                {edu.degree}
              </p>
              <p style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.6)" }}>
                {edu.school}
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(0,0,0,0.4)",
                  marginTop: "0.2rem",
                }}
              >
                {edu.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
