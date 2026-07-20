## 1. Repo & tool scaffolding

- [x] 1.1 `pnpm init` + add `next@latest`, `react`, `react-dom`, `tailwindcss@^4`, `postcss`, `autoprefixer`
- [x] 1.2 `next.config.ts` (App Router, `output: export` candidate — confirm after splash + analytics choices), `tsconfig.json` (strict mode on)
- [x] 1.3 Install Geist via `next/font/google` (Sans + Mono) and wire `var(--font-sans)` + `var(--font-mono)` CSS variables
- [x] 1.4 Tailwind v4 setup: `tailwind.config.ts` with one accent (`sky-400`), `zinc-950` bg, `zinc-100` text; enable dark-mode-via-media-query (no `.dark` class strategy)
- [x] 1.5 Add `lucide-react`, `framer-motion`, optional `@vercel/analytics` for Vercel Analytics (no GA)
- [x] 1.6 Add root `.gitignore` (`.next`, `node_modules`, `.env*`, `*.tsbuildinfo`), `.env.example` (placeholder, no real secrets in v1), `package.json` scripts: `dev`, `build`, `start`, `lint`
- [x] 1.7 `shadcn/ui` init; pull ONLY `sheet` (mobile nav) and `button` (CTA buttons) on demand
- [x] 1.8 `eslint.config.mjs` with `next/core-web-vitals` + `@typescript-eslint/recommended`

## 2. Content module (single source of truth)

- [x] 2.1 `content/index.ts` — `profile` object: name, role, tagline, github, linkedin, email, location, footerTimestamp (built at build, NOT live client fetch)
- [x] 2.2 `content/index.ts` — `selectedWork: Project[]` 5 cards: RagBench (isFlagship: true, statusCallout text), drive-rag, Parley, Kitty VS Code Theme (metric: `10,000+ downloads`), Multiple Disease Prediction (no link)
- [x] 2.3 `content/index.ts` — `journey: JourneyStop[]` 4 stops: Fund Flow OS Founding Engineer, SideQuest Automation Team Lead, Stevens MS CS, Gandhi BSC CS. Use `·LTM` suffix on role titles for the 2 jobs (not degrees)
- [x] 2.4 `content/index.ts` — `oss: OssEntry[]` 3 entries (adi1090x/widgets 800+, nyxxbit/discord-quest-completer 260+, catppuccin/youtube 156+) with PR-context one-line each
- [x] 2.5 `content/index.ts` — `about` object: paragraph (verbatim from resume `\roleSummary` fullstack), `currently` 3 lines, `skills: SkillGroup[]` 5 groups in fullstack order, `certifications: Cert[]` (1 entry, Oracle OCI 2025 AI Foundations)
- [x] 2.6 `content/index.ts` — `ragbenchDetail: ProjectDetail` object: title, disciplineTag, stack[] with single-line notes, whatItIs (verbatim from `projects/ragbench.md`), whyItExists (verbatim), surfaces[] (Bench/Probe/Corpus from ragbench.md), statusCallout (honest WIP body — DO NOT pre-fill metrics)
- [x] 2.7 Verify every string in `content/index.ts` is traceable to its resume/projects source — no fabricated numbers, no invented job, no made-up quote

## 3. Design-system primitives

- [x] 3.1 `<SectionHeader render={NN} label="…"/>` — `[ NN — Label ]` Surendar+amanbuilds numbered bracket; Geist Mono brackets+number, Geist Sans label, letter-spaced wide, zinc-500 brackets, zinc-100 label
- [x] 3.2 `<Nav />` desktop top bar: `<SK />` seal on left, 5 numbered links centered/right (`01. Work` etc), `Resume ↗` mono link right after vertical divider; IntersectionObserver scrollspy paints active numeric prefix `sky-400`
- [x] 3.3 `<Nav />` mobile (<768px): top bar with `<SK />` + hamburger; shadcn `Sheet` opens with the 5 numbered links stacked + `Resume ↗` at bottom
- [x] 3.4 `<SectionWrapper id />` — wraps each home `<section>`; owns IntersectionObserver registration and Framer Motion enter fade
- [x] 3.5 `<MonoLink href>` — GitHub↗ / LinkedIn↗ / Email↗ pattern; underline-grow on hover; Geist Mono; `prefers-reduced-motion` disables
- [x] 3.6 Verify focus ring visible (accent `sky-400` outline) on every interactive element; skip-to-content link is the first focusable element

