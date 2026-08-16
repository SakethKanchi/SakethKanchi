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
  /** Renders a "Flagship" chip. Unused while RagBench is shelved. */
  isFlagship?: boolean;
  statusCallout?: string;
  href?: Url;          // primary CTA
  hrefLabel?: string;  // "Read the build →" | "GitHub ↗" | "Marketplace ↗"
  // Secondary links: repo / registry / landing. Rendered after the primary CTA.
  secondaryLinks?: { href: Url; label: string }[];
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

// SHELVED: RagBench is still WIP (no judged eval numbers yet), so it is not
// shown on the site. The site lists finished/shipped work only. Restore this
// interface, the ragbenchDetail value below, its projectDetails entry, and its
// selectedWork card once real metrics exist.
//
// export interface RagBenchDetail {
//   title: string;
//   disciplineTag: string;
//   stack: StackChip[];
//   whatItIs: string;
//   whyItExists: string;
//   surfaces: SurfaceRow[];
//   statusCallout: string;
// }

/**
 * ProjectDetail — the generalized "project dossier" shape behind
 * /projects/[slug]. RagBench shipped first as a bespoke page; this is the same
 * document structure widened so every project can have one.
 *
 * Content is sourced from the resume vault project cards
 * (~/Code/resume/projects/*.md). Sections are optional so a project only
 * renders what it genuinely has — no filler, and no invented metrics.
 */
