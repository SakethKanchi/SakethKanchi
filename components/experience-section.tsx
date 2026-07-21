import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { JourneyStop } from "@/components/journey-stop";
import { experience } from "@/content";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" aria-label="Experience">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader render="02" label="Experience" reveal="word" />
        <div className="mt-8 border-b border-line">
          {experience.map((s) => (
            <JourneyStop key={s.index} stop={s} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
