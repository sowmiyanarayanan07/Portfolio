"use client";

import { useEffect, useRef } from "react";

interface ParticleRippleBackgroundProps {
  parentRef: React.RefObject<HTMLElement | null>;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  currentSize: number;
  opacity: number;
  currentOpacity: number;
  density: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  life: number;
}

/**
 * ParticleRippleBackground - High-performance interactive background using HTML5 Canvas.
 * Configured with subtle, minimal physics and a light photography studio aesthetic
 * to contrast and stand out behind a dark suit portrait.
 */
export function ParticleRippleBackground({ parentRef }: ParticleRippleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = parentRef.current || canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    
    // Mouse state tracking relative to container
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      lastX: null as number | null,
      lastY: null as number | null,
    };
    let isHovering = false;

    // Simulation constants - modified for subtle, light interactions
    const spacing = 28; // Increased spacing for a cleaner, less crowded canvas
    const springStrength = 0.06; // Stronger returns (faster restoration)
    const friction = 0.85; // Lower dampening (particles settle quickly)
    const repulsionStrength = 4.2; // Significantly reduced push strength
    const mouseRadius = 80; // Localized cursor interaction circle

    /**
     * Initializes the grid of particles based on container dimensions
     */
    const initGrid = (w: number, h: number) => {
      particles = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      // Centering calculations
      const offsetX = (w - (cols - 1) * spacing) / 2;
      const offsetY = (h - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = offsetX + c * spacing;
          const baseY = offsetY + r * spacing;
          
          // Smaller, lighter dots for a clean, non-distracting visual
          const size = 1.0 + Math.random() * 0.8;
          const opacity = 0.10 + Math.random() * 0.12;
          
          particles.push({
            x: baseX,
            y: baseY,
            baseX,
            baseY,
            vx: 0,
            vy: 0,
            size,
            currentSize: size,
            opacity,
            currentOpacity: opacity,
            density: 0.8 + Math.random() * 1.2,
          });
        }
      }
    };

    // ResizeObserver tracks container boundaries dynamically
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        width = rect.width;
        height = rect.height;

        // Account for Retina / High DPI displays to prevent blurry canvas pixels
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);

        initGrid(width, height);
      }
    });

    resizeObserver.observe(parent);

    // Event listener callbacks
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = x;
      mouse.y = y;
      isHovering = true;

      // Generate a faint, gentle ripple if the cursor is moving swiftly
      if (mouse.lastX !== null && mouse.lastY !== null) {
        const distMoved = Math.hypot(x - mouse.lastX, y - mouse.lastY);
        // High distance threshold to trigger trail ripples sparingly
        if (distMoved > 60) {
          ripples.push({
            x,
            y,
            radius: 0,
            maxRadius: 100 + Math.random() * 40,
            speed: 2.2 + Math.random() * 1.0,
            strength: distMoved * 0.03, // very low ripple intensity
            life: 1,
          });
          mouse.lastX = x;
          mouse.lastY = y;
        }
      } else {
        mouse.lastX = x;
        mouse.lastY = y;
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouse.x = null;
      mouse.y = null;
      mouse.lastX = null;
      mouse.lastY = null;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spawn a gentle, moderate propagating wave on click
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 220,
        speed: 3.8,
        strength: 5.5,
        life: 1,
      });
    };

    // Attach listeners strictly to the parent container
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("click", handleClick);

    // Core animation/physics update loop
    const animate = () => {
      // Clear with soft, professional photography studio grey/cream gradient
      ctx.fillStyle = "#f5f4f0";
      ctx.fillRect(0, 0, width, height);

      const ambientGlow = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      ambientGlow.addColorStop(0, "#fcfbfa"); // bright portrait highlight
      ambientGlow.addColorStop(1, "#ebe8e1"); // smooth outer studio shadow
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Gentle halo under the cursor
      if (isHovering && mouse.x !== null && mouse.y !== null) {
        const radialGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius * 1.5
        );
        radialGlow.addColorStop(0, "rgba(99, 102, 241, 0.06)"); // light, warm indigo hint
        radialGlow.addColorStop(0.6, "rgba(99, 102, 241, 0.01)");
        radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Propagate and decay ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.life = 1 - (ripple.radius / ripple.maxRadius);
        if (ripple.life <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Render & simulate particles
      particles.forEach((p) => {
        // Return-to-home spring physics
        const springForceX = (p.baseX - p.x) * springStrength;
        const springForceY = (p.baseY - p.y) * springStrength;

        p.vx += springForceX;
        p.vy += springForceY;
        p.vx *= friction;
        p.vy *= friction;

        // Handle cursor hover repulsion
        if (isHovering && mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const strength = (force * repulsionStrength) / p.density;
            const dirX = dist > 0 ? dx / dist : 0;
            const dirY = dist > 0 ? dy / dist : 0;

            // Push particle
            p.vx += dirX * strength;
            p.vy += dirY * strength;

            // Subtle scale adjustment
            p.currentSize = p.size * (1 + force * 0.4);
            p.currentOpacity = Math.min(0.55, p.opacity + force * 0.25);
          } else {
            // Decay to normal size and opacity
            p.currentSize += (p.size - p.currentSize) * 0.12;
            p.currentOpacity += (p.opacity - p.currentOpacity) * 0.12;
          }
        } else {
          // No mouse: return to base settings
          p.currentSize += (p.size - p.currentSize) * 0.12;
          p.currentOpacity += (p.opacity - p.currentOpacity) * 0.12;
        }

        // Apply physical displacement from propagating ripple fronts
        ripples.forEach((ripple) => {
          const dx = p.x - ripple.x;
          const dy = p.y - ripple.y;
          const dist = Math.hypot(dx, dy);
          const thickness = 35; // Shorter wave thickness for tighter ripples
          const distFromWave = Math.abs(dist - ripple.radius);

          if (distFromWave < thickness) {
            const waveForce = (thickness - distFromWave) / thickness;
            const strength = (waveForce * ripple.strength * ripple.life) / p.density;
            const dirX = dist > 0 ? dx / dist : 0;
            const dirY = dist > 0 ? dy / dist : 0;

            // Shift particle
            p.vx += dirX * strength;
            p.vy += dirY * strength;

            p.currentSize = Math.max(p.currentSize, p.size * (1 + waveForce * 0.5));
            p.currentOpacity = Math.min(
              0.60,
              Math.max(p.currentOpacity, p.opacity + waveForce * 0.2)
            );
          }
        });

        // Integrate velocity into position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.currentSize, 0, Math.PI * 2);
        
        // Color styling: slate grey blending to a subtle indigo/blue under movement
        const distFromBase = Math.hypot(p.x - p.baseX, p.y - p.baseY);
        const excitement = Math.min(1, distFromBase / 6 + (p.currentOpacity - p.opacity) * 1.2);
        
        let colorStr = "";
        if (excitement > 0.1) {
          const r = Math.round(100 + (70 - 100) * excitement);
          const g = Math.round(116 + (80 - 116) * excitement);
          const b = Math.round(139 + (120 - 139) * excitement);
          colorStr = `rgba(${r}, ${g}, ${b}, ${p.currentOpacity})`;
        } else {
          // Soft slate grey dots
          colorStr = `rgba(100, 116, 139, ${p.currentOpacity})`;
        }

        ctx.fillStyle = colorStr;
        ctx.fill();
        
        // Subtle crisp shadow overlay for interactive grid feedback
        if (excitement > 0.4) {
          ctx.fillStyle = `rgba(30, 41, 59, ${p.currentOpacity * 1.1})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up all observers and listeners on unmount
    return () => {
      resizeObserver.disconnect();
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [parentRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none", // Interaction coordinates tracked directly on parent section
      }}
    />
  );
}
