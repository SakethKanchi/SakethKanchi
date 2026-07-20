## ADDED Requirements

### Requirement: Per-page title and meta description

Every route SHALL publish a non-default `<title>` and a non-empty meta description via Next's `metadata` API.

#### Scenario: Home page metadata

- **WHEN** the home route renders
- **THEN** the `<title>` is `Saketh Kanchi — Full-Stack AI Engineer` and the meta description is a non-empty human-written string under 160 characters

#### Scenario: RagBench route metadata

- **WHEN** the `/projects/ragbench` route renders
- **THEN** the `<title>` is `RagBench — Saketh Kanchi` and the meta description is distinct from the home route's

### Requirement: `robots.txt` allows all and references the sitemap

`app/robots.ts` SHALL publish a `robots.txt` allowing all user agents and referencing the sitemap URL.

#### Scenario: robots.txt served at `/robots.txt`

- **WHEN** a client requests `/robots.txt`
- **THEN** the response allows all paths for all agents and includes a `Sitemap:` directive pointing to the deployed origin's sitemap

### Requirement: `sitemap.xml` lists the two v1 routes

`app/sitemap.ts` SHALL publish a sitemap containing exactly two entries in v1: `/` and `/projects/ragbench`.

#### Scenario: Two sitemap entries in v1

- **WHEN** a client requests `/sitemap.xml`
- **THEN** the response contains exactly two `<url>` entries corresponding to `/` and `/projects/ragbench`

### Requirement: JSON-LD `Person` schema with `sameAs`

`app/layout.tsx` SHALL include a JSON-LD `Person` schema in a `<script type="application/ld+json">` element containing `name`, `email`, `jobTitle`, `address` (Jersey City NY region USA), and `sameAs` for GitHub and LinkedIn.

#### Scenario: Person schema renders

- **WHEN** any route renders
- **THEN** the JSON-LD `Person` block is present in the rendered HTML, parses as valid JSON-LD, and links GitHub and LinkedIn URLs via `sameAs`

### Requirement: Type-only OpenGraph card, no portrait

The OG card SHALL be a generated 1200×630 image using only type on a `zinc-950` background. No portrait photo and no gradient SHALL be rendered.

#### Scenario: Home OG card

- **WHEN** a crawler fetches the home page
- **THEN** the OpenGraph image is a 1200×630 PNG with `Saketh Kanchi` in Geist Sans, a role line in Geist Mono `sky-400`, the site URL at the bottom-right, and `zinc-950` background; no portrait image is embedded

#### Scenario: RagBench OG card

- **WHEN** a crawler fetches `/projects/ragbench`
- **THEN** the OpenGraph image is a 1200×630 PNG with `RagBench` as the top-line type, `Saketh Kanchi` as a secondary line, and `zinc-950` background; no portrait image is embedded

### Requirement: Canonical URL on every route

Every route SHALL publish a canonical URL via `metadata.alternates.canonical`.

#### Scenario: Home canonical

- **WHEN** the home route renders
- **THEN** the `<link rel="canonical">` href is the deployed origin root

#### Scenario: RagBench canonical

- **WHEN** the `/projects/ragbench` route renders
- **THEN** the `<link rel="canonical">` href is the deployed origin's `/projects/ragbench`