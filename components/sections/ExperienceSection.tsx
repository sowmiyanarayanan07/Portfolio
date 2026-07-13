"use client";

import { motion } from "framer-motion";

/**
 * ExperienceSection - Timeline of internship experiences.
 * Light cream background with horizontal timeline layout.
 */
export function ExperienceSection() {
  const experiences = [
    {
      role: "Software Intern",
      company: "Prism Software Solutions",
      period: "08/2024 – 11/2024",
      location: "Atlanta, GA, USA (Remote)",
      highlights: [
        "Enhanced backend functionality with Python-based APIs",
        "Implemented NLP and Hugging Face models for AI capabilities",
      ],
      tags: ["Python", "NLP", "Hugging Face", "APIs"],
    },
    {
      role: "Data Science Intern",
      company: "Genuine IT Solutions",
      period: "08/2024 – 09/2024",
      location: "Coimbatore (On-site)",
      highlights: [
        "Performed data collection, cleaning, and exploratory analysis",
        "Identified trends and correlations between sleep patterns and stress indicators",
      ],
      tags: ["Python", "EDA", "Data Cleaning", "Visualization"],
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--cream)",
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "6rem clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--experience-grid-cols, 1fr 2fr)",
            gap: "var(--experience-grid-gap, 3rem)",
            marginBottom: "4rem",
            alignItems: "flex-end",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display-md"
            style={{ color: "var(--text-primary)" }}
          >
            EXPERIENCE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "0.85rem",
              color: "rgba(0,0,0,0.4)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Industry exposure
          </motion.p>
        </div>

        {/* Experience list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "var(--experience-grid-cols, 1fr 2fr)",
                gap: "var(--experience-grid-gap, 3rem)",
                padding: "3rem 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {/* Left: Role info */}
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.35)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {exp.period}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    fontWeight: "800",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    color: "rgba(0,0,0,0.6)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {exp.company}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(0,0,0,0.4)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {exp.location}
                </p>
                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.3rem 0.8rem",
                        borderRadius: "100px",
                        border: "1px solid rgba(0,0,0,0.15)",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        letterSpacing: "0.04em",
                        color: "rgba(0,0,0,0.6)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: highlights */}
              <div style={{ paddingTop: "1.5rem" }}>
                <ul style={{ listStyle: "none" }}>
                  {exp.highlights.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.1, duration: 0.5 }}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        padding: "0.75rem 0",
                        borderBottom:
                          j < exp.highlights.length - 1
                            ? "1px solid rgba(0,0,0,0.06)"
                            : "none",
                        fontSize: "1rem",
                        color: "rgba(0,0,0,0.75)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(0,0,0,0.3)",
                          marginTop: "0.5rem",
                          flexShrink: 0,
                          fontSize: "0.6rem",
                        }}
                      >
                        ●
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: "5rem" }}
        >
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
              marginBottom: "2rem",
            }}
          >
            Certifications
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { title: "SQL and Relational Database 101", issuer: "Cognitive Class" },
              { title: "Machine Learning in Python", issuer: "Cognitive Class" },
              { title: "Fundamentals of Digital Marketing", issuer: "Google" },
              { title: "Cybersecurity & Ethical Hacking Workshop", issuer: "Workshop" },
            ].map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  padding: "1.5rem",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.25)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    marginBottom: "0.4rem",
                    lineHeight: 1.4,
                  }}
                >
                  {cert.title}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(0,0,0,0.45)",
                  }}
                >
                  {cert.issuer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
