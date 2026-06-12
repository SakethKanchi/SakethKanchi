# Saketh Kanchi — Portfolio Website Design Spec

**Date:** 2026-06-11
**Owner:** Saketh Kanchi
**Status:** Approved design → ready for implementation plan

---

## 1. Goal & Audience

**Primary job: land a full-time engineering role.** Audience is recruiters and
hiring managers arriving from the resume, LinkedIn, and GitHub, plus engineers
who vet the work. Every decision optimizes for: fast credibility, projects
front-and-center, effortless scan, frictionless contact. The site itself is also
a craft signal — it should look like an engineer with taste built it.

Success criteria:
- A recruiter understands "who, what, proof, how to contact" in < 20 seconds.
- An engineer reviewing it thinks "this person can build."
- Lighthouse ≥ 95 across Performance / Accessibility / Best Practices / SEO.
- Trivial to edit content and add projects without touching components.

---

## 2. Tech Foundation

- **Next.js (App Router) + TypeScript** — matches Saketh's target React/full-stack
  roles; the stack is itself a signal.
- **Static Site Generation (SSG)** — no backend required. Fast, free to host,
  excellent Lighthouse.
- **Tailwind CSS** + **shadcn/ui** for components.
- **GSAP** (+ ScrollTrigger) and **Lenis** for motion/smooth scroll.
- **`next/font`**: Inter (UI/headings) + JetBrains Mono (code/mono accents).
- **`next/image`** for project imagery.
- **Deploy on Vercel** (free tier, preview deploys, custom domain later).
- **One serverless Route Handler** (`app/api/contact/route.ts`) for the contact
  form via **Resend** — the only non-static piece; everything else is SSG.

---

## 3. Editability (hard requirement: easy to edit/customize)

All content lives in typed data files. **Editing content = editing these files;
never the components.**

```
src/content/profile.ts     → name, role, tagline, bio, email, socials, resumePath
src/content/experience.ts  → work history (Fund Flow OS, SideQuest) for the timeline
src/content/projects.ts    → projects (Kitty, Parley) with links, tags, stats
src/content/skills.ts      → grouped skills (Languages, AI/Data, DB, Cloud, Tools)
```

- Adding a project = appending one typed object to `projects.ts`.
- TypeScript types guarantee shape, give autocomplete, and prevent layout breakage.
- No CMS — for a personal portfolio, typed data files are simpler and faster.

---

## 4. Theming (8 themes + switcher)

Architecture: **CSS custom properties (design tokens) + `data-theme` on `<html>`**,
managed by **`next-themes`** (persists choice to localStorage, prevents
flash-of-wrong-theme on load, respects `prefers-color-scheme` on first visit).

- **Default:** Indigo Night.
- **Themes (8):** Indigo Night, Tokyo Night, Catppuccin Mocha, Catppuccin Latte,
  Rosé Pine, Rosé Pine Dawn, Gruvbox, Nord. (Latte + Dawn provide light options,
  so the picker is a real "theme" selector, not just dark/light.)
- **Token set** per theme: `--bg`, `--surface`/`--card`, `--line`, `--fg`,
  `--muted`, `--accent`, `--accent-fg`, `--accent-soft`. Defined once in
  `src/styles/themes.css`.
- **Theme registry:** `src/lib/themes.ts` — name + label + swatch color. Adding a
  theme = one token block + one registry entry.
- **Switcher:** shadcn dropdown in the nav, color-dot per theme. Keyboard
  accessible.
- **Contrast:** every theme's `--fg`/`--accent` on `--bg`/`--card` must meet WCAG
  AA. Verified during build (impeccable browser pass).

---

## 5. Layout & Sections (recruiter-scan order)

1. **Nav** — sticky, minimal: name/mark · theme switcher · "Résumé" button.
2. **Hero** — bento grid: name + tagline card, "10k+ users" stat, "Open to work"
   badge, skills strip, project preview, subtle generative background.
3. **Projects** — bento cards: Kitty (10k+ downloads), Parley (Discord meeting
   bot). Tags, live/GitHub links, mono accents on tech.
4. **Experience** — vertical timeline: Fund Flow OS (Founding Engineer),
   Fund Flow OS / SideQuest (Automation Team Lead).
