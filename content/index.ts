// Content module — single source of truth for the portfolio.
// Traceability: every string traces to either
//   ~/Code/resume/Saketh_Kanchi_Resume.tex                (hero, summary, skills, edu, certs, OSS)
//   ~/Code/resume/projects/*.md                           (verbatim project copy)
//   ~/Code/resume/projects/portfolio-website-build-brief.md (role/tagline overrides, WIP callout)
// No fabricated metrics, quotes, PRs, or jobs. See build-portfolio-v1 task 2.7.

export type Url = string;

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  github: Url;
  linkedin: Url;
  email: string;
  location: string;
}

export interface StackChip {
  label: string;
  note?: string;
}

export interface Project {
  index: string; // "01".."05"
  total: string; // "05"
  title: string;
  discipline: string;
  oneLine: string;
  stack: string[];
  metric?: string;
  isFlagship?: boolean;
  statusCallout?: string;
  href?: Url;          // primary CTA
  hrefLabel?: string;  // "Read the build →" | "GitHub ↗" | "Marketplace ↗"
  secondaryHref?: Url;
  secondaryHrefLabel?: string;
}

export interface JourneyStop {
  index: string; // "01".."04"
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets?: string[]; // jobs only; degrees render lines only
  // Lines-only aux info (e.g. GPA). Rendered as a subline under the degree.
  auxLines?: string[];
  isJob: boolean;
}

export interface OssEntry {
  index: string; // "01".."03"
  repo: string;  // "adi1090x/widgets"
  repoUrl: Url;
  prContext: string;
  // Hardcoded floor from resume — refreshed by scripts/sync-oss.ts at build time.
  starsFloor: number;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Cert {
  name: string;
  issuer: string;
  year: number;
}

export interface About {
  // Verbatim from resume \roleSummary (fullstack variant).
  paragraph: string;
  currently: string[]; // 3 mono lines
  skills: SkillGroup[]; // 5 groups, fullstack order
  certifications: Cert[];
}

export interface SurfaceRow {
  route: string;
  name: string;
  role: string;
}

export interface RagBenchDetail {
  title: string;
  disciplineTag: string;
  stack: StackChip[];
  // Verbatim from projects/ragbench.md.
  whatItIs: string;
  // Verbatim from projects/ragbench.md.
  whyItExists: string;
  surfaces: SurfaceRow[];
  statusCallout: string;
}

// ---------------------------------------------------------------------------
// profile
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Saketh Kanchi",
  // Brief §home-shell spec: role line is "Full-Stack AI Engineer"
  // (resume \roleHeadline fullstack variant reads "Full-Stack Engineer"; brief overrides).
  role: "Full-Stack AI Engineer",
  tagline: "RAG systems, LLM integrations, and production full-stack features.",
  github: "https://github.com/SakethKanchi",
  linkedin: "https://linkedin.com/in/saketh-kanchi/",
  email: "sakethkanchi3@gmail.com",
  location: "Jersey City, NJ",
};

// ---------------------------------------------------------------------------
// selectedWork
// ---------------------------------------------------------------------------

