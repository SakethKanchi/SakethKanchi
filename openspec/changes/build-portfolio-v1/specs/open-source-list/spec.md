## ADDED Requirements

### Requirement: Three open-source rows in fixed order

The Open source section SHALL render exactly three `<OssRow>` instances in scroll order: `adi1090x/widgets`, `nyxxbit/discord-quest-completer`, `catppuccin/youtube`.

#### Scenario: Three rows render in fixed order

- **WHEN** the home page renders the Open source section
- **THEN** the three rows render in order `adi1090x/widgets`, `nyxxbit/discord-quest-completer`, `catppuccin/youtube`; no other row is rendered

### Requirement: Row layout is repo / PR context / cached star count

Each row SHALL render the repo path as a Geist Mono link, a one-line PR context in Geist Sans `zinc-100`, and a cached star count in Geist Mono `sky-400` right-aligned.

#### Scenario: Repo path links to GitHub

- **WHEN** any row renders
- **THEN** the repo path text is clickable and opens the corresponding GitHub repo in a new tab

#### Scenario: Star count alignment

- **WHEN** any row renders
- **THEN** the star count is rendered on the right end of the row, right-aligned in Geist Mono `sky-400`

### Requirement: Star counts come from the build-time cache, never live

Star counts SHALL be read from `data/oss.json` (populated at build by `scripts/sync-oss.ts`). The home page SHALL NOT fetch GitHub's API at request time.

#### Scenario: Star counts rendered from `data/oss.json`

- **WHEN** the home page is served in a production build
- **THEN** the three star counts match the values in `data/oss.json` at the time of the build

#### Scenario: No live GitHub fetch at request time

- **WHEN** the production bundle is audited
- **THEN** no fetch of `api.github.com` is invoked from any client runtime path; `scripts/sync-oss.ts` runs only at build time

### Requirement: Fallback floors on script failure

If `scripts/sync-oss.ts` fails to fetch any repo during the build, the build SHALL fall back to the hardcoded truthful floor in `content/index.ts` (`800+`, `260+`, `156+` respectively) and SHALL NOT fail the build.

#### Scenario: GitHub API failure falls back to hardcoded floor

- **WHEN** `scripts/sync-oss.ts` cannot reach GitHub during a build
- **THEN** the build completes and the rendered star counts are `800+`, `260+`, `156+` respectively

### Requirement: One-line PR context matches resume Open Source section

Each row's one-line PR context SHALL match the resume's Open Source section verbatim with at most whitespace and punctuation normalisation.

#### Scenario: adi1090x/widgets PR context

- **WHEN** the first row renders
- **THEN** the PR context line is `merged PR adding new color schemes` (or whitespace-equivalent)

#### Scenario: nyxxbit/discord-quest-completer PR context

- **WHEN** the second row renders
- **THEN** the PR context line is `merged PR adding a Python port of the relay` (or whitespace-equivalent)

#### Scenario: catppuccin/youtube PR context

- **WHEN** the third row renders
- **THEN** the PR context line is `merged PR fixing metadata card rendering` (or whitespace-equivalent)