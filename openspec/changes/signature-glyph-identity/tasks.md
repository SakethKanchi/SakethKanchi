## 1. Glyph behavior contract

- [x] 1.1 Replace shader assertions in `scripts/qa-cinematic-motion.cjs` with desktop glyph, mobile glyph suppression, reduced-motion static glyph, and no-atmosphere assertions.
- [x] 1.2 Run `node scripts/qa-cinematic-motion.cjs` against the current production build and confirm it fails because the glyph is absent and atmosphere remains.

## 2. Signature hero and atmosphere removal

- [x] 2.1 Create `components/signature-glyph.tsx` with three decorative `<SK />` registration layers, one splash-gated settle, and a static reduced-motion mode.
- [x] 2.2 Render `<SignatureGlyph introReady={introReady} />` in `components/hero.tsx`; remove hero glow and edge-fade layers without changing hero copy, links, line-mask reveal, or scrub behavior.
- [x] 2.3 Remove `<ShaderBg />` from `app/layout.tsx`, delete `components/shader-bg.tsx`, remove `SectionWrapper` local-atmosphere support, and remove Work’s `parallaxSpeed` prop.

## 3. Verification

- [x] 3.1 Run `node scripts/qa-cinematic-motion.cjs` against a fresh production server and confirm every public visual contract passes.
- [x] 3.2 Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`.
- [x] 3.3 Inspect desktop, mobile, and reduced-motion routes in Chromium; confirm one glyph signature, readable content, static reduced-motion behavior, and no ambient color field.
- [x] 3.4 Validate `signature-glyph-identity` with `openspec validate --strict` and mark this task list complete.

## 4. Responsive containment

- [x] 4.1 Add wide-viewport QA asserting all three glyph marks remain inside hero bounds and the hero name stays on one line.
- [x] 4.2 Convert the hero to an `xl` two-column grid, contain and cap the glyph, and hide it below `xl`.
- [x] 4.3 Widen shared navigation and home-section shells through `max-w-7xl` and `2xl:max-w-[90rem]`; verify 1568px, 1024px, 768px, and mobile layouts in Chromium.

## 5. Remove unstable hero glyph

- [x] 5.1 Replace glyph QA with failing absence and wide hero-content containment checks; confirm it fails against the rendered glyph.
- [x] 5.2 Delete `SignatureGlyph`, remove the hero’s decorative grid column, and retain the single-column type-led composition.
- [x] 5.3 Rebuild, restart the production server, and verify the fresh bundle passes all no-glyph QA contracts at 1280px, 1536px, and 1920px.
