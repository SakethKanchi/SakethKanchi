"use client";

import { useCallback } from "react";
import { Mail, FileText, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
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

  const go = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update the hash without a jump.
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:justify-between lg:py-20 lg:pr-8">
      {/* Identity + nav */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl">
            {profile.name}
          </h1>
          <p className="text-lg font-medium text-fg/90">{profile.role}</p>
          <p className="max-w-xs text-[15px] leading-relaxed text-muted">
            {profile.tagline}
          </p>
          {profile.openToWork && (
            <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-fg">
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
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center gap-3 py-1.5 focus-visible:outline-none"
                  >
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? "w-12 bg-accent"
                          : "w-6 bg-muted/50 group-hover:w-10 group-hover:bg-fg"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium tracking-wide transition-colors ${
                        isActive
                          ? "text-accent"
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
      <div className="mt-7 flex flex-col gap-5 lg:mt-0">
        <div className="flex items-center gap-1">
          {profile.socials.map((social) => {
            const Icon = SOCIAL_ICON[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {Icon ? <Icon className="h-5 w-5" /> : social.label}
              </a>
            );
          })}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <FileText className="h-4 w-4" />
            Résumé
          </a>
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
