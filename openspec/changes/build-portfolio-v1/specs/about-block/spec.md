## ADDED Requirements

### Requirement: Combined About block inside the `[ 04 — About ]` section

The About section SHALL combine, in scroll order, one paragraph, a three-line `Currently` list, a Skills block of five skill groups, and a one-line Certifications badge. No separate nav item SHALL exist for Skills or Certifications.

#### Scenario: Four sub-blocks render in fixed order

- **WHEN** the About section renders
- **THEN** the four sub-blocks render in order: paragraph, Currently list, Skills groups, Certifications badge

### Requirement: About paragraph matches resume fullstack summary verbatim

The paragraph SHALL be copied verbatim from the fullstack variant of `Saketh_Kanchi_Resume.tex`'s `\roleSummary`. No additional sentence SHALL be invented.

#### Scenario: Paragraph matches resume source

- **WHEN** the About paragraph renders
- **THEN** the text matches the fullstack `\roleSummary` body word-for-word, with only whitespace and punctuation normalisation

### Requirement: Currently list is exactly three mono lines

The `Currently` list SHALL render exactly three lines, each in Geist Mono:
- `Building RagBench — a RAG quality lab`
- `Founding Engineer at Fund Flow OS`
- `Based in Jersey City, NJ`

#### Scenario: Three currently lines render in fixed order

- **WHEN** the About section renders
- **THEN** the three `Currently` lines render in the order listed and each uses Geist Mono

### Requirement: Five skill groups in fullstack order

The Skills block SHALL render exactly five groups in the order: Languages, AI / Data, Databases & APIs, Cloud & DevOps, Tools. No group SHALL be added, removed, or reordered.

#### Scenario: Five skill groups render in fixed order

- **WHEN** the Skills block renders
- **THEN** the five group labels render in order: `Languages`, `AI / Data`, `Databases & APIs`, `Cloud & DevOps`, `Tools`

#### Scenario: No progress bars or ratings

- **WHEN** any skill group renders
- **THEN** no progress bar, percentage, star rating, or years-of-experience label is rendered; each group is a list of comma-separated chips in Geist Mono

#### Scenario: Skill items match resume fullstack ordering

- **WHEN** the Languages group renders
- **THEN** the chips are exactly `JavaScript/TypeScript`, `Python`, `Node.js`, `React`, `Dart/Flutter`, `Rust`, `C++`, `HTML/CSS` in that order

### Requirement: One-line Certifications badge

The Certifications sub-block SHALL render exactly one entry, with no separate grid or group-by-issuer layout.

#### Scenario: Single cert renders as one-line badge

- **WHEN** the Certifications sub-block renders
- **THEN** the line is exactly `Oracle Cloud Infrastructure 2025 AI Foundations Associate — Oracle, 2025` and no other entry is rendered

### Requirement: No competing nav item for Skills or Certifications

The top nav SHALL NOT include separate links for Skills or Certifications; these are reachable only as sub-blocks under `04. About`.

#### Scenario: Top nav does not link to Skills or Certifications

- **WHEN** the home page top nav renders
- **THEN** no nav item exists whose label contains `Skills` or `Certifications`