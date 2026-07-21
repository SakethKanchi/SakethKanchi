"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { applyTheme, readDomTheme, type Theme } from "@/lib/theme";

/**
 * Theme switch — hairline track, 2px geometry, mono DAY/NITE label.
 * Preference is stored in localStorage and applied via html[data-theme].
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Sync to whatever the bootstrap script already painted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readDomTheme());
    setReady(true);
  }, []);

  const isLight = theme === "light";

  const toggle = () => {
    const next: Theme = isLight ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggle}
      className={cn(
        "group flex items-center gap-2",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]",
        className,
      )}
    >
      {/* Track */}
      <span
        aria-hidden
        className={cn(
          "relative inline-flex h-[18px] w-[34px] shrink-0 items-center",
          "rounded-[2px] border border-line bg-paper-raised",
          "transition-colors duration-150 group-hover:border-[var(--ember-line)]",
        )}
      >
        {/* Thumb */}
        <span
          className={cn(
            "absolute top-[2px] size-[12px] rounded-[1px] bg-ember",
            "transition-transform duration-200 ease-out",
            isLight ? "translate-x-[18px]" : "translate-x-[2px]",
            !ready && "transition-none",
          )}
        />
      </span>
      <span
        aria-hidden
        className="mono-label text-ink-faint transition-colors group-hover:text-ember"
      >
        {isLight ? "DAY" : "NITE"}
      </span>
    </button>
  );
}
