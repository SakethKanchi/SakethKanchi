import { profile } from "@/content/profile";
import { education, certifications } from "@/content/education";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin, Briefcase, GraduationCap, Rocket } from "lucide-react";

// Split the bio so the first sentence reads as a confident lead (fg) and the
// remainder as supporting copy (muted) — hierarchy without a gray text wall.
const _split = profile.bio.indexOf(". ");
const LEAD = _split > 0 ? profile.bio.slice(0, _split + 1) : profile.bio;
const REST = _split > 0 ? profile.bio.slice(_split + 2) : "";

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
      {/* Not wrapped in Reveal: this bio is the above-the-fold LCP element —
          it must paint at full opacity on first frame. */}
      <div className="mb-6 flex items-baseline gap-4 lg:hidden">
        <span className="section-index text-sm">01</span>
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-fg">About</h2>
      </div>
      <p className="max-w-prose text-[19px] leading-[1.65] text-fg/90">
        <span className="font-medium text-fg">{LEAD}</span>{" "}
        <span className="text-muted">{REST}</span>
      </p>

      <Reveal delay={0.06}>
        <ul className="mt-7 flex flex-wrap gap-2.5">
          {facts.map((f) => (
            <li
              key={f.label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-fg shadow-[0_2px_8px_-4px_color-mix(in_oklch,var(--bg)_70%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_20px_-10px_color-mix(in_oklch,var(--accent)_55%,transparent)]"
            >
              <f.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {f.label}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-8 grid grid-cols-1 gap-x-8 gap-y-6 pt-8 sm:grid-cols-2">
          <span aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
          <div>
            <h3 className="eyebrow mb-3">Education</h3>
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
            <h3 className="eyebrow mb-3">Certifications</h3>
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
