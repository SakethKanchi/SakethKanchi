## 1. Fraunces display font wiring

- [x] 1.1 Add Fraunces via `next/font/google` in `app/layout.tsx` with weights 400 + 600, `display: swap`; export `--font-display` CSS variable on the `<html>` className alongside the existing Geist Sans + Geist Mono variables
- [x] 1.2 Add `--font-display` mapping in `app/globals.css` `@theme` block (analogous to the existing `--font-sans` / `--font-mono` mappings) so `font-display` utility resolves to Fraunces with serif fallback
- [x] 1.3 Smoke test: build + verify two Fraunces woff2 preloads land in `<head>`, `font-display` utility applied to a test element resolves to Fraunces in computed style, fallback serif renders during the swap window with no FOIT

## 2. Line-mask hero reveal

- [x] 2.1 Add `.line-mask` utility class in `app/globals.css`: `display: block; overflow: hidden;` — outer span only
- [x] 2.2 Rewrite `components/hero.tsx` so each of the 4 hero lines (name, role, tagline, links) is wrapped in `<span class="line-mask">` with an inner `<motion.span>` that animates `y: "100%" → 0` via Framer Motion variants + `staggerChildren` 0.08–0.15s
- [x] 2.3 Swap hero name className to `font-display text-[clamp(2.8rem,6.5vw,6.5rem)] leading-[0.92] tracking-[-0.03em]`
- [x] 2.4 Verify reduced-motion path: inner spans render at `translateY(0)` with no animation, all 4 lines visible immediately
- [x] 2.5 Verify no CLS contribution from the hero (outer mask height set by inner content)

## 3. Section header label in Fraunces

- [x] 3.1 Update `components/section-header.tsx`: label span className uses `font-display`, bracket + number + dash stay in `font-mono`
- [x] 3.2 Verify visual: `[ 01 — Selected work ]` reads as mono-bracket + display-label across all section headers (Selected work, Experience, Education, Open Source Contributions, About, Contact)
- [x] 3.3 Verify no other visual change to the section header (size, color, letter-spacing all unchanged)

## 4. Contact poster in Fraunces

- [x] 4.1 Update `components/contact-section.tsx`: the three `Let's build` / `something that` / `ships.` lines render in `font-display`, with `leading-[1.0]` + `tracking-tight`
- [x] 4.2 Verify poster still reads as 3 oversized lines; no other contact-section content changes font

## 5. Type-only loader rewrite

- [x] 5.1 Rewrite `components/splash.tsx`: full-viewport `fixed inset-0 z-[300]` overlay
- [x] 5.2 Center content: name span in `font-display` size `clamp(2.8rem,7vw,6.5rem)` `tracking-[-0.03em]`, wrapped in `.line-mask` + `<motion.span>` revealing `translateY(100%) → 0` on mount
- [x] 5.3 Role eyebrow below name in `font-mono` uppercase `tracking-[0.18em] text-fg-muted` ("Full-Stack AI Engineer · Jersey City, NJ")
- [x] 5.4 Progress counter bottom-right in `font-mono text-sm text-fg-muted` with `font-variant-numeric: tabular-nums`, counting 0 → 100 over 3 seconds, ending at exactly `100`
- [x] 5.5 Auto-dismiss at counter `100` (~3s after mount); set `SessionStorage["splash_seen"] = "1"`
- [x] 5.6 Click / keypress dismisses immediately, sets `SessionStorage["splash_seen"] = "1"`, cancels counter animation
- [x] 5.7 Repeat-visit check at mount: if `SessionStorage["splash_seen"] === "1"`, render `null` and call `onDone` immediately
- [x] 5.8 Reduced-motion: if `useReducedMotion()` returns true, render `null` and call `onDone` immediately on every visit (no loader)
- [x] 5.9 Verify the previous `click anywhere to continue →` prompt does NOT appear anywhere in the rewritten component
- [x] 5.10 Verify the underlying Hero + sections render in normal flow beneath the loader (loader is fixed overlay; no mount delay on children)

## 6. Film grain overlay

- [x] 6.1 Define an inline SVG `feTurbulence type="fractalNoise" baseFrequency="0.9"` filter; embed as a `data:image/svg+xml;base64,…` URI
- [x] 6.2 In `app/layout.tsx`, add a single `<div aria-hidden className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay opacity-[0.035]" style={{ backgroundImage: \`url("data:...")\` }} />` as the first child of `<body>` (before Nav)
- [x] 6.3 Verify grain renders on `/` and on `/projects/ragbench` (it is in layout, so by construction it is on every route)
- [x] 6.4 Verify clicking, scrolling, text selection anywhere is not intercepted by the grain div (pointer-events: none)
- [x] 6.5 Verify AA contrast pairs from v1 (zinc-100/zinc-950, sky-400/zinc-950, zinc-300/zinc-950) still pass with grain rendered

## 7. Hero accent glow + edge fades