5. **Skills** — grouped grid: Languages & Frameworks, AI/Data, Databases,
   Cloud & DevOps, Tools & APIs.
6. **About** — short bio + Stevens MS CS (Dec 2025, GPA 3.83) + OCI 2025 AI
   Foundations cert + **résumé PDF download** (existing PDF served from `/public`).
7. **Contact** — **lightweight form** (name, email, message) via a Next Route
   Handler + **Resend**, with **zod validation + honeypot** for spam. **Fallback**
   always visible: copy-email button + LinkedIn + GitHub. The form doubles as a
   small full-stack signal.
8. **Footer** — minimal, repeat key links.

Bento grid is the core layout language across Hero/Projects/Skills: modular
cards, responsive, scannable.

---

## 6. Motion (Lenis + GSAP, accessibility-first)

- **Smooth scroll: Lenis** (`npm i lenis`), driven by GSAP's ticker.
  - `autoRaf: false`, single RAF loop via `gsap.ticker.add`.
  - `lenis.on('scroll', ScrollTrigger.update)` to sync.
- **Scroll-reveal choreography:** GSAP ScrollTrigger staggered reveals as sections
  enter the viewport (cohesive motion language, not random per-element pops).
- **Magnetic buttons:** primary CTAs follow the cursor slightly on hover (GSAP).
- **Tilt cards:** subtle 3D tilt on bento cards on hover (GSAP, transform-only).
- **Generative hero background:** subtle, theme-aware animated backdrop (p5.js /
  canvas via the algorithmic-art approach). **Lazy-loaded** (dynamic import, no
  SSR) so it never blocks initial paint; GPU-light, low opacity, never competes
  with text.
- **Rejected:** Anime.js (redundant with GSAP — one motion model only). Three.js
  deferred to a possible future flagship (WebGL weight/perf cost not worth it for
  v1; p5 backdrop delivers the wow).
- **Reduced motion (required):** `gsap.matchMedia()` +
  `matchMedia('(prefers-reduced-motion: reduce)')` — disable Lenis, skip
  ScrollTrigger setup, drop tilt/magnetic/generative animation. ~25% of
  macOS/iOS users; non-negotiable.
- **Performance:** transforms only (no animating layout props), `will-change`
  used sparingly, lighter motion on mobile.

---

## 7. Component Structure

```
app/layout.tsx              → ThemeProvider, fonts, SEO metadata, OG, Lenis provider
app/page.tsx                → assembles sections in scan order
components/sections/        → Hero, Projects, Experience, Skills, About, Contact
components/ui/              → BentoCard, ThemeSwitcher, Nav, Footer, ResumeButton
components/motion/Reveal.tsx → reusable GSAP scroll-reveal wrapper
components/motion/Magnetic.tsx, Tilt.tsx
components/motion/SmoothScroll.tsx → Lenis + GSAP ticker wiring
components/hero/GenerativeBg.tsx   → p5/canvas backdrop (lazy, reduced-motion aware)
app/api/contact/route.ts    → contact form handler (Resend + zod + honeypot)
components/sections/ContactForm.tsx → form UI + copy-email/links fallback
src/content/*.ts            → profile, experience, projects, skills (edit here)
src/styles/themes.css       → 8 theme token sets
src/lib/themes.ts           → theme registry
```

Each unit has one clear purpose, a typed interface, and is independently
understandable. Content is fully decoupled from presentation.

---

## 8. Responsive

Mobile-first. Bento grid uses CSS grid with breakpoints / `auto-fit`; collapses
to a single column on mobile. Tested 320px → wide desktop. Touch targets ≥ 44px.
Motion is lighter on small screens.

---

## 9. Quality Bar

- **SEO:** `metadata` API, Open Graph image, sitemap, semantic HTML, descriptive
  title/description.
- **Accessibility:** keyboard navigation, visible focus states, AA contrast per
  theme, `prefers-reduced-motion`, alt text, semantic landmarks.
- **Performance:** SSG, optimized images/fonts, minimal JS, target Lighthouse 95+.

---

## 10. Skills / Tooling Used to Build It

