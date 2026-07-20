## ADDED Requirements

### Requirement: Fraunces display font wired as `font-display`

The site SHALL load Fraunces via `next/font/google` and expose it as the CSS variable `--font-display`, mapped to a Tailwind `font-display` utility in `globals.css` `@theme`. Geist Sans (body + chrome) and Geist Mono (technical/chrome) remain unchanged.

#### Scenario: Fraunces is preloaded

- **WHEN** any route renders
- **THEN** the document `<head>` contains a `<link rel="preload">` for a Fraunces woff2 with `crossorigin` and `as="font"`
- **AND** the `<html>` element has a class that defines `--font-display`

#### Scenario: font-display utility resolves to Fraunces

- **WHEN** an element with `font-display` is rendered
- **THEN** its computed `font-family` begins with the Fraunces variable and falls back to the existing serif fallback

#### Scenario: Display swap, no FOIT

- **WHEN** the Fraunces woff2 has not yet loaded
- **THEN** text using `font-display` renders in the fallback serif immediately (no invisible-text wait)
- **AND** swaps to Fraunces without relayout once loaded

### Requirement: Hero name renders in Fraunces and reveals via line-mask

The hero name SHALL render in `font-display` (Fraunces), and each of the 4 stacked hero lines (name, role, tagline, links) SHALL be wrapped in a `line-mask` outer span with `overflow-hidden` and an inner `data-hero-line` span that animates `translateY(100%) → translateY(0)` on enter. The reveal SHALL run once per page load, staggered top-to-bottom.

#### Scenario: Hero lines are masked

- **WHEN** the hero is rendered
- **THEN** each of the 4 hero lines is wrapped in a `<span class="line-mask">` with `overflow: hidden` on the outer span and a `<span data-hero-line>` inner span

#### Scenario: Staggered reveal on enter

- **WHEN** the hero scrolls into view for the first time in a session
- **THEN** each inner `data-hero-line` translates from `translateY(100%)` to `translateY(0)` over a duration in the range 0.6–1.0s
- **AND** the start of each line's animation is staggered by 0.08–0.15s after the previous line

#### Scenario: Reduced-motion renders lines at rest

- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the inner spans render at `translateY(0)` with no animation
- **AND** all 4 hero lines are visible immediately

#### Scenario: No layout shift on reveal

- **WHEN** the hero line-mask reveals
- **THEN** the outer `line-mask` span has a height set by the inner content
- **AND** the Cumulative Layout Shift contribution of the hero is 0

### Requirement: Section header label renders in Fraunces

The `<SectionHeader>` label portion SHALL render in `font-display` (Fraunces). The `[ NN —` bracket and number SHALL remain in Geist Mono.

#### Scenario: Bracket and number stay mono

- **WHEN** `<SectionHeader render="01" label="Selected work" />` renders
- **THEN** the `[`, `01`, `—`, and closing `]` glyphs use `font-mono`
- **AND** the `Selected work` label uses `font-display`

#### Scenario: Section header visual reads as mono-bracket + display-label

- **WHEN** any section header is rendered
- **THEN** the visual contrast between bracket chrome and display label matches the hero-name pairing (display serif for the "name" element; mono for chrome)
- **AND** no other section-header visual changes from v1

### Requirement: Contact poster renders in Fraunces

The three oversized contact lines `Let's build` / `something that` / `ships.` SHALL render in `font-display` (Fraunces).

#### Scenario: Contact poster is display-serif

- **WHEN** the Contact section renders
- **THEN** the three poster lines use `font-display`
- **AND** the lines have `leading-[1.0]` and `tracking-tight`
- **AND** no other contact-section content changes font

### Requirement: Type-only loader replaces the click-anywhere splash

The first-visit entry overlay SHALL render the site name in Fraunces, a role eyebrow line in Geist Mono uppercase tracking-[0.18em], and a 0→100 progress counter in Geist Mono at bottom-right. The overlay SHALL auto-dismiss after 3 seconds, and SHALL dismiss immediately on any click or keypress. The previous `click anywhere to continue →` prompt SHALL NOT appear.

