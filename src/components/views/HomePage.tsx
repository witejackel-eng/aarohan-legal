"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { InstitutionalIntroSection } from "@/components/sections/InstitutionalIntroSection";
import { MovingPracticeIndex } from "@/components/sections/MovingPracticeIndex";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { PracticeAreasSection } from "@/components/sections/PracticeAreasSection";
import { LegalStructureSection } from "@/components/sections/LegalStructureSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { PerspectivesSection } from "@/components/sections/PerspectivesSection";
import { GeneralInfoSection } from "@/components/sections/GeneralInfoSection";

/**
 * Homepage composition — assembles sections 01 through 09 in the
 * order specified by the brand brief §10. Footer is rendered by
 * the page shell.
 */
export function HomePage() {
  return (
    <main id="main" className="relative">
      <HeroSection />
      <InstitutionalIntroSection />
      <MovingPracticeIndex />
      <PrinciplesSection />
      <PracticeAreasSection />
      <LegalStructureSection />
      <MethodSection />
      <PerspectivesSection />
      <GeneralInfoSection />
    </main>
  );
}
