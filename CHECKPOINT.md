# Checkpoint — 2026-08-16

> Pick-up file for any agent resuming portfolio work. Read this first.
> The site is **shipped and live**. Everything below the "Historical build log"
> heading is preserved as-is for context on *why* things are the way they are;
> where it disagrees with this top section, **this top section wins**.

## TL;DR

Portfolio at `~/Code/portfolio`, **live at <https://sakethkanchi.github.io/SakethKanchi/>**.

All four OpenSpec changes are complete:

| Change | Tasks | State |
|--------|-------|-------|
| `build-portfolio-v1` | 82 / 82 | complete (§13 deploy done via GitHub Pages, not Vercel) |
| `enrich-design-v2` | 57 / 57 | complete (editorial layer) |
| `cinematic-motion` | 50 / 50 | complete (Lenis, hero scrub, atmosphere, magnetic) |
| `signature-glyph-identity` | 15 / 15 | complete |

There is no in-flight change. New work should start a fresh OpenSpec change.

## How it actually deploys (differs from the original plan)

The v1 spec said Vercel. **What shipped is GitHub Pages.**

- Static export: `output: "export"` in `next.config.ts` → `out/`.
- Workflow: `.github/workflows/deploy-pages.yml`, triggered on push to **`main`**.
- Repo: `SakethKanchi/SakethKanchi`. It is a **project page**, so the site lives
  under the `/SakethKanchi/` path and `basePath`/`assetPrefix` are driven by
  `NEXT_PUBLIC_BASE_PATH`. `https://sakethkanchi.github.io/` (no path) is a 404 —
  that is expected, not a bug.

**Gotcha that has already bitten once:** the local branch is `master` but Pages
deploys from `main`. Committing to `master` alone changes nothing in production.
Push with `git push origin master:main` (or work on `main`).

**`pnpm start` does not work** with `output: "export"`. To check a real build:

```bash
pnpm build
cd out && python3 -m http.server 3100     # QA scripts expect port 3100
```

## Current stack (as shipped, supersedes the v1 "locked decisions" below)

- Next.js 16.2.10 (App Router) + React 19 + Tailwind v4 + TypeScript (pinned 6.x)
- Fonts: **Space Grotesk** (sans/body/section labels), **Space Mono** (mono
  micro-labels), **Fraunces** (display serif — hero name, loader, metric
  numerals). The original Geist pair is gone.
- Motion: Framer Motion + Lenis smooth scroll. No GSAP (deliberate).
- There **is** a theme toggle (`components/theme-toggle.tsx`), which contradicts
  the v1 "no theme toggle" rule below. The toggle won.
- Routes: `/` and `/projects/ragbench` only, plus `robots.txt`, `sitemap.xml`,
  and OG images.

## Verification commands

```bash
pnpm build          # static export, ~8s
pnpm lint           # eslint, must be clean
pnpm qa             # 51 Playwright checks — needs a server on :3100 first
```

`pnpm qa` = `qa:editorial` (18) + `qa:cinematic` (22) + `qa:a11y` (11). All 51
pass as of 2026-08-16. It needs the built `out/` served on port 3100 (see above)
or every check fails with `ERR_CONNECTION_REFUSED`.

**QA scripts assert on real markup and rot silently.** Three assertions were
found stale on 2026-08-16 (they referenced `.font-display` section labels and a
`data-section-label-chrome` attribute that the editorial redesign removed), and
two a11y contrast probes matched *nothing* and reported `ratio=0.00` as a
failure rather than a miss. If a QA check fails, first confirm the selector
still exists before "fixing" the component.

## Content

All site content is typed in `content/index.ts` (`profile`, `selectedWork`,
`experience`, `oss`, `about`, `ragbenchDetail`). Source of truth for the facts is
the resume vault at `~/Code/resume` (`Saketh_Kanchi_Resume.tex` + `projects/*.md`).

`selectedWork` currently holds **6** projects: RagBench, drive-rag, Parley,
tracker, Kitty, Multiple Disease Prediction. The card index/total strings
(`"01".."06"` / `"06"`) are manual — **renumber every entry when adding one.**

OSS star counts in `data/oss.json` are refreshed at build time by
`scripts/sync-oss.ts` (`pnpm sync:oss`, runs inside `pnpm build`), with
hardcoded floors as fallback. Never live-fetch at request time.

## Known open items

- No custom domain. Site is on the default Pages project-page URL.
- LCP is ~3.6s because the full-screen type loader intentionally holds the hero
  for 3s. This is a deliberate design choice, not a regression; the v1 target of
  <1.2s does not apply while the loader ships.
- `local branch master / deploy branch main` split is a foot-gun; consider
  renaming the local branch to `main` to remove it.

---

# Historical build log

