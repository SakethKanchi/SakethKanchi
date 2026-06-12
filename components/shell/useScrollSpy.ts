"use client";

import { useEffect, useState } from "react";

/**
 * useScrollSpy — returns the id of the section currently "in view".
 *
 * Uses a single IntersectionObserver across all section ids. A section is
 * considered active when its body crosses the band defined by `rootMargin`
 * (default: top 40% / bottom 55% are excluded, so a section becomes active
 * once it reaches roughly the upper third of the viewport). This is
 * independent of Lenis smooth scroll — IntersectionObserver observes real
 * layout/scroll position, not the wheel events Lenis intercepts.
 *
 * Robust against multiple sections intersecting at once: we track every
 * intersecting id and pick the one nearest the top of the document order.
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = "-40% 0px -55% 0px",
): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const visible = new Set<string>();

    const pickActive = () => {
      // Choose the first id (in declared order) that is currently in the band.
      for (const id of ids) {
        if (visible.has(id)) {
          setActive(id);
          return;
        }
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        pickActive();
      },
      { rootMargin, threshold: 0 },
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    els.forEach((el) => io.observe(el));

    // Edge case: top of page before any section enters the band — default to first.
    const onScrollTop = () => {
      if (window.scrollY < 80) setActive(ids[0] ?? "");
    };
    window.addEventListener("scroll", onScrollTop, { passive: true });
    onScrollTop();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollTop);
    };
  }, [ids, rootMargin]);

  return active;
}
