## Why

v1 shipped clean: type-led hero, bracket section headers, scroll-revealed lines, 5 numbered cards, OSS rows, About + Contact. But the v1 inspiration pass only captured Surendar's *structure* (case-study cards + numbered timeline + bracket headers). A closer read of `surendarselvaraj.com` (raw HTML + live render) shows three dimensions v1 did not borrow:

1. **Typography depth.** Surendar loads four `next/font` families: Geist Sans, Geist Mono, **Fraunces** (display serif), **Caveat** (script). v1 uses only the two Geists. Every Surendar h1/h2/counter uses `font-display` (Fraunces); the mono and sans carry chrome and body. v1's hero name and section headers render in Geist Sans, which reads flatter than the reference.
2. **Animation signature.** Surendar runs **GSAP + ScrollTrigger** with a specific set of patterns v1 lacks: line-mask hero reveal (each line inside `<span class="line-mask"><span data-hero-line>` translates up out of a clipped mask), `data-reveal` / `data-reveal-child` staggered scroll reveals, 0→N counter animation on the stats block, custom cursor with `mix-blend-difference`. v1 uses Framer Motion `whileInView` fade-up — correct, but reads as the same motion library every Next site uses.
3. **Atmosphere.** Surendar's page sits on three background layers v1 has none of: a `grain` SVG noise overlay across the whole page, a large blurred radial `var(--color-accent)` glow in the hero's upper-right, and edge gradient fades (`from-bg via-bg/65 to-transparent` left + `from-bg/50 via-transparent to-bg/30` bottom). v1's backgrounds are flat zinc-950.

v1's splash is the Anirban "click anywhere to continue →" pattern. Surendar's loader is different and more editorial: a full-viewport `fixed inset-0 z-[300]` overlay with the **name in Fraunces** and a **0→100 progress counter** bottom-right in Geist Mono. No click prompt. The name reveals via the same line-mask animation as the hero. This load → hero handoff is the editorial signature v1 is missing.

A second pass through the inspiration set (`more-inspiration-2.md`, `user-provided.md`) confirms Ravi Klaassens uses the same line-by-line scroll reveal in the hero, and bymonolog uses the same oversized counter pattern — these are convergent borrowable patterns, not single-source lifts.

## What Changes

This is a **design enrichment** change on top of the shipped v1 — no route additions, no content model changes, no new data sources. All edits land in existing components and `globals.css`.

### Borrowed from Surendar (primary)

- **Add Fraunces via `next/font/google`** as a third font family. Wire `--font-display` CSS variable; map a `font-display` Tailwind utility in `globals.css` `@theme` (analogous to how `--font-sans` / `--font-mono` already map). Geist Sans stays the body + chrome font; Geist Mono stays the technical/chrome font; **Fraunces is the display font for hero name, section h2s, contact poster, and any oversized counter number**.
- **Line-mask hero reveal.** Rewrite `components/hero.tsx` so each of the 4 stacked lines is wrapped `<span class="line-mask"><span data-hero-line class="block">…</span></span>` with `overflow-hidden` outer and inner `translate-y-full → 0` animation. Replaces the current `y: 16 → 0` fade-up. One-time, reduced-motion-aware (reduced-motion: inner spans render at `translate-y-0`, no animation).
- **Section h2 in Fraunces.** Update `components/section-header.tsx` so the label portion renders in `font-display` (Fraunces). The `[ NN —` bracket and number stay Geist Mono. Visual: `[ 01 — Selected work ]` reads as mono-bracket + display-serif-label, matching Surendar's eyebrow/h2 pairing.
- **Contact poster in Fraunces.** `components/contact-section.tsx`: the three `Let's build / something that / ships.` lines render in `font-display`, not `font-sans`. Tighter `leading-[1.0]`, slightly smaller clamp top (display serif reads larger than sans at the same size).
- **Type-only loader (replaces Anirban splash).** Rewrite `components/splash.tsx`: three-second auto-progress loader that renders the name in Fraunces (`clamp(2.8rem, 7vw, 6.5rem)`, `tracking-[-0.03em]`), a role eyebrow line in mono uppercase tracking-[0.18em], and a `0→100` progress counter bottom-right in Geist Mono. Line-mask reveal on the name. Keep `SessionStorage["splash_seen"]` skip logic from v1. Drop the `click anywhere to continue →` prompt (the counter communicates progress; no decision needed). Dismiss on click/keypress still honored for keyboard users who don't want to wait.
- **Film grain overlay.** Add a fixed `pointer-events-none` SVG noise overlay at `z-[1]` covering the viewport, `opacity-[0.035]`, `mix-blend-overlay`. Implementation: inline `<svg>` filter with `<feTurbulence type="fractalNoise" baseFrequency="0.9">` repeated as a data-URI background on a single div in `app/layout.tsx`. One asset, no external fetch, ~600 bytes.
- **Hero accent glow.** Add to `components/hero.tsx`: one `pointer-events-none absolute right-[8%] top-1/4 h-[60vh] w-[60vh] rounded-full opacity-20 blur-[120px]` div with `bg-[radial-gradient(circle,var(--accent)_0%,transparent_60%)]`. A second one mirrored to `left-[-10%] bottom-[10%]` at `opacity-10` for balance. No new colors, only the existing `--accent` (sky-400).
- **Edge gradient fades in hero.** Add one `bg-gradient-to-r from-bg via-bg/65 to-transparent` absolute layer across the hero (left-to-right fade to bg) and one `bg-gradient-to-t from-bg/50 via-transparent to-bg/30` (bottom-to-top). These sit above the glow, below the text. They keep the glow from bleeding into the nav and from bottoming-out harshly into the next section.
- **Counter animation for the one honest stats moment.** v1 does not have a counters block (the brief explicitly dropped it: "only one honest candidate — `10,000+ downloads` — not enough for a counter block"). Borrowing Surendar's 0→N animation **for the single Kitty VS Code Theme card metric** instead: the `10,000+ downloads` number renders as `font-display text-accent`, starts at `0+` SSR, animates `0 → 10000` on scroll-into-view. Used exactly once so it reads as a feature, not a row of fake stats. All other metrics stay static (the WIP callout must NOT animate — it is an honest "metrics pending" line and animating it would defeat the honesty).
- **Custom cursor (desktop only, optional via media query).** Add a `hidden md:block` inverted-blend dot that follows the mouse via `mix-blend-difference` and `border-accent`. Render only on hover-capable pointers (`@media (hover: hover) and (pointer: fine)`). Disables under reduced-motion. This is the riskiest borrow — if it interferes with reading or a11y, drop it in a follow-up. Default to leaving the native cursor visible alongside (the dot is additive, not replacement).

