import { cn } from "@/lib/utils";
import type { JourneyStop as JourneyStopType } from "@/content";

// Journey stop — one-line `Company · Role Title · LTM · Dates`, subline location,
// then ▹-prefixed bullets (sky-400 glyph, Geist Sans body) for jobs.
// Degrees: lines only, no bullets.
export function JourneyStop({ stop }: { stop: JourneyStopType }) {
  return (
    <article className="border-t border-zinc-900 py-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[3rem_1fr] md:gap-6">
        <span className="font-mono text-xs tabular-nums text-[var(--accent)]">
          {stop.index}
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-sans text-xl font-semibold text-zinc-100">
              {stop.company}
            </span>
            <span aria-hidden className="text-zinc-600">·</span>
            <span className="font-mono text-sm text-zinc-300">{stop.role}</span>
            <span aria-hidden className="text-zinc-600">·</span>
            <span className="font-mono text-sm text-zinc-500">{stop.dates}</span>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
            {stop.location}
          </p>

          {stop.auxLines?.map((line) => (
            <p
              key={line}
              className="font-mono text-sm text-zinc-400"
            >
              {line}
            </p>
          ))}

          {stop.bullets && (
            <ul className="mt-3 flex flex-col gap-3">
              {stop.bullets.map((b) => (
                <li
                  key={b}
                  className="flex max-w-prose gap-2 text-sm leading-relaxed text-zinc-300 sm:text-[0.95rem]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 shrink-0 font-mono text-[var(--accent)]",
                    )}
                  >
                    ▹
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}