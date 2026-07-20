## Why

The previous portfolio site at `saketh-kanchi.vercel.app` was a layout Saketh rejected (sticky sidebar scrollspy, no real content depth). The repo folder `~/Code/resume/portfolio/` was deleted on 2026-07-17 alongside its project notes. The `SakethKanchi/SakethKanchi` GitHub repo (which was a profile-README repo that doubled as the portfolio deploy) still exists, but it is not part of this build.

The second brain at `~/Code/resume` now carries enough project content (`Saketh_Kanchi_Resume.tex`, `projects/ragbench.md` flagship, `projects/fund-flow-os.md` and `projects/sidequest.md` work history, four project cards, three open-source PR lines) to drive a small, honest portfolio site. The build is greenfield: empty repo → MVP in a single change.

Saketh's job-search audience needs to convert in under a minute. Reference browsing narrowed the engineer-portfolio-with-case-studies tier to a small set (Surendar 9/10, Anirban a strong deployed confirmation, bymonolog and Ravi Klaassens supplying case-card and hero-line patterns). Everything else in the inspiration files is one-pattern borrows.

## What Changes

This is the **greenfield bootstrap** of the portfolio (empty `~/Code/portfolio` repo → deployable MVP in one change).

- Stand up a runnable Next.js (App Router) app with one home route and one deep-dive route
- A **`click anywhere to continue →` entry splash** on first load, persisted via `SessionStorage` so reloads skip it
- A **top horizontal numbered nav** (`<SK />` seal left, `01. Work / 02. Experience / 03. Open Source / 04. About / 05. Contact`, optional `Resume ↗` right-end CTA) with IntersectionObserver scrollspy
- A **type-led hero** whose 4 lines (name, role, tagline, 3 mono links) reveal on scroll (one-time, reduced-motion-aware)
- **`[ NN — Section name ]` bracket section headers** (Surendar + amanbuilds numbered prefix)
- **`[ 01 — Selected work ]`** with 5 numbered case-cards: RagBench flagship + drive-rag, Parley, Kitty VS Code Theme, Multiple Disease Prediction. Each carries one honest metric when one exists (10k+ downloads for Kitty; honest WIP line for RagBench)
- **`[ 02 — Experience ]`** with 4 numbered journey stops (2 jobs + 2 degrees) using `·LTM` marker + `▹` bullet glyph (Anirban-deployed pattern)
- **`[ 03 — Open source ]`** with 3 PR rows; star counts cached at build via `scripts/sync-oss.ts` into `data/oss.json`, honest floors hardcoded as fallback
- **`[ 04 — About ]`** combining paragraph + "currently" 3-line list + skills chips (5 groups, fullstack order) + one-line certifications badge
- **`[ 05 — Contact ]`** with giant-type poster CTA (`Let's build / something that / ships.`) + email button + GitHub/LinkedIn mono links + footer microcopy (`© 2026 Saketh Kanchi · Built with Next.js · Deployed on Vercel`)
- **`/projects/ragbench` deep-dive route** using Sebastian-Wittig's Role/Service/Description/Decisions/Outcome block shape, content sourced verbatim from `projects/ragbench.md`. Includes a visible **honest-WIP status callout** that owns the missing metrics rather than fabricating them. Placeholder figure slot with `screenshot pending judged evals` caption; no fabricated screenshots
- **Type content module** `content/index.ts` of typed objects (profile, selectedWork, journey, oss, about, ragbenchDetail). No CMS, no MDX runtime, no DB, no server-side fetching
- **`scripts/sync-oss.ts`** to refresh `data/oss.json` from GitHub at build time and fall back to hardcoded floors on failure
- **SEO + meta**: per-page title, meta description, canonical URL, `robots.txt` + `sitemap.xml` via Next metadata, JSON-LD `Person` schema with `sameAs` GitHub/LinkedIn, type-only OG card (`/api/og`) using Geist Sans/Mono on zinc-950 (no fabricated portraits, no gradient)
- **Accessibility**: skip-to-content link, keyboard-reachable nav, visible focus ring (accent sky-400), `prefers-reduced-motion` disables ALL motion, AA contrast everywhere, section landmarks
- **Lighthouse budget**: perf ≥ 95, a11y ≥ 95, LCP < 1.2s on a cold cable connection (no hero image makes this trivially achievable)
- **Build + deploy**: `pnpm dev / build / start`; push to `main` → Vercel auto-deploy; fresh project, NOT a redeploy of the deleted `saketh-kanchi.vercel.app`; domain chosen at deploy time

