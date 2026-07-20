# Design — cinematic-motion

> Motion + atmosphere layer on top of enrich-design-v2. No content, route, or data changes.

## Philosophy

The editorial layer (v2) gave us typography and texture. The motion layer gives us **scroll-driven life**: smooth inertial scrolling makes every page feel expensive; parallax separates foreground from background; a procedural shader adds ambient motion that never repeats. The hero is no longer a static composition — it breathes as the user scrolls.

All motion is **additive** (transforms layered on top of static layout), **respects reduced-motion**, and **never blocks content readability**. If the JS fails, the page still renders perfectly (progressive enhancement).

## Scroll stack

### Lenis smooth scroll

Lenis intercepts wheel/touch/keyboard scroll and applies inertia + damping. Default damping: `0.1` (adjust for feel). Integration:

```tsx
// app/layout.tsx — wrap children
<ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
  {children}
</ReactLenis>
```

- `lerp: 0.1` → buttery but not sluggish (higher = snappier)
- `duration: 1.2` → normalized scroll duration
- `wheelMultiplier: 1` → no artificial speed-up
- `touchMultiplier: 2` → slightly faster on touch (feels natural)
- `infinite: false` → normal document scroll
- `orientation: "vertical"`

**Reduced-motion:** if `prefers-reduced-motion: reduce`, pass `lerp: 1, duration: 0` to disable inertia (native scroll feel). Or conditionally render `<Lenis>` only when motion is not reduced.

**Performance:** Lenis uses `requestAnimationFrame` + passive listeners. No layout thrashing. Bundle: ~2kb gzipped.

### Scroll-scrubbed hero

Framer Motion `useScroll` reads the page scroll progress (0→1). `useTransform` maps that to output values.

```tsx
const { scrollYProgress } = useScroll();
const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
const glowScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.3]);
```

Applied to:
- **Hero text block**: `translateY(heroY)` + `opacity: heroOpacity`. Subtle upward drift + fade as user scrolls past.
- **Hero glows**: `scale(glowScale)` + `opacity` fade. The accent glows expand slightly then fade out.
- **Film grain**: `opacity` stays constant (grain is ambient, not scroll-driven).

All transforms are `will-change: transform` for compositing. No `top`/`left` animation.

### Section parallax

`SectionWrapper` gets a `parallaxSpeed` prop (default `0`). When positive, it adds an `aria-hidden`, pointer-events-none local atmosphere layer under section content and applies a positive `useTransform(scrollY, v => v * parallaxSpeed)` translate to that layer. The section's content still scrolls normally; the internal atmosphere moves more slowly.

```tsx
// In SectionWrapper
const { scrollY } = useScroll();
const parallaxY = useTransform(scrollY, (v) => v * parallaxSpeed);
```

- Hero: the global shader stays fixed behind content; existing scroll-linked hero glows provide foreground depth.
- Work: a local decorative atmosphere uses `0.1`.
- Other sections: `0` (no local atmosphere).

This is additive: no section landmark, heading, card, link, or control is transformed.

## Procedural atmosphere

### Gradient-mesh + noise shader

A `<canvas>` element at `fixed inset-0 z-0` (behind content, above page bg). Renders a fragment shader:

```glsl
// Simplified conceptual shader
uniform float u_time;
uniform vec2 u_resolution;

// 2-3 soft radial blobs moving slowly
// Blob 1: accent color (sky-400-ish), drifts sin/cos over 20s
// Blob 2: muted purple/warm tone, drifts offset phase
// Blob 3: near-bg color, very subtle, adds depth

// Perlin/simplex noise overlay at ~0.02 opacity
// Time-evolving so the pattern never repeats

// Output: soft, slow, ambient — never distracting
```

Implementation options:
1. **Raw WebGL** (~50 lines setup + 50 lines shader). No deps. Lightest.
2. **OGL** (~10kb). Thin WebGL wrapper. Simpler setup, same shader.

Decision: start with **raw WebGL** in a `useEffect` hook. If it gets unwieldy, swap to OGL. The canvas is `position: fixed` so it only renders once (no resize re-renders on scroll).

**Performance:**
- Canvas resolution: `window.innerWidth / 2` (render at half-res, CSS scales up — sharp enough for soft gradients, saves GPU).
- `requestAnimationFrame` loop, but only when tab is visible (`document.visibilityState`).
- `prefers-reduced-motion`: render a static frame once, no animation loop.

**Colors:**
- Blob 1: `var(--accent)` (sky-400) at ~15% opacity
- Blob 2: `rgb(139, 92, 246)` (violet-500, complementary) at ~8% opacity
- Blob 3: `var(--background)` at ~20% opacity (adds depth without competing)
- Noise: white at ~2% opacity

All colors are CSS-var-driven so dark/light schemes adapt automatically.

## Secondary patterns

### Split-text section header reveal

Extend the existing `.line-mask` CSS class:

```tsx
// SectionHeader label rendered as word spans
{label.split(" ").map((word, i) => (
  <span key={i} className="line-mask inline-block overflow-hidden">
    <motion.span
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
      className="inline-block"
    >
      {word}
    </motion.span>
  </span>
))}
```

Words reveal sequentially as the header scrolls into view. The `[ 01 —` bracket and `]` are not masked (they're chrome, not content).

### Magnetic buttons

On `mouseenter` over a button/link, compute the cursor offset from the element center, apply a small `translateX/Y` (max ~8px) via CSS transform. On `mouseleave`, spring back to origin. Use CSS `transition` on a short duration (~0.3s), NOT a `mousemove` listener (too much event noise).

```css
.magnetic { transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
```

Gated to `hover: hover` and `pointer: fine` only. Disabled under reduced-motion.

## Reduced-motion strategy

| Feature | Normal | Reduced-motion |
|---|---|---|
| Lenis | `lerp: 0.1, duration: 1.2` | `lerp: 1, duration: 0` (native scroll) |
| Hero scrub | translateY + opacity driven by scroll | Static, no transform |
| Section parallax | Speed-driven translateY | Static, no transform |
| Shader bg | Animated gradient mesh + noise | Static single frame rendered once |
| Split-text reveal | Word-by-word stagger | All words visible immediately |
| Magnetic buttons | Pull toward cursor | No effect |
| Film grain | Static overlay (already passive) | Static overlay |
| Accent glow | Static radial gradients | Static radial gradients |

All reduced-motion paths are **content-identical** — the page reads exactly the same, just without the motion seasoning.

## Accessibility

- All `motion` elements that scroll-scrub use `will-change: transform` for compositing.
- No `prefers-reduced-motion` override needed for the shader canvas — it respects the media query.
- Lenis does not trap focus or interfere with keyboard navigation (tested: Tab, Shift+Tab, Enter on links).
- The shader canvas is `aria-hidden` and `pointer-events-none`.

## QA plan

1. `pnpm build && pnpm lint && pnpm exec tsc --noEmit` clean
2. Lighthouse: accessibility ≥ 95, FCP < 1.2s, TBT < 100ms, CLS ≤ 0.1; report LCP without gating it because the approved v2 full-screen 3-second loader intentionally delays hero LCP.
3. QA script checks:
   - Lenis active: scroll feels inertial (not native)
   - Reduced-motion: scroll feels native
   - Hero scrub: name drifts up + fades on scroll past
   - Shader bg: visible behind hero, not on top of text
   - Section parallax: background layer moves slower than content
   - Split-text: words reveal sequentially
   - Magnetic: button pulls on hover (desktop only)
4. Mobile: shader at half-res, Lenis touch multiplier feels natural
5. Dark + light: shader colors adapt to CSS vars
