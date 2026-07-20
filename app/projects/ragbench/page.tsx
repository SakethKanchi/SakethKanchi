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
    <li className="flex flex-col gap-1 rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2">
      <span className="font-mono text-sm text-zinc-100">{label}</span>
      {note && (
        <span className="font-mono text-xs text-zinc-500">{note}</span>
      )}
    </li>
  );
}

export default function RagBenchPage() {
  const d = ragbenchDetail;

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-24 sm:px-10">
      <Link
        href="/"
        className="font-mono text-sm text-zinc-400 hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
      >
        ← Back to home
      </Link>

      {/* Header */}
      <header className="mt-10 flex flex-col gap-3">
        <h1 className="font-sans text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
          {d.title}
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          {d.disciplineTag}
        </p>
        <ul className="flex flex-wrap gap-2">
          {d.stack.map((c) => (
            <StackChip key={c.label} label={c.label} note={c.note} />
          ))}
        </ul>
      </header>

      {/* What it is */}
      <section aria-label="What it is" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          [ 01 — What it is ]
        </h2>
        <p className="mt-4 max-w-prose font-sans text-[1.05rem] leading-relaxed text-zinc-300">
          {d.whatItIs}
        </p>
      </section>

      {/* Why it exists */}
      <section aria-label="Why it exists" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          [ 02 — Why it exists ]
        </h2>
        <p className="mt-4 max-w-prose font-sans text-[1.05rem] leading-relaxed text-zinc-300">
          {d.whyItExists}
        </p>
      </section>

      {/* Surfaces */}
      <section aria-label="Surfaces" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          [ 03 — Surfaces ]
        </h2>
        <table className="mt-4 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
                Surface
              </th>
              <th className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {d.surfaces.map((s) => (
              <tr key={s.name} className="border-b border-zinc-900">
                <td className="py-3 pr-4 align-top font-mono text-sm text-zinc-100">
                  <p className="text-zinc-100">{s.name}</p>
                  <p className="font-mono text-xs text-zinc-500">{s.route}</p>
                </td>
                <td className="py-3 font-sans text-sm text-zinc-400">
                  {s.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Stack with notes */}
      <section aria-label="Stack" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          [ 04 — Stack ]
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {d.stack.map((c) => (
            <li
              key={c.label}
              className="flex flex-col gap-0.5 border-l-2 border-zinc-800 pl-3"
            >
              <span className="font-mono text-sm text-zinc-100">{c.label}</span>
              {c.note && (
                <span className="font-mono text-xs text-zinc-500">{c.note}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Honest status callout */}
      <section aria-label="Honest status" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          [ 05 — Honest status ]
        </h2>
        <div className="mt-4 border-l-2 border-[var(--accent)] bg-zinc-900/60 p-6">
          <p className="font-mono text-sm uppercase tracking-[0.15em] text-[var(--accent)]">
            Honest status
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-300">
            {d.statusCallout}
          </p>
        </div>
      </section>

      {/* Placeholder figure */}
      <section aria-label="Screenshots" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          [ 06 — Screenshots ]
        </h2>
        <figure
          className="mt-4 flex min-h-[12rem] items-center justify-center border border-dashed border-zinc-800 bg-zinc-900/30"
          aria-label="Screenshot placeholder"
        >
          <figcaption className="font-mono text-sm text-zinc-500">
            Screenshot pending judged evals
          </figcaption>
        </figure>
      </section>
    </main>
  );
}