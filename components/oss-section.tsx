import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { MonoLink } from "@/components/mono-link";
import type { OssEntry } from "@/content";
import { oss } from "@/content";

import cachedStars from "@/data/oss.json";

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
    <li className="grid grid-cols-1 gap-2 border-t border-line py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6">
      <div className="flex flex-col gap-1">
        <MonoLink href={entry.repoUrl} className="text-ink">
          {entry.repo} ↗
        </MonoLink>
        <p className="max-w-prose text-sm text-ink-muted">{entry.prContext}</p>
      </div>
      <span className="mono-label tabular-nums text-ember">
        {stars.toLocaleString()}+ ★
      </span>
    </li>
  );
}

export function OssSection() {
  return (
    <SectionWrapper id="oss" aria-label="Open source contributions">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <SectionHeader
          render="04"
          label="Open Source Contributions"
          reveal="word"
        />
        <ul className="mt-8 border-b border-line">
          {oss.map((entry) => (
            <OssRow key={entry.index} entry={entry} />
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
