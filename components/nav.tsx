"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Section registry — order matches the home nav.
const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "oss", label: "Open Source" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

// Resume PDF shipped in /public (also available at the clean /resume.pdf alias).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const RESUME_URL = `${BASE_PATH}/resume.pdf`;

// <SK /> seal — top-left wordmark. Monospace, accent ring on focus.
function Seal() {
  return (
    <a
      href="#top"
      className={cn(
        "font-mono text-sm tracking-[0.15em] text-zinc-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]",
      )}
      aria-label="Saketh Kanchi — home"
    >
      &lt;SK /&gt;
    </a>
  );
}

// Desktop nav link — number prefix paints sky-400 when active.
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
        "group font-mono text-xs tracking-[0.15em] transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]",
      )}
    >
      <span
        className={cn(
          "tabular-nums transition-colors",
          active ? "text-[var(--accent)]" : "text-zinc-500",
        )}
      >
        {num}.
      </span>{" "}
      <span
        className={cn(
          "uppercase",
          active ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-100",
        )}
      >
        {label}
      </span>
    </a>
  );
}

function DesktopNav({ active }: { active: string | null }) {
  return (
    <nav
      aria-label="Sections"
      className="hidden items-center gap-6 lg:flex"
    >
      {SECTIONS.map((s, i) => (
        <DesktopLink
          key={s.id}
          num={String(i + 1).padStart(2, "0")}
          label={s.label}
          href={`#${s.id}`}
          active={active === s.id}
        />
      ))}
      <span aria-hidden className="h-4 w-px bg-zinc-700" />
      <a
        href={RESUME_URL}
        rel="noreferrer noopener"
        target="_blank"
        className={cn(
          "font-mono text-xs tracking-[0.15em] text-zinc-400 hover:text-zinc-100",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]",
        )}
      >
        Resume ↗
      </a>
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
            />
          }
        >
          <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="w-72 p-6">
          <nav aria-label="Sections" className="flex flex-col gap-5">
            {SECTIONS.map((s, i) => (
              <SheetClose
                key={s.id}
                render={
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "font-mono text-sm tracking-[0.15em]",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]",
                    )}
                  >
                    <span
                      className={cn(
                        "tabular-nums",
                        active === s.id ? "text-[var(--accent)]" : "text-zinc-500",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}.
                    </span>{" "}
                    <span
                      className={cn(
                        "uppercase",
                        active === s.id ? "text-zinc-100" : "text-zinc-300",
                      )}
                    >
                      {s.label}
                    </span>
                  </a>
                }
              />
            ))}
            <span aria-hidden className="mt-2 h-px w-full bg-zinc-800" />
            <SheetClose
              render={
                <a
                  href={RESUME_URL}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="font-mono text-sm tracking-[0.15em] text-zinc-400 hover:text-zinc-100"
                >
                  Resume ↗
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
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section, tie broken by top-most.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // An element counts as active when ~25% of it crosses the top third.
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );
    sections.forEach((s) => observer.observe(s));

    // Bottom-of-page fallback: the last section (+ footer) is often too short to
    // reach the detection band, so it would never activate. When the viewport is
    // within 2px of the document bottom, force the last section active.
    const lastId = sections[sections.length - 1]?.id ?? null;
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && lastId) setActive(lastId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40",
        "border-b border-zinc-900/60 bg-zinc-950/70 backdrop-blur",
        "supports-[backdrop-filter]:bg-zinc-950/50",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 sm:px-10 xl:px-0 2xl:max-w-[90rem]">
        <Seal />
        <DesktopNav active={active} />
        <MobileNav active={active} />
      </div>
    </header>
  );
}