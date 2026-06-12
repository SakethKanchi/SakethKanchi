# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Saketh Kanchi's recruiter-focused portfolio: a Next.js bento-grid site with 8 dev themes, Lenis+GSAP motion, typed-data content, and a working contact form — fast, responsive, and easy to edit.

**Architecture:** Next.js (App Router) SSG + one serverless Route Handler for the contact form. Content lives in typed data files decoupled from components. Theming is CSS design tokens swapped by `next-themes`. Motion is Lenis smooth-scroll synced to a single GSAP ticker, with `prefers-reduced-motion` disabling all of it. Layout language is a responsive bento grid.

**Tech Stack:** Next.js 15 + TypeScript, Tailwind CSS, shadcn/ui, GSAP + ScrollTrigger, Lenis, next-themes, zod, Resend, p5.js (lazy), Playwright. Deploy on Vercel.

**Design skills to invoke during execution (per task):** `design-taste-frontend`, `gpt-taste`, `high-end-visual-design`, `impeccable`, `frontend-design`, `ui-ux-pro-max`, `vercel:shadcn`, `gsap-*`, `document-skills:algorithmic-art`, `document-skills:theme-factory`, `vercel:nextjs`, `vercel:react-best-practices`, `document-skills:webapp-testing`, `vercel:deploy`.

**Reference spec:** `portfolio/DESIGN.md` (read it before starting).

**Working directory:** the Next.js app is created at repo root inside `portfolio/` (i.e. `portfolio/` becomes the Next.js project root). All paths below are relative to `portfolio/` unless noted.

---

## File Structure (decomposition)

```
portfolio/
├── app/
│   ├── layout.tsx                  # fonts, ThemeProvider, SmoothScroll, Nav, Footer, SEO metadata
│   ├── page.tsx                    # assembles sections in scan order
│   ├── globals.css                 # Tailwind layers + base
│   ├── sitemap.ts                  # SEO sitemap
│   ├── opengraph-image.tsx         # OG image
│   └── api/contact/route.ts        # contact form handler (Resend + zod + honeypot)
├── components/
│   ├── ui/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   ├── ResumeButton.tsx
│   │   └── BentoCard.tsx
│   ├── motion/
│   │   ├── SmoothScroll.tsx         # Lenis + GSAP ticker wiring
│   │   ├── Reveal.tsx               # scroll-reveal wrapper
│   │   ├── Magnetic.tsx             # cursor-magnetic wrapper
│   │   ├── Tilt.tsx                 # 3D tilt wrapper
│   │   └── useReducedMotion.ts      # shared reduced-motion hook
│   ├── hero/
│   │   ├── Hero.tsx
│   │   └── GenerativeBg.tsx         # p5/canvas backdrop (lazy, no SSR)
│   └── sections/
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       └── ContactForm.tsx
├── content/
│   ├── types.ts                     # shared content types
│   ├── profile.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── skills.ts
├── lib/
│   └── themes.ts                    # theme registry (name, label, swatch)
├── styles/
│   └── themes.css                   # 8 theme token sets
├── public/
│   └── resume.pdf                   # copied from ../Saketh_Kanchi_Resume.pdf
├── tests/
│   └── smoke.spec.ts                # Playwright smoke tests
├── .env.local                       # RESEND_API_KEY, CONTACT_TO_EMAIL (gitignored)
└── .env.example                     # documents required env vars
```

---

## Phase 0 — Scaffold & Foundation

### Task 1: Create the Next.js app

**Files:**
- Create: `portfolio/` (Next.js project)

- [ ] **Step 1: Scaffold**

From repo root (`/home/saketh/Code/resume`):

```bash
npx create-next-app@latest portfolio \
  --typescript --tailwind --eslint --app \
  --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```

Accept defaults if prompted. This creates `portfolio/` with App Router + Tailwind.

- [ ] **Step 2: Verify it builds and runs**

Run:

```bash
cd portfolio && npm run build
```

Expected: build completes with no errors (a default starter page).

- [ ] **Step 3: Initialize git + first commit** (portfolio is not yet a repo)

```bash
cd portfolio && git init && git add -A && git commit -m "chore: scaffold Next.js app"
```

---

### Task 2: Install dependencies

**Files:**
- Modify: `portfolio/package.json`

- [ ] **Step 1: Install runtime + dev deps**

```bash
cd portfolio
npm install gsap lenis next-themes zod resend p5
npm install -D @types/p5 @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Init shadcn/ui**

```bash
npx shadcn@latest init -d
npx shadcn@latest add button dropdown-menu input textarea sonner
```

Accept defaults (New York style, CSS variables = yes — this matters; our tokens build on it).

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: add deps (gsap, lenis, next-themes, zod, resend, p5, shadcn, playwright)"
```

