# User-provided references (Round 4)

URLs the user explicitly liked and asked me to consider alongside Surendar (their stated favorite).
All fetched 2026-07-17. User directive: "Mostly I love Surendar style website" — Surendar stays primary anchor, these three refine.

---

## anirban-portfolio-delta.vercel.app (Anirban Banerjee — Data Architect) — **STRONGEST CONFIRMATION**
URL: https://anirban-portfolio-delta.vercel.app/ · Fetched: 2026-07-17

15+ years experience data architect. Site is essentially Surendar's pattern with different content depth.

**Borrowable patterns (direct lifts, deployable as-is):**
- **`click anywhere to continue →` entry splash.** A real deployed version of the antiaverage pattern I specced in section 4.1. Honest, single button, fades to hero on click. No fake boot sequence.
- **`<AB />` brandmark seal** — angle-bracket initials as logo/seal. Saketh's equivalent: `<SK />`. Appears in top-left of nav and as the return-to-home mark. Distinctive, easy to render, brand-consistent.
- **Journey section markers:** roles use `Deloitte · Data Architect (Office of CIO) · LTM · July 2025 – Present` then bullets prefixed with `▹`. The `·LTM` suffix is a quiet marker (an index/tenure hint); the `▹` bullet glyph is distinct from `•` or `-`. Combined they give the journey a distinctive editorial signature without emoji or noise.
- **Grouped tech stack by category** (Programming / Generative AI / Azure / AWS / GCP / Database & DataLakes / DevOps / ITSM / Visualization). Same shape Saketh's spec already has, confirmed as a deployed pattern.
- **Footer microcopy:** `© 2026 Anirban Banerjee / Built with Claude · Deployed on Vercel`. Almost word-for-word my spec's footer (which was `© 2026 Saketh Kanchi. Built with Next.js. Deployed on Vercel.`).
- **Contact block:** `Let's build something / together.` big-type two-line CTA, followed by availability one-liner, then `[Say Hello]` + `[LinkedIn]` CTAs. Matches bymonolog's giant-poster pattern, but Anirban uses it quieter.

**Not borrowable:**
- **8 career stops** — Saketh has 2 (+ 2 degrees). Anirban can fill a long journey scroll; Saketh can't. Don't pad.
- **Certifications grid by issuer with counts** (Microsoft 10 / Databricks 5 / Dell 1 / HackerRank 1) — Saketh has 1 cert (Oracle OCI 2025 AI Foundations). Single-line badge is more honest than a grouped grid.
- **Competitions section** (WatsonX Hackathon, AI Devs Competition) — Saketh has none worth listing. Drop in v1.
- **Architecture diagram in hero** (DATA SOURCES → PROCESSING LAYER → DESTINATIONS chip flow) — wrong genre for Saketh. A flow-diagram hero only works for someone whose story IS the architecture; Saketh's story IS shipped products.

---

## amanbuilds.me (Aman Kumar Jha — CS student, AI/ML) — Numbered bracket header only
URL: https://www.amanbuilds.me/ · Fetched: 2026-07-17

Neobrutalist AI-engineer-cosplay portfolio. Heavy visual decoration, fake terminal widgets, emoji noise.

**Borrowable (one pattern only):**
- **`[ 01 — ABOUT ]` / `[ 02 — EXPERTISE ]` / `[ 03 — PROJECTS ]` numbered bracket section headers.** This is Surendar's `\[ About \]` bracket header with a numeric prefix added. One small refinement: include the section's position number in the bracket. Saketh's spec uses `[ Selected work ]` / `[ About ]` etc; the amanbuilds variant is `[ 01 — Selected work ]` / `[ 02 — Experience ]`. Worth adopting the numbered prefix — it reinforces the editorial-chapter feel without adding noise.

**Not borrowable:**
- 🚀 ⚡ 🧠 emoji "chips" in hero — reads unprofessional.
- Fake telemetry widget cards in "What I Do" section (mock Stripe charges, mock LTV/CAC numbers, mock conversion counts). Risks "AI engineer who fakes dashboards" read. Saketh only uses real numbers, never mock.
- Marquee separators between sections (`ABOUT ME ★ WHO AM I ★ AMAN KUMAR JHA ★...`). Noisy, repeats, hides content at reading speed.
- Placeholder text literally titled "Your Project Name" with "A detailed description of your awesome project." in Projects section. Half-finished site; do not imitate.
- Neobrutalist raw typography and outlined boxes — wrong tone for Saketh's professional engineer signal.
- Guestbook form — wrong audience; recruiters don't sign guestbooks.