## 4. Splash + hero (vertical slice start)

- [x] 4.1 `/` route with splash state: full-viewport overlay `zinc-950`, single centered prompt `click anywhere to continue →` in Geist Mono (whole overlay clickable)
- [x] 4.2 Splash auto-skip if `SessionStorage["splash_seen"]` is set; set it on click OR after 3s (whichever first)
- [x] 4.3 `prefers-reduced-motion` skips splash entirely; render hero directly
- [x] 4.4 Hero layout: full viewport minus nav, left-aligned (desktop), centered (mobile), no image, no gradient, no portrait
- [x] 4.5 Scroll-revealed stacked lines: 4 lines appear one at a time on scroll-enter (Framer Motion): name (Geist Sans 6rem), role (Geist Mono sky-400 1.5rem), tagline (Geist Sans zinc-400 1.25rem), three `<MonoLink>` GitHub↗ LinkedIn↗ Email↗
- [x] 4.6 Verify reduced-motion path renders all 4 lines immediately without animation
- [x] 4.7 Vertical-slice check: at this milestone the home page renders Splash → Nav → Hero with working scrollspy. Screenshot manually in dark + light mode; confirm no warnings in console, LCP target < 1.2s in `pnpm build && pnpm start`

## 5. Selected work section

- [x] 5.1 `<WorkCard index="01" total="05" discipline="RAG Quality Lab" title="RagBench" isFlagship>` render block: numeric `01 / 05` left (Geist Mono sky-400), middle block title+discipline+one-line+stack chips+optional metric, right CTA link
- [x] 5.2 RagBench card: `Flagship` small sky-400 chip on title, `Read the build →` link to `/projects/ragbench`, stack chips from `ragbenchDetail.stack`, honest WIP metric line ("MVP code landed. Metrics pending real judged evals.") — no fabricated numbers anywhere
- [x] 5.3 Card 02 — drive-rag: discipline `Edge RAG System`, `GitHub ↗` link to https://github.com/SakethKanchi/drive-rag
- [x] 5.4 Card 03 — Parley: discipline `Audio / Multi-process Bot`, `GitHub ↗` + secondary `Landing ↗` link
- [x] 5.5 Card 04 — Kitty VS Code Theme: discipline `Developer Tool / Theme`, big metric `10,000+ downloads` (sky-400), `Marketplace ↗` link
- [x] 5.6 Card 05 — Multiple Disease Prediction: discipline `ML Comparison / Streamlit`, no link (no public repo)
- [x] 5.7 Verify all 5 cards reveal on scroll-enter fade; verify tab order; verify mobile layout stacks cleanly

## 6. Experience journey section

- [x] 6.1 `<JourneyStop index="01">` render block: one-line `Company · Role Title · LTM · Dates`, subline location, then `▹`-prefixed bullets (sky-400 glyph, Geist Sans body)
- [x] 6.2 Stop 01 — Fund Flow OS · Founding Engineer · LTM · Dec 2025 – Present, Jersey City NJ, 2 real bullets from `projects/fund-flow-os.md`
- [x] 6.3 Stop 02 — SideQuest · Automation Team Lead (incl. ML & Flutter Intern) · LTM · Jun 2025 – Dec 2025, Jersey City NJ, 2 real bullets from `projects/sidequest.md`
- [x] 6.4 Stop 03 — Stevens Institute of Technology · M.S. Computer Science · GPA 3.83, Dec 2025, Hoboken NJ; lines only, no bullets
- [x] 6.5 Stop 04 — Gandhi Institute of Technology and Management · B.S. Computer Science, Jun 2023, Hyderabad TG; lines only, no bullets
- [x] 6.6 Verify numbers `01–04` (Geist Mono sky-400) and `▹` glyphs render consistently; verify reduced-motion renders without enter animation