> Everything below is the original build-time checkpoint, kept for the gotchas
> and rationale. **It is out of date on progress, stack, and deploy target.**
> Notably: "10 / 82 tasks", "Geist", "no theme toggle", "deploy on Vercel", and
> "nothing has been committed yet" are all obsolete.

## Update — enrich-design-v2 (editorial-layer) LANDED

**2026-07-18.** OpenSpec change `openspec/changes/enrich-design-v2/` is fully implemented and verified. All tasks in its `tasks.md` are `[x]`. See `openspec/changes/enrich-design-v2/{proposal,design,tasks}.md` + `specs/editorial-layer/spec.md`.

What shipped (design-only, no content/route/data changes):
- **Fraunces** display serif via `next/font/google` (`--font-fraunces` → `font-display` utility, 400+600, `display: swap`). Applied to hero name, section-header labels, contact poster, Kitty counter.
- **Line-mask hero reveal** — 4 lines wrapped `<span class="line-mask"><motion.span data-hero-line>`, `y: 100% → 0` staggered; outer flips to `overflow: visible` post-reveal so focus rings aren't clipped. Reduced-motion renders at rest.
- **Type-only loader** (`components/splash.tsx` rewrite) — name in Fraunces (line-mask), role eyebrow in mono, 0→100 rAF counter bottom-right, auto-dismiss 3s, any click/keypress dismisses, `splash_seen` skip, reduced-motion skips. Old "click anywhere to continue →" removed.
- **Film grain** — base64 SVG `feTurbulence` div, first body child, `fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay`, `aria-hidden` + `pointer-events-none`, on every route.
- **Hero accent glow + edge fades** — two radial `var(--accent)` glows (z-[1]) + two gradient fades using `--background` (scheme-adaptive) under text (`z-10`).
- **Kitty counter** — `lib/use-count-up.ts` + `components/animated-metric.tsx`; SSR baseline `0+`, animates 0→10000 ease-out on scroll-in, once. Derived from the existing `metric` string, gated to the Kitty card by title. Only animated number on the site; RagBench WIP + OSS stars stay static.
- **Custom cursor** — `lib/use-cursor.tsx` (`CustomCursor` in layout), gated `hover:hover + pointer:fine + ≥768px + !reduced-motion`, additive, `aria-hidden`, `pointer-events-none`, kill-switch const.

Verification: `pnpm build` + `pnpm lint` + `tsc --noEmit` clean. Runtime QA via Playwright-core Chromium headless, now wired as reproducible npm scripts: `pnpm qa` (runs both), `pnpm qa:editorial` (`scripts/qa-editorial-layer.cjs`, 18 checks), `pnpm qa:a11y` (`scripts/qa-a11y.cjs`, 7 checks) — 25/25 green against a fresh prod build on `:3100`. LCP 352ms (`/`) / 184ms (`/projects/ragbench`) under 4x CPU throttle; CLS 0.0005; AA contrast 18.07 (name) / 9.37 (accent) in default dark. `openspec validate enrich-design-v2 --strict` passes; `openspec list` shows the change ✓ Complete.

Gotcha: `playwright-core` added as a devDependency + Chromium headless shell downloaded to `~/.cache/ms-playwright` for QA. `exec node_modules/.bin/next start -p 3100` in a harness background task is the reliable way to run a server here (a plain `&` inside the bash tool returns instantly / detaches unsafely).

**Light mode — FIXED (was a shipped v1 defect).** `design.md:56` specifies "dark default + `prefers-color-scheme` light opt-in" and v1 task 13.4 requires verifying system-light, but v1 components use hardcoded Tailwind `zinc-*` ink/surface utilities, so under `prefers-color-scheme: light` the bg token flipped while text stayed light-gray (hero name ~1.05:1). Fix: Tailwind v4 compiles `text-zinc-100` → `color: var(--color-zinc-100)`, so `app/globals.css` now remaps the whole zinc ramp **inside the light media query only**, reflecting it about its midpoint (`100↔900`, `200↔800`, …, `500` fixed). Dark stays pixel-identical (zero changes there); reflection preserves every fg/bg contrast pair, so AA-in-dark ⇒ AA-in-light. Verified: light hero name 16.97, body 10.00, muted label 4.62, bg-luminance 0.956 (`pnpm qa:a11y`). Satisfies v1 task 13.4's system-light requirement ahead of deploy.

**Reduced-motion hero — FIXED (pre-existing a11y bug, caught during the light-mode pass).** Framer SSR-renders the hidden hero variant as inline `transform:translateY(100%)`. Under normal motion the client animates to `y:0`, but under `prefers-reduced-motion` the lines had no variant so the SSR transform never cleared → **blank hero** in both dark and light. Fix in `components/hero.tsx`: under `reduce`, the inner `motion.span` now sets `initial={false}` + `animate={{ y: 0 }}` to pin lines at rest. QA hardened: the "reduced: hero name visible at rest" check now also asserts the inner line transform is `none` (the old outer-bbox check missed it).

