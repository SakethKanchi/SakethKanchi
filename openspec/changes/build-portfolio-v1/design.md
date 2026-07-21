## Context

This is a personal **engineer** portfolio, not a designer portfolio or a small-business website. The reference browsing (see `inspiration/`) confirmed the engineer-portfolio-with-case-studies tier is tiny — Surendar Selvaraj and Anirban Banerjee are the only two structural matches in Saketh's lane, with bymonolog, Ravi Klaassens, amanbuilds, jasonbergh, sebastian-wittig, and tobiasahlin supplying one or two borrowable patterns each.

Three layers (do not confuse them):

| Layer | What it is | Uniqueness |
|-------|------------|------------|
| **Commodity scaffolding** | Next.js + Tailwind v4 + Geist, dark default, top nav, section fades | None — and that is fine, this is not where taste lives |
| **Editorial identity** | Numbered bracket headers, `<SK />` seal, `·LTM` markers, `▹` bullets, SS/05 case-card indices, giant footer poster | Borrowed from Surendar + Anirban + bymonolog; the project's *personality* without anyone re-reading inspiration notes |
| **Honest content** | Resume-truthful project cards, journey stops, OSS PRs, RagBench deep-dive with WIP callout | Unborrowable — this is what makes Saketh's portfolio honestly his |

### Defenses (per AGENTS.md "rule" — defend each pattern by reference + section)

| Pattern | Reference + section | Defense against "designer cosplay" |
|---|---|---|
| `<SK />` angle-bracket seal | Anirban `<AB />` deployed in top-left nav | Functional (click-to-home); bracket shape pairs with bracket section headers; one mark, recurring; not decorative type |
| `click anywhere to continue →` splash | Anirban deployed entry prompt | Three words, not a fake boot counter; auto-skips on repeat; reduced-motion usable. The honest closest-to-antiaverage pattern that doesn't fake a loader |
| `·LTM` role-line marker | Anirban deployed journey-section marker | Tiny suffix; doesn't stand alone like a logo; reads as "this is one entry in Saketh's long-form memory" rather than literal "long-term memory" jargon; fewer pixels than even a hyphen-pair separator |
| `▹` bullet glyph | Anirban deployed `▹` bullet | Glyph is distinct from `•`/`-` enough to give the journey its own rhythm; no emoji (`🚀` etc, which amanbuilds leans on, are explicitly banned); consistent across all 8 bullet lines |
| `[ NN — Section name ]` bracket + number | Surendar `\[ About \]` + amanbuilds `[ 01 — ABOUT ]` | Number reinforces the editorial chapter feel; brackets echo the seal pattern; maximum 4-token header (no decoration); both source sites are engineer-ish personal sites, not studios |
| Top horizontal numbered nav, no left rail | Jason Bergh `01. Work / 02. Reportage…`; Anirban top nav | All real personal portfolios in the inspiration set use a top bar — the left rail is a Brittany-Chiang-era pattern Saketh explicitly rejected from the old site; with only 5 nav items a top bar carries them with no wrap |
| Scroll-revealed stacked hero lines | Ravi Klaassens deployed hero ("Design shapes / not as / a force / Leave yours") | One-time reveal on first hit, persisted via SessionStorage; reduced-motion disables; not a "type-on" terminal effect; reveals 4 short lines (name / role / tagline / links), no counter, no fake metrics |
| Giant footer poster CTA | bymonolog "Let's build / an experience / That moves"; Anirban "Let's build something / together." | Single oversized 3-line type CTA; no animation; no card chrome; honest phrasing (`Let's build / something that / ships.`) carries Saketh's shipped-and-shipping voice without sentimentality |
| `[ NN — ]` numbering + `01 / 05` on each card | bymonolog `SS / 05` numbering; Surendar `Protected 01` index | Both are engineer-or-designer personal portfolios; numbering aids reading and signals position within an archive; the slash form `01 / 05` is the simplest truthful position indicator |
| No live third-party fetch at request time | Spec rule + RagBench convention | Live GitHub calls kill LCP and break on rate limits; the cache at build with floor fallback is honest about staleness |
| RagBench deep-dive honest-WIP callout | Spec rule + AGENTS.md truthfulness rule | RagBench's own project note says "fill only after real judged evals"; the deep-dive surfaces that truth instead of hiding it. |
| One deep-dive route, hardcoded RagBench content | Spec rule | Generalized `/projects/[slug]` only needs work once a second deep-dive exists. Forcing a dynamic template now either ships empty second pages or invites fabricated content for other projects. Hardcoding RagBench in v1 is the honest minimum |

### Research bases

**Engine / scaffolding (plumbing only — not identity)**