#### Scenario: Loader renders on first visit

- **WHEN** a user navigates to `/` for the first time in the session (no `SessionStorage["splash_seen"]`)
- **THEN** a full-viewport `fixed inset-0 z-[300]` overlay renders
- **AND** the overlay contains the site name in `font-display` size `clamp(2.8rem, 7vw, 6.5rem)` with `tracking-[-0.03em]`
- **AND** the overlay contains a role eyebrow below the name in `font-mono` uppercase `tracking-[0.18em]`
- **AND** the overlay contains a progress counter bottom-right starting at `0`

#### Scenario: Counter animates 0 → 100 over three seconds

- **WHEN** the loader is visible
- **THEN** the bottom-right counter increments from `0` to `100` over the 3-second loader duration
- **AND** the counter uses `font-mono` and a tabular-nums font feature so digits do not shift width

#### Scenario: Auto-dismiss at 100%

- **WHEN** the counter reaches `100` (~3s after mount)
- **THEN** the overlay dismisses and the hero is visible
- **AND** `SessionStorage["splash_seen"]` is set to `"1"`

#### Scenario: Click or keypress dismisses immediately

- **WHEN** the user clicks, taps, or presses any key while the loader is visible
- **THEN** the overlay dismisses immediately
- **AND** `SessionStorage["splash_seen"]` is set to `"1"`
- **AND** the counter animation is cancelled

#### Scenario: Repeat visit skips the loader

- **WHEN** a user navigates to `/` with `SessionStorage["splash_seen"]` already `"1"`
- **THEN** the loader is not rendered
- **AND** the hero is visible immediately

#### Scenario: Reduced-motion skips the loader

- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the loader is not rendered
- **AND** the hero is visible immediately on every visit

#### Scenario: Name reveals via line-mask

- **WHEN** the loader is visible
- **THEN** the name span animates `translateY(100%) → translateY(0)` via a mask, matching the hero's reveal mechanic
- **AND** under reduced-motion the name renders at rest (skipped per the previous scenario, so no animation fires)

### Requirement: Film grain overlay across all routes

A fixed, pointer-events-none, `aria-hidden` SVG noise overlay SHALL render above the background and below all content on every route. The overlay SHALL use a `feTurbulence type="fractalNoise"` filter at low opacity and `mix-blend-overlay`.

#### Scenario: Grain renders on every route

- **WHEN** any route renders
- **THEN** a single `<div>` with the inline SVG data-URI background is present as the first child of `<body>` (before Nav)
- **AND** the div has `position: fixed`, `inset: 0`, `pointer-events: none`, `aria-hidden="true"`, `z-[1]`, and `mix-blend-overlay`

#### Scenario: Grain opacity is low

- **WHEN** the grain overlay renders
- **THEN** its opacity is in the range 0.025–0.05 (subtle, not distracting)
- **AND** the overlay does not change the perceived contrast of any AA-verified text pair

#### Scenario: Grain is not interactive

- **WHEN** a user clicks, scrolls, or selects text anywhere on the page
- **THEN** the grain overlay does not intercept any pointer or selection event

### Requirement: Hero accent glow + edge gradient fades

The hero section SHALL render a large blurred radial `var(--accent)` glow in the upper-right and a mirrored smaller glow in the lower-left, both below the text and above the grain. Two edge gradient fades SHALL render on top of the glows to prevent hard bleed into the nav and the next section.

#### Scenario: Upper-right accent glow

- **WHEN** the hero renders
- **THEN** an absolutely-positioned, `pointer-events-none` div is present
- **AND** its size is `h-[60vh] w-[60vh]`, positioned `right-[8%] top-1/4`
- **AND** its background is `radial-gradient(circle, var(--accent) 0%, transparent 60%)` with `opacity-20` and `blur-[120px]`

#### Scenario: Lower-left mirrored glow

