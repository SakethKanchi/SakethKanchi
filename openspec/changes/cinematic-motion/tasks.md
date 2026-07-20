## 1. Lenis smooth scroll

- [x] 1.1 Install `lenis` via pnpm: `pnpm add lenis`
- [x] 1.2 Create `components/lenis-provider.tsx`: wraps children in `<ReactLenis root>` with options `{ lerp: 0.1, duration: 1.2, smoothWheel: true, touchMultiplier: 2, infinite: false, orientation: "vertical" }`
- [x] 1.3 In `app/layout.tsx`, wrap the page content inside `<LenisProvider>` (after `<body>`, before `<Nav>`). Keep grain + cursor + nav outside the provider or ensure they still layer correctly.
- [x] 1.4 Reduced-motion path: read `prefers-reduced-motion` in `LenisProvider`; if reduced, pass `lerp: 1, duration: 0` (disables inertia, native scroll feel). Or conditionally skip `<ReactLenis>` entirely and render a plain `<>{children}</>` wrapper.
- [x] 1.5 Verify `pnpm build` still clean with new dependency. Check bundle size impact (expect ~2-3kb gzipped).
- [x] 1.6 QA: scroll on desktop feels inertial (not instant stop). On mobile, touch scroll feels slightly smoothed but not laggy.
- [x] 1.7 QA reduced-motion: scroll feels identical to native browser scroll (no inertia).

## 2. Scroll-scrubbed hero

- [x] 2.1 In `components/hero.tsx`, add `useScroll()` + `useTransform()` hooks:
  - `heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80])`
  - `heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])`
  - `glowScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.3])`
- [x] 2.2 Apply `heroY` and `heroOpacity` to the hero text wrapper (`motion.div` around the 4 hero lines). Add `will-change: transform` style.
- [x] 2.3 Apply `glowScale` and a matching opacity fade to the two accent glow divs. Glows should expand slightly then fade out as user scrolls past hero.
- [x] 2.4 Verify the transforms are ** still has its base layout position; the motion values add/subtract from it. No CLS.
- [x] 2.5 Reduced-motion path: skip `useScroll`/`useTransform`; render static hero with no scroll-driven transforms. The hero still has the line-mask entrance animation (that is mount-driven, not scroll-driven).
- [x] 2.6 QA: scroll slowly from top — hero text drifts up and fades. Scroll back up — text reappears. No jitter.
- [x] 2.7 QA: film grain overlay stays visible during hero scroll (grain is ambient, not scroll-driven, and sits at z-[1] above shader bg).

## 3. Section parallax

- [x] 3.1 Add `parallaxSpeed?: number` to `SectionWrapperProps`; default `0` means no local decorative atmosphere.
- [x] 3.2 In `SectionWrapper`, when `parallaxSpeed > 0`, add `useScroll` + `useTransform` to compute a positive `parallaxY = useTransform(scrollY, v => v * parallaxSpeed)` for an internal decorative atmosphere layer.
- [x] 3.3 Render that atmosphere as an `aria-hidden`, pointer-events-none inner background div, below section content. The section still scrolls at normal speed; its local atmosphere moves more slowly. Do not transform headings, cards, controls, or text.
- [x] 3.4 Parallax layers:
  - Hero: global shader remains fixed behind content; the hero's existing scroll-linked glows provide foreground depth.
  - Work section: local decorative atmosphere uses `parallaxSpeed = 0.1`.
  - Other `SectionWrapper` sections: default `0` (no local atmosphere).
- [x] 3.5 Reduced-motion: treat every `parallaxSpeed` as `0` and render no local-atmosphere transform.
- [x] 3.6 QA: scroll through page — work section background feels slightly slower than its cards. No card text is affected.

## 4. Gradient-mesh + noise shader (raw WebGL)

- [x] 4.1 Create `components/shader-bg.tsx`:
  - Mounts a `<canvas>` at `fixed inset-0 z-0 pointer-events-none`
  - `useEffect` sets up raw WebGL context, compiles vertex + fragment shaders
  - Vertex shader: pass-through `gl_Position = vec4(position, 0.0, 1.0)`
  - Fragment shader: 2-3 radial gradient blobs + simplex noise, time-driven
- [x] 4.2 Shader uniforms:
  - `u_time` — `performance.now() * 0.001` (seconds)
  - `u_resolution` — canvas width/height (half-resolution: `window.innerWidth / 2`)
  - `u_color1` — accent color from CSS var (`--accent`)
  - `u_color2` — complementary muted color (violet-ish, hardcoded or from another CSS var)
  - `u_color3` — background color from CSS var (`--background`)
- [x] 4.3 Blob parameters:
  - Blob 1: radius ~0.4, center drifts `sin/cos(u_time * 0.05)` over 20s cycle
  - Blob 2: radius ~0.3, drifts offset phase
  - Blob 3: radius ~0.5, very subtle, slow drift
  - All blobs use `smoothstep` for soft edges (no hard circles)
