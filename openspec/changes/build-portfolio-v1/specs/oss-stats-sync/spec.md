## ADDED Requirements

### Requirement: Build-time GitHub star fetch script

`scripts/sync-oss.ts` SHALL fetch the current star count for each repository referenced in `content/index.ts`'s OSS list and write the result to `data/oss.json`. The script SHALL run as part of `pnpm build` and SHALL NOT run at request time.

#### Scenario: Script writes `data/oss.json` on build

- **WHEN** `pnpm build` is invoked
- **THEN** `data/oss.json` is regenerated with current star counts for `adi1090x/widgets`, `nyxxbit/discord-quest-completer`, and `catppuccin/youtube`

#### Scenario: Script never runs at request time

- **WHEN** a production request reaches the server
- **THEN** no GitHub API call is invoked from runtime code; the request reads star counts only from `data/oss.json`

### Requirement: Graceful fallback on fetch failure

If GitHub refuses or times out during sync for any repo, `scripts/sync-oss.ts` SHALL fall back to the hardcoded truthful floor in `content/index.ts` for that repo and SHALL NOT exit non-zero.

#### Scenario: Rate-limited GitHub API

- **WHEN** GitHub returns 403 or 429 for any repo during sync
- **THEN** the script logs a warning, writes the hardcoded floor for that repo to `data/oss.json`, and exits 0

#### Scenario: Network outage mid-build

- **WHEN** the network is unreachable during a build
- **THEN** the script writes all hardcoded floors to `data/oss.json` and exits 0

### Requirement: `data/oss.json` is committed

`data/oss.json` SHALL be committed to the repo with one initial entry per OSS row so a fresh clone renders without running the sync script.

#### Scenario: Fresh clone renders OSS rows without running sync

- **WHEN** the repo is freshly cloned and `pnpm build` is run
- **THEN** the OSS rows render star counts even if `scripts/sync-oss.ts` is skipped or fails fresh

### Requirement: Fallback floors match source truthful values

The hardcoded fallback values in `content/index.ts` SHALL be `800+` for `adi1090x/widgets`, `260+` for `nyxxbit/discord-quest-completer`, and `156+` for `catppuccin/youtube`. These floors SHALL be marked as truthful against the resume's Open Source section at the time of v1 design.

#### Scenario: Fallback floor values

- **WHEN** `scripts/sync-oss.ts` reads its fallback constant for any OSS row
- **THEN** the value matches one of the three hardcoded floors listed above for the matching repo; no row is missing a fallback