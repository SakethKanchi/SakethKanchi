# Inspiration — Surendar Selvaraj (9/10, top pick)

> **2026-07-18 deep-read amendment.** A closer raw-HTML + live-render pass surfaced patterns the original notes missed. Tracked in `openspec/changes/enrich-design-v2/`. New borrows: Fraunces display serif (loaded via `next/font` as `font-display`, paired with Geist Sans body + Geist Mono chrome), line-mask hero reveal (`<span class="line-mask"><span data-hero-line>` masked + translateY-up, staggered), type-only loader (full-viewport z-[300] overlay with name in Fraunces + role eyebrow in mono uppercase tracking-[0.18em] + 0→100 counter bottom-right, auto-dismiss 3s, click/keypress dismisses, `SessionStorage["splash_seen"]` skip), film grain overlay (SVG `feTurbulence` noise at mix-blend-overlay, low opacity, fixed pointer-events-none aria-hidden), hero accent glow (large blurred radial `var(--accent)` upper-right + smaller mirror lower-left), edge gradient fades (from-bg via-bg/65 to-transparent + from-bg/50 via-transparent to-bg/30), single 0→N counter animation (one honest metric only — Kitty 10,000+), optional desktop custom cursor (mix-blend-difference additive dot, hover+fine-pointer+≥768px+not-reduced-motion).
>
> **2026-07-18 landed.** All the deep-read borrows above shipped in `enrich-design-v2`. Notes from the build: (1) Fraunces uses `next/font/google` var `--font-fraunces` mapped to the `font-display` utility in the `@theme` block; kept 400+600 weights, `display: swap`. (2) Line-mask outer span flips to `overflow: visible` after the reveal completes so the links line's `focus-visible` ring (offset-4) is never clipped. (3) Edge fades use `--background` (scheme token), not the fixed `--color-bg` zinc-950 token, so they adapt to color scheme. (4) The counter is derived from the existing `metric` string (no new content field) and gated to the Kitty card by title. (5) Custom cursor gated via `matchMedia("(hover: hover) and (pointer: fine)")` + `(min-width: 768px)` + `useReducedMotion()`, `aria-hidden`, `pointer-events-none`, additive (native cursor stays). Runtime QA: `scripts/qa-editorial-layer.cjs` (18 checks) + `scripts/qa-a11y.cjs` (7 checks) all green; LCP 352ms (/) and 184ms (/projects/ragbench) under 4x CPU throttle; CLS 0.0005; AA 18.07 (name) / 9.37 (accent) in default dark.

---

URL: https://surendarselvaraj.com
Fetched: 2026-07-17, deep-read 2026-07-18
Role portrayed: Senior Product Designer & UI/UX Designer
Role tier for Saketh: **the structural template** (content-rich, professional, dense, case-study-led with metrics)

## Tech stack from the deep-read

- **Fonts:** 4 via `next/font` — Geist Sans, Geist Mono, **Fraunces** (display serif, `--font-display`), **Caveat** (script accents; we will NOT borrow Caveat — wrong tone for an engineer)
- **Animation:** **GSAP + ScrollTrigger** (the React 19 `Node.prototype.removeChild`/`insertBefore` patch in the head is to handle GSAP pin-spacers). We will NOT migrate to GSAP — Framer Motion variants + `staggerChildren` + `useInView` accomplish the same visual outcomes we need at lower bundle cost. Line-mask reveal is the borrowable pattern, not the library.
- **Background:** **`<div class="grain">`** fixed SVG `feTurbulence` overlay at `mix-blend-overlay`; hero has a `bg-bg/55 backdrop-blur-md` nav + a large `opacity-20 blur-[120px]` radial `var(--accent)` glow in the upper-right
- **Loader:** full-viewport `fixed inset-0 z-[300]` overlay with name in `font-display` (`clamp(2.8rem,7vw,5rem)`, `tracking-[-0.03em]`), role eyebrow in mono uppercase tracking-[0.18em] below, and a `font-mono text-sm text-fg-muted` 0→100 progress counter at `absolute bottom-8 right-8`. Replaces v1's "click anywhere to continue →" interactive splash with a non-interactive editorial loader.
- **Stack details:** `<link rel="proconnect" href="https://fonts.googleapis.com">` (Fraunces + Caveat are Google fonts; Geist is the Vercel package); JSON-LD Person + WebSite + ProfessionalService + FAQPage + WebPage + HowTo + ProfilePage (an aggressive SEO play we will NOT replicate at that depth)

