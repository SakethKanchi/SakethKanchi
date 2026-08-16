import type { MetadataRoute } from "next";
import { projectDetails } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Home + one dossier per project (/projects/[slug]).
  // Custom domain decided at deploy time; fall back to Pages for now.
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://sakethkanchi.github.io/SakethKanchi";

  const lastModified = new Date();

  return [
    { url: origin, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projectDetails.map((p) => ({
      url: `${origin}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
