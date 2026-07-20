## Context

The home hero currently combines a global WebGL shader, two hero glow blobs, edge-fade gradients, and a Work-section parallax glow. These are decorative layers rather than portfolio evidence. The user selected a signature-glyph direction: one calm `<SK />` identity mark replaces the atmosphere while existing readable motion remains.

`Hero` is already a client component coordinating the post-splash reveal, reduced motion, and scroll scrub. `RootLayout` owns site-wide decorative layers; `SectionWrapper` currently owns the Work-only local atmosphere. Runtime QA already uses data attributes to assert public visual contracts.

## Goals / Non-Goals

**Goals:**
- Give the home hero one recognisable element tied to Saketh Kanchi’s existing `<SK />` seal.
- Remove every teal/violet atmosphere effect and the WebGL animation loop.
- Keep text, links, landmarks, hero scrub, fixed grain, Lenis, word reveals, and magnetic controls readable and intact.
- Make glyph behavior responsive, non-interactive, and reduced-motion-safe.

**Non-Goals:**
- Create an image-led hero, fake dashboard, generated portrait, new route, or content rewrite.
- Add a dependency, animation loop, hover effect, gradient, glow, or persistent background treatment.
- Rework non-hero component motion.

## Decisions

### Keep the hero type-led

The hero renders no decorative background, glyph, image, glow, or color field. Name, role, tagline, and links are the only hero focal content. This removes the viewport-dependent second subject that made the right side of wide screens appear clipped, offset, or empty.

The hero uses one `max-w-5xl` content wrapper. It has no decorative grid column and no breakpoint-specific layout branch beyond the existing type and spacing rules.

### Delete atmosphere instead of replacing it

Remove `ShaderBg` from the root layout and delete its component. Remove `parallaxSpeed`, Framer scroll plumbing, and local atmosphere markup from `SectionWrapper`; remove Work’s prop. Keep only the fixed grain overlay, now explicitly below all content, because grain is a low-opacity texture rather than competing color or motion.

### Preserve existing content motion and assert public behavior

The existing line-mask hero reveal remains splash-gated. Hero scroll scrub keeps controlling content. QA asserts no decorative glyph DOM, content containment at 1280px, 1536px, and 1920px, reduced-motion native scrolling, and existing mobile interaction behavior. No Lighthouse change is expected: deleting client decoration reduces client work and no runtime fetches are added.

## Risks / Trade-offs

- A type-led hero has more empty space. Mitigation: use the existing generous vertical rhythm rather than inventing a decorative substitute.
- Font rendering may vary across browsers. Mitigation: use current local font variables; text remains actual readable content.
- `useReducedMotion()` may resolve after hydration. The existing hero follows Framer Motion’s convention; no decorative state now depends on it.
