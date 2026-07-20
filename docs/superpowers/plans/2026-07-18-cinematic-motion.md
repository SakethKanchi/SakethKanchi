# Cinematic Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reduced-motion-safe cinematic scrolling, ambient WebGL atmosphere, editorial word reveals, and desktop-only magnetic CTAs without changing content, routes, or data.

**Architecture:** Client-only providers and visual primitives isolate browser APIs: `LenisProvider` owns smooth-scroll activation, `ShaderBg` owns WebGL lifecycle, and `MagneticButton` owns pointer gating. Existing page content stays in normal flow; Framer Motion applies transforms only to decorative layers and the hero's existing visual wrappers.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Framer Motion 12, Lenis, raw WebGL, Playwright Core.

## Global Constraints

- Preserve all portfolio copy, routes, data models, native focus order, and anchor navigation.
- Use Lenis only for users without `prefers-reduced-motion: reduce`; reduced-motion uses native scroll.
- No GSAP, Three.js, OGL, generated video, external image assets, or per-frame pointer listeners.
- Canvas is one fixed `aria-hidden`, `pointer-events-none` `z-0` global layer; grain stays at `z-[1]`; all controls and readable content remain above both.
- WebGL runs at half viewport resolution, skips hidden-tab drawing, renders one static reduced-motion frame, and frees resources on unmount.
- Scroll transforms are compositor-only and additive; never alter content layout or transform interactive section content.
- All new observable contracts are added first to `scripts/qa-cinematic-motion.cjs`, verified failing against the previous build, then implemented.

---

### Task 1: Cinematic QA contract

**Files:**
- Create: `scripts/qa-cinematic-motion.cjs`
- Modify: `package.json:5-14`

**Interfaces:**
- Consumes: production site at `http://localhost:3100`; Playwright Core pattern from `scripts/qa-editorial-layer.cjs`.
- Produces: `pnpm qa:cinematic`, which asserts normal, reduced-motion, fine-pointer, coarse-pointer, dark, and light contracts.

- [ ] **Step 1: Write the failing runtime assertions**

Assert that normal motion exposes `[data-lenis-root]`, `[data-shader-bg]`, hero scroll transform changes after scroll, one word-mask exists in a header, and a magnetic CTA has `data-magnetic`.

- [ ] **Step 2: Run the cinematic QA against the existing production build**

Run: `pnpm build && (pnpm start -- -p 3100 & server=$!; sleep 2; pnpm qa:cinematic; status=$?; kill $server; exit $status)`

Expected: FAIL because cinematic selectors and behaviors do not exist.

- [ ] **Step 3: Add package script**

Add `"qa:cinematic": "node scripts/qa-cinematic-motion.cjs"` and include it in `qa` after existing editorial and accessibility scripts.

- [ ] **Step 4: Re-run only the failing QA after each following task**

Run: same production-server command above.

Expected: failures shrink only as required contracts are implemented.

### Task 2: Lenis provider and root integration

**Files:**
- Create: `components/lenis-provider.tsx`
- Modify: `package.json:26-43`, `pnpm-lock.yaml`, `app/layout.tsx:1-10,97-129`

**Interfaces:**
- Produces: `LenisProvider({ children }: { children: React.ReactNode })`.
- Consumes: `ReactLenis` from `lenis/react` and `useReducedMotion` from Framer Motion.

- [ ] **Step 1: Keep Task 1's `data-lenis-root` assertion failing for current app**

Run: `pnpm qa:cinematic` with the production server from Task 1.

Expected: FAIL only because Lenis root is absent.

- [ ] **Step 2: Install Lenis and implement minimal provider**

Run: `pnpm add lenis`.

Create a client component that renders plain children for reduced-motion and `<ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, touchMultiplier: 2, infinite: false, orientation: "vertical" }}>` otherwise. Put `data-lenis-root` on the wrapper that exists in both paths.

- [ ] **Step 3: Place content inside provider without moving global overlays**

Import `LenisProvider` in `app/layout.tsx`; keep shader, grain, skip link, JSON-LD, nav, and cursor as root-body siblings. Wrap only `<main id="main">{children}</main>`.

- [ ] **Step 4: Verify Lenis QA**

Run: `pnpm build && pnpm exec tsc --noEmit && pnpm qa:cinematic` with production server.

Expected: Lenis normal/reduced-motion assertions pass; later-feature assertions still fail.

### Task 3: Hero scrub and local work atmosphere

**Files:**
- Modify: `components/hero.tsx:3-5,73-144`, `components/section-wrapper.tsx:3-39`, `components/work-section.tsx:7-19`

**Interfaces:**
- Extends: `SectionWrapperProps` with `parallaxSpeed?: number`.
- Produces: `data-hero-scrub` and `data-section-atmosphere` selectors; only Work passes `parallaxSpeed={0.1}`.

- [ ] **Step 1: Keep Task 1 hero-transform assertion failing**

Run: `pnpm qa:cinematic` with the production server.

Expected: FAIL because hero scroll style is static.

- [ ] **Step 2: Add hero motion values without changing mount animation**

Use `useScroll`, `useTransform`, and `useMotionTemplate` only when reduced-motion is false. Map progress `[0, .15] → [0, -80]` for text y, `[0, .12] → [1, 0]` for text opacity, and `[0, .2] → [1, 1.3]` for glow scale plus fade. Apply values to existing wrappers, preserve their static class layout, and mark the hero wrapper `data-hero-scrub`.

- [ ] **Step 3: Add a decorative-only parallax layer**

