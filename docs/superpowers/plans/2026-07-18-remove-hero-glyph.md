# Remove Hero Glyph Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the unstable `<SK />` hero decoration and restore a single-column, type-led hero at every viewport.

**Architecture:** `Hero` becomes the sole owner of hero composition again. Delete the decorative `SignatureGlyph` component and replace its visual QA contract with a regression check that verifies its absence and verifies hero copy stays within the viewport at wide desktop sizes.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS v4, Playwright QA scripts.

## Global Constraints

- Preserve existing hero copy, splash, line-mask reveal, hero scroll scrub, fixed grain, Lenis scrolling, routes, and dependencies.
- Add no replacement decorative layer, animation loop, or pointer interaction.
- Test behavior against a fresh production build at 1280px, 1536px, and 1920px wide.

---

### Task 1: Specify removal regression

**Files:**
- Modify: `scripts/qa-cinematic-motion.cjs`

**Interfaces:**
- Consumes: production home route at `http://127.0.0.1:3100/`.
- Produces: a failing `wide: hero has no signature glyph` assertion before component removal.

- [ ] **Step 1: Write the failing test**

Replace glyph-presence and containment assertions with a `wide` Playwright check that opens 1280px, 1536px, and 1920px contexts, asserts `[data-signature-glyph]` has count `0`, and confirms `[data-hero-scrub]` has a positive width whose right edge does not exceed `window.innerWidth`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/qa-cinematic-motion.cjs`

Expected: `FAIL wide: hero has no signature glyph` because `SignatureGlyph` still renders.

### Task 2: Remove glyph layout model

**Files:**
- Modify: `components/hero.tsx`
- Delete: `components/signature-glyph.tsx`

**Interfaces:**
- Consumes: `Hero({ introReady: boolean })` unchanged.
- Produces: one-column hero content with no glyph DOM node.

- [ ] **Step 1: Implement minimal removal**

Delete the `SignatureGlyph` import and component invocation. Replace the two-column hero wrapper with a single-column `w-full max-w-5xl` wrapper. Preserve `data-hero-scrub`, its motion style, and all four rendered lines unchanged.

- [ ] **Step 2: Run regression test to verify it passes**

Run: `node scripts/qa-cinematic-motion.cjs`

Expected: every cinematic contract passes, including all three wide no-glyph checks.

### Task 3: Reconcile design record and verify production

**Files:**
- Modify: `openspec/changes/signature-glyph-identity/proposal.md`
- Modify: `openspec/changes/signature-glyph-identity/design.md`
- Modify: `openspec/changes/signature-glyph-identity/specs/signature-glyph-hero/spec.md`
- Modify: `openspec/changes/signature-glyph-identity/tasks.md`

**Interfaces:**
- Consumes: final hero markup and QA assertions.
- Produces: OpenSpec artifacts that no longer claim a glyph exists.

- [ ] **Step 1: Remove superseded glyph requirement**

Delete the glyph capability and decision sections. Keep atmosphere-removal requirements and record the chosen type-led hero direction plus no-glyph QA coverage.

- [ ] **Step 2: Run full verification**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build && pnpm qa && openspec validate signature-glyph-identity --strict`

Expected: exit `0`; TypeScript, lint, build, all QA suites, and strict OpenSpec validation pass.
