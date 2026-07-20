import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { about } from "@/content";

// About — paragraph (verbatim from resume \roleSummary fullstack variant),
// CurrentlyList (3 mono lines), 5 SkillGroups, 1 Cert. One short scroll.
export function AboutSection() {
  return (
    <SectionWrapper id="about" aria-label="About" className="px-6 sm:px-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader render="05" label="About" reveal="word" />

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr]">
          {/* Left: paragraph + currently */}
          <div className="flex flex-col gap-8">
            <p className="max-w-prose font-sans text-[1.05rem] leading-relaxed text-zinc-300">
              {about.paragraph}
            </p>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Currently
              </p>
              <ul className="flex flex-col gap-1.5">
                {about.currently.map((line) => (
                  <li
                    key={line}
                    className="font-mono text-sm text-zinc-300"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Certifications
              </p>
              <ul className="flex flex-col gap-1.5">
                {about.certifications.map((c) => (
                  <li
                    key={c.name}
                    className="font-mono text-sm text-zinc-300"
                  >
                    {c.name} — {c.issuer}, {c.year}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: skill groups */}
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              Skills
            </p>
            {about.skills.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <p className="font-mono text-sm text-zinc-200">{group.label}</p>
                <p className="font-mono text-sm text-zinc-400">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}