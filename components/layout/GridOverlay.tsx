"use client";

/**
 * GridOverlay - renders the subtle grid lines visible on the reference site.
 * Fixed position, covers the full viewport.
 */
export function GridOverlay() {
  return (
    <div
      className="grid-overlay"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    />
  );
}
