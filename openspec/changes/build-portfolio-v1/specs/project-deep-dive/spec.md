## ADDED Requirements

### Requirement: Single deep-dive route `/projects/ragbench`

In v1 the only project deep-dive route SHALL be `/projects/ragbench`. No `/projects/[slug]` dynamic template SHALL be implemented; ties to other project slugs SHALL fall through to Next's default 404.

#### Scenario: Visiting `/projects/ragbench` renders the deep-dive

- **WHEN** a user navigates to `/projects/ragbench`
- **THEN** the RagBench deep-dive page renders with its header, body sections, status callout, and placeholder figure slot

#### Scenario: Visiting `/projects/nonexistent` falls through to default 404

- **WHEN** a user navigates to `/projects/nonexistent`
- **THEN** Next's default 404 page renders; no custom 404 is served in v1

### Requirement: `← Back to home` link at top-left

The RagBench page SHALL render a `← Back to home` link in Geist Mono at the top-left of the content column.

#### Scenario: Back link navigates to home

- **WHEN** the user activates the `← Back to home` link
- **THEN** the browser navigates to `/` and the hero section becomes the scroll target

### Requirement: Seven sections render in fixed scroll order

The RagBench page SHALL render, in scroll order: Header, What it is, Why it exists, Surfaces, Stack list, Honest status callout, Placeholder figure slot.

#### Scenario: Sections render in fixed order

- **WHEN** the RagBench page renders
- **THEN** the seven sections appear in scroll order: Header, What it is, Why it exists, Surfaces, Stack list, Honest status callout, Placeholder figure slot; no additional section is rendered

### Requirement: `What it is` and `Why it exists` copy verbatim from source

The `What it is` and `Why it exists` paragraphs SHALL copy verbatim from `~/Code/resume/projects/ragbench.md`. No sentence may be invented.

#### Scenario: What it is paragraph matches source

- **WHEN** the `What it is` paragraph renders
- **THEN** the text matches the body of the "What it is" section in `projects/ragbench.md` word-for-word

#### Scenario: Why it exists paragraph matches source

- **WHEN** the `Why it exists` paragraph renders
- **THEN** the text matches the body of the "Why it exists" section in `projects/ragbench.md` word-for-word

### Requirement: Surfaces table renders Bench / Probe / Corpus

The Surfaces section SHALL render a table with exactly three rows keyed on Bench, Probe, and Corpus in that order, copying from the Surfaces table in `projects/ragbench.md`.

#### Scenario: Three surfaces in fixed order

- **WHEN** the Surfaces section renders
- **THEN** the three rows render in order Bench, Probe, Corpus; no other row is added

### Requirement: Stack list renders with one-line notes per item

The Stack section SHALL render a list of stack items, each line comprising the item name and a short note taken from `projects/ragbench.md`'s Stack section. No additional stack item SHALL be invented.

#### Scenario: Stack list items match source

- **WHEN** the Stack section renders
- **THEN** every stack item named corresponds to one named in the `Stack` section of `projects/ragbench.md` and includes a short rationale-derivable note; no item appears that is not in the source

### Requirement: Honest status callout is visually distinct and not buried

The Honest status callout SHALL be a distinct chrome block with `zinc-900` background, a `sky-400` 1px left border, and padding of at least 1.5rem. It SHALL appear below the Stack section and above the Placeholder figure slot.

#### Scenario: Status callout chrome

- **WHEN** the Honest status callout block renders
- **THEN** the block has a `zinc-900` background, a `sky-400` left border, and visible left padding of at least 1.5rem

#### Scenario: Status callout body forbids fabricated metrics

- **WHEN** the Honest status callout body renders
- **THEN** the body text contains the words `MVP code landed`, `Metrics pending`, and `real judged evals`, and no specific numeric metric appears anywhere on the RagBench page

### Requirement: Placeholder figure slot with `screenshot pending` caption

A placeholder `<figure>` SHALL render at the bottom of the RagBench page. The figure SHALL render no image in v1. The figure caption SHALL be exactly `Screenshot pending judged evals`.

#### Scenario: No fabricated image is rendered

- **WHEN** the placeholder `<figure>` renders
- **THEN** no `<img>` or `<Image>` element is rendered inside the figure; only an empty container plus the caption text is present

#### Scenario: Caption text is exact

- **WHEN** the placeholder figure caption renders
- **THEN** the caption text is exactly `Screenshot pending judged evals`