- [x] 7.1 In `components/hero.tsx`, add upper-right glow: `pointer-events-none absolute right-[8%] top-1/4 z-[1] h-[60vh] w-[60vh] rounded-full opacity-20 blur-[120px]` with `style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }}`
- [x] 7.2 Add lower-left mirrored glow: same radial gradient, `h-[40vh] w-[40vh] left-[-10%] bottom-[10%] opacity-10 blur-[120px]`
- [x] 7.3 Add left edge fade: `absolute inset-0 z-[1] bg-gradient-to-r from-bg via-bg/65 to-transparent` (fade to `--background` for scheme adaptivity)
- [x] 7.4 Add bottom edge fade: `absolute inset-0 z-[1] bg-gradient-to-t from-bg/50 via-transparent to-bg/30` (fade to `--background`)
- [x] 7.5 Hero text wrapper promoted to `z-10` so text renders above the glows + fades
- [x] 7.6 Verify hero text contrast against its immediate backdrop still passes AA with the glow rendered

## 8. Kitty counter animation

- [x] 8.1 Make Kitty card metric SSR-safe: render `0+` in `font-display text-[var(--accent)]` server-side
- [x] 8.2 In `components/work-card.tsx` (or a small `lib/use-count-up.ts` hook), animate the metric from `0` → `10000` when the card scrolls into view, over 1.2–1.8s with an ease-out curve; render the thousands separator (`10,000+` at end)
- [x] 8.3 Use Framer Motion's `useInView` (or `whileInView`) so the animation fires once per page load (not on every scroll past)
- [x] 8.4 Reduced-motion: render `10,000+` immediately on mount, no animation
- [x] 8.5 Verify the RagBench honest-WIP callout stays static (no animation), and every other metric on the site stays static
- [x] 8.6 Verify `10,000+` is the truthful marketplace-downloads number (already in v1 content; not a fabricated value)

## 9. Optional desktop custom cursor

- [x] 9.1 Create `lib/use-cursor.ts` hook that mounts a single fixed `<div>` following the mouse via `requestAnimationFrame`, with `mix-blend-difference` and `border border-[var(--accent)]`
- [x] 9.2 Only render when ALL media query checks pass: `@media (hover: hover) and (pointer: fine)`, viewport width ≥ 768px (`md:block`), and `prefers-reduced-motion: reduce` is NOT set (use `useReducedMotion()`)
- [x] 9.3 The cursor div is `aria-hidden` and `pointer-events-none`; the native cursor remains visible (cursor: auto / default on body)
- [x] 9.4 Kill-switch flag at top of component (`const ENABLE_CUSTOM_CURSOR = true`); flip to `false` in QA if it interferes with any interaction
- [x] 9.5 QA pass: text selection, link hover, focus rings, Sheet open/close, mobile menu — none broken by the dot
- [x] 9.6 Verify the cursor is absent on touch devices, on coarse pointers, under reduced-motion, and below 768px viewport width

## 10. Reduced-motion + a11y verification

- [x] 10.1 Toggle `prefers-reduced-motion: reduce` in the browser: loader skips, hero lines render at rest, Kitty counter renders `10,000+` immediately, custom cursor does not render, grain renders but is static
- [x] 10.2 Toggle back to no-preference: all animations play once, repeat-visit skips loader, no animation re-fires on scroll-back (Framer Motion `once: true`)
- [x] 10.3 Run Lighthouse on `/` and `/projects/ragbench`: perf ≥ 95, a11y ≥ 95, LCP < 1.2s — measured LCP 352ms (/) and 184ms (/projects/ragbench) under 4x CPU throttle via CDP; CLS 0.0005; static prerender
- [x] 10.4 Run `pnpm build && pnpm lint && tsc --noEmit`: all clean
- [x] 10.5 Tab through the page: focus ring still fills, skip-to-content still first focusable, all landmarks (HEADER, NAV, MAIN, SECTIONs, FOOTER) still present
- [x] 10.6 Run axe-core (or Lighthouse a11y audit): zero new violations vs v1 — landmarks intact, AA contrast 18.07 (name) / 9.37 (accent) in default dark, skip-link first-focusable

## 11. Spec + checklist cleanup

- [x] 11.1 All scenarios in `openspec/changes/enrich-design-v2/specs/editorial-layer/spec.md` pass QA
- [x] 11.2 Mark every task in this file `[x]` once verified
- [x] 11.3 Update `CHECKPOINT.md` with a one-line note that the editorial-layer change landed, the date, and a pointer to this change folder
- [x] 11.4 Update `inspiration/surendar-selvaraj.md` with the additional patterns lifted in this pass (Fraunces, grain, glow, line-mask, loader, counter, optional custom cursor) — amend the existing "Borrowed" list; do not overwrite v1 content
- [x] 11.5 Commit message draft: `feat(design): editorial-layer enrichment from Surendar (Fraunces, line-mask hero, type-only loader, grain + glow, Kitty counter)`