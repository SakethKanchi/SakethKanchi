import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECT_THUMBS } from "./ProjectThumbnails";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-14 lg:py-16">
      <span aria-hidden="true" className="hairline mb-14 block" />
      <SectionHeading index="03">Projects</SectionHeading>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, i) => {
          const Thumb = PROJECT_THUMBS[project.name];
          return (
            <Reveal key={project.name} delay={i * 0.06}>
              <article className="card-premium group flex h-full flex-col gap-4 rounded-2xl border border-line p-4">
                {Thumb && (
                  <div className="overflow-hidden rounded-lg">
                    <div className="thumb-zoom">
                      <Thumb />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 px-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="text-lg font-bold tracking-tight text-fg transition-colors group-hover:text-accent">
                      {project.name}
                    </h3>
                    {project.highlight && (
                      <span className="rounded-full border border-accent/20 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent shadow-[0_0_18px_-8px_color-mix(in_oklch,var(--accent)_70%,transparent)]">
                        {project.highlight}
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {project.blurb}
                  </p>

                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-accent/15 bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg px-3.5 py-1.5 text-sm font-semibold text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_6px_16px_-8px_color-mix(in_oklch,var(--accent)_60%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        {link.label}
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