## 7. Open source section

- [x] 7.1 `<OssRow repo="…" pr="…" stars=NN>` render: repo path Geist Mono link, PR context Geist Sans zinc-100, cached star count Geist Mono sky-400 right-aligned
- [x] 7.2 Three rows from `content/index.ts`: adi1090x/widgets 800+, nyxxbit/discord-quest-completer 260+, catppuccin/youtube 156+
- [x] 7.3 `scripts/sync-oss.ts` — `gh api /repos/{owner}/{repo}` (or HTTPS + GITHUB_TOKEN) writes `data/oss.json` at build time; on API failure falls back to hardcoded floors in `content/index.ts`
- [x] 7.4 Add `data/oss.json` to git (truthful baseline; script refreshes on every `pnpm build`)
- [x] 7.5 Verify no live fetch happens at request time in production build — `grep -r "fetch.*api.github" app/` returns nothing

## 8. About section (combined)

- [x] 8.1 `<AboutBlock>` wraps paragraph + `<CurrentlyList>` + `<SkillGroup>` ×5 + `<Cert>` ×1 inside `[ 04 — About ]` `<SectionHeader>`
- [x] 8.2 Verify paragraph verbatim matches resume `\roleSummary` (fullstack variant) — copy-paste from `Saketh_Kanchi_Resume.tex` once and only once
- [x] 8.3 `CurrentlyList` 3 mono lines: "Building RagBench — a RAG quality lab", "Founding Engineer at Fund Flow OS", "Based in Jersey City, NJ"
- [x] 8.4 `<SkillGroup label="Languages" items=…>` 5 groups in fullstack order: Languages, AI / Data, Databases & APIs, Cloud & DevOps, Tools; mono font, no progress bars, no ratings
- [x] 8.5 `<Cert>` one-line badge: `Oracle Cloud Infrastructure 2025 AI Foundations Associate — Oracle, 2025`
- [x] 8.6 Verify combined About section fits one short scroll on desktop, doesn't introduce a new nav item beyond `04. About`

## 9. Contact section

- [x] 9.1 `<ContactPoster>` renders 3 oversized left-aligned lines `Let's build` / `something that` / `ships.` in Geist Sans; one-time entrance fade in
- [x] 9.2 Below poster: one zinc-300 line "Open to AI / full-stack roles and founding-engineer conversations."
- [x] 9.3 Primary CTA `<Button variant="outline">` sky-400 border: `Email me →` → `mailto:sakethkanchi3@gmail.com`
- [x] 9.4 Secondary mono links `<MonoLink>` GitHub↗ LinkedIn↗
- [x] 9.5 `<Footer>` microcopy single line Geist Mono zinc-500: `© 2026 Saketh Kanchi · Built with Next.js · Deployed on Vercel`; optional second line `Jersey City, NJ` (build-time stamp only)
- [x] 9.6 No contact form, no Resend, no env secrets; verify `grep -r "Resend" app/ scripts/` returns nothing

## 10. RagBench deep-dive route

