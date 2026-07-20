import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { JourneyStop } from "@/components/journey-stop";
import { education } from "@/content";

export function EducationSection() {
  return (
    <SectionWrapper
      id="education"
      aria-label="Education"
      className="px-6 sm:px-10"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader render="03" label="Education" reveal="word" />
        <div className="mt-10">
          {education.map((s) => (
            <JourneyStop key={s.index} stop={s} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}