import { cn } from "@/lib/utils";
import type { JourneyStop as JourneyStopType } from "@/content";

export function JourneyStop({ stop }: { stop: JourneyStopType }) {
  return (
    <article className="border-t border-line py-7">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[3.5rem_1fr] md:gap-6">
        <span className="mono-label tabular-nums text-ember">
          {stop.index}
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-sans text-lg font-medium text-ink sm:text-xl">
              {stop.company}
            </span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span className="mono-body text-ink-dim">{stop.role}</span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span className="mono-body text-ink-faint">{stop.dates}</span>
          </div>

          <p className="label-upper text-ink-faint">{stop.location}</p>

          {stop.auxLines?.map((line) => (
            <p key={line} className="mono-body text-ink-muted">
              {line}
            </p>
          ))}

          {stop.bullets && (
            <ul className="mt-2 flex flex-col gap-2.5">
              {stop.bullets.map((b) => (
                <li
                  key={b}
                  className="flex max-w-prose gap-2 text-sm leading-relaxed text-ink-dim sm:text-[0.95rem]"
                >
                  <span
                    aria-hidden
                    className={cn("mt-1 shrink-0 mono-body text-ember")}
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
