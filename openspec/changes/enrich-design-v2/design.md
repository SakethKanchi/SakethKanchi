## Context

v1 shipped a type-led portfolio on the Geist Sans + Geist Mono pair with Framer Motion fade-up reveals and a flat zinc-950 background. A closer read of `surendarselvaraj.com` (raw HTML inspect 2026-07-18) shows v1 only captured Surendar's *structure* — not his *depth*. This change enriches the existing surface without changing routes, content, or data.

### What v1 borrowed from Surendar

- Numbered case-card indices (`Protected 01`, `01` mid-card)
- Bracket section headers (`[ Selected case studies ]`)
- Numbered journey timeline
- One-line availability status near hero
- Per-card metric line (`70%+ Of WSJ readers on mobile…`)

### What v1 missed (this change)

| Pattern | Surendar detail | v1 state |
|---|---|---|
| Fraunces display serif | `font-display` on every h1/h2/counter; only chrome + body are Geist Sans/Mono | v1 uses Geist Sans for h1/h2; reads flat |
| Line-mask hero reveal | `<span class="line-mask"><span data-hero-line>` inner translates up out of mask, staggered | v1 uses Framer Motion `y: 16 → 0` fade; not editorial |
| Type-only loader | Full-viewport overlay: name in Fraunces + role eyebrow in mono + 0→100 counter bottom-right, auto-dismiss 3s | v1 uses Anirban's `click anywhere to continue →` prompt |
| Film grain overlay | `<div class="grain">` fixed, SVG `feTurbulence` noise, `mix-blend-overlay`, low opacity | v1 has flat bg |
| Hero accent glow | Large blurred radial `var(--accent)` upper-right + smaller mirror lower-left | v1 none |
| Edge gradient fades | `from-bg via-bg/65 to-transparent` + `from-bg/50 via-transparent to-bg/30` | v1 harsh section transitions |
| 0→N counter animation | Counters block animates 0 → real value on scroll, SSR-safe `0` baseline | v1 dropped counters entirely (only 1 honest metric) |
| Right-rail section nav | Vertical dot/line nav with labels-on-hover | v1 has only top nav (sufficient; NOT borrowing) |
| Custom cursor with `mix-blend-difference` | Inverted-blend dot, desktop only | v1 none |

## Goals / Non-Goals

### Goals

- Bring v1's visual layer to Surendar's depth without changing content or routes
- Add Fraunces as the display font (one new font family, two weights)
- Rewrite the splash → hero handoff as an editorial loader → line-mask reveal
- Add environmental atmosphere (grain + accent glow + edge fades) without affecting text contrast
- Animate exactly the one metric that honestly deserves celebration (Kitty downloads); keep every other metric static
- All motion respects `prefers-reduced-motion`
- All AA contrast pairs from v1 remain AA after this change

### Non-Goals

- Replace Framer Motion with GSAP (cost too high for the patterns we need; Framer Motion variants + stagger achieve the same visual)
- Add a counters block (the brief already dropped it — only one honest number exists)
- Add cover images to work cards (banned in v1; unchanged here)
- Migrate Nav to backdrop-blur (a separate cosmetic change, deferred)
- Add a right-rail section nav (redundant with the top nav scrollspy)
- Add the DSI hub SVG orbital graphic (no equivalent content area for Saketh)
- Add Caveat or other script font (wrong tone for engineer)
- Change any content string, route, or data source

## Decisions

### Display font: Fraunces via `next/font/google`

- **Why Fraunces:** it is the exact font Surendar loads as `font-display`. Optical sizing, soft drama, reads as editorial without reading as "wedding invitation." Pairs with Geist Sans sans-clash because they occupy different roles (display vs body).
- **Why `next/font/google` not `geist` package:** Fraunces is a Google font, not a Vercel font. `next/font/google` keeps self-hosting + zero client-time Google fetch that the `geist` package already provides for Geist.
- **Weights:** 400 and 600. Display use only. (700 is tempting but Fraunces 600 already reads strong at display sizes.)
- **CSS var:** `--font-display`. Tailwind utility `font-display` mapped in `@theme` next to the existing `--font-sans` / `--font-mono` mappings.
- **Load weight:** two woff2 preloads in `<head>`. Acceptable. LCP text paints in fallback serif with `display: swap`; swaps without relayout.

