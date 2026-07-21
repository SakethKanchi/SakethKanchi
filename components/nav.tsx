"use client";

// import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { KanjiMark } from "@/components/kanji-mark";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "oss", label: "Open Source" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const RESUME_URL = `${BASE_PATH}/resume.pdf`;

function Seal() {
  return (
    <a
      href="#top"
      className={cn(
        "group flex items-center gap-2 text-ink",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]",
      )}
      aria-label="Saketh Kanchi — home"
    >
      <KanjiMark
        className={cn(
          "h-[1.125rem] w-[1.125rem] text-ember",
          "transition-transform duration-200 ease-out",
          "group-hover:scale-110",
        )}
      />
      <span
        className={cn(
          "mono-label text-ink-muted",
          "transition-colors duration-150",
          "group-hover:text-ink",
        )}
      >
        SK
      </span>
    </a>
  );
}

function DesktopLink({
  num,
  label,
  href,
  active,
}: {
  num: string;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative label-upper",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]",
      )}
    >
      <span
        className={cn(
          "tabular-nums transition-colors duration-150",
          active
            ? "text-ember"
            : "text-ink-faint group-hover:text-ember",
        )}
      >
        {num}.
      </span>{" "}
      <span
        className={cn(
          "relative inline-block",
          /* underline grows left → right on hover / active — same language as MonoLink */
          "bg-[linear-gradient(var(--ember),var(--ember))] bg-no-repeat",
          "bg-[length:0%_1px] bg-[position:0_100%]",
          "transition-[background-size,color] duration-300 ease-out",
          active
            ? "bg-[length:100%_1px] text-ink"
            : "text-ink-muted group-hover:bg-[length:100%_1px] group-hover:text-ink",
        )}
      >
        {label}
      </span>
    </a>
  );
}

function DesktopNav({ active }: { active: string | null }) {
  return (
    <nav aria-label="Sections" className="hidden items-center gap-6 lg:flex">
      {SECTIONS.map((s, i) => (
        <DesktopLink
          key={s.id}
          num={String(i + 1).padStart(2, "0")}
          label={s.label}
          href={`#${s.id}`}
          active={active === s.id}
        />
      ))}
      <span aria-hidden className="h-3 w-px bg-[var(--line)]" />
      <a
        href={RESUME_URL}
        rel="noreferrer noopener"
        target="_blank"
        className={cn(
          "group label-upper text-ink-muted",
          "transition-colors duration-150 hover:text-ember",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]",
        )}
      >
        Resume{" "}
        <span
          aria-hidden
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </a>
      <span aria-hidden className="h-3 w-px bg-[var(--line)]" />
      <ThemeToggle />
    </nav>
  );
}

function MobileNav({ active }: { active: string | null }) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation"
              className="text-ink-dim hover:bg-transparent hover:text-ember"
            />
          }
        >
          <Menu />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 border-l border-line bg-paper p-6"
        >
          <nav aria-label="Sections" className="flex flex-col gap-5">
            {SECTIONS.map((s, i) => (
              <SheetClose
                key={s.id}
                render={
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "group label-upper",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]",
                    )}
                  >
                    <span
                      className={cn(
                        "tabular-nums transition-colors duration-150",
                        active === s.id
                          ? "text-ember"
                          : "text-ink-faint group-hover:text-ember",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}.
                    </span>{" "}
                    <span
                      className={cn(
                        "transition-colors duration-150",
                        active === s.id
                          ? "text-ink"
                          : "text-ink-muted group-hover:text-ink",
                      )}
                    >
                      {s.label}
                    </span>
                  </a>
                }
              />
            ))}
            <span aria-hidden className="mt-2 h-px w-full bg-[var(--line)]" />
            <SheetClose
              render={
                <a
                  href={RESUME_URL}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="group label-upper text-ink-muted transition-colors duration-150 hover:text-ember"
                >
                  Resume{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              }
            />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function Nav() {
  // Scrollspy active section — paused for now (hard to perfect with Lenis +
  // scroll-margin). Hover styles still work; re-enable by restoring the
  // useEffect below and switching `active` back to useState.
  const active: string | null = null;

  // const [active, setActive] = useState<string | null>(null);
  //
  // useEffect(() => {
  //   /**
  //    * Scrollspy — classic "last section past the activation line" algorithm.
  //    *
  //    * The activation line MUST match the sections' scroll-margin-top
  //    * (Tailwind `scroll-mt-20` ≈ 80px). Hash/nav clicks land the section top
  //    * at that margin; if the spy line sits higher (e.g. under the 56px nav
  //    * only), the *previous* section stays active after every click.
  //    *
  //    * IntersectionObserver tripwires are easy to mis-align with scroll-margin
  //    * and brittle with large negative rootMargins — scroll position is clearer.
  //    */
  //   const ids = SECTIONS.map((s) => s.id);
  //   const sections = ids
  //     .map((id) => document.getElementById(id))
  //     .filter((el): el is HTMLElement => el !== null);
  //   if (sections.length === 0) return;
  //
  //   const lastId = ids[ids.length - 1] ?? null;
  //   let ticking = false;
  //
  //   /** Y from viewport top where a section becomes active. */
  //   const activationLine = () => {
  //     const sample = sections[0];
  //     const margin = sample
  //       ? parseFloat(getComputedStyle(sample).scrollMarginTop)
  //       : NaN;
  //     // scroll-mt-20 → 80px; fall back if computed style is unavailable.
  //     // +2px slack for sub-pixel layout after hash scroll / Lenis.
  //     const line = Number.isFinite(margin) && margin > 0 ? margin : 80;
  //     return line + 2;
  //   };
  //
  //   const update = () => {
  //     ticking = false;
  //     const line = activationLine();
  //     const viewH = window.innerHeight;
  //     const scrollY = window.scrollY;
  //     const docH = document.documentElement.scrollHeight;
  //
  //     // Last section is often too short for its top to cross the line (footer
  //     // sits outside #contact). Only force at the true scroll end.
  //     if (lastId && scrollY + viewH >= docH - 2) {
  //       setActive(lastId);
  //       return;
  //     }
  //
  //     // Last section whose top has crossed the activation line.
  //     let current: string | null = null;
  //     for (const el of sections) {
  //       if (el.getBoundingClientRect().top <= line) {
  //         current = el.id;
  //       }
  //     }
  //     setActive(current);
  //   };
  //
  //   const onScrollOrResize = () => {
  //     if (!ticking) {
  //       ticking = true;
  //       requestAnimationFrame(update);
  //     }
  //   };
  //
  //   update();
  //   window.addEventListener("scroll", onScrollOrResize, { passive: true });
  //   window.addEventListener("resize", onScrollOrResize);
  //   window.addEventListener("hashchange", update);
  //
  //   return () => {
  //     window.removeEventListener("scroll", onScrollOrResize);
  //     window.removeEventListener("resize", onScrollOrResize);
  //     window.removeEventListener("hashchange", update);
  //   };
  // }, []);

  return (
    <header
      data-site-nav
      className={cn(
        "fixed inset-x-0 top-0 z-40",
        "border-b border-line bg-paper/90 backdrop-blur-sm",
      )}
    >
      <div
        className="mx-auto flex h-14 max-w-7xl items-center justify-between 2xl:max-w-[90rem]"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Seal />
        <div className="flex items-center gap-4">
          <DesktopNav active={active} />
          {/* Mobile: switch sits outside the sheet so theme is one tap away. */}
          <ThemeToggle className="lg:hidden" />
          <MobileNav active={active} />
        </div>
      </div>
    </header>
  );
}
