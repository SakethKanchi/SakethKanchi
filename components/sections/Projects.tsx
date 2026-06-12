import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECT_THUMBS } from "./ProjectThumbnails";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-line py-14 lg:py-16"
    >
      <Reveal>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-fg">
          Projects
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, i) => {
          const Thumb = PROJECT_THUMBS[project.name];
          return (
            <Reveal key={project.name} delay={i * 0.06}>
              <article className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50">
                {Thumb && <Thumb />}

                <div className="flex flex-col gap-3 px-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="text-lg font-bold tracking-tight text-fg">
                      {project.name}
                    </h3>
                    {project.highlight && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
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
                        className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent"
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
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg px-3.5 py-1.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        {link.label}
                        <span aria-hidden="true">↗</span>
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