### Animation library: stay on Framer Motion, use variants + stagger

- **Why not GSAP:** GSAP + ScrollTrigger is ~30kb gz, adds a second motion library, requires careful handling around React 19 server components (the pin-spacer patch in Surendar's HTML is a sign of that friction). For the patterns we need — line-mask reveals, staggered children, one counter, one custom cursor — Framer Motion variants + `staggerChildren` + a small `useEffect` for the counter give identical visual results.
- **Line-mask reveal implementation:** outer `<span class="line-mask overflow-hidden block">`, inner `<motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} variants={…}`. The mask clips the inner span during translate. Stagger via parent variants.

### Loader: type-only, replaces splash

- **Why replace splash:** Anirban's `click anywhere to continue →` is honest but interactive — it asks the user to make a decision on first paint. Surendar's loader does not ask; it *performs* (name reveals, counter runs) and dismisses itself. More editorial, less friction.
- **Why keep `SessionStorage`:** repeat visits in a session should not re-trigger the loader. v1's `splash_seen` key is reused; the loader's `SessionStorage["splash_seen"] = "1"` is identical in semantics.
- **Why keep click/keypress dismiss:** accessibility — a keyboard user who doesn't want to wait 3s should be able to dismiss immediately. Dismiss sets `splash_seen` and unmounts.
- **Why 0→100 (not 0→10000):** loader counts to 100 because it's a progress indicator, not a metric. The Kitty counter separately counts to 10000 because that's a real number.

### Counter: exactly one, on the Kitty metric

- **Why only one:** the brief dropped the counters block because "only 1 honest number exists." Reusing the animation on exactly that one number in its existing spot on the Kitty card honors the brief while borrowing Surendar's signature motion.
- **Why NOT animate anything else:** the RagBench WIP callout says "metrics pending judged evals." Animating it would defeat the honesty. The OSS star counts are cached at build; animating them would imply liveness they don't have. The "50+ daily queries" and "40+ documents" metrics in the Fund Flow OS experience block stay static too — animating multiple numbers cheapens them.

### Atmosphere: grain + glow + edge fades

- **Grain:** one SVG `feTurbulence` filter as a data-URI background on a single div. Inline, ~600 bytes. `mix-blend-overlay` at 0.025–0.05 opacity. Adds texture without color.
- **Glow:** two radial divs in the hero only. Upper-right large accent glow, lower-left smaller mirrored glow. Both use the existing `--accent` (sky-400); no new color tokens.
- **Edge fades:** two gradient overlays above the glow, below the text. Prevent the glow from bleeding into the fixed nav and into the Work section's top border.
- **Why not everywhere:** grain is global (atmosphere), but glow only belongs in the hero (a moment). Other sections stay flat zinc-950 — the contrast is the point.

### Custom cursor: additive, desktop-only, optional kill-switch

- **Why additive only:** replacing the native cursor is hostile to anyone who relies on it (low-vision users, screen-magnifier users, anyone with motor differences). The dot rides alongside the native cursor — it's a flourish, not a replacement.
- **Why only `hover: hover` and `pointer: fine`: touch / coarse pointer devices skip it. No mouse → no point.
- **Why skip under reduced-motion:** the cursor follows the mouse via `requestAnimationFrame`; that's motion. Under reduced-motion, no rAF loop, no dot.
- **Kill-switch:** if QA shows it interferes with reading or any interaction, drop it before deploy. It is the riskiest borrow in this change.

### Risks

| Risk | Mitigation |
|---|---|
| Fraunces woff2 delays LCP | `display: swap` + only 2 weights; LCP text paints in fallback then swaps |
| Line-mask causes CLS | outer `line-mask` height set by inner content; verify CLS=0 in Lighthouse |
| Grain overlay affects perceived contrast | keep opacity 0.025–0.05; verify all AA pairs still pass with grain on |
| Custom cursor distracts or breaks interactions | additive only, `aria-hidden`, `pointer-events-none`; QA on text selection, link hover, form focus. Drop if it regresses any a11y check |
| Loader counter width shifts during count | `font-variant-numeric: tabular-nums` on the counter span |
| Reduced-motion path broken for new animations | each new motion explicitly tested under `prefers-reduced-motion: reduce`; one spec scenario named "Reduced-motion disables all new animations" covers this |

### Decisions deferred

- Backdrop-blur top nav (separate cosmetic change)
- Right-rail vertical section nav (redundant with top nav)
- Animate the loader counter with the 0→100 needing to hit 100 exactly at 3s, or just eased and close (details in implementation)
- Whether to keep the existing `splash_seen` SessionStorage key (yes — backward compatible with v1 sessions)

## Migration

No content migration. No data migration. No route changes. The change is purely additive to the visual + animation layer. Existing v1 components are edited in place:

| Component | Edit |
|---|---|
| `app/layout.tsx` | Add Fraunces `next/font/google` import; add `--font-display` to `<html>` className; add grain overlay div as first body child |
| `app/globals.css` | Add `--font-display` mapping in `@theme`; add `font-display` utility; add `.line-mask` class (overflow-hidden) |
| `components/hero.tsx` | Wrap each hero line in `<span class="line-mask"><motion.span>`; swap hero name to `font-display`; add glow + edge-fade divs |
| `components/section-header.tsx` | Swap label span to `font-display` |
| `components/contact-section.tsx` | Swap poster lines to `font-display`; tighten `leading` + `tracking` |
| `components/work-card.tsx` | Kitty card metric: `font-display text-[var(--accent)]`, 0→10000 animation on scroll-in |
| `components/splash.tsx` | Rewrite as loader: name in Fraunces, role eyebrow, 0→100 counter, no click prompt, keep SessionStorage skip |
| `components/nav.tsx` | No change (_skipping_ backdrop-blur; deferred) |
| `lib/use-cursor.ts` (new) | Tiny hook for the custom cursor, gated on all media query checks |

## Acceptance

- All v1 tests + spec scenarios continue to pass (no regression to scrollspy, skip-link, focus ring, AA contrast, landmarks)
- `pnpm build` + `pnpm lint` + `tsc --noEmit` clean
- Lighthouse perf ≥ 95, a11y ≥ 95 on `/` and `/projects/ragbench`
- LCP < 1.2s on fresh cold build with grain + Fraunces + glow
- The 7 new spec scenarios in `editorial-layer/spec.md` pass when QA'd in browser:
  1. Fraunces preloaded + `font-display` resolves
  2. Line-mask hero reveal staggers, reduced-motion renders at rest
  3. Section header label is Fraunces, bracket/number stay mono
  4. Contact poster is Fraunces
  5. Loader shows name + eyebrow + 0→100 counter, auto-dismisses at 3s, click/keypress dismisses immediately, repeat-visits skip, reduced-motion skips
  6. Grain overlay renders on `/` and on `/projects/ragbench`, pointer-events-none, aria-hidden
  7. Hero glow + edge fades render, text contrast remains AA
  8. Kitty counter animates 0 → 10,000 once on scroll, SSR-safe `0+` baseline, reduced-motion renders `10,000+` immediately, no other metric animates
  9. Custom cursor renders only on hover-capable fine-pointer desktop viewports ≥ 768px, is aria-hidden, is additive (native cursor stays), is absent under reduced-motion
  10. Under `prefers-reduced-motion: reduce` all of the above render at rest / skip