- [x] 10.1 `/projects/ragbench/page.tsx` with `← Back to home` Geist Mono link top-left; header block: title `RagBench`, discipline tag `RAG Quality Lab`, stack chips from `ragbenchDetail.stack`
- [x] 10.2 Section `What it is` — render `ragbenchDetail.whatItIs` verbatim
- [x] 10.3 Section `Why it exists` — render `ragbenchDetail.whyItExists` verbatim ("Industry is saturated with doc-chat products…")
- [x] 10.4 Section `Surfaces` — 3-row table Bench / Probe / Corpus from `ragbenchDetail.surfaces`
- [x] 10.5 Section `Stack` — list with one-line note per item from `ragbenchDetail.stackNotes`
- [x] 10.6 `<StatusCallout>` block: zinc-900 bg, sky-400 1px left border, padding 1.5rem; heading `Honest status`; body uses `ragbenchDetail.statusCallout` text; visible not buried
- [x] 10.7 Placeholder `<figure>` slot with caption `Screenshot pending judged evals` — no fabricated image; wire an empty container so v2 can drop in real captures
- [x] 10.8 Add `<SectionWrapper>` is NOT used here (this is a single column route, no nav scrollspy); verify `/projects/nonexistent` falls through to Next default 404 (no custom 404 in v1)

## 11. SEO + meta + OG

- [x] 11.1 Root `metadata` in `app/layout.tsx`: title template `%s — Saketh Kanchi`, default title `Saketh Kanchi — Full-Stack AI Engineer`, meta description (drafted), `metadataBase` set, canonical URLs
- [x] 11.2 `app/robots.ts` (Next `MetadataRoute.Robots`) — allow all, sitemap link
- [x] 11.3 `app/sitemap.ts` — entries for `/` and `/projects/ragbench` only (v1)
- [x] 11.4 JSON-LD `Person` schema in `app/layout.tsx` `script` tag with `sameAs` GitHub/LinkedIn, `name`, `email`, `jobTitle`, `address` (Jersey City NJ)
- [x] 11.5 `/api/og/route.tsx` (or `app/opengraph-image.tsx`) — type-only OG card 1200x630: zinc-950 bg, `Saketh Kanchi` in Geist Sans, role line in Geist Mono sky-400, hostname bottom-right; no portrait, no gradient
- [x] 11.6 Route-level metadata for `/projects/ragbench`: title `RagBench — Saketh Kanchi`, distinct meta description, distinct OG card variant (project title instead of name)

## 12. Accessibility + Lighthouse verification

- [x] 12.1 Skip-to-content link is the first focusable element; tab order reaches nav then hero links then sections in order
- [x] 12.2 `prefers-reduced-motion: reduce` disables all Framer Motion animations (splash, hero reveal, section fades); verify by toggling OS-level reduced-motion and tabbing the site
- [x] 12.3 Color contrast AA ≥ 4.5:1 everywhere — `zinc-100` on `zinc-950` passes, `sky-400` on `zinc-950` passes, `zinc-300` on `zinc-950` passes; verify `zinc-500` is only used for non-content chrome (brackets, mono microcopy)
- [x] 12.4 Section landmarks: `<header>` for nav, `<main>` for content, `<nav aria-label="Sections">` for the top bar, `<footer>` for footer; verify axe-core passes
- [x] 12.5 Lighthouse CI (one-off run, no pipeline): perf ≥ 95 / a11y ≥ 95 on home and `/projects/ragbench`; LCP < 1.2s on a fresh cold `pnpm build && pnpm start` run

## 13. Deploy

- [ ] 13.1 Vercel project: `~/Code/portfolio`, fresh — do NOT reuse `SakethKanchi/SakethKanchi` or `saketh-kanchi.vercel.app`
- [ ] 13.2 Decide domain at deploy time: leave default `*.vercel.app` for v1 to receive feedback; custom domain is deploy-time overhead
- [ ] 13.3 `git config user.email` set to `sakethkanchi3@gmail.com` and `user.name` to `sakethkanchi` (per global AGENTS.md git identity rule); never use `sidequesttheappoperations@gmail.com`
- [ ] 13.4 First push to `main` triggers deploy; verify splash → nav → hero → 5 sections renders end-to-end on production URL in both dark default and system-light; verify `/projects/ragbench` renders end-to-end
- [ ] 13.5 Update `~/Code/resume/maps/projects.md` + add `~/Code/resume/projects/portfolio-website.md` link-note pointing at the deployed URL (vault sync, not part of this OpenSpec change but tracked here because the second-brain depends on it)