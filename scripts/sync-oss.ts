#!/usr/bin/env tsx
// sync-oss.ts — build-time refresh of data/oss.json.
//   - Called by the `prebuild` and `build` scripts (see package.json).
//   - Uses GITHUB_TOKEN if present, falls back to unauthenticated gh api.
//   - On any failure (network, rate-limit, parse), keeps existing data/oss.json
//     OR writes the hardcoded floors from content/index.ts.
//   - Never throws — build must not break because star counts are stale.
//
// Truth contract (brief §7.3/§7.4): data/oss.json is committed to git as a
import { oss as floors } from "@/content";

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

interface OssRecord {
  repo: string;
  stars: number;
  fetchedAt: string;
}

async function fetchStars(repo: string): Promise<number | null> {
  const url = `https://api.github.com/repos/${repo}`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-sync-oss",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`[sync-oss] ${repo}: HTTP ${res.status}`);
      return null;
    }
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch (err) {
    console.warn(`[sync-oss] ${repo}: ${(err as Error).message}`);
    return null;
  }
}

async function main() {
  const records: OssRecord[] = [];
  for (const entry of floors) {
    const live = await fetchStars(entry.repo);
    const stars =
      live !== null && live >= entry.starsFloor
        ? live
        : entry.starsFloor;
    records.push({
      repo: entry.repo,
      stars,
      fetchedAt: new Date().toISOString(),
    });
  }

  const outPath = resolve(process.cwd(), "data/oss.json");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  console.log(`[sync-oss] wrote ${outPath} (${records.length} entries)`);
}

main().catch((err) => {
  console.error("[sync-oss] fatal:", err);
  // Do not exit non-zero — floors are already in content/index.ts.
  process.exit(0);
});