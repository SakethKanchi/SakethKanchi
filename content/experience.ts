import type { ExperienceItem } from "./types";
export const experience: ExperienceItem[] = [
  {
    company: "Fund Flow OS",
    title: "Founding Engineer",
    period: "2025 — Present",
    location: "Jersey City, NJ",
    bullets: [
      "Ship full-stack features for the customer-facing web app (React, Node.js, REST APIs), owning the lifecycle from design through deployment and user feedback.",
      "Designed and deployed a RAG system on Cloudflare Workers for semantic search over 40+ internal documents via a Discord interface, handling 50+ daily queries.",
      "Integrated Apollo.io lead generation into the core product, automating enrichment for 500+ leads.",
      "Leading the migration of application infrastructure from Vercel to Fly.io, designing deployment architecture for production workloads.",
      "Built internal automation pipelines (Python, Node.js, Playwright), eliminating manual operational tasks across teams.",
    ],
  },
  {
    company: "Fund Flow OS (SideQuest)",
    title: "Automation Team Lead",
    period: "Jun 2025 — Dec 2025",
    location: "Jersey City, NJ",
    bullets: [
      "Led the automation engineering team, building tools and pipelines that accelerated developer productivity.",
      "Built an AI-driven quest generation pipeline (Foursquare Places API, Google Gemini, Unsplash) with batch processing and resilient retry logic.",
      "Automated Mapbox tileset generation from PostgreSQL/GeoJSON data for dynamic location-based visualization.",
      "Built internal developer tools (Instagram scraper, Google Apps Scripts), eliminating hours of manual work weekly.",
    ],
  },
];
