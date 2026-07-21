import { Intro } from "@/components/intro";
import { WorkSection } from "@/components/work-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { OssSection } from "@/components/oss-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Intro />
      <WorkSection />
      <ExperienceSection />
      <EducationSection />
      <OssSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