export const selectedWork: Project[] = [
  {
    index: "01",
    total: "06",
    title: "RagBench",
    discipline: "RAG Quality Lab",
    oneLine: "A self-hostable RAG retrieval quality bench — ablate dense vs keyword vs hybrid on a fixed golden set, tag failures by cause, probe bad cases side-by-side.",
    stack: ["FastAPI", "Postgres 16 + pgvector", "FTS + RRF (k=60)", "bge-small-en-v1.5", "Ollama", "React + Vite + TS"],
    isFlagship: true,
    statusCallout:
      "MVP code landed. Metrics pending real judged evals — no lift, recall@k, or faithfulness numbers published yet.",
    href: "/projects/ragbench",
    hrefLabel: "Read the build →",
  },
  {
    index: "02",
    total: "06",
    title: "drive-rag",
    discipline: "Edge RAG System",
    oneLine:
      "BYOK Retrieval-Augmented Generation app that answers natural-language questions over the documents in a Google Drive folder. Ships edge-only on Cloudflare Workers, Vectorize, and Workers AI — no server to run for queries.",
    stack: ["Cloudflare Workers", "Workers AI (bge-base + llama-3-8b)", "Vectorize", "Google Drive API + OAuth", "discord.js"],
    href: "https://github.com/SakethKanchi/drive-rag",
    hrefLabel: "GitHub ↗",
  },
  {
    index: "03",
    total: "06",
    title: "Parley",
    discipline: "Audio / Multi-process Bot",
    oneLine:
      "Open-source, self-hosted Discord bot that records voice channels, transcribes audio locally via a Python faster-whisper sidecar, and generates structured AI meeting notes. Privacy-first — no cloud audio upload.",
    stack: ["Node.js + discord.js", "Python + faster-whisper", "FastAPI", "node:sqlite + FTS5", "Pluggable LLMs (Gemini/OpenAI/Ollama)"],
    href: "https://github.com/SakethKanchi/parley",
    hrefLabel: "GitHub ↗",
    secondaryHref: "https://sakethkanchi.github.io/parley-landing/",
    secondaryHrefLabel: "Landing ↗",
  },
  {
    index: "04",
    total: "06",
    title: "tracker",
    discipline: "Developer Tool / CLI",
    oneLine:
      "One terminal command that shows the remaining quota on every AI subscription you own — Claude, Grok, Codex, Gemini, and OpenAI — instead of logging into five dashboards to find out who still has budget. Published on PyPI as ai-quota-tracker.",
    stack: ["Python 3.11+", "SQLite", "OAuth 2.0 / OIDC refresh", "httpx + rich", "Discord webhook"],
    metric: "5 providers, one dashboard",
    href: "https://github.com/SakethKanchi/tracker",
    hrefLabel: "GitHub \u2197",
    secondaryHref: "https://pypi.org/project/ai-quota-tracker/",
    secondaryHrefLabel: "PyPI \u2197",
  },
  {
    index: "05",
    total: "06",
    title: "Kitty — Visual Studio Code Theme",
    discipline: "Developer Tool / Theme",
    oneLine:
      "A production color theme extension for Visual Studio Code, published on the Marketplace with a real user base and accessibility-driven iteration.",
    stack: ["Node.js", "VS Code Extension API", "JSON token themes", "vsce"],
    metric: "10,000+ downloads",
    href: "https://marketplace.visualstudio.com/items?itemName=SakethKanchi.kitty-vscode-theme",
    hrefLabel: "Marketplace ↗",
  },
  {
    index: "06",
    total: "06",
    title: "Multiple Disease Prediction",
    discipline: "ML Comparison / Streamlit",
    oneLine:
      "A machine-learning web app that predicts the likelihood of multiple diseases — Diabetes, Heart Disease, and Parkinson's — from user-entered health metrics. Multi-page Streamlit interface over pre-trained ML models.",
    stack: ["Python", "Streamlit", "Scikit-learn", "Pandas + NumPy", "Kaggle datasets"],
    // Brief/task 5.6: no link — kept as a private study artifact, no public repo.
  },
];

// ---------------------------------------------------------------------------
// journey
// ---------------------------------------------------------------------------

export const experience: JourneyStop[] = [
  {
    index: "01",
    company: "Fund Flow OS",
    role: "Full Stack AI Engineer · LTM",
    dates: "Dec 2025 – Present",
    location: "Jersey City, NJ",
    isJob: true,
    bullets: [
      "Delivered customer-facing features through the full SDLC — requirements, design, coding, unit/integration testing, deployment, production support — using React, Node.js, and RESTful APIs.",
      "Designed and deployed a RAG microservice on Cloudflare Workers exposing REST endpoints for semantic search over 40+ internal documents via a Discord interface; handles 50+ daily queries.",
    ],
  },
  {
    index: "02",
    company: "SideQuest",
    role: "Automation Team Lead (incl. ML & Flutter Intern) · LTM",
    dates: "Jun 2025 – Dec 2025",
    location: "Jersey City, NJ",
    isJob: true,
    bullets: [
      "Led the automation engineering team; built tools and pipelines that accelerated developer productivity across the platform.",
      "Built an AI-driven quest generation pipeline integrating Foursquare Places API, Google Gemini, and Unsplash — concurrent batch processing with resilient retry logic to fetch, enrich, and categorize points of interest.",
    ],
  },
];

export const education: JourneyStop[] = [
  {
    index: "01",
    company: "Stevens Institute of Technology",
    role: "M.S. Computer Science",
    dates: "Dec 2025",
    location: "Hoboken, NJ",
    isJob: false,
    auxLines: ["GPA 3.83"],
  },
  {
    index: "02",
    company: "Gandhi Institute of Technology and Management",
    role: "B.S. Computer Science",
    dates: "Jun 2023",
    location: "Hyderabad, TG",
    isJob: false,
    auxLines: ["CGPA 8.29"],
  },
];

// ---------------------------------------------------------------------------
// oss — hardcoded floors from resume; scripts/sync-oss.ts refreshes at build.
// ---------------------------------------------------------------------------