| Source | Reuse | Drop |
|--------|-------|------|
| Next.js App Router (Lee Robinson, Josh Comeau) | Static export where possible, Vercel analytics built-in | Their personal copy / blog-led IA — Saketh has no published writing |
| Tailwind v4 + Geist (Vercel docs) | Dark `zinc` palette, `sky-400` accent, `next/font` wiring | Vercel's product-page motion language |
| shadcn/ui | Sheet (mobile menu), Button (CTA buttons only) | Full shadcn install; theme-lock (we use Tailwind) |

**Editorial identity (research, not clone)**

| Source | Idea we adapt | How Saketh's portfolio differs |
|--------|---------------|----------------------------------|
| Surendar Selvaraj | Case-study cards with one real metric, numbered journey, bracket section headers | 6 case-studies + 11 testimonials + 11-stop journey + multiple certs → **Saketh has 5 cards + 4 stops + 1 cert + 0 testimonials**. The structural pattern is borrowed; Saketh's content inventory is smaller and honestly so |
| Anirban Banerjee | Splash copy, `<AB />` seal, `·LTM` + `▹` journey markers, grouped tech stack, footer microcopy | 8-stop journey + multi-issuer cert grid + architecture chip-flow hero + multiple competitions → **Saketh's version is smaller**: 4-stop journey, 1 cert, no architecture hero (his story is shipped products not pipeline architecture) |
| bymonolog | `SS / 05` case-card indices + giant footer-poster CTA | Multi-million-dollar case-study metrics → **Saketh only uses metrics that exist in his project vault** (10k+ downloads, 50+ daily queries, 40+ documents, 500+ leads). RagBench deep-dive honestly shows "metrics pending" |
| Ravi Klaassens | Scroll-revealed stacked hero lines, case-card discipline label, services split CTAs | We don't borrow the services split (For Agencies / For Brands) because Saketh doesn't have two audience types yet; the scroll-reveal hero + one-line discipline label are the only direct lifts |
| amanbuilds | `[ NN — name ]` numeric bracket header | Everything else in amanbuilds is banned: emoji chips, fake telemetry widgets, marquee separators, placeholder "Your Project Name" copy |
| Sebastian-Wittig | Role / Service / Description / Design Decisions / Outcome case-study block shape | Adapted once for the RagBench deep-dive only; not used on the home page |

### Locked decisions (see also `openspec/config.yaml`)

- Repo: `~/Code/portfolio` (standalone, its own git repo, its own OpenSpec root — not a sub-folder of the resume vault)
- Framework: Next.js (App Router) — Saketh ships it at Fund Flow OS; Vercel-native deploy
- Content: TypeScript module `content/index.ts` with typed objects — no CMS, no MDX, no DB
- Theme: dark default + `prefers-color-scheme` light opt-in; no theme-toggle UI in v1
- Layout: top horizontal numbered nav; left rail is explicitly banned (Saketh rejected it in the deleted old portfolio)
- Type: Geist Sans (body) + Geist Mono (numbers, stack, meta, seal); no second font family
- Color: `zinc-950` bg, `zinc-100` text, one accent `sky-400`; project screenshots (v2 only) carry all color
- Motion: Framer Motion only for section-fade + hero line reveal + link underline-grow; `prefers-reduced-motion` disables everything; NO scroll hijack, custom cursor, WebGL, GSAP, Locomotive, Lenis
- Splash: `click anywhere to continue →`; `SessionStorage["splash_seen"]` skip on repeat; 3s auto-advance as fallback
- Splash on `prefers-reduced-motion`: skipped entirely (render hero directly)
- Star counts: cached at build into `data/oss.json` via `scripts/sync-oss.ts`; fallback to hardcoded floors (800+/260+/156+)
- Project deep-dive: RagBench only in v1; generalized `/projects/[slug]` deferred to v2
- Lighthouse budget: perf ≥ 95, a11y ≥ 95, LCP < 1.2s on cold cable
- Footer timestamp: build-time stamp only (`Jersey City, NJ`); no live clock fetch
- No contact form in v1; `mailto:` link only
- Stack list at bottom of About paragraph is one-line; not a `.Tech Stack` panel (Anirban's grouped grid is too heavy for Saketh's 5 short groups)

### 8GB-VRAM / laptop equivalent constraints (translated for portfolio)

There is no local-model runtime here, but the equivalent constraints are:

- No image generation / no screenshot generation in v1 ⇒ forces the "screenshot pending" placeholder honesty
- No live third-party fetch at request time ⇒ forces the `data/oss.json` cache layer; this is non-negotiable even though GitHub API is "easy"
- No CMS / no DB ⇒ keeps the deploy static and honest about staleness

### Why build one big change for v1 (not a sequence)

The portfolio is small enough to fit in one change with 8 capabilities. Splitting it across multiple changes would either ship a half-working site to staging or duplicate the design-system decisions across 3 proposals. The vertical slice is enforced inside `tasks.md` by ordering so the design system lands before any component is duplicated.