---

### Task 3: Theme tokens + registry + provider + switcher

**Files:**
- Create: `portfolio/styles/themes.css`
- Create: `portfolio/lib/themes.ts`
- Create: `portfolio/components/ui/ThemeSwitcher.tsx`
- Modify: `portfolio/app/globals.css`
- Modify: `portfolio/app/layout.tsx`

**Skill to invoke:** `document-skills:theme-factory` to validate each palette's contrast.

- [ ] **Step 1: Write the theme token sets**

Create `styles/themes.css`. Tokens use `data-theme` on `<html>`; `:root` = Indigo Night default.

```css
:root,
[data-theme="indigo-night"] {
  --bg: #0e1016; --surface: #171a22; --line: #262b36;
  --fg: #e7e9ee; --muted: #7a8294;
  --accent: #9b8cff; --accent-fg: #0e1016; --accent-soft: #1f2430;
}
[data-theme="tokyo-night"] {
  --bg: #1a1b26; --surface: #24283b; --line: #2f3549;
  --fg: #c0caf5; --muted: #565f89;
  --accent: #7aa2f7; --accent-fg: #1a1b26; --accent-soft: #222a45;
}
[data-theme="catppuccin-mocha"] {
  --bg: #1e1e2e; --surface: #28283d; --line: #393955;
  --fg: #cdd6f4; --muted: #7f849c;
  --accent: #cba6f7; --accent-fg: #1e1e2e; --accent-soft: #302a45;
}
[data-theme="catppuccin-latte"] {
  --bg: #eff1f5; --surface: #ffffff; --line: #ccd0da;
  --fg: #4c4f69; --muted: #6c6f85;
  --accent: #8839ef; --accent-fg: #ffffff; --accent-soft: #e6e0f2;
}
[data-theme="rose-pine"] {
  --bg: #191724; --surface: #1f1d2e; --line: #2a273f;
  --fg: #e0def4; --muted: #6e6a86;
  --accent: #ebbcba; --accent-fg: #191724; --accent-soft: #2a2435;
}
[data-theme="rose-pine-dawn"] {
  --bg: #faf4ed; --surface: #fffaf3; --line: #f2e9e1;
  --fg: #575279; --muted: #797593;
  --accent: #d7827e; --accent-fg: #fffaf3; --accent-soft: #f4ede8;
}
[data-theme="gruvbox"] {
  --bg: #282828; --surface: #32302f; --line: #3c3836;
  --fg: #ebdbb2; --muted: #a89984;
  --accent: #fabd2f; --accent-fg: #282828; --accent-soft: #3c3836;
}
[data-theme="nord"] {
  --bg: #2e3440; --surface: #3b4252; --line: #434c5e;
  --fg: #eceff4; --muted: #8893a8;
  --accent: #88c0d0; --accent-fg: #2e3440; --accent-soft: #3b4252;
}
```

- [ ] **Step 2: Map tokens to Tailwind-usable CSS vars in `globals.css`**

Add to `app/globals.css` (after the Tailwind directives), and import themes:

```css
@import "../styles/themes.css";

@layer base {
  body {
    background-color: var(--bg);
    color: var(--fg);
  }
  /* expose tokens as utility-friendly names */
  :root {
    --color-bg: var(--bg);
    --color-surface: var(--surface);
    --color-line: var(--line);
    --color-fg: var(--fg);
    --color-muted: var(--muted);
    --color-accent: var(--accent);
    --color-accent-fg: var(--accent-fg);
    --color-accent-soft: var(--accent-soft);
  }
  html { scroll-behavior: auto; } /* Lenis owns scrolling */
}
```

Extend `tailwind.config.ts` `theme.extend.colors` to reference the vars:

```ts
colors: {
  bg: "var(--bg)", surface: "var(--surface)", line: "var(--line)",
  fg: "var(--fg)", muted: "var(--muted)",
  accent: "var(--accent)", "accent-fg": "var(--accent-fg)", "accent-soft": "var(--accent-soft)",
},
```

- [ ] **Step 3: Write the theme registry**

Create `lib/themes.ts`:

