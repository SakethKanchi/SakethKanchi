## ADDED Requirements

### Requirement: Smooth scrolling is progressive and motion-safe

The application SHALL use Lenis only on clients without `prefers-reduced-motion: reduce`. The provider SHALL preserve standard document navigation, focus order, anchor navigation, and keyboard scrolling. It SHALL use vertical, finite scrolling with `lerp: 0.1`, `duration: 1.2`, `smoothWheel: true`, and `touchMultiplier: 2`.

#### Scenario: Motion-capable users receive inertial scrolling

- **WHEN** a user with no reduced-motion preference visits any route
- **THEN** Lenis wraps the route content and smooths wheel scrolling with the configured options
- **AND** the document has no nested scroll container or altered scroll height

#### Scenario: Reduced-motion retains native scrolling

- **WHEN** the OS reports `prefers-reduced-motion: reduce`
- **THEN** Lenis is not mounted
- **AND** scrolling, keyboard navigation, anchor links, and focus behavior use native browser behavior

### Requirement: Hero scroll transforms are additive and reversible

The home hero SHALL retain its static layout and mount-driven line-mask reveal. For motion-capable users, its text block SHALL map document scroll progress from `0..0.15` to `translateY(0px..-80px)` and progress from `0..0.12` to opacity `1..0`. Its two accent glows SHALL scale from `1..1.3` over progress `0..0.2` and fade while scrolling out. These transforms SHALL reverse when the user returns to the top.

#### Scenario: Hero fades while scrolling away

- **WHEN** a motion-capable user scrolls slowly down from the top of `/`
- **THEN** the hero text visibly drifts upward and fades without changing the section's layout position
- **AND** the accent glows expand slightly and fade beneath the text

#### Scenario: Hero restores when scrolling back

- **WHEN** that user scrolls back to document progress `0`
- **THEN** hero text opacity is `1`, its scroll translate is `0px`, and glow scale is `1`

#### Scenario: Reduced-motion keeps hero static

- **WHEN** the OS reports `prefers-reduced-motion: reduce`
- **THEN** no scroll-linked transform is applied to hero text or glows
- **AND** the existing mount-driven line-mask behavior remains at its reduced-motion rest state

### Requirement: Parallax affects only section atmosphere

`SectionWrapper` SHALL accept an optional `parallaxSpeed` number defaulting to `0`. Positive values SHALL transform an internal decorative background layer only; section landmarks, headings, cards, controls, and text SHALL retain normal document flow and scroll position. The hero atmosphere SHALL use `0.3`; the selected-work atmosphere SHALL use `0.1`; all other sections SHALL use `0`.

#### Scenario: Content retains normal scroll position

- **WHEN** a motion-capable user scrolls through the home route
- **THEN** section text and interactive content scroll at native document speed
- **AND** only the configured decorative atmosphere has a slower parallax transform

#### Scenario: Reduced-motion disables parallax

- **WHEN** the OS reports `prefers-reduced-motion: reduce`
- **THEN** all section atmosphere layers render without a parallax transform regardless of their configured speed

### Requirement: Home section labels support word reveal

`SectionHeader` SHALL accept an optional `reveal` prop with values `"line"` and `"word"`, defaulting to `"line"`. For `"word"`, each label word SHALL reveal independently through an overflow-hidden mask with a 50ms stagger. Bracket, number, dash, and closing bracket SHALL remain unmasked chrome. All home-page section labels SHALL use word reveal.

#### Scenario: Label words reveal in order

- **WHEN** a motion-capable user first scrolls a home section header into view
- **THEN** each word in its display label reveals in source order with a 50ms stagger
- **AND** its bracketed number and punctuation remain visible as mono chrome throughout

#### Scenario: Reduced-motion exposes labels immediately

- **WHEN** the OS reports `prefers-reduced-motion: reduce`
- **THEN** all section-label words render at their final position without staggered animation

### Requirement: Primary calls to action use desktop-only magnetic hover

The contact CTAs and primary work-card links SHALL use a shared magnetic wrapper. On hover-capable, fine-pointer devices without reduced-motion, the wrapper SHALL translate toward the pointer by no more than 8px and spring back to rest when pointer leaves. It SHALL not install a per-frame `mousemove` listener or alter touch-device interactions.

#### Scenario: Fine-pointer hover pulls a CTA

- **WHEN** a user with `(hover: hover) and (pointer: fine)` hovers a covered CTA
- **THEN** the CTA translates toward the pointer by at most 8px
- **AND** it returns to `translate(0, 0)` after pointer leave

#### Scenario: Coarse-pointer and reduced-motion users receive static controls

- **WHEN** the pointer is coarse, hover is unavailable, or the OS reports `prefers-reduced-motion: reduce`
- **THEN** the covered controls render and operate without magnetic translation
