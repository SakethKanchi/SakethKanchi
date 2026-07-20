import Link from "next/link";
import { cn } from "@/lib/utils";
import { MonoLink } from "@/components/mono-link";
import { AnimatedMetric } from "@/components/animated-metric";
import { MagneticButton } from "@/components/magnetic-button";
import type { Project } from "@/content";

// Derive an animated-counter spec from the existing metric string, but ONLY for
// the Kitty card. This is the single count-up moment on the site; deriving it
// from the metric string keeps the content model unchanged (no new field).
// e.g. "10,000+ downloads" → { to: 10000, suffix: "+", label: "downloads" }.
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

// Work card — numeric NN / 05 left (Geist Mono sky-400), middle
// title+discipline+one-line+stack chips+optional metric, right CTA link.
// Flagship (RagBench) shows a small `Flagship` sky-400 chip + statusCallout.
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
    secondaryHref,
    secondaryHrefLabel,
  } = project;

  const counter = kittyCounter(title, metric);

  return (
    <article
      className={cn(
        "border-t border-zinc-900 py-10",
        "grid grid-cols-1 gap-6 md:grid-cols-[5rem_1fr_auto] md:gap-8",
      )}
    >
      {/* Left: numeric index */}
      <div className="font-mono text-xs tabular-nums text-[var(--accent)]">
        <span className="block">{index}</span>
        <span className="text-zinc-600">{total}</span>
      </div>

      {/* Middle: content */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-sans text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            {title}
          </h3>
          {isFlagship && (
            <span className="rounded-full border border-[var(--accent)] px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--accent)]">
              Flagship
            </span>
          )}
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
            {discipline}
          </span>
        </div>

        <p className="max-w-prose text-sm leading-relaxed text-zinc-400 sm:text-[0.95rem]">
          {oneLine}
        </p>

        {/* Stack chips */}
        <ul className="flex flex-wrap gap-2">
          {stack.map((chip) => (
            <li
              key={chip}
              className="rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-1 font-mono text-[0.7rem] text-zinc-400"
            >
              {chip}
            </li>
          ))}
        </ul>

        {/* Metric or honest status callout.
            The Kitty metric is the ONE animated number on the site (0 → value
            on scroll-in). Every other metric renders as static text. */}
        {metric &&
          (counter ? (
            <AnimatedMetric
              to={counter.to}
              suffix={counter.suffix}
              label={counter.label}
            />
          ) : (
            <p className="font-mono text-sm text-[var(--accent)]">{metric}</p>
          ))}
        {statusCallout && (
          <p className="border-l-2 border-[var(--accent)] pl-3 font-mono text-sm text-zinc-400">
            {statusCallout}
          </p>
        )}

        {/* Secondary link (Parley landing) */}
        {secondaryHref && secondaryHrefLabel && (
          <p className="mt-1">
            <MonoLink href={secondaryHref}>{secondaryHrefLabel}</MonoLink>
          </p>
        )}
      </div>

      {/* Right: primary CTA */}
      <div className="md:pt-1">
        {href && hrefLabel && (
          <MagneticButton>
            <Link
              href={href}
              rel={
                /^https?:/.test(href) ? "noreferrer noopener" : undefined
              }
              target={/^https?:/.test(href) ? "_blank" : undefined}
              className={cn(
                "font-mono text-sm text-zinc-300 hover:text-zinc-100",
                "underline-offset-[0.2em] decoration-zinc-500/60",
                "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat",
                "transition-[background-size] duration-300 ease-out",
                "hover:bg-[length:100%_1px]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]",
              )}
            >
              {hrefLabel}
            </Link>
          </MagneticButton>
        )}
        {/* Card 05 — no link: render a muted placeholder so grid stays aligned */}
        {!href && (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
            (private study)
          </span>
        )}
      </div>
    </article>
  );
}