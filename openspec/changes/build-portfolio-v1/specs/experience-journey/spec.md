## ADDED Requirements

### Requirement: Four numbered journey stops in fixed order

The Experience section SHALL render exactly four `<JourneyStop>` instances in scroll order: (01) Fund Flow OS · Founding Engineer, (02) SideQuest · Automation Team Lead, (03) Stevens Institute of Technology · M.S. CS, (04) Gandhi Institute of Technology and Management · B.S. CS.

#### Scenario: Stops render in fixed order

- **WHEN** the home page renders end to end
- **THEN** the four stops render in order Fund Flow OS, SideQuest, Stevens, Gandhi; no other stop is rendered

### Requirement: Job stops use `·LTM` role-line marker

For each job stop (01, 02), the role title line SHALL use the form `Company · Role Title · LTM · Dates` with the `·LTM` marker present as a literal suffix on the role title.

#### Scenario: Fund Flow OS role-line renders LTM marker

- **WHEN** stop 01 renders
- **THEN** the title line is exactly `Fund Flow OS · Founding Engineer · LTM · Dec 2025 – Present`

#### Scenario: SideQuest role-line renders LTM marker

- **WHEN** stop 02 renders
- **THEN** the title line is exactly `SideQuest · Automation Team Lead (incl. ML & Flutter Intern) · LTM · Jun 2025 – Dec 2025`

### Requirement: Degree stops do not use `·LTM`

For each degree stop (03, 04), the title line SHALL NOT contain the `·LTM` marker.

#### Scenario: Stevens stop title line renders without LTM

- **WHEN** stop 03 renders
- **THEN** the title line contains `M.S. Computer Science · GPA 3.83` and does not contain `LTM`

### Requirement: Job stops use `▹`-prefixed bullets

Job stops (01, 02) SHALL display their achievement bullets prefixed with the `▹` glyph (Geist Mono `sky-400`); degree stops (03, 04) SHALL render no bullets.

#### Scenario: Bullets render with `▹` glyph on job stops

- **WHEN** any of stop 01 or stop 02 renders with bullets
- **THEN** each bullet line begins with the `▹` glyph rendered in Geist Mono `sky-400` followed by the bullet body in Geist Sans `zinc-100`

#### Scenario: Degree stops render lines only

- **WHEN** either stop 03 or stop 04 renders
- **THEN** no `▹` glyph is rendered and no bullet list is present; only the title and subtitle lines render

### Requirement: Bullets must match source project notes

Job bullets SHALL copy verbatim from the corresponding project notes in `~/Code/resume/projects/fund-flow-os.md` and `~/Code/resume/projects/sidequest.md`. No bullet may be invented, paraphrased more strongly than the source, or padded with metrics that don't exist.

#### Scenario: Fund Flow OS bullets match `projects/fund-flow-os.md`

- **WHEN** stop 01 renders its bullets
- **THEN** each bullet phrase appears in `projects/fund-flow-os.md`, with at most whitespace and punctuation normalisation

#### Scenario: SideQuest bullets match `projects/sidequest.md`

- **WHEN** stop 02 renders its bullets
- **THEN** each bullet phrase appears in `projects/sidequest.md`, with at most whitespace and punctuation normalisation