### Borrowed from Ravi Klaassens (convergent confirmation)

- **Scroll-revealed hero lines one at a time.** v1 already does this with Framer Motion; the line-mask rewrite above makes the reveal *editorial* (each line masked + translated up) instead of *fadey*. Ravi's hero is the same pattern Surendar uses, so this is a convergent lift, not a second source.

### Borrowed from bymonolog (convergent confirmation)

- **Oversized counter number in display serif.** Surendar and bymonolog both use `clamp(4rem, 12vw, 9rem)` display-serif counter numbers. Applied to the single Kitty metric above.

### Not borrowed (considered, rejected)

- **Caveat (script) font.** Surendar uses Caveat for tiny handwritten accents. Wrong tone for an engineer portfolio — reads as a designer tic. Skip.
- **Right-rail vertical section nav.** Surendar has a fixed right-side dot/line nav with labels on hover. v1's top nav already covers scrollspy; a second nav adds chrome without adding information. Skip.
- **GSAP migration.** Replacing Framer Motion with GSAP + ScrollTrigger would unlock pin-spacers and finer stagger control, but adds bundle weight (~30kb gz for GSAP + ScrollTrigger), a new API surface, and a peer-dependency on React 19 server components that needs care. **Keep Framer Motion.** Implement line-mask reveals with Framer Motion's `initial`/`whileInView`/`variants` + `staggerChildren`. The visual outcome is equivalent for the patterns in this change.
- **Card image zoom hover.** Surendar's case-card covers zoom on hover. v1 has no project cover images (banned in v1 brief). Skip.
- **Backdrop-blur top nav.** v1's nav is a solid fixed bar. Surendar uses `backdrop-blur-md bg-bg/55`. Could borrow, but the brief committed to a solid fixed nav; surface this as a deferred option, not part of this change.
- **Multi-stop pin-scroll career timeline.** Surendar pins the journey section and scrolls through stops with progress indicator. Saketh has 2 jobs + 2 degrees — not enough content to justify pinning. Skip.
- **Animated SVG hub graphic.** Surendar's DSI hub orbits circles along SVG paths. Cool, but Saketh has no equivalent content area (no design-system-intelligence block). Skip.

## Capabilities

### New Capabilities

- `editorial-layer`: A visual layer that applies across the home + RagBench routes — display-serif typography (Fraunces), line-mask hero reveal, type-only loader, film grain overlay, hero accent glow + edge fades, single-counter animation on the Kitty metric, optional desktop custom cursor. No content or route changes.

### Modified Capabilities

- `home-shell` (from `build-portfolio-v1`): hero typography + reveal mechanism change; splash → loader rewrite; background atmosphere added.
- `selected-work`: Kitty card metric adds 0→N counter animation; other metrics unchanged.
- `about-block`: section header label font changes to Fraunces (no content change).
- `seo-meta`: one new font preload (Fraunces woff2) added to the `<head>` via `next/font/google`; metadata strings unchanged.

## Impact

- **Dependencies**: add `framer-motion` already present; no new runtime deps. Fraunces loads via `next/font/google` (build-time fetch, self-hosted at build, zero client-time Google-font fetch).
- **Layout shift risk**: line-mask hero reveal requires `overflow-hidden` on a span whose height is set by the inner block. Test for CLS on first paint; set explicit `min-h` if needed. Loader is full-viewport `fixed` so does not shift content.
- **LCP impact**: adding Fraunces adds one woff2 preload; keep `display: swap` so LCP text (hero name) paints with fallback then swaps. Loader dismisses in 3s; hero text is in normal flow beneath, so LCP registers at splash-dismiss, not at Fraunces arrival. Verify LCP remains < 1.2s.
- **A11y**: line-mask animates `transform: translateY()` only — never `opacity` on text content (text is always readable at `translate-y-0`). Reduced-motion: inner spans render at rest, no animation. Grain overlay is `aria-hidden` and `pointer-events-none`. Custom cursor is `aria-hidden` and additive only.
- **Bundle**: Fraunces woff2 ~30-45kb per weight (load 2 weights: 400 + 600 for display). One new CSS utility (`font-display`). No JS bundle change beyond a few lines.
- **Honest content guard**: the only animated metric is Kitty's `10,000+ downloads` (verifiable on the VS Code Marketplace). The RagBench WIP callout stays static by design.
- **References**: this change is anchored to `surendarselvaraj.com` (raw HTML inspect 2026-07-18), `more-inspiration-2.md` (Ravi Klaassens), `user-provided.md` (bymonolog counter pattern). No new reference sites introduced.