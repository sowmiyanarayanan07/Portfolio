"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";

/**
 * ProjectsSection - "CURATED PROJECTS" grid layout replicating the reference site.
 * 2-column grid with year labels, project names, and category tags.
 * Hover reveals a colored overlay with the project image/logo.
 */
export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Project background colors for hover state
  const projectColors: Record<string, string> = {
    "customer-segmentation": "#e8f4fd",
    "text-privacy-masker": "#f0e8fd",
    "sleep-health-study": "#e8fdf0",
    "civic-resolve-ai": "#fdf0e8",
    "prism-internship": "#fde8e8",
    "genuine-it-internship": "#e8fdf4",
  };

  // Project icon SVGs (inline for each project)
  const ProjectIcon = ({ id }: { id: string }) => {
    const icons: Record<string, React.ReactNode> = {
      "customer-segmentation": (
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <circle cx="40" cy="32" r="16" stroke="#1a1a1a" strokeWidth="2.5" />
          <circle cx="20" cy="55" r="10" stroke="#1a1a1a" strokeWidth="2" opacity="0.5" />
          <circle cx="60" cy="55" r="10" stroke="#1a1a1a" strokeWidth="2" opacity="0.5" />
          <circle cx="40" cy="65" r="10" stroke="#1a1a1a" strokeWidth="2" opacity="0.3" />
        </svg>
      ),
      "text-privacy-masker": (
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <rect x="10" y="20" width="60" height="40" rx="4" stroke="#1a1a1a" strokeWidth="2.5" />
          <line x1="18" y1="33" x2="62" y2="33" stroke="#1a1a1a" strokeWidth="2" opacity="0.4" />
          <rect x="18" y="38" width="28" height="4" rx="2" fill="#1a1a1a" />
          <rect x="18" y="46" width="44" height="4" rx="2" fill="#1a1a1a" opacity="0.3" />
          <path d="M54 16 L62 20 L54 24" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      "sleep-health-study": (
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <path d="M15 60 Q25 20 35 45 Q45 70 55 30 Q62 10 70 25" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="60" r="3" fill="#1a1a1a" />
          <circle cx="70" cy="25" r="3" fill="#1a1a1a" />
          <line x1="10" y1="65" x2="75" y2="65" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.3" />
        </svg>
      ),
      "civic-resolve-ai": (
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <rect x="20" y="15" width="40" height="50" rx="6" stroke="#1a1a1a" strokeWidth="2.5" />
          <circle cx="40" cy="38" r="10" stroke="#1a1a1a" strokeWidth="2" />
          <path d="M36 38 L38 40 L44 34" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="28" y1="55" x2="52" y2="55" stroke="#1a1a1a" strokeWidth="2" opacity="0.4" />
        </svg>
      ),
      "prism-internship": (
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <polygon points="40,10 70,65 10,65" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
          <line x1="40" y1="30" x2="40" y2="55" stroke="#1a1a1a" strokeWidth="2" opacity="0.6" />
          <circle cx="40" cy="25" r="4" fill="#1a1a1a" />
        </svg>
      ),
      "genuine-it-internship": (
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <circle cx="40" cy="40" r="24" stroke="#1a1a1a" strokeWidth="2.5" />
          <path d="M25 40 L35 50 L55 30" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    };
    return <>{icons[id] || null}</>;
  };

  return (
    <section
      id="projects"
      style={{
        backgroundColor: "var(--cream)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Section header */}
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "5rem clamp(1.5rem, 5vw, 4rem) 3rem",
          textAlign: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg"
          style={{ color: "var(--text-primary)", marginBottom: "1.5rem" }}
        >
          CURATED PROJECTS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            fontSize: "1rem",
            color: "rgba(0,0,0,0.6)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Selection of projects across data science, machine learning, and AI
          – each one built with intention.
        </motion.p>
      </div>

      {/* Projects grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {projects.map((project, i) => {
          const isClickable = !!project.link;

          const cardContent = (
            <>
              {/* Hover Background Image Reveal */}
              {project.image && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      style={{
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  </motion.div>
                  {/* Subtle Dark Overlay for contrast */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === project.id ? 0.45 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "#000",
                    }}
                  />
                </div>
              )}

              {/* Year */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "2rem",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color:
                      hoveredId === project.id && project.image
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.4)",
                    letterSpacing: "0.05em",
                    transition: "color 0.3s ease",
                  }}
                >
                  {project.year}
                </span>
                <motion.div
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    x: hoveredId === project.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:
                      hoveredId === project.id && project.image
                        ? "#fff"
                        : "rgba(0,0,0,0.4)",
                    transition: "color 0.3s ease",
                  }}
                >
                  View →
                </motion.div>
              </div>

              {/* Icon */}
              <motion.div
                animate={{
                  scale: hoveredId === project.id ? 1.05 : 1,
                  y: hoveredId === project.id ? -4 : 0,
                  opacity: hoveredId === project.id && project.image ? 0 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  padding: "1rem 0",
                  zIndex: 1,
                }}
              >
                <ProjectIcon id={project.id} />
              </motion.div>

              {/* Project title & category */}
              <div style={{ marginTop: "2rem", zIndex: 1 }}>
                <p
                  style={{
                    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:
                      hoveredId === project.id && project.image
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.5)",
                    marginBottom: "0.5rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {project.category}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    fontWeight: "700",
                    color:
                      hoveredId === project.id && project.image
                        ? "#fff"
                        : "var(--text-primary)",
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </>
          );

          const sharedStyle: React.CSSProperties = {
            position: "relative",
            borderRight: i % 2 === 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "3rem clamp(1.5rem, 4vw, 3rem)",
            overflow: "hidden",
            cursor: isClickable ? "none" : "default",
            minHeight: "320px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor:
              hoveredId === project.id
                ? projectColors[project.id] || "#f5f5f0"
                : "transparent",
            transition: "background-color 0.4s ease",
            textDecoration: "none",
          };

          if (isClickable) {
            return (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: (i % 2) * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                style={sharedStyle}
              >
                {cardContent}
              </motion.a>
            );
          }

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: (i % 2) * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={sharedStyle}
            >
              {cardContent}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