| Job | Skill(s) |
|---|---|
| Design taste / anti-slop | `design-taste-frontend`, `gpt-taste`, `high-end-visual-design`, `impeccable` (polish + live browser verify), `frontend-design`, `ui-ux-pro-max` |
| Components | `vercel:shadcn` |
| Motion | `gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-performance` + **Lenis** (library) |
| Theming | `document-skills:theme-factory` |
| Generative hero | `document-skills:algorithmic-art` (p5.js) |
| Framework correctness | `vercel:nextjs`, `vercel:react-best-practices` |
| Testing | `document-skills:webapp-testing` (Playwright) |
| Deploy | `vercel:deploy` |

Note: `awwwards-animations` was evaluated and dropped (low trust / few users);
official GSAP skills + Lenis cover the same ground from first-party sources.

---

## 11. Content (extracted from résumé — edit in data files later)

**Profile**
- Name: Saketh Kanchi
- Role: Full-Stack Engineer — AI-powered applications & intelligent automation
- Tagline: builds AI-powered products that ship (RAG, LLM agents, internal tools)
- Email: sakethkanchi3@gmail.com · Phone: 201-552-8414
- LinkedIn: linkedin.com/in/saketh-kanchi · GitHub: github.com/SakethKanchi
- Résumé: existing `Saketh_Kanchi_Resume.pdf` → `/public/resume.pdf`

**Experience**
- **Fund Flow OS — Founding Engineer** (2025–Present, Jersey City, NJ):
  full-stack features (React/Node/REST); RAG system on Cloudflare Workers
  (semantic search over 40+ docs via Discord, 50+ daily queries); Apollo.io lead
  enrichment (500+ leads); leading Vercel→Fly.io infra migration; Python/Node/
  Playwright automation pipelines.
- **Fund Flow OS (SideQuest) — Automation Team Lead** (Jun–Dec 2025): led
  automation team; AI quest-generation pipeline (Foursquare Places + Google
  Gemini + Unsplash, batch + retry); automated Mapbox tileset generation from
  PostgreSQL/GeoJSON; internal dev tools (Instagram scraper, Apps Scripts).

**Projects**
- **Kitty — VS Code Theme** (Node.js, VS Code API): 10,000+ downloads, ~5★ on the
  Marketplace; full lifecycle ownership (publishing, versioning, support, a11y
  iterations). Link: VS Code Marketplace.
- **Parley — self-hosted Discord meeting bot** (Node.js, Python, discord.js,
  SQLite, FastAPI): records voice channels, local transcription via
  `faster-whisper` sidecar, pluggable LLM summarizers (Gemini/OpenAI/Ollama);
  per-speaker capture, FTS5 searchable history, concurrent multi-channel.
  Links: GitHub + landing page.

**Skills**
- Languages & Frameworks: Python, JavaScript/TypeScript, Node.js, React.js, C++, HTML/CSS
- AI / Data: RAG, Vector Embeddings, LLM Integration, Pandas, Scikit-learn
- Databases: PostgreSQL, MongoDB
- Cloud & DevOps: Fly.io, Vercel, Cloudflare Workers, Docker, Linux, Git, GitHub
- Tools & APIs: REST APIs, Playwright, Postman, VS Code APIs, Discord API, Foursquare API, Google Gemini API

**Education**
- Stevens Institute of Technology — MS Computer Science (Dec 2025, GPA 3.83)
- GITAM — BS Computer Science (Jun 2023)

**Certifications**
- Oracle Cloud Infrastructure 2025 AI Foundations Associate

---

## 12. Resolved Decisions (no longer open)

- **Visual style:** Bento grid layout, Indigo Night default skin. (Gradient
  direction rejected.)
- **Contact:** lightweight form (Route Handler + Resend + zod + honeypot) **plus**
  copy-email/links fallback.
- **Hosting:** SSG + one serverless route (contact); no CMS.
- **Motion stack:** Lenis + official GSAP. Anime.js rejected (redundant). Three.js
  deferred. (awwwards-animations skill dropped — low trust.)
- **Themes:** 8 (4 dark favorites + 2 light variants + Gruvbox + Nord).
- **Wow touches in scope:** generative hero background, magnetic buttons, tilt
  cards, scroll-reveal choreography.

---

## 13. Out of Scope (v1)

- Blog / CMS
- Three.js / WebGL flagship (deferred — possible future centerpiece)
- Anime.js (rejected — GSAP covers it)
- Multi-language / i18n
- Analytics (can add Vercel Analytics later)