export const oss: OssEntry[] = [
  {
    index: "01",
    repo: "adi1090x/widgets",
    repoUrl: "https://github.com/adi1090x/widgets",
    prContext: "Merged PR adding new color schemes.",
    starsFloor: 800,
  },
  {
    index: "02",
    repo: "nyxxbit/discord-quest-completer",
    repoUrl: "https://github.com/nyxxbit/discord-quest-completer",
    prContext: "Merged PR adding a Python port of the relay.",
    starsFloor: 260,
  },
  {
    index: "03",
    repo: "catppuccin/youtube",
    repoUrl: "https://github.com/catppuccin/youtube",
    prContext: "Merged PR fixing metadata card rendering.",
    starsFloor: 156,
  },
];

// ---------------------------------------------------------------------------
// about
// ---------------------------------------------------------------------------

export const about: About = {
  // Verbatim from Saketh_Kanchi_Resume.tex \roleSummary (fullstack variant, lines 116–118).
  paragraph:
    "Full-Stack Engineer building AI-powered applications and intelligent automation across React, Node.js, and Python. Hands-on experience with RAG systems, LLM integrations, agentic workflows, and internal developer tools. Shipped a developer tool with 10,000+ users and led an automation team building AI-driven pipelines on cloud infrastructure.",
  currently: [
    "Building RagBench — a RAG quality lab",
    "Full Stack AI Engineer at Fund Flow OS",
    "Based in Jersey City, NJ",
  ],
  // Fullstack order per brief §8.4: Languages, AI / Data, Databases & APIs, Cloud & DevOps, Tools.
  skills: [
    {
      label: "Languages & Frameworks",
      items: ["Python", "JavaScript/TypeScript", "Node.js", "React.js", "Dart/Flutter", "Rust", "C++", "HTML/CSS"],
    },
    {
      label: "AI / Data",
      items: ["RAG", "Vector Embeddings", "LLM Integration", "Pandas", "Scikit-learn"],
    },
    {
      label: "Databases & APIs",
      items: ["PostgreSQL", "MongoDB", "Firebase", "GraphQL", "RESTful APIs"],
    },
    {
      label: "Cloud & DevOps",
      items: ["Fly.io", "Vercel", "Cloudflare Workers", "Docker", "Linux", "Git", "GitHub", "CI/CD"],
    },
    {
      label: "Tools",
      items: ["Playwright", "Postman", "VS Code APIs", "Discord API", "Foursquare API", "Google Gemini API"],
    },
  ],
  certifications: [
    {
      name: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
      issuer: "Oracle",
      year: 2025,
    },
  ],
};

// ---------------------------------------------------------------------------
// ragbenchDetail — RagBench deep-dive route /projects/ragbench
// ---------------------------------------------------------------------------

export const ragbenchDetail: RagBenchDetail = {
  title: "RagBench",
  disciplineTag: "RAG Quality Lab",
  stack: [
    { label: "FastAPI", note: "API surface + ablation endpoints" },
    { label: "Postgres 16 + pgvector", note: "Vector + relational store" },
    { label: "FTS + RRF (k=60)", note: "Hybrid retrieval fusion" },
    { label: "bge-small-en-v1.5", note: "Local embeddings (CPU-friendly)" },
    { label: "Ollama", note: "OpenAI-compatible local LLM via LLM_MODEL" },
    { label: "React + Vite + TS", note: "Bench / Probe / Corpus UI" },
  ],
  // Verbatim from projects/ragbench.md §What it is.
  whatItIs:
    "A self-hostable **retrieval quality bench**: ablate dense vs keyword vs hybrid on a fixed golden set, tag failures by cause, probe bad cases side-by-side. Hybrid retrieval is commodity plumbing; the product surface is Bench / Probe / Corpus (not chat-first).",
  // Verbatim from projects/ragbench.md §Why it exists.
  whyItExists:
    "Industry is saturated with doc-chat products (AnythingLLM, Onyx) and eval *libraries* (Ragas, DeepEval). The portfolio gap is a small full system where **measurement is the product surface**.",
  surfaces: [
    { route: "Bench (/)", name: "Bench", role: "Ablation matrix, metrics, failure taxonomy, worst items" },
    { route: "Probe", name: "Probe", role: "Dual-config diagnosis + live strip" },
    { route: "Corpus", name: "Corpus", role: "Seed/list handbook + golden summary" },
  ],
  // Honest WIP body — NO fabricated metrics. Brief §10.5/§10.6 + ragbench.md §Status.
  statusCallout:
    "MVP code landed. Vertical slice works: compose DB → migrate → seed Northstar handbook → probe with citations → ablation API. Still need a full judged ablation (Ollama up) before publishing metrics or resume numbers. No lift, recall@k, faithfulness, or abstain numbers exist yet — this page will be updated when they do.",
};