"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content";

const KEY = "splash_seen";
const DURATION_MS = 3000;

// Type-only loader (editorial-layer v2 — replaces the v1 "click anywhere"
// splash). Full-viewport overlay:
//   - name in Fraunces, revealed via line-mask (translateY 100% → 0) on mount
//   - role eyebrow in Geist Mono uppercase
//   - 0 → 100 progress counter bottom-right (tabular-nums), over 3s
// Dismiss rules:
//   - auto at counter 100 (~3s)
//   - immediately on any click / keypress (cancels the counter)
//   - repeat visit (sessionStorage["splash_seen"] === "1") → skip, onDone now
//   - prefers-reduced-motion → skip on every visit, onDone now
export function Splash({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const dismiss = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setVisible(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        // Private mode / disabled storage — swallow; loader still ends.
      }
    }
    onDone();
  }, [onDone]);

  useEffect(() => {
    // Reduced-motion → no loader on any visit.
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      onDone();
      doneRef.current = true;
      return;
    }
    // Repeat visit within the session → skip.
    if (typeof window !== "undefined" && sessionStorage.getItem(KEY)) {
      setVisible(false);
      onDone();
      doneRef.current = true;
      return;
    }

    // First visit: run a 0 → 100 counter over DURATION_MS, then auto-dismiss.
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setCount(Math.round(progress * 100));
      if (progress >= 1) {
        dismiss();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Any key anywhere dismisses immediately (spec: "presses any key").
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduce, dismiss, onDone]);

  if (!visible) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Loading — click to enter"
      onClick={dismiss}
      onKeyDown={(e) => {
        e.preventDefault();
        dismiss();
      }}
      className="fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center bg-zinc-950 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <span className="line-mask">
          <motion.span
            className="block font-display text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-zinc-100"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.name}
          </motion.span>
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 sm:text-sm">
          {profile.role} · {profile.location}
        </span>
      </div>

      <span
        aria-hidden
        className="absolute bottom-6 right-6 font-mono text-sm tabular-nums text-zinc-500 sm:bottom-10 sm:right-10"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count}
      </span>
    </div>
  );
}
