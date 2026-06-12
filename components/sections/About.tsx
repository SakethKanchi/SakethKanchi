import { profile } from "@/content/profile";
import { education, certifications } from "@/content/education";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <span className="font-mono text-xs tracking-tight text-accent">
            // about
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-fg md:text-5xl">
            About
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
        {/* Left / main: bio + resume download */}
        <Reveal delay={0.06} className="lg:col-span-3">
          <div className="flex h-full flex-col gap-8">
            <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg md:leading-loose">
              {profile.bio}
            </p>

            <div>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
              >
                Download résumé
                <span aria-hidden="true" className="font-mono">↓</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right / side: education + certifications */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Education card */}
          <Reveal delay={0.12}>
            <BentoCard className="flex flex-col gap-5 p-7">
              <span className="font-mono text-xs tracking-tight text-muted">
                01 · education
              </span>
              <ul className="flex flex-col gap-5">
                {education.map((item) => (
                  <li key={item.school} className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-fg">
                      {item.school}
                    </span>
                    <span className="text-sm text-fg/80">{item.degree}</span>
                    <span className="font-mono text-xs text-muted">
                      {item.detail} · {item.period}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* Certifications card */}
          <Reveal delay={0.18}>
            <BentoCard className="flex flex-col gap-5 p-7">
              <span className="font-mono text-xs tracking-tight text-muted">
                02 · certifications
              </span>
              <ul className="flex flex-col gap-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-fg">
                      {cert.name}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {cert.issuer} · {cert.year}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
