import { skills } from "@/content/skills";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-14 lg:py-16">
      <span aria-hidden="true" className="hairline mb-14 block" />
      <SectionHeading index="04">Skills</SectionHeading>

      <div className="mt-2 flex flex-col divide-y divide-line">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <h3 className="pt-0.5 text-sm font-semibold text-fg">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:shadow-[0_4px_12px_-6px_color-mix(in_oklch,var(--accent)_55%,transparent)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