```ts
export type ThemeName =
  | "indigo-night" | "tokyo-night" | "catppuccin-mocha" | "catppuccin-latte"
  | "rose-pine" | "rose-pine-dawn" | "gruvbox" | "nord";

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  swatch: string; // accent color for the dot
  mode: "dark" | "light";
}

export const THEMES: ThemeMeta[] = [
  { name: "indigo-night",     label: "Indigo Night",     swatch: "#9b8cff", mode: "dark" },
  { name: "tokyo-night",      label: "Tokyo Night",      swatch: "#7aa2f7", mode: "dark" },
  { name: "catppuccin-mocha", label: "Catppuccin Mocha", swatch: "#cba6f7", mode: "dark" },
  { name: "catppuccin-latte", label: "Catppuccin Latte", swatch: "#8839ef", mode: "light" },
  { name: "rose-pine",        label: "Rosé Pine",        swatch: "#ebbcba", mode: "dark" },
  { name: "rose-pine-dawn",   label: "Rosé Pine Dawn",   swatch: "#d7827e", mode: "light" },
  { name: "gruvbox",          label: "Gruvbox",          swatch: "#fabd2f", mode: "dark" },
  { name: "nord",             label: "Nord",             swatch: "#88c0d0", mode: "dark" },
];

export const DEFAULT_THEME: ThemeName = "indigo-night";
```

- [ ] **Step 4: Wire ThemeProvider in `layout.tsx`**

In `app/layout.tsx`, wrap children with next-themes, using `data-theme` attribute:

```tsx
import { ThemeProvider } from "next-themes";
// ...
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="indigo-night"
      themes={["indigo-night","tokyo-night","catppuccin-mocha","catppuccin-latte","rose-pine","rose-pine-dawn","gruvbox","nord"]}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  </body>
</html>
```

- [ ] **Step 5: Build the ThemeSwitcher**

Create `components/ui/ThemeSwitcher.tsx` (client component) using shadcn dropdown + `useTheme`:

```tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { THEMES } from "@/lib/themes";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />; // avoid hydration flash
  const active = THEMES.find((t) => t.name === theme) ?? THEMES[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Choose theme"
        className="flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm">
        <span className="h-3 w-3 rounded-full" style={{ background: active.swatch }} />
        {active.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((t) => (
          <DropdownMenuItem key={t.name} onClick={() => setTheme(t.name)}
            className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: t.swatch }} />
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- [ ] **Step 6: Manual verify (temporary mount)**

Temporarily render `<ThemeSwitcher />` in `app/page.tsx`. Run `npm run dev`, open the site, switch through all 8 themes, confirm bg/fg/accent change and the choice persists across reload (localStorage). No hydration flash on reload.

- [ ] **Step 7: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: 8-theme token system + next-themes provider + ThemeSwitcher"
```

---

## Phase 1 — Content Layer

### Task 4: Typed content data files

**Files:**
- Create: `portfolio/content/types.ts`
- Create: `portfolio/content/profile.ts`
- Create: `portfolio/content/experience.ts`
- Create: `portfolio/content/projects.ts`
- Create: `portfolio/content/skills.ts`
- Create: `portfolio/public/resume.pdf` (copy)

- [ ] **Step 1: Define shared types**

Create `content/types.ts`:

```ts
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: { label: string; href: string }[];
  resumePath: string;
  openToWork: boolean;
  stat: { value: string; label: string };
}

export interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
  highlight?: string; // e.g. "10,000+ downloads"
}

export interface SkillGroup {
  group: string;
  items: string[];
}
```

- [ ] **Step 2: Profile data**

Create `content/profile.ts`:

```ts
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Saketh Kanchi",
  role: "Full-Stack Engineer",
  tagline: "I build AI-powered products that ship — RAG systems, LLM agents, and internal tools.",
  bio: "Full-Stack Engineer specializing in AI-powered applications and intelligent automation. I build features across React, Node.js, and Python, with hands-on experience architecting RAG systems, LLM integrations, agentic workflows, and developer tools. Shipped a developer tool with 10,000+ users and led automation teams building AI-driven data pipelines on cloud infrastructure.",
  email: "sakethkanchi3@gmail.com",
  phone: "201-552-8414",
  location: "Jersey City, NJ",
  socials: [
    { label: "GitHub", href: "https://github.com/SakethKanchi" },
    { label: "LinkedIn", href: "https://linkedin.com/in/saketh-kanchi/" },
  ],
  resumePath: "/resume.pdf",
  openToWork: true,
  stat: { value: "10k+", label: "users shipped" },
};
```

- [ ] **Step 3: Experience data**

Create `content/experience.ts`:

