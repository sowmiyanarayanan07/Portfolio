"use client";

/**
 * NomineeBadge - the rotated "S. Portfolio" badge on the right side of the page.
 * Replicates the "W. Nominee" tab from the reference site.
 */
export function NomineeBadge() {
  return (
    <div
      className="side-badge"
      aria-label="Portfolio Badge"
      style={{ zIndex: 200 }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "#f0ece4",
          padding: "0.5rem 0.75rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: "800",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          S.
        </span>
        <span
          style={{
            fontSize: "0.55rem",
            fontWeight: "500",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Portfolio
        </span>
      </div>
    </div>
  );
}
