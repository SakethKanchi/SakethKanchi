import { experience } from "@/content/experience";
import { Reveal } from "@/components/motion/Reveal";

// Tech inferred per role (not in the content type; presentational only).
const ROLE_TAGS: Record<string, string[]> = {
  "Fund Flow OS": [
    "React",
    "Node.js",
    "Cloudflare Workers",
    "RAG",
    "Python",
    "Playwright",
    "Fly.io",
  ],
  "Fund Flow OS (SideQuest)": [
    "Python",
    "Google Gemini",
    "Foursquare API",
    "Mapbox",
    "PostgreSQL",
    "GeoJSON",
  ],
};

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-line py-14 lg:py-16"
    >
      <Reveal>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-fg">
          Experience
        </h2>
      </Reveal>

      <ol className="flex flex-col gap-3">
        {experience.map((item, i) => {
          const tags = ROLE_TAGS[item.company] ?? [];
          return (
            <Reveal as="li" key={item.company + item.period} delay={i * 0.06}>
              <div className="group rounded-xl border border-transparent p-5 transition-colors hover:border-line hover:bg-surface/60 -mx-5">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
                  <span className="pt-0.5 font-mono text-xs uppercase tracking-wide text-muted">
                    {item.period}
                  </span>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-base font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
                        {item.title}{" "}
                        <span className="text-muted">· {item.company}</span>
                      </h3>
                      <span className="text-xs text-muted">{item.location}</span>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                      {item.bullets.map((bullet, b) => (
                        <li
                          key={b}
                          className="relative pl-4 text-[13.5px] leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {tags.length > 0 && (
                      <ul className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
