## ADDED Requirements

### Requirement: Entry splash on first home load only

The home route (`/`) SHALL render a full-viewport splash overlay with the prompt `click anywhere to continue →` on the user's first visit in the current browsing session, and SHALL skip the splash immediately on any repeat visit within the same session.

#### Scenario: First visit shows the splash

- **WHEN** a user navigates to `/` for the first time in the current browser session
- **THEN** the splash overlay is rendered, no body content is visible behind it, and the only dismiss action is the prompt

#### Scenario: Repeat visit within the same session skips the splash

- **WHEN** a user navigates to `/`, then navigates away, then back within the same session
- **THEN** the splash is not rendered, and the hero is displayed immediately

#### Scenario: Auto-advance after three seconds

- **WHEN** the splash has been visible for three seconds and the user has not clicked
- **THEN** the splash dismisses itself and the hero becomes visible

#### Scenario: Dismiss on any input

- **WHEN** the user clicks, taps, or presses any key while the splash is visible
- **THEN** the splash dismisses and the hero becomes visible

#### Scenario: Reduced-motion users never see the splash

- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the splash is never rendered; the hero is displayed directly on every visit

### Requirement: Top horizontal numbered nav with scrollspy

The home page SHALL render a fixed top horizontal nav containing the `<SK />` seal on the left, five numbered section links in the right area, and an optional `Resume ↗` mono link after a divider; the active section's numeric prefix SHALL turn `sky-400` via IntersectionObserver scrollspy.

#### Scenario: Five numbered links in fixed order

- **WHEN** the desktop nav is rendered on a viewport ≥ 768px
- **THEN** the order of links is exactly `01. Work`, `02. Experience`, `03. Open Source`, `04. About`, `05. Contact`

#### Scenario: Scrollspy paints the active numeric prefix

- **WHEN** the user scrolls to the section with `id="experience"`
- **THEN** the `02.` prefix in the nav is `sky-400` and all other numeric prefixes are `zinc-500`

#### Scenario: Resume link opens in a new tab

- **WHEN** the user activates the `Resume ↗` right-end link
- **THEN** the resume PDF opens in a new tab; the user is not navigated away from the portfolio

### Requirement: Mobile nav collapses to top bar with sheet menu

On viewports < 768px the nav SHALL collapse to a top bar containing the `<SK />` seal and a hamburger, and attacking the hamburger SHALL open a shadcn `Sheet` containing the same five numbered links stacked vertically plus `Resume ↗` at the bottom.

#### Scenario: Sheet menu opens on hamburger tap

- **WHEN** a user on a viewport < 768px taps the hamburger icon
- **THEN** a sheet opens from the side, the five numbered links are stacked vertically in order, and `Resume ↗` is rendered at the bottom

#### Scenario: Sheet menu closes on link activation

- **WHEN** a user activates a section link inside the sheet
- **THEN** the sheet closes and the page scrolls to the targeted section

### Requirement: Type-led hero with scroll-revealed stacked lines

The hero SHALL be type-led (no portrait, no gradient, no image), and its four stacked lines SHALL reveal one at a time on first scroll-enter.

#### Scenario: Four lines in fixed order

- **WHEN** the hero renders
- **THEN** the four lines are exactly, in order: name (`Saketh Kanchi`), role (`Full-Stack AI Engineer`), tagline (`RAG systems, LLM integrations, and production full-stack features.`), and the three mono links (`GitHub ↗`, `LinkedIn ↗`, `Email ↗`)

#### Scenario: Lines reveal sequentially on scroll-enter

- **WHEN** the user scrolls into the hero for the first time in the session
- **THEN** the four lines appear one at a time; line N+1 appears after line N has finished

#### Scenario: Reduced-motion renders all lines immediately

- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** all four lines are visible immediately without sequential reveal

### Requirement: Bracket-numbered section headers

Each home section SHALL be preceded by a bracket-numbered section header of the form `[ NN — Section name ]` in Geist Mono, with the label rendered in Geist Sans.

#### Scenario: Five bracket headers in fixed order

- **WHEN** the home page renders end to end
- **THEN** exactly five bracket-numbered headers appear in scroll order: `[ 01 — Selected work ]`, `[ 02 — Experience ]`, `[ 03 — Open source ]`, `[ 04 — About ]`, `[ 05 — Contact ]`

#### Scenario: Number, dash, and label in distinct fonts

- **WHEN** any single header renders
- **THEN** the square brackets, the two-digit number, and the em-dash are rendered in Geist Mono `zinc-500`, and the section label is rendered in Geist Sans `zinc-100` letter-spaced wide