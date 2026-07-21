import type { Metadata } from "next";
import Link from "next/link";
import { ragbenchDetail } from "@/content";

export const metadata: Metadata = {
  title: "RagBench",
  description:
    "A self-hostable RAG retrieval quality bench — ablate dense vs keyword vs hybrid on a fixed golden set, tag failures by cause, probe bad cases side-by-side.",
  alternates: {
    canonical: "/projects/ragbench",
  },
};

function StackChip({ label, note }: { label: string; note?: string }) {
  return (
    <li className="flex flex-col gap-1 rounded-[2px] border border-line bg-paper-raised px-3 py-2">
      <span className="mono-body text-ink">{label}</span>
      {note && <span className="mono-body text-ink-faint">{note}</span>}
    </li>
  );
}

export default function RagBenchPage() {
  const d = ragbenchDetail;

  return (
    <div
      className="mx-auto max-w-3xl pb-24 pt-24"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Link
        href="/"
        className="mono-body text-ink-muted hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]"
      >
        ← Back to home
      </Link>

      <header className="mt-10 flex flex-col gap-3">
        <p className="mono-label text-ember">01 // Project dossier</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {d.title}
        </h1>
        <p className="label-upper text-ink-faint">{d.disciplineTag}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {d.stack.map((c) => (
            <StackChip key={c.label} label={c.label} note={c.note} />
          ))}
        </ul>
      </header>

      <section aria-label="What it is" className="mt-14">
        <h2 className="mono-label text-ember">01 // What it is</h2>
        <p className="mt-4 max-w-prose text-[1.05rem] leading-relaxed text-ink-dim">
          {d.whatItIs}
        </p>
      </section>

      <section aria-label="Why it exists" className="mt-14">
        <h2 className="mono-label text-ember">02 // Why it exists</h2>
        <p className="mt-4 max-w-prose text-[1.05rem] leading-relaxed text-ink-dim">
          {d.whyItExists}
        </p>
      </section>

      <section aria-label="Surfaces" className="mt-14">
        <h2 className="mono-label text-ember">03 // Surfaces</h2>
        <div className="mt-4 border border-line">
          <div className="grid grid-cols-[1fr_1.4fr] border-b border-line">
            <div className="border-r border-line px-4 py-2.5 dossier-key">
              Surface
            </div>
            <div className="px-4 py-2.5 dossier-key">Role</div>
          </div>
          {d.surfaces.map((s, i) => (
            <div
              key={s.name}
              className={
                i < d.surfaces.length - 1
                  ? "grid grid-cols-[1fr_1.4fr] border-b border-line"
                  : "grid grid-cols-[1fr_1.4fr]"
              }
            >
              <div className="border-r border-line px-4 py-3">
                <p className="mono-body text-ink">{s.name}</p>
                <p className="mono-body text-ink-faint">{s.route}</p>
              </div>
              <div className="px-4 py-3 text-sm text-ink-dim">{s.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Stack" className="mt-14">
        <h2 className="mono-label text-ember">04 // Stack</h2>
        <ul className="mt-4 flex flex-col border border-line">
          {d.stack.map((c, i) => (
            <li
              key={c.label}
              className={
                i < d.stack.length - 1
                  ? "border-b border-line px-4 py-3"
                  : "px-4 py-3"
              }
            >
              <span className="mono-body text-ink">{c.label}</span>
              {c.note && (
                <span className="mt-0.5 block mono-body text-ink-faint">
                  {c.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Honest status" className="mt-14">
        <h2 className="mono-label text-ember">05 // Honest status</h2>
        <div className="mt-4 border border-ember bg-ember-faint p-5">
          <p className="mono-label text-ember">Honest status</p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-dim">
            {d.statusCallout}
          </p>
        </div>
      </section>

      <section aria-label="Screenshots" className="mt-14">
        <h2 className="mono-label text-ember">06 // Screenshots</h2>
        <figure
          className="mt-4 flex min-h-[12rem] items-center justify-center border border-dashed border-line bg-paper-raised"
          aria-label="Screenshot placeholder"
        >
          <figcaption className="mono-body text-ink-faint">
            Screenshot pending judged evals
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
