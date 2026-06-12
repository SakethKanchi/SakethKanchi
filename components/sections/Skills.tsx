import { skills } from "@/content/skills";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/motion/Reveal";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <span className="font-mono text-xs tracking-tight text-accent">
            // stack
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-fg md:text-5xl">
            Skills
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06}>
            <BentoCard className="flex h-full flex-col gap-4 p-7">
              <span className="font-mono text-xs tracking-tight text-muted">
                {String(i + 1).padStart(2, "0")} · {group.group}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