```ts
import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    company: "Fund Flow OS",
    title: "Founding Engineer",
    period: "2025 — Present",
    location: "Jersey City, NJ",
    bullets: [
      "Ship full-stack features for the customer-facing web app (React, Node.js, REST APIs), owning the lifecycle from design through deployment and user feedback.",
      "Designed and deployed a RAG system on Cloudflare Workers for semantic search over 40+ internal documents via a Discord interface, handling 50+ daily queries.",
      "Integrated Apollo.io lead generation into the core product, automating enrichment for 500+ leads.",
      "Leading the migration of application infrastructure from Vercel to Fly.io, designing deployment architecture for production workloads.",
      "Built internal automation pipelines (Python, Node.js, Playwright), eliminating manual operational tasks across teams.",
    ],
  },
  {
    company: "Fund Flow OS (SideQuest)",
    title: "Automation Team Lead",
    period: "Jun 2025 — Dec 2025",
    location: "Jersey City, NJ",
    bullets: [
      "Led the automation engineering team, building tools and pipelines that accelerated developer productivity.",
      "Built an AI-driven quest generation pipeline (Foursquare Places API, Google Gemini, Unsplash) with batch processing and resilient retry logic.",
      "Automated Mapbox tileset generation from PostgreSQL/GeoJSON data for dynamic location-based visualization.",
      "Built internal developer tools (Instagram scraper, Google Apps Scripts), eliminating hours of manual work weekly.",
    ],
  },
];
```

- [ ] **Step 4: Projects data**

Create `content/projects.ts`:

```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "Kitty — VS Code Theme",
    blurb: "A production VS Code theme with full lifecycle ownership: publishing, versioning, user support, and accessibility-driven iterations for thousands of developers.",
    tags: ["Node.js", "VS Code API"],
    links: [
      { label: "Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=SakethKanchi.kitty-vscode-theme" },
    ],
    highlight: "10,000+ downloads · ~5★",
  },
  {
    name: "Parley — Discord Meeting Bot",
    blurb: "Self-hosted Discord bot that records voice channels, transcribes locally via a Python faster-whisper sidecar, and generates structured AI notes with pluggable LLM summarizers (Gemini, OpenAI, Ollama). Per-speaker capture, FTS5 searchable history, concurrent multi-channel recording.",
    tags: ["Node.js", "Python", "discord.js", "SQLite", "FastAPI"],
    links: [
      { label: "GitHub", href: "https://github.com/SakethKanchi/parley" },
      { label: "Site", href: "https://sakethkanchi.github.io/parley-landing/" },
    ],
    highlight: "Open source",
  },
];
```

- [ ] **Step 5: Skills data**

Create `content/skills.ts`:

```ts
import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  { group: "Languages & Frameworks", items: ["Python", "JavaScript/TypeScript", "Node.js", "React.js", "C++", "HTML/CSS"] },
  { group: "AI / Data", items: ["RAG", "Vector Embeddings", "LLM Integration", "Pandas", "Scikit-learn"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { group: "Cloud & DevOps", items: ["Fly.io", "Vercel", "Cloudflare Workers", "Docker", "Linux", "Git", "GitHub"] },
  { group: "Tools & APIs", items: ["REST APIs", "Playwright", "Postman", "VS Code APIs", "Discord API", "Foursquare API", "Google Gemini API"] },
];
```

- [ ] **Step 6: Copy résumé PDF into public**

```bash
cp ../Saketh_Kanchi_Resume.pdf public/resume.pdf
```

- [ ] **Step 7: Typecheck + commit**

```bash
npx tsc --noEmit && git add -A && git commit -m "feat: typed content data layer + resume pdf"
```

Expected: `tsc` exits 0.

---

## Phase 2 — Motion Infrastructure

### Task 5: Smooth scroll (Lenis + GSAP single ticker)

**Files:**
- Create: `portfolio/components/motion/useReducedMotion.ts`
- Create: `portfolio/components/motion/SmoothScroll.tsx`
- Modify: `portfolio/app/layout.tsx`

**Skill to invoke:** `gsap-react`, `gsap-scrolltrigger`, `gsap-performance`.

- [ ] **Step 1: Reduced-motion hook**

Create `components/motion/useReducedMotion.ts`:

```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
```

- [ ] **Step 2: SmoothScroll provider**

Create `components/motion/SmoothScroll.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return; // native scroll, no Lenis
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);
  return <>{children}</>;
}
```

- [ ] **Step 3: Mount in layout**

In `app/layout.tsx`, wrap the page body (inside ThemeProvider) with `<SmoothScroll>`.

- [ ] **Step 4: Verify**

Run `npm run dev`. Confirm: smooth-scroll feel on wheel; with OS "Reduce motion" enabled, scrolling is native (no Lenis). No console errors.

