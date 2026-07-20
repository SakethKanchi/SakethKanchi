## ADDED Requirements

### Requirement: Type-led home hero has no decorative glyph
The home hero SHALL render readable name, role, tagline, and links without a decorative `<SK />` identity glyph or replacement ambient background. It SHALL NOT change portfolio copy, controls, landmarks, or links.

#### Scenario: Any viewport omits the decorative glyph
- **WHEN** a visitor loads the home page at any viewport width
- **THEN** no `data-signature-glyph` element exists
- **AND THEN** the hero content remains within viewport bounds at 1280px, 1536px, and 1920px wide

### Requirement: Existing hero motion respects visitor preferences
The home hero SHALL retain its splash-gated reveal and scroll scrub for normal-motion visitors, while reduced-motion visitors SHALL see content at rest with native scrolling.

#### Scenario: Reduced-motion visitor sees static hero content
- **WHEN** a visitor prefers reduced motion
- **THEN** the hero renders at rest without an entrance transition
- **AND THEN** Lenis exposes native scroll mode
### Requirement: Atmosphere is removed from portfolio shell
The shared page shell SHALL render fixed grain only as a site-wide decorative layer. It SHALL NOT render a WebGL canvas, hero glow, edge-fade gradient, or section-level decorative atmosphere.

#### Scenario: Shared shell avoids procedural backgrounds
- **WHEN** a visitor loads any portfolio route
- **THEN** no `canvas[data-shader-bg]` or `[data-section-atmosphere]` element exists
- **AND THEN** all readable content remains above the fixed grain layer
