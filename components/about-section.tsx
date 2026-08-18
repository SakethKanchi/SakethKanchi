import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { about } from "@/content";

export function AboutSection() {
  return (
    <SectionWrapper id="about" aria-label="About">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader render="05" label="About" reveal="word" />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: bio + currently + certs as dossier */}
          <div className="flex flex-col gap-8">
            <p className="max-w-prose text-[1.05rem] leading-relaxed text-ink-dim">
              {about.paragraph}
            </p>

            <div className="border border-line">
              <div className="border-b border-line px-4 py-2.5">
                <span className="mono-label text-ember">Currently</span>
              </div>
              {about.currently.map((line, i) => (
                <div
                  key={line}
                  className={
                    i < about.currently.length - 1
                      ? "border-b border-line px-4 py-3 mono-body text-ink-dim"
                      : "px-4 py-3 mono-body text-ink-dim"
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="border border-line">
              <div className="border-b border-line px-4 py-2.5">
                <span className="mono-label text-ember">Certifications</span>
              </div>
              {about.certifications.map((c) => (
                <div key={c.name} className="px-4 py-3">
                  <p className="dossier-val text-ink">{c.name}</p>
                  <p className="mono-body text-ink-faint">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: skills as dossier groups */}
          <div className="border border-line">
            <div className="border-b border-line px-4 py-2.5">
              <span className="mono-label text-ember">Skills</span>
            </div>
            {about.skills.map((group, i) => (
              <div
                key={group.label}
                className={
                  i < about.skills.length - 1
                    ? "border-b border-line px-4 py-4"
                    : "px-4 py-4"
                }
              >
                <p className="dossier-key mb-1.5">{group.label}</p>
                <p className="mono-body text-ink-dim [text-wrap:pretty]">
                  {group.items.join(" ·\u00A0")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
