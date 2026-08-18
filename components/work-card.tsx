import Link from "next/link";
import { cn } from "@/lib/utils";
import { MonoLink } from "@/components/mono-link";
import { AnimatedMetric } from "@/components/animated-metric";
import { MagneticButton } from "@/components/magnetic-button";
import type { Project } from "@/content";

function kittyCounter(
  title: string,
  metric?: string,
): { to: number; suffix: string; label: string } | null {
  if (!metric || !title.startsWith("Kitty")) return null;
  const m = metric.match(/^([\d,]+)(\+?)\s*(.*)$/);
  if (!m) return null;
  const to = Number(m[1].replace(/,/g, ""));
  if (!Number.isFinite(to) || to <= 0) return null;
  return { to, suffix: m[2] || "", label: m[3] || "" };
}

// Work card — dossier row: index / title / discipline / stack / CTA.
export function WorkCard({ project }: { project: Project }) {
  const {
    index,
    total,
    title,
    discipline,
    oneLine,
    stack,
    metric,
    isFlagship,
    statusCallout,
    href,
    hrefLabel,
    secondaryLinks,
  } = project;

  const counter = kittyCounter(title, metric);

  return (
    <article
      className={cn(
        "border-t border-line py-8",
        "grid grid-cols-1 gap-5 md:grid-cols-[4.5rem_1fr_auto] md:gap-8",
      )}
    >
      <div className="mono-label tabular-nums text-ink-faint">
        <span className="block text-ember">{index}</span>
        <span className="text-ink-faint">/ {total}</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-sans text-xl font-medium tracking-tight text-ink sm:text-2xl">
            {title}
          </h3>
          {isFlagship && (
            <span className="rounded-md border border-ember bg-ember-faint px-2 py-0.5 mono-micro text-ember">
              Flagship
            </span>
          )}
          <span className="label-upper text-ink-faint">{discipline}</span>
        </div>

        <p className="max-w-prose text-[0.95rem] leading-relaxed text-ink-dim sm:text-base">
          {oneLine}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {stack.map((chip) => (
            <li
              key={chip}
              className="rounded-md border border-line bg-paper-raised px-2 py-1 mono-body text-ink-muted"
            >
              {chip}
            </li>
          ))}
        </ul>

        {metric &&
          (counter ? (
            <AnimatedMetric
              to={counter.to}
              suffix={counter.suffix}
              label={counter.label}
            />
          ) : (
            <p className="mono-body text-ember">{metric}</p>
          ))}
        {statusCallout && (
          <p className="border-l-2 border-ember-solid pl-3 mono-body text-ink-muted">
            {statusCallout}
          </p>
        )}

        {secondaryLinks && secondaryLinks.length > 0 && (
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {secondaryLinks.map((link) => (
              <MonoLink key={link.href} href={link.href}>
                {link.label}
              </MonoLink>
            ))}
          </p>
        )}
      </div>

      <div className="md:pt-1">
        {href && hrefLabel && (
          <MagneticButton>
            <Link
              href={href}
              rel={/^https?:/.test(href) ? "noreferrer noopener" : undefined}
              target={/^https?:/.test(href) ? "_blank" : undefined}
              className="btn-bone"
            >
              {hrefLabel}
            </Link>
          </MagneticButton>
        )}
        {!href && (
          <span className="mono-label text-ink-faint">(private study)</span>
        )}
      </div>
    </article>
  );
}
