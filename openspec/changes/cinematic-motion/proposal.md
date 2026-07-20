## Why

enrich-design-v2 shipped a strong editorial layer: Fraunces serif, line-mask hero, film grain, accent glow, type-only loader, animated counter. But the interaction layer still reads as "standard Next.js site" — scroll is native browser scroll, sections fade in with the same `whileInView` pattern, and the hero sits static. The user explicitly wants to push toward the cinematic, "out of this world" aesthetic of Higgsfield-style award-winning sites.

The core missing ingredient is **scroll-driven motion**: smooth inertial scrolling, parallax, scrubbed reveals. These are the techniques that make Awwwards "Site of the Day" winners feel expensive. The user asked about GSAP; the answer is **no** — we deliberately kept Framer Motion in v2 (lower bundle cost, no peer-dependency issues with React 19 server components) and Framer's `useScroll` / `useTransform` is sufficient for every pattern in this change.

The user has **very few Higgsfield credits** and does not want to waste them. Frame-synced video (the signature Higgsfield effect) is deferred to an optional future spec. However, the user **can do unlimited image generation**, so hero stills / procedural imagery are viable.

## What Changes

This is a **motion + atmosphere** change on top of the shipped v2 — no content, route, or data changes. All edits land in existing components + `globals.css`, plus one new dependency.

### Core trio (priority order)

1. **Lenis smooth scroll** — replaces native browser scroll with butter-smooth inertial scrolling. This is the single biggest "expensive feel" upgrade. Lenis is ~2kb gzipped, works natively with Framer Motion, and respects `prefers-reduced-motion` (falls back to native scroll). Hooks into `app/layout.tsx` as a provider/wrapper.

2. **Scroll-scrubbed hero + section parallax** — uses Framer Motion's `useScroll` + `useTransform` to map scroll progress to:
   - Hero name: subtle `y` drift + `opacity` scrub as user scrolls past
   - Hero glow: `scale` + `opacity` fade on scroll-out
   - Section backgrounds: parallax `y` offset so background layers move slower than content
   All scrubbed values are additive (base position + transform), never replacing layout.

3. **Animated gradient-mesh / noise-shader background** — a lightweight `<canvas>` element behind the hero (or as a global background layer) running a simple GLSL fragment shader: slow-moving gradient mesh (2-3 soft radial blobs in accent + muted tones) + subtle Perlin noise displacement. ~50 lines of shader code, no libraries (or OGL at ~10kb if we want a thin wrapper). This is the closest pure-code path to "cinematic" without generated video.

### Secondary (if time permits)

4. **Split-text reveal on section headers** — extend the existing line-mask primitive to work per-word or per-character on section labels (`[ 01 — Work ]` bracket stays, the label text reveals word-by-word). Makes headings feel authored, not templated.

5. **Magnetic buttons + link hover distortion** — on desktop fine-pointer, buttons/links pull toward the cursor on hover (CSS transform, not mousemove listener on every frame). Subtle, not gimmicky.

### Deferred / optional

6. **Frame-synced scroll video hero** — the true Higgsfield signature: a short clip broken into ~100 frames, mapped to scrollbar position, `drawImage` on `<canvas>`. Needs a generated video asset. **Optional spec** — only if/when the user generates a suitable clip (or has Higgsfield credits). This is NOT part of the core cinematic-motion change.

### NOT doing

- **GSAP migration** — deliberately rejected. Framer Motion's `useScroll`/`useTransform` + `whileInView` achieves the same scrub/parallax/reveal visuals at lower bundle cost. Lenis pairs natively with Framer. No GSAP ScrollTrigger needed.
- **Higgsfield video as required** — user has very few credits; video hero is optional only.

## Capabilities

### New Capabilities

- `cinematic-scroll`: Lenis smooth scroll + Framer `useScroll`/`useTransform` parallax + scrubbed hero
- `procedural-atmosphere`: GLSL gradient-mesh + noise shader canvas behind hero (or global bg)

### Modified Capabilities

- `home-shell`: hero gains scroll-scrubbed motion; layout gains Lenis provider
- `editorial-layer`: film grain + accent glow now layer correctly over the shader canvas

## Dependencies

- `lenis` (~2kb gzipped, smooth scroll library)
- No GSAP, no Three.js, no heavy WebGL frameworks

## References

- [Lenis docs](https://www.lenis.dev/) — smooth scroll, React integration
- [motion.dev useScroll](https://motion.dev/docs/react-use-scroll) — scroll-linked animations
- [CSS-Tricks Apple scroll animation](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/) — frame-sync technique (deferred)
- [Framer Motion parallax](https://motion.dev/docs/react-use-scroll#parallax) — `useTransform` for parallax
