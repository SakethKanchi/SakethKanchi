"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Kill-switch — flip to false in QA if the dot interferes with any interaction.
const ENABLE_CUSTOM_CURSOR = true;

// CustomCursor — an additive, desktop-only dot that follows the mouse via
// requestAnimationFrame with `mix-blend-difference` and a sky-400 border.
// The native cursor stays visible (this is a flourish, not a replacement).
//
// Renders ONLY when all of these hold:
//   - `@media (hover: hover) and (pointer: fine)` matches
//   - viewport width ≥ 768px
//   - `prefers-reduced-motion: reduce` is NOT set
// It is `aria-hidden` + `pointer-events-none`, so it never affects a11y,
// text selection, link hover, or focus.
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ENABLE_CUSTOM_CURSOR || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnabled(false);
      return;
    }

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 768px)");

    const evaluate = () => setEnabled(fine.matches && wide.matches);
    evaluate();

    fine.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
    };
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let rendered = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const dot = dotRef.current;
        if (!dot) return;
        if (!rendered) {
          dot.style.opacity = "1";
          rendered = true;
        }
        dot.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] h-4 w-4 rounded-full border border-[var(--accent)] opacity-0 mix-blend-difference"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    />
  );
}