- [ ] **Step 5: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: Lenis smooth scroll synced to single GSAP ticker, reduced-motion aware"
```

---

### Task 6: Reveal, Magnetic, Tilt motion components

**Files:**
- Create: `portfolio/components/motion/Reveal.tsx`
- Create: `portfolio/components/motion/Magnetic.tsx`
- Create: `portfolio/components/motion/Tilt.tsx`

**Skill to invoke:** `gsap-core`, `gsap-scrolltrigger`, `gsap-performance`.

- [ ] **Step 1: Reveal (scroll-reveal choreography)**

Create `components/motion/Reveal.tsx`:

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"; // installed transitively; if missing: npm i @gsap/react
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (reduced || !ref.current) return;
    gsap.from(ref.current, {
      y: 24, autoAlpha: 0, duration: 0.7, delay, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { scope: ref, dependencies: [reduced] });
  return <div ref={ref} className={className}>{children}</div>;
}
```

> If `@gsap/react` is not present, run `npm i @gsap/react` and re-run the build.

- [ ] **Step 2: Magnetic**

Create `components/motion/Magnetic.tsx`:

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./useReducedMotion";

export function Magnetic({ children, strength = 0.3, className }: {
  children: React.ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power3.out" });
  }
  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
  }
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={`inline-block ${className ?? ""}`}>{children}</span>
  );
}
```

- [ ] **Step 3: Tilt**

Create `components/motion/Tilt.tsx`:

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./useReducedMotion";

export function Tilt({ children, max = 6, className }: {
  children: React.ReactNode; max?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotateY: px * max, rotateX: -py * max, transformPerspective: 800,
      duration: 0.4, ease: "power2.out",
    });
  }
  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }} className={className}>{children}</div>
  );
}
```

- [ ] **Step 4: Typecheck + commit**

```bash
npx tsc --noEmit && git add -A && git commit -m "feat: Reveal/Magnetic/Tilt motion components, reduced-motion aware"
```

---

## Phase 3 — Layout & Sections

> For each section task: invoke `design-taste-frontend` + `high-end-visual-design` + `gpt-taste` to produce the polished markup, then `impeccable` for a live browser screenshot pass. Acceptance criteria are listed per task; the skeleton code is the contract (props, data wiring), visual polish is produced by the design skills. After each section, run `npm run build` and commit.

### Task 7: Nav, ResumeButton, layout shell

**Files:**
- Create: `portfolio/components/ui/Nav.tsx`
- Create: `portfolio/components/ui/ResumeButton.tsx`
- Modify: `portfolio/app/layout.tsx`

- [ ] **Step 1: ResumeButton**

```tsx
// components/ui/ResumeButton.tsx
import { profile } from "@/content/profile";
export function ResumeButton() {
  return (
    <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
      className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg">
      Résumé
    </a>
  );
}
```

- [ ] **Step 2: Nav (sticky, minimal)**

```tsx
// components/ui/Nav.tsx
import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ResumeButton } from "./ResumeButton";
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-tight">{profile.name}</Link>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <ResumeButton />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Assemble layout shell**

`app/layout.tsx` final structure: fonts (Inter + JetBrains Mono via `next/font`), `<ThemeProvider>` → `<SmoothScroll>` → `<Nav/>` + `<main>{children}</main>` + `<Footer/>` (Footer added in Task 15). Configure fonts:

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
// apply `${inter.variable} ${mono.variable}` on <html>; set Tailwind fontFamily sans/mono to the vars
```

- [ ] **Step 4: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: nav + resume button + layout shell with fonts"
```

---

### Task 8: BentoCard primitive

**Files:**
- Create: `portfolio/components/ui/BentoCard.tsx`

- [ ] **Step 1: Implement**

```tsx
// components/ui/BentoCard.tsx
import { Tilt } from "@/components/motion/Tilt";
import { cn } from "@/lib/utils"; // shadcn provides this

export function BentoCard({ className, children, tilt = true }: {
  className?: string; children: React.ReactNode; tilt?: boolean;
}) {
  const card = (
    <div className={cn(
      "rounded-2xl border border-line bg-surface p-6",
      className
    )}>{children}</div>
  );
  return tilt ? <Tilt>{card}</Tilt> : card;
}
```

**Acceptance:** grid-spanning via `className` (e.g. `md:col-span-2 md:row-span-2`), hover tilt active unless reduced-motion.

- [ ] **Step 2: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: BentoCard primitive"
```

---

### Task 9: Hero + lazy generative background