- [x] 4.4 Noise: simplex or value noise at `0.02` opacity, time-evolving
- [x] 4.5 Render loop: `requestAnimationFrame`, but skip frames when tab is hidden (`document.visibilityState !== "visible"`). Render at half canvas resolution for performance.
- [x] 4.6 Cleanup: on unmount, cancel rAF, delete WebGL buffers, remove canvas.
- [x] 4.7 In `app/layout.tsx`, place `<ShaderBg />` as a child of `<body>` before `<Nav>` and the grain overlay. It sits at z-0 (behind everything).
- [x] 4.8 Reduced-motion: render one static frame on mount (`u_time = 0`), then do not start the rAF loop. The bg is a still image.
- [x] 4.9 QA: shader renders on `/` and `/projects/ragbench`. Colors adapt to dark/light scheme (via CSS vars). Text above it is fully readable. No console WebGL errors.
- [x] 4.10 Performance QA: sampled 120 desktop animation frames at 60fps (median/p95 16.7ms, no dropped frames). This is a frame-cadence proxy; direct Chrome GPU timing was unavailable in the headless harness.

## 5. Split-text section header reveal

- [x] 5.1 In `components/section-header.tsx`, add an optional `reveal?: "word" | "line"` prop. Default `"line"` (current behavior: whole label reveals as one block).
- [x] 5.2 When `reveal === "word"`, split the label text into words:
  ```tsx
  {label.split(" ").map((word, i) => (
    <span key={i} className="line-mask inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </motion.span>
  ))}
  ```
- [x] 5.3 Apply `reveal="word"` to all section headers on the home page (Work, Experience, Education, Open Source, About, Contact).
- [x] 5.4 Verify the bracket `[`, number, `—`, `]` are NOT inside line-mask spans (they're chrome, not content).
- [x] 5.5 Reduced-motion: all words visible immediately, no stagger.
- [x] 5.6 QA: scroll to a section — words reveal one after another with ~50ms delay. Looks editorial, not mechanical.

## 6. Magnetic buttons (desktop only)

- [x] 6.1 Create `components/magnetic-button.tsx` — a wrapper that adds magnetic pull on hover:
  - On `mouseenter`, read cursor position relative to element center
  - Apply `transform: translate(x, y)` where `x,y` are clamped to ±8px
  - On `mouseleave`, transition back to `translate(0, 0)` with spring easing
- [x] 6.2 Gate to `hover: hover` and `pointer: fine` only. Skip entirely on touch/coarse.
- [x] 6.3 Wrap the CTA buttons in `contact-section.tsx` and the primary work-card links.
- [x] 6.4 Reduced-motion: no magnetic effect.
- [x] 6.5 QA: hover over "Email me →" button on desktop — it gently pulls toward cursor. Leave hover — springs back.

## 7. Integration + polish

- [x] 7.1 Verify all 3 core features (Lenis + hero scrub + shader) coexist without z-index or layering issues. Order from back to front: shader (z-0) → grain (z-[1]) → glows (z-[1]) → content (z-10+)
- [x] 7.2 Verify `pnpm build && pnpm lint && pnpm exec tsc --noEmit` clean
- [x] 7.3 Run Lighthouse and record results. Gate: accessibility ≥ 95, FCP < 1.2s, TBT < 100ms, CLS ≤ 0.1. Report LCP without gating it: the approved v2 full-screen 3-second loader intentionally delays hero LCP.
- [x] 7.4 Full QA suite (`pnpm qa`): 29/29 or better. Add new checks:
  - Lenis active: scroll inertia detectable
  - Shader bg: visible + animated
  - Hero scrub: transform changes on scroll
  - Word reveal: staggered label reveals
- [x] 7.5 Mobile QA (Chrome DevTools 375×667 + touch emulation): Lenis touch feels natural, shader renders, no layout breakage
- [x] 7.6 Reduced-motion QA: all features degrade gracefully, page is fully readable
- [x] 7.7 Dark + light scheme QA: shader colors adapt, all text readable

## 8. Optional Higgsfield video hero (deferred)

- [x] 8.1 Create `openspec/changes/cinematic-motion/optional-video-hero.md` — a mini-spec documenting the frame-synced video hero pattern:
  - Generate a 6-second cinematic clip (slow push, fog, concrete/brutalist or abstract tech visuals)
  - Extract to ~100-150 frames at 1080p
  - Map scroll position to frame index via `scrollYProgress`
  - Render frames on `<canvas>` with `drawImage`
  - Preload frames; map to scrollable-height ratio (not absolute pixels)
  - Mobile: preload all frames or use a `<video>` element with `currentTime` scrub
- [x] 8.2 Mark this as **NOT part of the core change** — only implement if/when the user generates a suitable clip and explicitly asks for it.
