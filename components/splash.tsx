"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content";

export const SPLASH_SESSION_KEY = "splash_seen";
const DURATION_MS = 3000;

function clearSplashLock() {
  if (typeof document === "undefined") return;
  document.documentElement.removeAttribute("data-splash");
}

function setSplashLock() {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-splash", "1");
}

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
//
// Portaled to document.body so z-index is not trapped under layout <main
// className="relative z-10"> (which left the fixed nav z-40 on top of the
// splash). html[data-splash] also hides the nav via CSS for first paint.
export function Splash({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  // Defer portal until after mount so SSR markup matches the first client paint.
  const [portaled, setPortaled] = useState(false);
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
    clearSplashLock();
    setVisible(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      } catch {
        // Private mode / disabled storage — swallow; loader still ends.
      }
    }
    onDone();
  }, [onDone]);

  useEffect(() => {
    setPortaled(true);
  }, []);

  useEffect(() => {
    // Reduced-motion → no loader on any visit.
    if (reduce) {
      clearSplashLock();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      onDone();
      doneRef.current = true;
      return;
    }
    // Repeat visit within the session → skip.
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem(SPLASH_SESSION_KEY)
    ) {
      clearSplashLock();
      setVisible(false);
      onDone();
      doneRef.current = true;
      return;
    }

    setSplashLock();

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

  const overlay = (
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

  // Portal to body so z-[300] sits above nav (z-40) and the custom cursor
  // (z-200). Until mount, render inline — nav is already hidden via
  // html[data-splash] CSS from the layout bootstrap script.
  if (portaled) {
    return createPortal(overlay, document.body);
  }
  return overlay;
}
