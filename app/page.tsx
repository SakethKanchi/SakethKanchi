"use client";

import { useState } from "react";

import { Splash } from "@/components/splash";
import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { OssSection } from "@/components/oss-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const [introReady, setIntroReady] = useState(false);

  return (
    <>
      {/* The splash owns first-visit timing. Hero reveal waits for its exit. */}
      <Splash onDone={() => setIntroReady(true)} />
      <Hero introReady={introReady} />
      <WorkSection />
      <ExperienceSection />
      <EducationSection />
      <OssSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}