### Non-goals (v1)

- Contact form / Resend integration (the old form was a failure surface; email link is more reliable and ships faster; form can return in v2 with server-side validation)
- Blog / MDX posts (no published writing to surface yet)
- CMS (Sanity, Contentful) — content is small enough to live in a TS module
- Live GitHub contribution graph (cached at build only)
- Project deep-dive pages for any project besides RagBench (generalized `ProjectGrid` and `/projects/[slug]` deferred to v2)
- Internationalization
- Image generation / screenshots other than "screenshot pending" placeholder captions (real captures come in v2 after judged evals on RagBench)
- Custom 404 pages beyond Next default
- Theme-toggle UI in v1 (dark default + system `prefers-color-scheme` is enough; toggle deferred to v2)
- Testimonials block (Saketh has zero documented recommendations; manufacturing quotes is banned)
- Awards / hackathon list (none worth listing yet; v2 can add when real ones exist)
- A "Years of experience" hero metric (Saketh is early-career; reserving this framing for senior folks is honest)
- Side-project "lab" pages beyond RagBench deep-dive

## Capabilities

### New Capabilities

- `home-shell`: Single-page home with splash → nav → hero → 5 bracketed sections (Selected work, Experience, Open source, About, Contact) → footer
- `selected-work`: 5 numbered case-cards (1 flagship + 4) on home, each with index `01 / 05`, discipline label, title, optional real metric, one-line, stack chips, CTA link-out
- `experience-journey`: 4 numbered journey stops on home (2 jobs + 2 degrees) using `·LTM` marker and `▹` bullets
- `open-source-list`: 3-row list of merged OSS PRs with one-line context + cached star counts
- `about-block`: Combined About block (paragraph + currently + skills chips + certifications badge) on home
- `project-deep-dive`: Single deep-dive route `/projects/ragbench` using stack/what-it-is/why-it-exists/surfaces/stack-list/status-callout/placeholder-figure shape; RagBench only
- `oss-stats-sync`: Build-time GitHub star fetch script that writes `data/oss.json` and falls back to hardcoded floors on failure; never fetches live in the request path
- `seo-meta`: Per-page metadata, JSON-LD `Person`, type-only OG card, robots.txt + sitemap.xml via Next metadata

### Modified Capabilities

- (none — greenfield)

## Impact

- **New codebase** under this repo (Next.js App Router, the 12 components listed in the design, `content/index.ts`, `scripts/sync-oss.ts`, `data/oss.json`)
- **Dependencies** (expected, exact versions pinned at install): `next`, `react`, `react-dom`, `tailwindcss@^4`, `framer-motion`, `lucide-react`, `geist` (font), `shadcn/ui` primitives pulled on demand only (likely just `button`, `sheet`)
- **Build-time only** GitHub API fetch via `scripts/sync-oss.ts` for the 3 open-source rows; no live third-party fetch at request time
- **Ops**: Vercel deploy; no database, no serverless function, no env secrets required for v1
- **Resume story**: this site is a primary recruiter → screen-me decision artifact; publishes the RagBench flagship story while remaining honest that judged metrics are pending
- **Related prior work**: the deleted `~/Code/resume/portfolio/` folder and old `saketh-kanchi.vercel.app` deploy are NOT reused. This is a fresh project (deployment, repo, and OpenSpec history)