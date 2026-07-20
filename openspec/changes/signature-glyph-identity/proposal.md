## Why

Ship a type-led portfolio that converts recruiters in 30s. Decorative backgrounds—both the former teal WebGL atmosphere and the later `<SK />` glyph—compete with readable work evidence and create unstable wide-screen composition.

## What Changes

- Remove the global procedural shader, local Work-section decorative atmosphere, and home-hero `<SK />` glyph.
- Restore a single-column, type-led home hero with no replacement decorative layer.
- Preserve the existing hero entrance, scroll scrub, grain, word reveals, Lenis scrolling, and desktop-only magnetic controls.
- Replace shader- and glyph-specific QA with behavior checks for no decorative hero DOM, hero content bounds, reduced motion, and layering.

## Capabilities
### Modified Capabilities
- `home-hero`: Render only readable hero copy, controls, and interaction motion; no decorative hero background or identity glyph.


## Non-goals
- No generated portraits, project screenshots, fake product UI, gradients, glows, ambient backgrounds, or hero identity glyph.
- No changes to portfolio copy, routes, dependencies, or project-card content.
- No new animation loop or pointer interaction.

## Impact

- Modify `components/hero.tsx` and `scripts/qa-cinematic-motion.cjs`.
- Delete `components/signature-glyph.tsx`.
- Preserve completed `cinematic-motion` artifacts as historical context; this change supersedes its atmosphere and glyph behavior.
