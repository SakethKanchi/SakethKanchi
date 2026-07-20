import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { WorkCard } from "@/components/work-card";
import { selectedWork } from "@/content";

export function WorkSection() {
  return (
    <SectionWrapper
      id="work"
      aria-label="Selected work"
      className="px-6 sm:px-10"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader render="01" label="Selected work" reveal="word" />
        <div className="mt-10">
          {selectedWork.map((p) => (
            <WorkCard key={p.index} project={p} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}