## MODIFIED Requirements

### Requirement: Type-led hero with mount and scroll-revealed stacked lines

The hero SHALL remain type-led with no portrait, gradient image, or video asset. Its four stacked lines SHALL retain their mount-driven line-mask reveal and, for motion-capable users, its text block SHALL receive an additive scroll-linked upward drift and fade. The hero's static layout position and content order SHALL not change.

#### Scenario: Four lines retain fixed order

- **WHEN** the hero renders
- **THEN** the four lines remain, in order: name (`Saketh Kanchi`), role (`Full-Stack AI Engineer`), tagline (`RAG systems, LLM integrations, and production full-stack features.`), and mono links (`GitHub ↗`, `LinkedIn ↗`, `Email ↗`)

#### Scenario: Lines reveal sequentially on initial entry

- **WHEN** a motion-capable user first views the hero in a session
- **THEN** its four lines reveal through their existing line masks in source order
- **AND** the reveal does not change the hero's document-flow dimensions

#### Scenario: Scroll motion is additive and reversible

- **WHEN** that user scrolls down from the top of the home route
- **THEN** the text block drifts upward and fades through compositor transforms without changing its static layout position
- **AND** scrolling back to the top restores the text to its original transform and opacity

#### Scenario: Reduced-motion renders hero at rest

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** all four lines are visible immediately with no mount or scroll-linked motion
- **AND** the hero's text and glows have their resting transform and opacity

### Requirement: Bracket-numbered section headers with display labels

Each home section SHALL retain a bracket-numbered header of the form `[ NN — Section name ]`. The square brackets, two-digit number, and em dash SHALL remain Geist Mono chrome; the label SHALL remain the display-serif label introduced by the editorial layer. For motion-capable users, the home labels SHALL reveal word by word while their chrome remains visible.

#### Scenario: Header order and typography remain stable

- **WHEN** the home page renders end to end
- **THEN** its headers appear in scroll order as `[ 01 — Selected work ]`, `[ 02 — Experience ]`, `[ 03 — Open source ]`, `[ 04 — About ]`, and `[ 05 — Contact ]`
- **AND** brackets, number, and dash use the mono chrome treatment while labels use the display-serif treatment

#### Scenario: Word motion does not mask chrome

- **WHEN** a motion-capable user first scrolls a home header into view
- **THEN** label words reveal sequentially through individual masks
- **AND** bracket, number, dash, and closing bracket are not inside those masks

#### Scenario: Reduced-motion keeps headers fully visible

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** every home header renders fully visible at its final position without staggered word motion