In `SectionWrapper`, create a local `motion.div` only for positive `parallaxSpeed` and non-reduced motion. It is absolute, `aria-hidden`, pointer-events-none, below content, uses an existing-token radial atmosphere, and receives positive scroll transform. Give it `data-section-atmosphere`; keep children in a relative z-index wrapper. Pass `parallaxSpeed={0.1}` only in `WorkSection`.

- [ ] **Step 4: Verify scroll contracts**

Run: `pnpm exec tsc --noEmit && pnpm qa:cinematic` with production server.

Expected: hero drift/reversal and work-atmosphere checks pass; reduced-motion shows no transform.

### Task 4: WebGL procedural atmosphere

**Files:**
- Create: `components/shader-bg.tsx`
- Modify: `app/layout.tsx:7-10,97-106`

**Interfaces:**
- Produces: `ShaderBg`, one canvas with `data-shader-bg`, `aria-hidden`, and fixed `z-0` styling.
- Consumes: CSS `--accent` and `--background`, `matchMedia`, `visibilitychange`, resize events, and raw WebGL APIs.

- [ ] **Step 1: Keep Task 1 shader assertion failing**

Run: `pnpm qa:cinematic` with the production server.

Expected: FAIL because no atmosphere canvas exists.

- [ ] **Step 2: Build minimal safe WebGL component**

Create a client component that obtains WebGL, compiles a pass-through vertex shader and fragment shader with soft animated radial blobs plus low-amplitude value noise. Read CSS variables, draw at half resolution, and make context/shader failure a no-op.

- [ ] **Step 3: Add lifecycle and motion gates**

Render one static time-zero frame under reduced-motion. Otherwise request animation frames only while visible; resize canvas on viewport changes; cancel frames, remove listeners, and delete WebGL program, shaders, and buffers on cleanup.

- [ ] **Step 4: Integrate beneath grain**

Render `<ShaderBg />` as the first body visual layer before the existing grain overlay. Do not alter grain's z-index or interactivity.

- [ ] **Step 5: Verify canvas contracts**

Run: `pnpm build && pnpm exec tsc --noEmit && pnpm qa:cinematic` with production server.

Expected: normal canvas, scheme-aware colors, and reduced-motion static-frame checks pass without console errors.

### Task 5: Word-reveal headers and magnetic controls

**Files:**
- Create: `components/magnetic-button.tsx`
- Modify: `components/section-header.tsx:1-43`, `components/{work,experience,education,oss,about,contact}-section.tsx`, `components/work-card.tsx:1-4,117-137`, `components/contact-section.tsx:1-9,64-79`

**Interfaces:**
- Extends: `SectionHeaderProps` with `reveal?: "line" | "word"`.
- Produces: `MagneticButton({ children }: { children: React.ReactNode })` and `data-magnetic` on its desktop-capable wrapper.

- [ ] **Step 1: Keep word-mask and magnetic CTA QA assertions failing**

Run: `pnpm qa:cinematic` with production server.

Expected: FAIL because no `reveal="word"` markup or magnetic wrapper exists.

- [ ] **Step 2: Add word reveal with final-state reduced-motion output**

Make `SectionHeader` a client component. For `reveal="word"`, split the label by spaces, use a separate inline line-mask and a 50ms-staggered Framer child for each word, and keep chrome outside masks. Apply `reveal="word"` to all six home section headers.

- [ ] **Step 3: Add minimal magnetic wrapper**

Use `matchMedia("(hover: hover) and (pointer: fine)")` plus `useReducedMotion`. On pointer entry, derive max-8px offsets from that event; on leave, reset transform with a spring transition. Do not add a continuous pointer-move listener. Wrap only the email CTA and primary work-card link.

- [ ] **Step 4: Verify interaction contracts**

Run: `pnpm exec tsc --noEmit && pnpm qa:cinematic` with production server.

Expected: word masks preserve chrome; fine-pointer control moves and returns; coarse/reduced-motion controls are static.

### Task 6: Optional video mini-spec and task closeout

**Files:**
- Create: `openspec/changes/cinematic-motion/optional-video-hero.md`
- Modify: `openspec/changes/cinematic-motion/tasks.md`

**Interfaces:**
- Produces: documentation only; no runtime video component, route, or asset.

- [ ] **Step 1: Write optional-video mini-spec**

Document a future 6-second generated clip, 100–150 extracted frames, scroll-progress-to-frame mapping on canvas, preloading strategy, touch fallback, and the requirement for an explicit future request plus a supplied clip.

- [ ] **Step 2: Mark completed implementation and documentation checkboxes**

Mark each task complete only after its stated verification is observed. Keep the mini-spec explicitly marked as deferred from runtime implementation.

### Task 7: Full integration verification

**Files:**
- Modify: `README.md:9-25,45`
- Modify: `CHECKPOINT.md`

**Interfaces:**
- Consumes: production build, cinematic QA, editorial QA, accessibility QA, browser visual inspection.

- [ ] **Step 1: Run static checks**

Run: `pnpm build && pnpm lint && pnpm exec tsc --noEmit`.

Expected: exit 0.

- [ ] **Step 2: Run production runtime QA**

Start production server on port 3100, run `pnpm qa`, then stop server.

Expected: all existing and cinematic checks pass.

- [ ] **Step 3: Browser smoke test**

At desktop and 375×667 mobile widths, verify home and `/projects/ragbench` in dark and light schemes. Confirm hero scrub, canvas layering, keyboard navigation, section labels, CTAs, and reduced-motion rest states.

- [ ] **Step 4: Update handoff documentation**

Record cinematic-motion as implemented and validated; correct README's obsolete claim that v2 is merely specced.

- [ ] **Step 5: Revalidate OpenSpec**

Run: `openspec validate cinematic-motion --strict`.

Expected: `Change 'cinematic-motion' is valid`.