## Why it scored 9/10
Content-rich professional portfolio. Long single-page scroll. Each case study has a real metric highlighted on the cover. Testimonials from named industry people. Numbered career timeline. Essays section. Every section earns its place.

## Structure (what to borrow)
1. Hero — name + role + location + 3 CTAs (View work / Get in touch / Résumé ↗)
2. "Selected case studies" header followed by case-study cards:
   - Cover image (we will skip in v1)
   - "Protected 01" numbered index
   - Title (e.g. "WSJ Vertical Video")
   - Client · Year
   - **One highlighted metric on the cover** (e.g. "70%+ Of WSJ readers on mobile, the format's starting point")
   - Tag chips (Product Design / Multimedia / Design Systems)
3. Counters block — "Projects shipped" / "Enterprise brands & platforms" (with realistic numbers)
4. Testimonials — 6 quotes from named LinkedIn folks. **Skip in v1** unless Saketh collects real ones.
5. About block — one solid paragraph, no portrait at top. "I design for the people who didn't choose the software."
6. My mission / My vision — two short bulleted blocks
7. Design System Intelligence — featured side project cards (DSI plugin, DSI: Slot, system.md). **Saketh's equivalent: RagBench flagship block.**
8. Career journey — 11 numbered stops with title · company · dates · short paragraph each. **Saketh has 2 real stops + 2 degrees — keep numbering, don't pad.**
9. Writing — essay cards with publication, date, read-length, cover thumbnail
10. Awards & recognition — date + single-line entries
11. Education & development — degree + course list
12. Contact — email / LinkedIn / Medium / Figma, plus "Available for Senior UX Architect & Product Design roles" line
13. Footer microcopy — "© 2026 Surendar Selvaraj"

## Detail patterns worth lifting
- **Per-case-study highlighted metric** on cover card. Maps cleanly to Saketh's real metrics (10k+ downloads / 50+ daily queries / 40+ documents / 500+ leads).
- **Numbered case study cards** ("Protected 01", "Protected 02") — borrow the numbering, drop the "Protected" lock icon (Saketh has nothing gated).
- **One-line availability status** near hero ("Available for Senior roles") — adapt to "Open to AI / full-stack roles and founding-engineer conversations."
- **Career journey as numbered scroll** — Saketh's only has 2 stops (Founding Engineer @ Fund Flow OS, Automation Team Lead @ SideQuest) plus 2 degrees. Numbering signals trajectory even with few stops.
- **Section bracket headers** — Surendar uses `\[ Selected case studies \]` / `\[ About \]` / `\[ Writing \]` / `\[ Contact \]`. Cheap but readable.

## What NOT to borrow
- 6 testimonials block — Saketh has zero documented. Don't fabricate.
- 11-stop career timeline — Saketh has 2. Pad with no filler.
- Articles/essays section — Saketh has no published writing yet. Drop in v1.
- Awards section — Saketh has none worth listing yet. Drop.
- Cover images on case studies — banned in v1 spec.

## Honest scope for Saketh's variant
- Hero with availability status
- Selected work — 4 numbered cards, each with one highlighted real metric, stack chips, link
- 1 flagship block (RagBench) with honest-WIP callout
- Counters block — **drop** unless real numbers exist. Only one honest candidate: "1 production theme — 10,000+ downloads." That's not enough for a counter block.
- About — one paragraph + "Currently" list
- Career journey — 2 numbered stops + 2 numbered degrees
- Skills (compact)
- Certifications (one line)
- Contact + footer

[← Back to SPEC](../SPEC.md)