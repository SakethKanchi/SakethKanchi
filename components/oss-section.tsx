import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import type { OssEntry } from "@/content";
import { oss } from "@/content";

import cachedStars from "@/data/oss.json";

// Build-time star counts: written by scripts/sync-oss.ts → data/oss.json,
// then imported statically here (resolveJsonModule is on in tsconfig).
// Floors from content/index.ts are the fallback if a row is missing.
interface CachedStar {
  repo: string;
  stars: number;
  fetchedAt: string;
}

const starByRepo: Record<string, number> = Object.fromEntries(
  (cachedStars as CachedStar[]).map((c) => [c.repo, c.stars]),
);

function OssRow({ entry }: { entry: OssEntry }) {
  const stars = starByRepo[entry.repo] ?? entry.starsFloor;
  return (
    <li className="grid grid-cols-1 gap-2 border-t border-zinc-900 py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6">
      <div className="flex flex-col gap-1">
        <a
          href={entry.repoUrl}
          rel="noreferrer noopener"
          target="_blank"
          className="font-mono text-sm text-zinc-100 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
        >
          {entry.repo} ↗
        </a>
        <p className="max-w-prose font-sans text-sm text-zinc-400">
          {entry.prContext}
        </p>
      </div>
      <span className="font-mono text-sm tabular-nums text-[var(--accent)]">
        {stars.toLocaleString()}+
      </span>
    </li>
  );
}

export function OssSection() {
  return (
    <SectionWrapper
      id="oss"
      aria-label="Open source contributions"
      className="px-6 sm:px-10"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader render="04" label="Open Source Contributions" reveal="word" />
        <ul className="mt-10">
          {oss.map((entry) => (
            <OssRow key={entry.index} entry={entry} />
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}