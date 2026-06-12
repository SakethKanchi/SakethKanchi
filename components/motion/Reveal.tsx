"use client";

/**
 * Reveal — robust scroll entrance.
 *
 * Design rule (from the "empty page" bug): content must NEVER be stuck hidden.
 * - Base state (SSR / no-JS / reduced-motion) is fully VISIBLE.
 * - Only after JS confirms it can observe the element do we apply the
 *   pre-animation state, then transition to visible when it scrolls in.
 * - A hard fallback timer forces visibility even if the observer never fires.
 *
 * No GSAP/ScrollTrigger here — a plain IntersectionObserver + CSS transition is
 * more reliable across the Lenis smooth-scroll + Next hydration boundary.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    // Apply the pre-animation state only now that we KNOW we can reveal it.
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
    el.style.willChange = "opacity, transform";

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      el.style.opacity = "1";
      el.style.transform = "none";
      const clear = () => {
        el.style.willChange = "";
        el.style.transition = "";
      };
      el.addEventListener("transitionend", clear, { once: true });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    // Hard safety: if the observer never fires (layout quirk, off-screen
    // measurement, etc.), force the content visible so it can never get stuck.
    const fallback = window.setTimeout(reveal, 1400);

    // If it's already in view on mount, reveal on next frame.
    const raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal();
    });

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
    };
  }, [reduced, delay]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