---

## abdulbasit-005.vercel.app (Abdul Basit — Full-Stack Developer) — Skeleton confirmation only
URL: https://abdulbasit-005.vercel.app/ · Fetched: 2026-07-17

JS-gated main content (only skeleton rendered via fetch). What I could see:

**Borrowable (skeleton confirmations):**
- **`[Abdul.]` brandmark with trailing period** — variant of the `<SK />` seal pattern. The period is a designer tic that may or may not work for `SK.` vs `<SK />`. Try both at the build stage.
- **Top horizontal nav:** `Intro / About / Work / Skills / Journey / Contact` — confirms top-nav pattern (already in spec). Abdul doesn't number his; Saketh's spec numbers them `01–05`.
- **Tiny `© 2026` footer microcopy** — confirmed minimal-footer pattern.
- **Three social links + Work CTA at the right end of the nav** — variant of the spec's `01. Work / 02. Experience…` nav (Abdul puts Resume as a right-end CTA, which Saketh's spec could do too — a single `Resume ↗` link at the right end of the top bar, separated from the 5 numbered section links).

**Worth opening manually** in a browser to see the actual sections — fetch couldn't render them. If you (Saketh) like this one especially, open it locally and tell me which specific patterns; I can't see them through the fetch tool.

---

## Composite update

After this round, the reference composite for section 2 of SPEC.md:

| Reference | Status | What we borrow |
|---|---|---|
| **surendarselvaraj.com** | **Primary anchor** (user favorite, 9/10) | Case-study cards with one real metric per card, numbered journey timeline, `[ Section name ]` bracket section headers, content-rich professional long-scroll shape |
| **anirban-portfolio-delta.vercel.app** | **Secondary anchor** (strong confirmation) | `click anywhere to continue →` entry splash, `<AB />`→`<SK />` angle-bracket seal, `·LTM` role-title marker + `▹` bullet glyph in journey, grouped tech stack by category, footer microcopy `Built with X · Deployed on Vercel` |
| **bymonolog.com** | Kept | `SS / 05` numbered case-card index, oversized metric headline, giant footer-poster CTA |
| **raviklaassens.com** | Kept | Case cards with one-line discipline label, scroll-revealed stacked hero lines |
| **amanbuilds.me** | Numbered bracket header variant only | `[ 01 — Section name ]` numeric prefix in the bracket header |
| **abdulbasit-005.vercel.app** | Skeleton confirmations only | Confirms `<SK />` seal + top nav + tiny footer; right-end `Resume ↗` CTA in nav |
| **jasonbergh.com** | Kept | Numbered horizontal nav `01. Work / 02. About...` |
| **pacomepertant.com** | Folded into Anirban (Anirban's deployed version is more useful) | — |
| **sebastian-wittig.design** | Kept for project deep-dive | Role / Service / Description / Decisions / Outcome block shape for `/projects/ragbench` only |
| **juanmora.co** | Kept, low priority | Single hero metric in huge type, honest stack list at footer |
| **tobiasahlin.com** | Fallback | 3-project-card + work-logos fallback structure |

**New patterns to fold into SPEC.md section 2 and section 4.4 (Experience):**
1. Entry splash copy: `click anywhere to continue →` (Anirban). Replace my generic `enter` with this exact phrasing — it's more deployably honest than the single-word `enter` I specced.
2. Nav seal: `<SK />` angle-bracket variant (Anirban). Replace the spec's plain `SK` seal with the angle-bracket form. Matches the bracket section-header pattern visually.
3. Journey role-line marker: `·LTM` (Anirban) — small suffix after the role title. For Saketh it reads as an aesthetic marker rather than literal "long-term memory." Optional; usability-tested by Anirban at scale.
4. Journey bullet glyph: `▹` (Anirban) — instead of plain `•` or `-`. Distinctive but not noisy.
5. Numbered bracket section headers: `[ 01 — Selected work ]` (amanbuilds). Numbers the brackets to reinforce the chapter feel. Update spec from `[ Selected work ]` → `[ 01 — Selected work ]` etc.
6. Right-end nav CTA: `Resume ↗` (Abdul Basit). Optional addition to the top nav. Spec currently doesn't have this; it could be a single mono link at the right end of the desktop nav, separated from the 5 numbered section links by a divider.

[← Back to SPEC](../SPEC.md)