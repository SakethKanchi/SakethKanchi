import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // v1 ships exactly two routes: home + RagBench deep-dive.
  // Custom domain decided at deploy time; fall back to vercel.app for now.
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://sakethkanchi.github.io/SakethKanchi";

  const lastModified = new Date();

  return [
    { url: origin, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${origin}/projects/ragbench`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}