export interface ProjectDetail {
  slug: string;
  title: string;
  disciplineTag: string;
  /** Short line under the title, used for <meta description> too. */
  summary: string;
  stack: StackChip[];
  whatItIs: string;
  whyItExists: string;
  /** Named surfaces/components, rendered as a two-column table. */
  surfaces?: SurfaceRow[];
  /** Notable engineering decisions or hard problems solved. */
  highlights?: { title: string; body: string }[];
  /** Honest status callout — WIP caveats live here rather than being hidden. */
  statusCallout: string;
  links: { label: string; href: string }[];
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
    total: "05",
    title: "drive-rag",
    discipline: "Edge RAG System",
    oneLine:
      "BYOK Retrieval-Augmented Generation app that answers natural-language questions over the documents in a Google Drive folder. Ships edge-only on Cloudflare Workers, Vectorize, and Workers AI — no server to run for queries.",
    stack: ["Cloudflare Workers", "Workers AI (bge-base + llama-3-8b)", "Vectorize", "Google Drive API + OAuth", "discord.js"],
    href: "/projects/drive-rag",
    hrefLabel: "Read the build →",
    secondaryLinks: [{ href: "https://github.com/SakethKanchi/drive-rag", label: "GitHub ↗" }],
  },
  {
    index: "02",
    total: "05",
    title: "Parley",
    discipline: "Audio / Multi-process Bot",
    oneLine:
      "Open-source, self-hosted Discord bot that records voice channels, transcribes audio locally via a Python faster-whisper sidecar, and generates structured AI meeting notes. Privacy-first — no cloud audio upload.",
    stack: ["Node.js + discord.js", "Python + faster-whisper", "FastAPI", "node:sqlite + FTS5", "Pluggable LLMs (Gemini/OpenAI/Ollama)"],
    href: "/projects/parley",
    hrefLabel: "Read the build →",
    secondaryLinks: [
      { href: "https://github.com/SakethKanchi/parley", label: "GitHub ↗" },
      { href: "https://sakethkanchi.github.io/parley-landing/", label: "Landing ↗" },
    ],
  },
  {
    index: "03",
    total: "05",
    title: "tracker",
    discipline: "Developer Tool / CLI",
    oneLine:
      "One terminal command that shows the remaining quota on every AI subscription you own — Claude, Grok, Codex, Gemini, and OpenAI — instead of logging into five dashboards to find out who still has budget. Published on PyPI as ai-quota-tracker.",
    stack: ["Python 3.11+", "SQLite", "OAuth 2.0 / OIDC refresh", "httpx + rich", "Discord webhook"],
    metric: "5 providers, one dashboard",
    href: "/projects/tracker",
    hrefLabel: "Read the build →",
    secondaryLinks: [
      { href: "https://github.com/SakethKanchi/tracker", label: "GitHub ↗" },
      { href: "https://pypi.org/project/ai-quota-tracker/", label: "PyPI ↗" },
    ],
  },
  {
    index: "04",
    total: "05",
    title: "Kitty — Visual Studio Code Theme",
    discipline: "Developer Tool / Theme",
    oneLine:
      "A production color theme extension for Visual Studio Code, published on the Marketplace with a real user base and accessibility-driven iteration.",
    stack: ["Node.js", "VS Code Extension API", "JSON token themes", "vsce"],
    metric: "10,000+ downloads",
    href: "/projects/kitty-vscode-theme",
    hrefLabel: "Read the build →",
    secondaryLinks: [{ href: "https://marketplace.visualstudio.com/items?itemName=SakethKanchi.kitty-vscode-theme", label: "Marketplace ↗" }],
  },
  {
    index: "05",
    total: "05",
    title: "Multiple Disease Prediction",
    discipline: "ML Comparison / Streamlit",
    oneLine:
      "A machine-learning web app that predicts the likelihood of multiple diseases — Diabetes, Heart Disease, and Parkinson's — from user-entered health metrics. Multi-page Streamlit interface over pre-trained ML models.",
    stack: ["Python", "Streamlit", "Scikit-learn", "Pandas + NumPy", "Kaggle datasets"],
    // Brief/task 5.6 originally left this unlinked as a private study artifact;
    // the repo is in fact public (verified 200), so it now links out like the rest.
    href: "/projects/multiple-disease-prediction",
    hrefLabel: "Read the build →",
    secondaryLinks: [{ href: "https://github.com/SakethKanchi/Multiple_Disease_Prediction", label: "GitHub ↗" }],
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
    "Building a RAG retrieval quality lab",
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

// SHELVED with RagBenchDetail above — see note there.
// export const ragbenchDetail: RagBenchDetail = {
//   title: "RagBench",
//   disciplineTag: "RAG Quality Lab",
//   stack: [
//     { label: "FastAPI", note: "API surface + ablation endpoints" },
//     { label: "Postgres 16 + pgvector", note: "Vector + relational store" },
//     { label: "FTS + RRF (k=60)", note: "Hybrid retrieval fusion" },
//     { label: "bge-small-en-v1.5", note: "Local embeddings (CPU-friendly)" },
//     { label: "Ollama", note: "OpenAI-compatible local LLM via LLM_MODEL" },
//     { label: "React + Vite + TS", note: "Bench / Probe / Corpus UI" },
//   ],
//   // Verbatim from projects/ragbench.md §What it is.
//   whatItIs:
//     "A self-hostable **retrieval quality bench**: ablate dense vs keyword vs hybrid on a fixed golden set, tag failures by cause, probe bad cases side-by-side. Hybrid retrieval is commodity plumbing; the product surface is Bench / Probe / Corpus (not chat-first).",
//   // Verbatim from projects/ragbench.md §Why it exists.
//   whyItExists:
//     "Industry is saturated with doc-chat products (AnythingLLM, Onyx) and eval *libraries* (Ragas, DeepEval). The portfolio gap is a small full system where **measurement is the product surface**.",
//   surfaces: [
//     { route: "Bench (/)", name: "Bench", role: "Ablation matrix, metrics, failure taxonomy, worst items" },
//     { route: "Probe", name: "Probe", role: "Dual-config diagnosis + live strip" },
//     { route: "Corpus", name: "Corpus", role: "Seed/list handbook + golden summary" },
//   ],
//   // Honest WIP body — NO fabricated metrics. Brief §10.5/§10.6 + ragbench.md §Status.
//   statusCallout:
//     "MVP code landed. Vertical slice works: compose DB → migrate → seed Northstar handbook → probe with citations → ablation API. Still need a full judged ablation (Ollama up) before publishing metrics or resume numbers. No lift, recall@k, faithfulness, or abstain numbers exist yet — this page will be updated when they do.",
// };
// ---------------------------------------------------------------------------
// projectDetails — dossier pages at /projects/[slug]
//
// One entry per work item. Content is lifted from the resume vault project
// cards (~/Code/resume/projects/*.md) so the site and the resume never drift.
// Status callouts are deliberately honest: unfinished work says so.
// ---------------------------------------------------------------------------

export const projectDetails: ProjectDetail[] = [
  {
    slug: "drive-rag",
    title: "drive-rag",
    disciplineTag: "Applied AI / Retrieval",
    summary:
      "A BYOK Retrieval-Augmented Generation app that answers natural-language questions over a Google Drive folder, running entirely on Cloudflare's edge.",
    stack: [
      { label: "Cloudflare Workers", note: "Serverless edge query plane" },
      { label: "Workers AI", note: "bge-base-en-v1.5 embeddings, llama-3-8b-instruct" },
      { label: "Cloudflare Vectorize", note: "Managed vector DB, cosine metric" },
      { label: "Google Drive API + OAuth", note: "Folder walk and native export" },
      { label: "Node.js (ESM)", note: "Ingestion scripts" },
      { label: "discord.js", note: "/ask slash command" },
    ],
    whatItIs:
      "A bring-your-own-keys RAG app that answers natural-language questions over the documents in a Google Drive folder. It ingests the folder, embeds every file into a vector index, and answers questions via a Cloudflare Worker, a local CLI, or a Discord /ask slash command. It ships with no credentials — you supply your own Cloudflare account, Google OAuth client, and optional Discord bot.",
    whyItExists:
      "Most RAG demos assume you will paste your documents into someone else's cloud. This one treats your Drive as the source of truth and your own accounts as the runtime, so the whole system can be handed to someone else and stood up without trusting me with a single key.",
    surfaces: [
      { route: "POST /", name: "Worker endpoint", role: "HTTP query plane: embed → search → generate" },
      { route: "scripts/ask.mjs", name: "Terminal CLI", role: "Interactive local question loop" },
      { route: "bot/index.mjs", name: "Discord /ask", role: "Slash command over the same Worker" },
    ],
    highlights: [
      {
        title: "Two planes, cleanly split",
        body: "An ingestion plane (local Node: OAuth, Drive walk, extract, chunk, embed, upsert) and a query plane (Worker: embed query → Vectorize search → context → LLM). Ingestion is heavy and occasional; queries are light and constant, so they scale independently.",
      },
      {
        title: "Filename-aware retrieval",
        body: "Pure top-k fails when a question names a specific document — you get scattered chunks from everywhere. A Vectorize metadata index on filename lets the system pull all chunks of that file in order instead, alongside the semantic matches.",
      },
      {
        title: "Format coverage without a parsing service",
        body: "Text extraction spans PDF (pdf-parse), DOCX/DOC (mammoth), XLSX/XLS (xlsx), plain text, and native Google Docs/Sheets via auto-export — so a real, messy Drive folder ingests rather than erroring on the first spreadsheet.",
      },
    ],
    statusCallout:
      "Working end to end across all three query surfaces. BYOK by design: .env, .dev.vars, and secrets/ are gitignored, production credentials go through wrangler secret put, and no keys live in the repo. Worker tests run under @cloudflare/vitest-pool-workers.",
    links: [{ label: "GitHub ↗", href: "https://github.com/SakethKanchi/drive-rag" }],
  },
  {
    slug: "parley",
    title: "Parley",
    disciplineTag: "Self-Hosted Systems / Audio",
    summary:
      "An open-source, self-hosted Discord bot that records voice channels, transcribes locally, and generates structured AI meeting notes — no cloud audio upload.",
    stack: [
      { label: "Node.js + discord.js", note: "Orchestrator, voice capture" },
      { label: "Python + faster-whisper", note: "Local transcription sidecar" },
      { label: "FastAPI", note: "Sidecar service boundary" },
      { label: "SQLite + FTS5", note: "Searchable meeting history" },
      { label: "Gemini / OpenAI / Ollama", note: "Pluggable summarizers" },
    ],
    whatItIs:
      "A self-hosted Discord bot that records voice channels, transcribes the audio locally, and turns it into structured meeting notes. Privacy is the point: transcription runs on the operator's own machine, and no audio is uploaded to a cloud service.",
    whyItExists:
      "Every meeting-notes product wants your audio on their servers. For a private Discord community or a small team, that trade is unacceptable — so the transcription step runs locally and the LLM backend is swappable, including a fully offline Ollama option.",
    surfaces: [
      { route: "Node orchestrator", name: "Recorder", role: "Per-speaker capture, auto join/leave, concurrent channels" },
      { route: "Python sidecar", name: "Transcriber", role: "faster-whisper over IPC behind FastAPI" },
      { route: "SQLite + FTS5", name: "Archive", role: "Full-text searchable meeting history" },
    ],
    highlights: [
      {
        title: "Multi-process by necessity",
        body: "Transcription is Python's world and Discord voice is Node's, so the system is a Node orchestrator coordinating a Python sidecar over IPC rather than compromising on one runtime for both.",
      },
      {
        title: "Per-speaker, concurrent capture",
        body: "Audio is captured per speaker and multiple channels record concurrently, which keeps attribution intact in the transcript instead of producing one undifferentiated blob.",
      },
      {
        title: "Swappable summarizers",
        body: "Gemini, OpenAI, and Ollama sit behind one interface, so the same deployment can run fully offline or use a hosted model without touching the recording pipeline.",
      },
    ],
    statusCallout:
      "Open source and self-hostable, with a landing page. Privacy-first by construction: audio never leaves the host machine during transcription.",
    links: [
      { label: "GitHub ↗", href: "https://github.com/SakethKanchi/parley" },
      { label: "Landing ↗", href: "https://sakethkanchi.github.io/parley-landing/" },
    ],
  },
  {
    slug: "tracker",
    title: "tracker",
    disciplineTag: "Developer Tool / CLI",
    summary:
      "One terminal command that shows the remaining quota on every AI subscription you own — Claude, Grok, Codex, Gemini, and OpenAI. Published on PyPI as ai-quota-tracker.",
    stack: [
      { label: "Python 3.11+", note: "argparse CLI, rich TUI" },
      { label: "SQLite", note: "Usage samples, token history, backoff state" },
      { label: "OAuth 2.0 / OIDC", note: "Per-provider refresh with token rotation" },
      { label: "httpx", note: "Provider REST integrations" },
      { label: "GitHub Actions", note: "CI + PyPI trusted publishing (OIDC)" },
    ],
    whatItIs:
      "An open-source Python CLI that shows the remaining quota on every AI subscription you own in one terminal command. Instead of logging into Claude, Grok, Codex, Gemini, and OpenAI separately to answer \"who still has quota?\", tracker imports the credentials the official CLIs already wrote, polls each provider's usage endpoint, and renders one dashboard.",
    whyItExists:
      "Paying for five AI subscriptions means five separate dashboards and no single answer to the only question that matters mid-task: which account still has budget? The data already exists on disk in each CLI's credential store — it just was not being read in one place.",
    surfaces: [
      { route: "tracker list", name: "Dashboard", role: "Per-account progress bars across all five providers" },
      { route: "tracker status", name: "One-liner", role: "Compact summary plus the account with most headroom" },
      { route: "tracker list --watch", name: "Live mode", role: "In-place redraw on an interval" },
      { route: "tracker tokens", name: "History", role: "Token and cost history out of SQLite" },
      { route: "tracker webhook", name: "Discord bot", role: "Posts one message and edits it on a cycle" },
    ],
    highlights: [
      {
        title: "Hardest problem: single-use refresh tokens",
        body: "Grok's OIDC and Codex's ChatGPT grants rotate on every refresh. A naive refresh silently invalidated the provider CLI's own token and pushed the user into a refresh_token_reused re-login loop. The fix writes the rotated grant back to both tracker's store and the provider's file, making tracker a transparent read-only observer rather than a credential thief.",
      },
      {
        title: "A silent data bug found by profiling",
        body: "A slow refresh (18s) turned out not to be network-bound at all. insert_token_usage used INSERT OR IGNORE against a table with no UNIQUE constraint, so every sync re-inserted the full transcript history — 4.5M rows for 1,464 real events. Because the summary query SUMs those rows, reported lifetime cost was inflated 1,776x with nothing visibly wrong in the UI. A UNIQUE index, a one-time migration, a pre-filter before json.loads, and concurrent collection took refresh from 18.2s to 3.0s and the database from 808 MB to 9.1 MB.",
      },
      {
        title: "Never drops a row",
        body: "On HTTP 429 it honors the backoff window and renders the last-known sample tagged backing-off, so one rate-limited account cannot hide the rest of the fleet. Every rendered row carries its provenance: api, derived, cached, or backing-off.",
      },
    ],
    statusCallout:
      "Public, open source, and published on PyPI as ai-quota-tracker (v0.2.2) — install with uv tool install, pipx, or pip. Releases are automated with GitHub Actions trusted publishing (OIDC, no stored token): pushing a version tag builds, verifies tag matches version, smoke-tests the wheel in a clean venv, then publishes. Regression tests run in CI on Python 3.11-3.13.",
    links: [
      { label: "GitHub ↗", href: "https://github.com/SakethKanchi/tracker" },
      { label: "PyPI ↗", href: "https://pypi.org/project/ai-quota-tracker/" },
    ],
  },
  {
    slug: "kitty-vscode-theme",
    title: "Kitty — Visual Studio Code Theme",
    disciplineTag: "Developer Tool / Theme",
    summary:
      "A production VS Code color theme published on the Marketplace with 10,000+ downloads and a near 5-star rating.",
    stack: [
      { label: "VS Code Extension API", note: "Theme contribution points" },
      { label: "JSON token themes", note: "Editor, syntax scopes, UI chrome" },
      { label: "vsce", note: "Packaging and publishing" },
      { label: "Semantic versioning", note: "Release discipline" },
    ],
    whatItIs:
      "A production color theme extension for Visual Studio Code, published on the Marketplace with 10,000+ downloads and a near 5-star rating. It covers editor colors, syntax token scopes, and UI chrome as one coherent system.",
    whyItExists:
      "It started as a personal theme and became a maintained product once other developers depended on it. That shift is the interesting part: shipping to thousands of strangers turns color choices into accessibility decisions with real consequences.",
    highlights: [
      {
        title: "Accessibility-driven iteration",
        body: "Contrast and color-blind safety were revised in response to real user reports, not assumed at authoring time. Feedback from thousands of developers exposed cases no single author would have caught.",
      },
      {
        title: "Owned the full lifecycle",
        body: "Authoring, packaging, publishing, semantic versioning, releases, and user support — the parts of shipping software that are invisible until you are the one doing them.",
      },
    ],
    statusCallout:
      "Live and maintained on the VS Code Marketplace with a real, ongoing user base.",
    links: [
      {
        label: "Marketplace ↗",
        href: "https://marketplace.visualstudio.com/items?itemName=SakethKanchi.kitty-vscode-theme",
      },
    ],
  },
  {
    slug: "multiple-disease-prediction",
    title: "Multiple Disease Prediction",
    disciplineTag: "Machine Learning / Health",
    summary:
      "A Streamlit app predicting likelihood of diabetes, heart disease, and Parkinson's from user-entered health metrics, each backed by its own trained classifier.",
    stack: [
      { label: "Python", note: "Core language" },
      { label: "Scikit-learn", note: "Classification models" },
      { label: "Streamlit", note: "Multi-page web UI" },
      { label: "Pandas + NumPy", note: "Preprocessing" },
      { label: "Pickle", note: "Model serialization for runtime inference" },
    ],
    whatItIs:
      "A machine-learning web app that predicts the likelihood of multiple diseases — diabetes, heart disease, and Parkinson's — from user-entered health metrics, built as a multi-page Streamlit interface over pre-trained models.",
    whyItExists:
      "An academic project used to practice the full supervised-learning loop end to end: source real datasets, preprocess, train and compare classifiers, serialize the winners, and put them behind an interface a non-technical person can actually use.",
    surfaces: [
      { route: "Diabetes", name: "Predictor", role: "Classifier over diagnostic features" },
      { route: "Heart Disease", name: "Predictor", role: "Classifier over clinical features" },
      { route: "Parkinson's", name: "Predictor", role: "Classifier over voice-measure features" },
    ],
    statusCallout:
      "Complete academic project. Models are trained offline on public Kaggle datasets, serialized, and loaded at runtime for inference. It is a learning exercise, not a medical device, and makes no clinical claims.",
    links: [
      { label: "GitHub ↗", href: "https://github.com/SakethKanchi/Multiple_Disease_Prediction" },
    ],
  },
];

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}
