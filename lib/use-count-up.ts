"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// use-count-up — animates 0 → `to` once, the first time the element enters the
// viewport. Ease-out cubic over `durationMs`. Returns a ref to attach and the
// current integer value.
//
//   - Reduced-motion: returns `to` immediately, never starts a rAF loop.
//   - SSR: returns 0 (or `to` under reduced-motion is client-only; on the
//     server the caller renders its own SSR-safe baseline).
//   - once: the animation fires a single time per page load (useInView once).
export function useCountUp(to: number, durationMs = 1500) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }
    if (!inView || started.current) return;
    started.current = true;

    let raf = 0;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(easeOut(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, durationMs]);

  return { ref, value } as const;
}
