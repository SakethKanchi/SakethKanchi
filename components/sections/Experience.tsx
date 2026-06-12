import { experience } from "@/content/experience";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <span className="font-mono text-xs tracking-tight text-accent">
            // experience
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-fg md:text-5xl">
            Experience
          </h2>
        </div>
      </Reveal>

      <div className="relative">
        {/* vertical rail */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[9px]"
        />

        <ol className="flex flex-col gap-12 md:gap-16">
          {experience.map((item, i) => (
            <Reveal key={item.company + item.period} delay={i * 0.06}>
              <li className="relative pl-8 md:pl-10">
                {/* node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center md:h-[19px] md:w-[19px]"
                >
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent md:h-[18px] md:w-[18px]" />
                </span>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-bold tracking-tight text-fg md:text-xl">
                        {item.company}
                      </h3>
                      <span className="font-mono text-xs text-muted md:text-sm">
                        {item.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="text-base font-medium text-fg/90">
                        {item.title}
                      </span>
                      <span className="text-sm text-muted">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {item.bullets.map((bullet, b) => (
                      <li
                        key={b}
                        className="relative pl-5 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-accent"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
