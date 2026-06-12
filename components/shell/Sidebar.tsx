"use client";

import { useCallback } from "react";
import { Mail, FileText, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Magnetic } from "@/components/motion/Magnetic";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useScrollSpy } from "./useScrollSpy";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_IDS = NAV.map((n) => n.id);

const SOCIAL_ICON: Record<string, (p: { className?: string }) => React.ReactNode> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
};

export function Sidebar() {
  const active = useScrollSpy(NAV_IDS);
  const reduced = useReducedMotion();

  const go = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update the hash without a jump.
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const activeIndex = Math.max(0, (NAV_IDS as readonly string[]).indexOf(active));

  return (
    <header className="sidebar-glow relative lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:justify-between lg:py-20 lg:pr-8">
      {/* Identity + nav */}
      <div className="relative z-[1] flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">{profile.role}</p>
          <h1 className="name-glow text-[2.75rem] font-bold leading-[0.98] tracking-[-0.035em] text-fg sm:text-[3.25rem]">
            {profile.name}
          </h1>
          <p className="max-w-xs text-[15px] leading-relaxed text-muted">
            {profile.tagline}
          </p>
          {profile.openToWork && (
            <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-fg shadow-[0_0_24px_-10px_color-mix(in_oklch,var(--accent)_60%,transparent)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to work
            </span>
          )}
        </div>

        {/* Scrollspy nav — desktop only (vertical). On mobile we rely on scroll. */}
        <nav aria-label="Section navigation" className="hidden lg:block">
          <ul className="relative flex flex-col">
            {/* Sliding active indicator — animates between links (not a toggle). */}
            <span
              aria-hidden="true"
              className="nav-indicator pointer-events-none absolute left-0 top-0 z-0 h-7 w-12 rounded-full"
              style={{
                transform: `translateY(${activeIndex * 36}px)`,
                transition: reduced
                  ? "none"
                  : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                background:
                  "linear-gradient(90deg, color-mix(in oklch, var(--accent) 14%, transparent), transparent)",
              }}
            />
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative z-[1] h-9">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex h-9 items-center gap-3 focus-visible:outline-none"
                  >
                    <span
                      className={`h-[2px] rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-12 bg-accent shadow-[0_0_12px_0_color-mix(in_oklch,var(--accent)_75%,transparent)]"
                          : "w-6 bg-muted/40 group-hover:w-10 group-hover:bg-fg"
                      }`}
                      style={
                        !reduced
                          ? { transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }
                          : undefined
                      }
                    />
                    <span
                      className={`text-sm font-medium tracking-wide transition-colors ${
                        isActive
                          ? "text-fg"
                          : "text-muted group-hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Socials + résumé + theme */}
      <div className="relative z-[1] mt-7 flex flex-col gap-5 lg:mt-0">
        <div className="flex items-center gap-1.5">
          {profile.socials.map((social) => {
            const Icon = SOCIAL_ICON[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/60 bg-surface/40 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface hover:text-fg hover:shadow-[0_6px_18px_-8px_color-mix(in_oklch,var(--accent)_55%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {Icon ? <Icon className="h-[18px] w-[18px]" /> : social.label}
              </a>
            );
          })}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/60 bg-surface/40 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface hover:text-fg hover:shadow-[0_6px_18px_-8px_color-mix(in_oklch,var(--accent)_55%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <FileText className="h-4 w-4" />
              Résumé
            </a>
          </Magnetic>
          <ThemeSwitcher />
        </div>

        <p className="hidden items-center gap-1.5 font-mono text-xs text-muted lg:flex">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </p>
      </div>
    </header>
  );
}
