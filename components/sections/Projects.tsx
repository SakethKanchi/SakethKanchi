import { projects } from "@/content/projects";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/motion/Reveal";

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <span className="font-mono text-xs tracking-tight text-accent">
            // work
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-fg md:text-5xl">
            Projects
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:auto-rows-[minmax(0,1fr)]">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.06}>
            <BentoCard className="flex h-full flex-col gap-5 p-7 md:p-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-fg md:text-2xl">
                    {project.name}
                  </h3>
                  {project.highlight && (
                    <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-medium text-accent">
                      {project.highlight}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {project.blurb}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 border-t border-line pt-5">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-bg px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {link.label}
                      <span aria-hidden="true">{"↗"}</span>
                    </a>
                  ))}
                </div>
              </div>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