**Files:**
- Create: `portfolio/components/hero/Hero.tsx`
- Create: `portfolio/components/hero/GenerativeBg.tsx`

**Skill to invoke:** `document-skills:algorithmic-art` (p5 sketch), then `gpt-taste`/`design-taste-frontend` for the bento composition.

- [ ] **Step 1: Generative background (lazy, no SSR, theme-aware, reduced-motion off)**

`components/hero/GenerativeBg.tsx` — a p5 sketch reading the current `--accent`/`--muted` from CSS vars, low opacity, particle/flow-field style. It must:
- import p5 only on client (`"use client"`), guard `typeof window`.
- read `getComputedStyle(document.documentElement).getPropertyValue('--accent')`.
- stop the loop when `prefers-reduced-motion: reduce`.
- clean up the p5 instance on unmount.

Consume it lazily in Hero:

```tsx
import dynamic from "next/dynamic";
const GenerativeBg = dynamic(() => import("./GenerativeBg").then(m => m.GenerativeBg), { ssr: false });
```

**Acceptance:** backdrop renders behind hero at low opacity, recolors when theme changes, is absent (static) under reduced-motion, and does not appear in the initial server HTML (lazy).

- [ ] **Step 2: Hero bento composition**

`components/hero/Hero.tsx` consumes `profile` + first 3 `skills` groups: name/role/tagline card (Magnetic CTA "View Projects"), `profile.stat` card ("10k+ users"), "Open to work" badge (from `profile.openToWork`), a skills strip, and `<GenerativeBg/>` absolutely positioned behind. Wrap entering cards in `<Reveal/>`.

**Acceptance:** above-the-fold on desktop, single column on mobile, all text contrast AA in every theme.

- [ ] **Step 3: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: hero bento + lazy theme-aware generative background"
```

---

### Task 10: Projects section

**Files:**
- Create: `portfolio/components/sections/Projects.tsx`

- [ ] **Step 1: Implement**

Map `projects` to `BentoCard`s: name, `highlight` badge, blurb, mono `tags`, `links` (each opens in new tab, `rel="noopener noreferrer"`). Wrap each card in `<Reveal delay={i*0.05}/>`.

**Acceptance:** 2 cards (Kitty, Parley), responsive grid, links work, tags use mono font.

- [ ] **Step 2: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: projects section"
```

---

### Task 11: Experience timeline

**Files:**
- Create: `portfolio/components/sections/Experience.tsx`

- [ ] **Step 1: Implement**

Vertical timeline from `experience`: each item = company, title, period, location, bullet list. Left rail with accent node per item. Wrap items in `<Reveal/>`.

**Acceptance:** 2 entries in correct order (Founding Engineer, then SideQuest), readable on mobile (rail collapses gracefully).

- [ ] **Step 2: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: experience timeline"
```

---

### Task 12: Skills grid

**Files:**
- Create: `portfolio/components/sections/Skills.tsx`

- [ ] **Step 1: Implement**

Map `skills` groups to cards; each lists `items` as pills (accent-soft bg, accent text). Wrap in `<Reveal/>`.

**Acceptance:** 5 groups, pills wrap responsively.

- [ ] **Step 2: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: skills grid"
```

---

### Task 13: About + résumé download

**Files:**
- Create: `portfolio/components/sections/About.tsx`

- [ ] **Step 1: Implement**

`profile.bio` + education (Stevens MS CS, Dec 2025, GPA 3.83; GITAM BS CS, 2023 — hardcode here, or add to profile if preferred) + OCI 2025 AI Foundations cert + a prominent résumé download (`<ResumeButton/>` or a styled link to `profile.resumePath`).

**Acceptance:** résumé opens/downloads the PDF; education + cert visible.

- [ ] **Step 2: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: about section + resume download"
```

---

### Task 14: Contact form + Route Handler (Resend + zod + honeypot)

**Files:**
- Create: `portfolio/app/api/contact/route.ts`
- Create: `portfolio/components/sections/ContactForm.tsx`
- Create: `portfolio/components/sections/Contact.tsx`
- Create: `portfolio/.env.example`
- Modify: `portfolio/.env.local` (local secrets, gitignored by default)

**Skill to invoke:** `vercel:nextjs` (Route Handler patterns), `vercel:react-best-practices`.

- [ ] **Step 1: Env files**

`.env.example`:

```
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=sakethkanchi3@gmail.com
```

Create `.env.local` with the real key (obtain a free key at resend.com). Confirm `.env*.local` is in `.gitignore` (Next default includes it).

- [ ] **Step 2: Write the failing test (route validation)**

Create `tests/contact-route.spec.ts` (Playwright request test):

```ts
import { test, expect } from "@playwright/test";

