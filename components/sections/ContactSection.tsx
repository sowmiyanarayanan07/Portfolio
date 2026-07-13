"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { KineticTypography } from "@/components/layout/KineticTypography";
import { personal } from "@/data/personal";

interface Particle {
  originX: number;
  originY: number;
  driftX: number;
  driftY: number;
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Element Refs for geometry tracking in custom canvas drawing
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const reachOutRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const [isCapturing, setIsCapturing] = useState(true);
  const [isCaptured, setIsCaptured] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // High performance animation refs (avoid React renders during scroll)
  const scrollRatioRef = useRef(0);
  const showHTMLRef = useRef(true);
  const [showHTML, setShowHTML] = useState(true);
  
  const avatarImgRef = useRef<HTMLImageElement | null>(null);

  const sectionTopRef = useRef<number>(0);
  const sectionHeightRef = useRef<number>(0);

  // Update layout bounds for scroll calculations (avoids calling getBoundingClientRect in rAF)
  useEffect(() => {
    const updateBounds = () => {
      const target = sectionRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const scrollY = window.scrollY;
        sectionTopRef.current = rect.top + scrollY;
        sectionHeightRef.current = rect.height;
      }
    };

    updateBounds();
    const t1 = setTimeout(updateBounds, 500);
    const t2 = setTimeout(updateBounds, 1500);

    window.addEventListener("resize", updateBounds, { passive: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  // Butter-smooth passive scroll listener to update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = sectionTopRef.current;
      const sectionHeight = sectionHeightRef.current;
      if (sectionHeight === 0) return;

      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const scrollStart = sectionTop - viewportHeight;
      const scrollEnd = docHeight - viewportHeight;

      let t = 1.0;
      if (scrollEnd > scrollStart) {
        const progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        t = Math.max(0, Math.min(1, progress));
      }
      scrollRatioRef.current = t;

      if (t >= 0.98) {
        if (!showHTMLRef.current) {
          showHTMLRef.current = true;
          setShowHTML(true);
        }
      } else {
        if (showHTMLRef.current) {
          showHTMLRef.current = false;
          setShowHTML(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const socialLinks = [
    {
      icon: "github",
      href: personal.github,
      label: "GitHub",
      svgPath:
        "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
    },
    {
      icon: "linkedin",
      href: personal.linkedin,
      label: "LinkedIn",
      svgPath:
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      icon: "email",
      href: `mailto:${personal.email}`,
      label: "Email",
      svgPath:
        "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    },
  ];

  // Helper: calculate absolute coords of elements relative to Contact Section
  const getRelativeCoords = (el: HTMLElement) => {
    const parent = sectionRef.current;
    if (!parent) return { x: 0, y: 0, w: 0, h: 0 };
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      w: rect.width,
      h: rect.height,
    };
  };

  // Custom 2D canvas drawing routine instead of html2canvas (avoids stylesheet locks and timeouts)
  // Returns true if successfully captured layout metrics and compiled non-zero particles
  const initializeParticles = (): boolean => {
    console.log("ContactSection: initializeParticles started");
    const parent = sectionRef.current;
    if (!parent || !canvasRef.current) {
      console.warn("ContactSection: parent or canvas ref missing during init");
      return false;
    }

    const parentRect = parent.getBoundingClientRect();
    const width = parentRect.width;
    const height = parentRect.height;
    console.log("ContactSection: parent bounds:", width, height);

    if (width === 0 || height === 0) {
      console.warn("ContactSection: Section width or height is 0, retrying");
      return false;
    }

    // Sync canvas resolution
    const displayCanvas = canvasRef.current;
    displayCanvas.width = width;
    displayCanvas.height = height;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) {
      console.warn("ContactSection: 2d context missing");
      return false;
    }

    ctx.clearRect(0, 0, width, height);

    // 0. Draw Watermark Letters
    const watermark = watermarkRef.current;
    if (watermark) {
      const letters = watermark.querySelectorAll("span");
      letters.forEach((letter) => {
        if (letter.textContent && letter.textContent.trim()) {
          const coords = getRelativeCoords(letter);
          const style = window.getComputedStyle(letter);
          ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          ctx.fillStyle = style.color;
          ctx.textBaseline = "top";
          ctx.fillText(letter.textContent, coords.x, coords.y);
        }
      });
    }

    // 1. Draw Avatar Image
    const avatar = avatarRef.current;
    if (avatar) {
      const coords = getRelativeCoords(avatar);
      if (avatarImgRef.current && avatarImgRef.current.complete) {
        ctx.drawImage(avatarImgRef.current, coords.x, coords.y, coords.w, coords.h);
        console.log("ContactSection: avatar drawn to canvas");
      } else {
        console.warn("ContactSection: avatarImgRef not complete during drawing");
      }
    }

    // 2. Draw Subtitle Paragraph: "Let's build something"
    const subText = subTextRef.current;
    if (subText) {
      const coords = getRelativeCoords(subText);
      const style = window.getComputedStyle(subText);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = "top";
      ctx.fillText("Let's build something", coords.x, coords.y);
      console.log("ContactSection: subText drawn:", coords);
    }

    // 3. Draw Main Heading: "MEANINGFUL" and "AND MEMORABLE"
    const heading = headingRef.current;
    if (heading) {
      const coords = getRelativeCoords(heading);
      const style = window.getComputedStyle(heading);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = "top";
      const fontSizePx = parseFloat(style.fontSize);
      ctx.fillText("MEANINGFUL", coords.x, coords.y);
      ctx.fillText("AND MEMORABLE", coords.x, coords.y + fontSizePx * 1.05);
      console.log("ContactSection: heading drawn:", coords);
    }

    // 4. Draw Right Label: "Reach out"
    const reachOut = reachOutRef.current;
    if (reachOut) {
      const coords = getRelativeCoords(reachOut);
      const style = window.getComputedStyle(reachOut);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = "top";
      ctx.textAlign = "right";
      ctx.fillText("Reach out", coords.x + coords.w, coords.y);
      ctx.textAlign = "left"; // reset align
      console.log("ContactSection: reachOut drawn:", coords);
    }

    // 5. Draw Social Badges (represent as filled dark circles)
    const socials = socialsRef.current;
    if (socials) {
      const badges = socials.querySelectorAll("a");
      badges.forEach((badge, idx) => {
        const coords = getRelativeCoords(badge);
        const radius = coords.w / 2;
        ctx.beginPath();
        ctx.arc(coords.x + radius, coords.y + radius, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fill();
        console.log(`ContactSection: badge ${idx} drawn:`, coords);
      });
    }

    // Extract compiled pixel coordinates (entire section is filled now!)
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const tempParticles: Particle[] = [];
    const step = 4;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (a > 10) {
          // Thanos snap drift: blow horizontally right and float vertically upwards
          const driftX = (0.3 + Math.random() * 0.7) * 260; // drift right (between 78px and 260px)
          const driftY = -(0.4 + Math.random() * 0.6) * 180; // float up (between -72px and -180px)

          tempParticles.push({
            originX: x,
            originY: y,
            driftX,
            driftY,
            r,
            g,
            b,
            a: a / 255,
            size: step - 1.2,
          });
        }
      }
    }

    console.log("ContactSection: particle count generated:", tempParticles.length);

    if (tempParticles.length > 100) {
      setParticles(tempParticles);
      setIsCaptured(true);
      setIsCapturing(false);
      console.log("ContactSection: particles set successfully, isCaptured = true");
      return true;
    }

    console.warn("ContactSection: particle count too low, retrying");
    return false;
  };

  // Mount logic: Preload avatar and trigger capture
  // Retries repeatedly (self-healing loop) in case of loading screen or layout delay
  useEffect(() => {
    let hasInit = false;
    let attempts = 0;
    const maxAttempts = 15; // retry for up to 7.5 seconds

    const runInit = () => {
      if (hasInit) return;
      
      const success = initializeParticles();
      if (success) {
        hasInit = true;
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(runInit, 500); // retry in 500ms
        } else {
          console.warn("ContactSection: Failed to compile particles after multiple retries. Using static layout.");
          setIsCapturing(false);
        }
      }
    };

    const img = new window.Image();
    img.src = "/Portfolio/avatar.png";
    img.onload = () => {
      avatarImgRef.current = img;
      runInit();
    };
    img.onerror = () => {
      console.warn("Avatar failed to load. Running init.");
      runInit();
    };

    // Safety fallback trigger in case image load event hangs
    const safetyTimer = setTimeout(runInit, 1500);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  // Butter-smooth canvas drawing loop (60fps utilizing standard requestAnimationFrame)
  useEffect(() => {
    if (!isCaptured || particles.length === 0) return;

    let animFrameId: number;
    let isIntersecting = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const tick = () => {
      if (!isIntersecting) return;

      const ratio = scrollRatioRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // If fully scrolled in, render standard static HTML (hide canvas)
      if (ratio >= 0.98) {
        animFrameId = requestAnimationFrame(tick);
        return;
      }

      // Draw particle positions linked to scroll ratio
      // Particle drift uses an ease-in calculation: (1 - ratio)^1.6
      const factor = Math.pow(1 - ratio, 1.6);

      particles.forEach((p) => {
        const dx = p.driftX * factor + Math.sin(p.originY + ratio * 8) * 12 * factor;
        const dy = p.driftY * factor + Math.cos(p.originX + ratio * 8) * 12 * factor;

        const currentX = p.originX + dx;
        const currentY = p.originY + dy;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a * ratio})`;
        ctx.fillRect(currentX, currentY, p.size, p.size);
      });

      animFrameId = requestAnimationFrame(tick);
    };

    // Pause/Play animation frame loop based on viewport intersection
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(animFrameId);
          tick();
        } else {
          cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0.01 }
    );

    const targetSection = sectionRef.current;
    if (targetSection) {
      observer.observe(targetSection);
    }

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, [isCaptured, particles]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
        minHeight: "80vh",
        backgroundColor: "var(--yellow)", // Parent section is solid yellow static background
      }}
    >
      {/* Dotted background pattern now stays static on the parent */}
      <div
        className="dotted-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Thanos snap canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 4,
          pointerEvents: "none",
          display: (isCaptured && !showHTML) ? "block" : "none",
        }}
      />

      {/* Main HTML CTA Content */}
      <div
        ref={contentRef}
        style={{
          opacity: (isCapturing || showHTML) ? 1 : 0,
          pointerEvents: showHTML ? "all" : "none",
          transition: "opacity 0.25s ease-out",
          width: "100%",
          height: "100%",
          minHeight: "80vh",
          position: "relative",
          zIndex: 2,
          backgroundColor: "transparent", // Transparent background so static parent yellow is visible
        }}
      >

        {/* Giant watermark name behind content */}
        <div
          ref={watermarkRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            textAlign: "center",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <KineticTypography
            text="SOWMIYA"
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
            letterStyle={{
              fontSize: "clamp(4rem, 14vw, 16rem)",
              fontWeight: "900",
              color: "rgba(0,0,0,0.08)",
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          />
          <KineticTypography
            text="NARAYANAN S"
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
            letterStyle={{
              fontSize: "clamp(4rem, 14vw, 16rem)",
              fontWeight: "900",
              color: "rgba(0,0,0,0.08)",
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          />
        </div>

        {/* Pixel avatar */}
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(120px, 15vw, 220px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          <img
            ref={avatarRef}
            src="/Portfolio/avatar.png"
            alt="Sowmiya Narayanan S Avatar"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>

        {/* CTA content */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "4rem clamp(1.5rem, 5vw, 4rem)",
            display: "flex",
            flexDirection: "column",
            minHeight: "80vh",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
              width: "100%",
            }}
          >
            {/* Left: CTA text */}
            <div>
              <p
                ref={subTextRef}
                style={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  color: "rgba(0,0,0,0.7)",
                  marginBottom: "0.5rem",
                }}
              >
                Let's build something
              </p>
              <h2
                ref={headingRef}
                className="display-md"
                style={{ color: "var(--text-primary)", lineHeight: 1 }}
              >
                MEANINGFUL
                <br />
                AND MEMORABLE
              </h2>
            </div>

            {/* Right: Social links */}
            <div style={{ textAlign: "right" }}>
              <p
                ref={reachOutRef}
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(0,0,0,0.5)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Reach out
              </p>
              <div
                ref={socialsRef}
                style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.icon}
                    href={link.href}
                    target={link.icon !== "email" ? "_blank" : undefined}
                    rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1.5px solid rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.8)";
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.3)";
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="var(--text-primary)"
                    >
                      <path d={link.svgPath} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