## Next change: `cinematic-motion`

New OpenSpec change `openspec/changes/cinematic-motion/` created. This is a motion + atmosphere layer on top of v2 — pushing toward the Higgsfield/Awwwards cinematic feel while keeping it implementable without paid video assets.

### GSAP decision: NO

Deliberately kept in v2 and reaffirmed: **do not migrate to GSAP.** Framer Motion's `useScroll` / `useTransform` achieves the same scrub/parallax/reveal visuals at lower bundle cost (~0 added vs ~30kb for GSAP + ScrollTrigger). Lenis pairs natively with Framer. The only thing GSAP ScrollTrigger offers that Framer doesn't is pin-spacers (pinning sections), which we don't need for this portfolio's content depth.

### Core trio (priority order, no assets needed)

1. **Lenis smooth scroll** (~2kb gzipped) — butter-smooth inertial scrolling. Single biggest "expensive feel" upgrade. Respects reduced-motion.
2. **Scroll-scrubbed hero** — Framer `useScroll` + `useTransform`: hero text drifts up + fades on scroll, accent glows scale + fade. Section parallax via `--parallax-speed` CSS var.
3. **Procedural gradient-mesh + noise shader** — raw WebGL canvas at z-0 behind content. 2-3 soft radial blobs (accent + complementary + bg tones) + subtle Perlin noise. Half-res render for perf. Static under reduced-motion.

### Secondary (if time permits)

4. **Split-text section header reveal** — extend existing `.line-mask` to per-word stagger
5. **Magnetic buttons** — hover pull toward cursor (desktop fine-pointer only)

### Deferred / optional

6. **Frame-synced scroll video hero** — the true Higgsfield signature. See `openspec/changes/cinematic-motion/optional-video-hero.md`. **NOT part of core change.** The user has very few Higgsfield credits and does not want to waste them. Only implement if/when a suitable clip is generated. The user **can do unlimited image generation**, so procedural imagery / frame sequences from image gen are a viable alternative path.

### Spec files

- `openspec/changes/cinematic-motion/proposal.md` — why, what changes, capabilities, dependencies
- `openspec/changes/cinematic-motion/design.md` — Lenis integration, scroll stack, shader spec, reduced-motion strategy, a11y
- `openspec/changes/cinematic-motion/tasks.md` — 8 sections, ~35 tasks
- `openspec/changes/cinematic-motion/optional-video-hero.md` — asset-dependent video hero pattern

## Handoff — exact next steps

### `cinematic-motion` — LANDED

All 50 cinematic tasks are complete. Shipped:

- Lenis smooth scroll for motion-capable users; reduced-motion keeps native scroll.
- Reversible Framer Motion hero scrub, plus decorative Work-section-only parallax that never transforms content.
- One half-resolution raw WebGL atmosphere canvas, fixed at `z-0`, visibility-aware, scheme-adaptive, and static under reduced-motion.
- Word-staggered home section labels and desktop fine-pointer magnetic wrappers for primary work links and email CTA.
- Deferred video-hero mini-spec only; no video asset or runtime component.

Verification observed against a fresh production build:

- `pnpm build && pnpm lint && pnpm exec tsc --noEmit` exit 0.
- `pnpm qa`: 18 editorial + 12 cinematic + 11 accessibility checks pass.
- Desktop, mobile 375×667, reduced-motion, dark, and light `/projects/ragbench` browser smoke tests pass. Fixed a discovered light-route canvas stacking issue by placing root route content at `relative z-10`.
- Lighthouse: accessibility 96; FCP 756ms; TBT 43ms; CLS 0.00001. LCP 3.61s is reported, not gated, because the retained v2 full-screen loader intentionally delays hero LCP by three seconds.
- `openspec validate cinematic-motion --strict` remains required after this handoff documentation update.

### Next actions

1. **First commit** — needs Saketh's explicit go-ahead:
   ```sh
   git -C /home/saketh/Code/portfolio config user.name "sakethkanchi"
   git -C /home/saketh/Code/portfolio config user.email "sakethkanchi3@gmail.com"
   git -C /home/saketh/Code/portfolio add -A
   git -C /home/saketh/Code/portfolio commit -m "feat: portfolio cinematic motion"
   ```
2. **v1 §13 deploy** — create a fresh Vercel project; do not reuse `SakethKanchi/SakethKanchi` or `saketh-kanchi.vercel.app`. Decide default `.vercel.app`, subdomain, or apex before linking and first production push.
3. **Vault sync** — after deployment, add deployed URL to the `~/Code/resume` portfolio maps and second-brain project note.

Last updated: 2026-07-18, after cinematic-motion implementation and verification.