test("contact rejects invalid payload", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "", email: "x", message: "" } });
  expect(res.status()).toBe(400);
});

test("contact accepts valid payload (honeypot empty)", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { name: "Test", email: "test@example.com", message: "Hello there from tests.", company: "" },
  });
  expect([200, 502]).toContain(res.status()); // 200 if Resend key set, 502 if email send fails in CI
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx playwright test tests/contact-route.spec.ts` (with dev server running, see playwright config in Task 17).
Expected: FAIL (route does not exist → 404).

- [ ] **Step 4: Implement the Route Handler**

`app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  company: z.string().optional(), // honeypot — must be empty
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  if (parsed.data.company) return NextResponse.json({ ok: true }, { status: 200 }); // bot trapped, silently ok

  const { name, email, message } = parsed.data;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx playwright test tests/contact-route.spec.ts`
Expected: PASS (400 for invalid; 200/502 for valid).

- [ ] **Step 6: Build the form UI + fallback**

`components/sections/ContactForm.tsx` (client): name/email/message inputs + hidden `company` honeypot field (visually hidden, `tabIndex={-1}`, `autoComplete="off"`). On submit, POST JSON to `/api/contact`, show success/error via shadcn `sonner` toast. Disable button while pending.

`components/sections/Contact.tsx`: heading + `<ContactForm/>` + always-visible fallback: a "Copy email" button (writes `profile.email` to clipboard, toast "Copied") and the `profile.socials` links.

**Acceptance:** invalid form shows inline/toast error; valid form clears + success toast; copy-email works; links work.

- [ ] **Step 7: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: contact form + Resend route handler (zod + honeypot) + copy-email fallback"
```

---

### Task 15: Footer + assemble page

**Files:**
- Create: `portfolio/components/ui/Footer.tsx`
- Modify: `portfolio/app/page.tsx`
- Modify: `portfolio/app/layout.tsx` (mount Footer)

- [ ] **Step 1: Footer**

`components/ui/Footer.tsx`: name, `profile.socials` links, current-year copyright (use a static year string to avoid hydration mismatch, or render client-side).

- [ ] **Step 2: Assemble `page.tsx` in scan order**

```tsx
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
```

Remove the temporary `<ThemeSwitcher/>` mount from Task 3.

- [ ] **Step 3: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: footer + full page assembly"
```

---

## Phase 4 — Quality, Test, Deploy

### Task 16: SEO — metadata, OG image, sitemap

**Files:**
- Modify: `portfolio/app/layout.tsx`
- Create: `portfolio/app/opengraph-image.tsx`
- Create: `portfolio/app/sitemap.ts`

**Skill to invoke:** `vercel:nextjs` (Metadata API).

- [ ] **Step 1: Metadata**

In `app/layout.tsx` export `metadata`:

```ts
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://sakethkanchi.com"), // update to final domain
  title: "Saketh Kanchi — Full-Stack Engineer",
  description: "Full-Stack Engineer building AI-powered products: RAG systems, LLM agents, and developer tools.",
  openGraph: { title: "Saketh Kanchi — Full-Stack Engineer", description: "AI-powered products that ship.", type: "website" },
  twitter: { card: "summary_large_image" },
};
```

- [ ] **Step 2: OG image**

Create `app/opengraph-image.tsx` using `next/og` `ImageResponse` (name + role + accent on dark bg, 1200×630).

- [ ] **Step 3: Sitemap**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://sakethkanchi.com", priority: 1 }];
}
```

- [ ] **Step 4: Build + commit**

```bash
npm run build && git add -A && git commit -m "feat: SEO metadata, OG image, sitemap"
```

---

### Task 17: Playwright smoke tests

**Files:**
- Create: `portfolio/playwright.config.ts`
- Create: `portfolio/tests/smoke.spec.ts`

**Skill to invoke:** `document-skills:webapp-testing`.

- [ ] **Step 1: Playwright config**

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://localhost:3000" },
  webServer: { command: "npm run dev", url: "http://localhost:3000", reuseExistingServer: true },
});
```

- [ ] **Step 2: Smoke tests**

```ts
// tests/smoke.spec.ts
import { test, expect } from "@playwright/test";

test("renders hero + all sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Saketh Kanchi").first()).toBeVisible();
  await expect(page.getByText("Kitty", { exact: false })).toBeVisible();
  await expect(page.getByText("Parley", { exact: false })).toBeVisible();
  await expect(page.getByText("Founding Engineer")).toBeVisible();
});

