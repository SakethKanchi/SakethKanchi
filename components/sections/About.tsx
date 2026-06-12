import { profile } from "@/content/profile";
import { education, certifications } from "@/content/education";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin, Briefcase, GraduationCap, Rocket } from "lucide-react";

const facts = [
  { icon: Rocket, label: `${profile.stat.value} ${profile.stat.label}` },
  ...(profile.openToWork
    ? [{ icon: Briefcase, label: "Open to work" }]
    : []),
  { icon: MapPin, label: profile.location },
  {
    icon: GraduationCap,
    label: `${education[0].degree.replace("M.S. ", "M.S. ")} @ Stevens`,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 pt-16 pb-14 lg:pt-24 lg:pb-16"
    >
      <Reveal>
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-fg lg:hidden">
          About
        </h2>
        <p className="max-w-prose text-[17px] leading-relaxed text-muted">
          {profile.bio}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {facts.map((f) => (
            <li
              key={f.label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-fg"
            >
              <f.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {f.label}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
              Education
            </h3>
            <ul className="flex flex-col gap-3.5">
              {education.map((item) => (
                <li key={item.school} className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-fg">
                    {item.degree}
                  </span>
                  <span className="text-sm text-fg">{item.school}</span>
                  <span className="font-mono text-xs text-muted">
                    {item.detail} · {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
              Certifications
            </h3>
            <ul className="flex flex-col gap-3.5">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-fg">
                    {cert.name}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {cert.issuer} · {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
