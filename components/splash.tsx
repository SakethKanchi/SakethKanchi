"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content";
import { Barcode } from "@/components/barcode";
import { KanjiMark } from "@/components/kanji-mark";

export const SPLASH_SESSION_KEY = "splash_seen";
const DURATION_MS = 2800;

function clearSplashLock() {
  if (typeof document === "undefined") return;
  document.documentElement.removeAttribute("data-splash");
}

function setSplashLock() {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-splash", "1");
}

export function Splash({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
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
        // Private mode — swallow
      }
    }
    onDone();
  }, [onDone]);

  useEffect(() => {
    setPortaled(true);
  }, []);

  useEffect(() => {
    if (reduce) {
      clearSplashLock();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      onDone();
      doneRef.current = true;
      return;
    }
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
      className="fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center bg-paper focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ember)]"
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <KanjiMark className="h-12 w-12 text-ember" />
        <span className="line-mask">
          <motion.span
            className="block font-display text-[clamp(2.4rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-ink"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.name}
          </motion.span>
        </span>
        <span className="mono-label text-ink-faint">
          {profile.role} · {profile.location}
        </span>
        <Barcode bars={22} className="mt-2 h-5" />
      </div>

      <span
        aria-hidden
        className="absolute bottom-6 right-6 mono-body tabular-nums text-ember sm:bottom-10 sm:right-10"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {String(count).padStart(3, "0")}
      </span>

      <span
        aria-hidden
        className="absolute bottom-6 left-6 mono-micro text-ink-faint sm:bottom-10 sm:left-10"
      >
        Click or press any key
      </span>
    </div>
  );

  if (portaled) {
    return createPortal(overlay, document.body);
  }
  return overlay;
}
