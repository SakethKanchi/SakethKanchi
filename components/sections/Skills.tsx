import { skills } from "@/content/skills";
import { Reveal } from "@/components/motion/Reveal";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-line py-14 lg:py-16"
    >
      <Reveal>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-fg">
          Skills
        </h2>
      </Reveal>

      <div className="flex flex-col divide-y divide-line">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-2 py-4 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <h3 className="pt-0.5 text-sm font-semibold text-fg">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg"
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
