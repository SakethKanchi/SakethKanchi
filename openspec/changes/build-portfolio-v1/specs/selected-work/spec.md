## ADDED Requirements

### Requirement: Five numbered case-cards in fixed order

The Selected work section SHALL render exactly five `<WorkCard>` instances in scroll order: (01) RagBench with `isFlagship`, (02) drive-rag, (03) Parley, (04) Kitty VS Code Theme, (05) Multiple Disease Prediction.

#### Scenario: Card index renders in mono sky-400

- **WHEN** any `<WorkCard>` renders
- **THEN** the left index renders `NN / 05` in Geist Mono `sky-400` where `NN` is the card's zero-padded position

#### Scenario: Cards appear in fixed order

- **WHEN** the home page renders end to end
- **THEN** the five cards render in order RagBench, drive-rag, Parley, Kitty VS Code Theme, Multiple Disease Prediction; no other card is rendered

### Requirement: One-line discipline label per card

Each `<WorkCard>` SHALL display a one-line discipline label below the title that summarizes the project's engineering niche.

#### Scenario: Discipline labels render exactly as specified

- **WHEN** the five cards render
- **THEN** their discipline labels are exactly: `RAG Quality Lab` (RagBench), `Edge RAG System` (drive-rag), `Audio / Multi-process Bot` (Parley), `Developer Tool / Theme` (Kitty), `ML Comparison / Streamlit` (Multiple Disease Prediction)

### Requirement: Optional real metric per card

A `<WorkCard>` MAY display a real metric taken from the project's source note in `~/Code/resume/projects/*.md`. Metrics MUST NOT be invented or estimated.

#### Scenario: Kitty card displays downloads metric

- **WHEN** the Kitty VS Code Theme card renders
- **THEN** the metric `10,000+ downloads` is displayed prominently under the title, matched verbatim against `projects/kitty-vscode-theme.md`

#### Scenario: RagBench card displays honest WIP metric line

- **WHEN** the RagBench card renders
- **THEN** the metric line is exactly `MVP code landed. Metrics pending real judged evals.` and no fabricated numeric metric is shown anywhere on the card

#### Scenario: drive-rag, Parley, and Multiple Disease cards render no metric

- **WHEN** cards 02, 03, and 05 render
- **THEN** no metric block is rendered for those cards; the layout collapses to title + discipline + one-line + stack + CTA only

### Requirement: Stack chips render in mono

Each `<WorkCard>` SHALL render its stack as comma-separated chips in Geist Mono `zinc-400`.

#### Scenario: Stack chips render in fixed order from content module

- **WHEN** the RagBench card renders
- **THEN** the stack chips render in the order defined in `ragbenchDetail.stack` and each chip uses Geist Mono at a smaller size than the title

### Requirement: Flagship card links to deep-dive; other cards link to external repos

Card 01 (RagBench) SHALL link to `/projects/ragbench`. Cards 02–04 SHALL link to their public GitHub or Marketplace URL. Card 05 (no public repo) SHALL render without a CTA link.

#### Scenario: RagBench card CTA navigates internally

- **WHEN** the user activates the RagBench card's `Read the build →` link
- **THEN** the browser navigates to `/projects/ragbench` without a full page reload

#### Scenario: Cards 02–04 open external links in new tabs

- **WHEN** the user activates the GitHub↗, Landing↗, or Marketplace↗ link on cards 02–04
- **THEN** the link opens in a new browser tab

#### Scenario: Card 05 renders no CTA

- **WHEN** the Multiple Disease Prediction card renders
- **THEN** no clickable CTA is rendered and no broken anchor is emitted