- **WHEN** the hero renders
- **THEN** a second absolutely-positioned, `pointer-events-none` div is present
- **AND** its size is `h-[40vh] w-[40vh]`, positioned `left-[-10%] bottom-[10%]`
- **AND** its background is the same radial gradient with `opacity-10` and `blur-[120px]`

#### Scenario: Edge gradient fades

- **WHEN** the hero renders
- **THEN** two absolutely-positioned gradient divs render above the glows and below the text
- **AND** one uses `bg-gradient-to-r from-bg via-bg/65 to-transparent` covering the full hero
- **AND** one uses `bg-gradient-to-t from-bg/50 via-transparent to-bg/30` covering the full hero

#### Scenario: Glows do not affect text contrast

- **WHEN** the hero text renders over the glows
- **THEN** the text's perceived contrast against its immediate backdrop still passes AA ≥ 4.5:1
- **AND** the glows render below the text in z-order

### Requirement: Single counter animation on the Kitty VS Code Theme metric

The "10,000+ downloads" metric on the Kitty VS Code Theme work card SHALL render as a `font-display text-[var(--accent)]` number that animates from `0` to `10000` when the card scrolls into view, with a `+` suffix appended at all times. No other metric on the site animates.

#### Scenario: SSr-safe zero baseline

- **WHEN** the Kitty card renders server-side
- **THEN** the metric displays as `0+` in `font-display text-[var(--accent)]`
- **AND** no client-side JavaScript has run yet

#### Scenario: Animates on scroll-into-view

- **WHEN** the Kitty card scrolls into the viewport for the first time
- **THEN** the number animates from `0` to `10000` over a 1.2–1.8s duration with an ease-out curve
- **AND** a `+` suffix is rendered next to the number throughout the animation
- **AND** the final value displayed is `10,000+` (with thousands separator)

#### Scenario: Reduced-motion renders final value immediately

- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the metric renders `10,000+` immediately with no animation

#### Scenario: No other metric animates

- **WHEN** any other metric or status callout on the site renders (including the RagBench honest-WIP line, OSS star counts, and experience bullets)
- **THEN** it renders as static text
- **AND** no count-up animation is applied to it

### Requirement: Optional desktop custom cursor with mix-blend-difference

On hover-capable, fine-pointer desktop devices only, an `aria-hidden` additive cursor dot SHALL render following the mouse with `mix-blend-difference` and a sky-400 border. The native cursor SHALL remain visible. The dot SHALL NOT render on touch devices, coarse pointers, reduced-motion, or viewports below `md` (768px).

#### Scenario: Cursor renders on desktop fine-pointer

- **WHEN** the device matches `@media (hover: hover) and (pointer: fine)` and viewport width ≥ 768px and `prefers-reduced-motion: reduce` is not set
- **THEN** a single fixed `div` with `mix-blend-difference` and `border border-[var(--accent)]` follows the mouse position
- **AND** the div is `aria-hidden` and `pointer-events-none`

#### Scenario: Cursor does not render on touch or coarse pointers

- **WHEN** the device does not match `hover: hover` or the pointer is coarse
- **THEN** no custom cursor div renders
- **AND** the native cursor remains the only cursor

#### Scenario: Cursor disabled under reduced-motion

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** the custom cursor div does not render
- **AND** the native cursor remains the only cursor

#### Scenario: Native cursor is preserved

- **WHEN** the custom cursor is active
- **THEN** the user still sees the native OS cursor (the dot is additive, not replacement)
- **AND** all text selection, link hover, and form interactions behave as if the dot were not present

### Requirement: All new motion reduces under prefers-reduced-motion

Every animation added by this change SHALL disable under `prefers-reduced-motion: reduce` and render content at its final state immediately.

#### Scenario: Reduced-motion disables all new animations

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** the loader is skipped, the hero lines render at `translateY(0)`, the Kitty counter renders `10,000+` immediately, the custom cursor is not rendered, and the SVG grain overlay remains static
- **AND** no `requestAnimationFrame` loop runs for any of the above