test("theme switch persists", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Choose theme").click();
  await page.getByText("Tokyo Night").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "tokyo-night");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "tokyo-night");
});

test("copy-email works", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: /copy email/i }).click();
  await expect(page.getByText(/copied/i)).toBeVisible();
});
```

- [ ] **Step 3: Run all tests**

Run: `npx playwright test`
Expected: all PASS (contact-route + smoke).

- [ ] **Step 4: Add test script + commit**

Add to `package.json` scripts: `"test": "playwright test"`. Then:

```bash
git add -A && git commit -m "test: playwright smoke + theme + contact tests"
```

---

### Task 18: Accessibility, reduced-motion, performance, impeccable polish

**Files:**
- Modify: various (as findings dictate)

**Skill to invoke:** `impeccable` (live browser audit + screenshots), then fix findings.

- [ ] **Step 1: Reduced-motion audit**

With OS "Reduce motion" ON: confirm Lenis off, no scroll-reveal/tilt/magnetic, generative bg static. With it OFF: confirm motion present. Fix any component that ignores `useReducedMotion`.

- [ ] **Step 2: Accessibility pass**

Keyboard-only: tab through nav, theme switcher, all links, form. Visible focus rings everywhere. Run an axe scan (via webapp-testing/Playwright `@axe-core/playwright` if added) — zero serious violations. Check AA contrast for `--fg`/`--accent` in all 8 themes (fix tokens if any fail).

- [ ] **Step 3: Lighthouse**

Run a production build + Lighthouse:

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless"
```

Expected: each category ≥ 95. Fix regressions (image sizing, font display swap, lazy bg).

- [ ] **Step 4: impeccable polish pass**

Invoke `impeccable` to screenshot each section across 2–3 themes + mobile width, fix spacing/hierarchy/alignment findings.

- [ ] **Step 5: Commit**

```bash
npm run build && git add -A && git commit -m "polish: a11y, reduced-motion, perf, visual fixes"
```

---

### Task 19: Deploy to Vercel

**Skill to invoke:** `vercel:deploy`.

- [ ] **Step 1: Set env vars on Vercel**

Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to the Vercel project (Production + Preview).

- [ ] **Step 2: Deploy preview, verify**

Deploy a preview build. On the preview URL, verify: all sections render, theme switch + persistence, smooth scroll, contact form sends a real email (check inbox), résumé downloads, Lighthouse ≥ 95.

- [ ] **Step 3: Promote to production**

Promote once preview is verified. Confirm the production URL and (optionally) attach a custom domain.

- [ ] **Step 4: Final commit / tag**

```bash
git add -A && git commit -m "chore: production deploy config" && git tag v1.0.0
```

---

## Self-Review (against DESIGN.md)

- **Goal (land a job, scan order):** Tasks 7–15 build sections in the spec's scan order. ✓
- **Tech foundation (Next.js/TS/Tailwind/shadcn/SSG/Vercel):** Tasks 1–2, 19. ✓
- **Editability (typed content files):** Task 4. ✓
- **Theming (8 themes + switcher + tokens + persistence):** Task 3. ✓
- **Sections (Hero/Projects/Experience/Skills/About/Contact/Footer):** Tasks 9–15. ✓
- **Motion (Lenis+GSAP single ticker, reveal/magnetic/tilt, generative bg, reduced-motion):** Tasks 5, 6, 9, 18. ✓
- **Contact form (Route Handler + Resend + zod + honeypot + fallback):** Task 14. ✓
- **Responsive:** acceptance criteria in each section task + Task 18. ✓
- **SEO/A11y/Perf (Lighthouse 95+):** Tasks 16, 18. ✓
- **Skills roster:** invoked per task. ✓
- **Content from résumé:** Task 4 (verbatim from DESIGN.md §11). ✓
- **Out of scope (no Three.js/Anime.js/CMS/i18n):** none introduced. ✓

**Type consistency check:** `profile.stat`, `profile.openToWork`, `profile.resumePath`, `Project.highlight`, `ExperienceItem.bullets`, `SkillGroup.items` — all defined in Task 4 `types.ts` and consumed consistently in Tasks 7–15. `useReducedMotion` defined once (Task 5) and reused (Tasks 5,6,9). `ThemeName`/`THEMES`/`DEFAULT_THEME` defined Task 3, used in switcher + tests. ✓

**Known setup dependency:** Resend API key (Task 14 Step 1, Task 19 Step 1) — flagged, not a blocker for non-contact work.
