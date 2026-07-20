## MODIFIED Requirements

### Requirement: Film grain overlay layers across all routes

A fixed, pointer-events-none, `aria-hidden` SVG noise overlay SHALL render above the procedural atmosphere canvas and below hero glows, navigation, and all readable content on every route. The overlay SHALL use a `feTurbulence type="fractalNoise"` data-URI at low opacity with `mix-blend-overlay` and SHALL not intercept pointer, keyboard, scrolling, selection, or accessibility interaction.

#### Scenario: Grain occupies its required layer

- **WHEN** any route renders with the procedural atmosphere available
- **THEN** one grain overlay is fixed to the viewport at `z-[1]` above the `z-0` canvas
- **AND** hero glows and all text render above the grain

#### Scenario: Grain remains subtle and non-interactive

- **WHEN** a user clicks, scrolls, tabs, or selects text anywhere on the page
- **THEN** the grain overlay does not intercept interaction
- **AND** its opacity remains in the range `0.025..0.05` without reducing verified text contrast

### Requirement: Hero accent glow and edge fades layer over atmosphere

The hero SHALL retain its large upper-right and smaller lower-left blurred radial `var(--accent)` glows, with two scheme-adaptive edge fades. The glows SHALL render above the grain and procedural atmosphere, below hero text, and participate in the additive scroll-out transform for motion-capable users. Edge fades SHALL remain above glows and below hero text.

#### Scenario: Glow stack preserves readable hero text

- **WHEN** the hero renders over a procedural atmosphere canvas
- **THEN** upper-right and lower-left accent glows render above grain but beneath hero text
- **AND** edge fades prevent glow bleed into the navigation and next section
- **AND** the hero text remains at least AA 4.5:1 against its immediate backdrop

#### Scenario: Scroll-out motion leaves ambient grain unchanged

- **WHEN** a motion-capable user scrolls away from the hero
- **THEN** accent glows expand slightly and fade beneath the text
- **AND** the film grain keeps its fixed opacity and does not receive a scroll-linked transform

#### Scenario: Reduced-motion leaves glows at rest

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** accent glows and edge fades render at their resting values
- **AND** the grain overlay remains static
