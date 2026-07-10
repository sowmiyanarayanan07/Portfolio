import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Main homepage - assembles all sections in the exact order from the reference site.
 */
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Services / Profile (yellow banner) */}
      <ServicesSection />

      {/* 3. About (dark, scroll text reveal) */}
      <AboutSection />

      {/* 4. Skills (marquee + lists) */}
      <SkillsSection />

      {/* 5. Experience (timeline + certs) */}
      <ExperienceSection />

      {/* 6. Projects (2-col grid) */}
      <ProjectsSection />

      {/* 7. Contact + Footer (yellow) */}
      <ContactSection />
    </>
  );
}
