"use client";

/**
 * GenerativeBg — "Tethered Drift"
 *
 * Algorithmic philosophy: a slow flow-field of nodes adrift in layered Perlin
 * noise. Order emerges from the field; structure emerges from proximity —
 * invisible tethers reveal themselves only when nodes drift close, fading with
 * distance. Controlled chaos, refined into stillness. The conceptual seed:
 * a constellation of ideas connecting (retrieval, association) — quiet DNA for
 * an engineer who builds RAG systems.
 *
 * Theme-aware: reads --accent (and --muted) at runtime and recolors on
 * data-theme changes via MutationObserver. Reduced-motion: renders one static
 * frame and never starts the loop. Performance: capped node count, capped pixel
 * density, p5 instance removed on unmount.
 */

import { useEffect, useRef } from "react";
import type p5Type from "p5";

const NODE_CAP = 64; // hard cap — premium, not busy
const SEED = 2718; // stable, reproducible composition
const NOISE_SCALE = 0.0012; // flow-field granularity
const DRIFT = 0.35; // px/frame base speed
const LINK_DIST = 150; // px below which tethers appear

type RGB = { r: number; g: number; b: number };

function readThemeColors(): { accent: RGB; muted: RGB } {
  const styles = getComputedStyle(document.documentElement);
  const accent = parseColor(styles.getPropertyValue("--accent")) ?? {
    r: 155,
    g: 140,
    b: 255,
  };
  const muted = parseColor(styles.getPropertyValue("--muted")) ?? {
    r: 122,
    g: 130,
    b: 148,
  };
  return { accent, muted };
}

/** Parse a hex (#rgb / #rrggbb) or rgb()/oklch-fallback string into RGB. */
function parseColor(raw: string): RGB | null {
  const v = raw.trim();
  if (!v) return null;
  if (v[0] === "#") {
    let hex = v.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    if (hex.length >= 6) {
      const n = parseInt(hex.slice(0, 6), 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }
    return null;
  }
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b] = m[1].split(/[,/\s]+/).map(Number);
    if ([r, g, b].every((x) => Number.isFinite(x))) return { r, g, b };
  }
  return null;
}

export function GenerativeBg() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let instance: p5Type | null = null;
    let observer: MutationObserver | null = null;
    let cancelled = false;
    let idleHandle: number | null = null;

    // mutable color state, recolored on theme change without restarting p5
    const colors = { accent: { r: 155, g: 140, b: 255 }, muted: { r: 122, g: 130, b: 148 } };

    // Defer the ~350 KiB p5 import to browser idle so it never competes with
    // the hero's first paint / LCP. The backdrop is decorative, not critical.
    const startP5 = () =>
      import("p5").then(({ default: P5 }) => {
      if (cancelled || !host) return;

      const sketch = (p: p5Type) => {
        type Node = { x: number; y: number; off: number; r: number };
        let nodes: Node[] = [];

        const spawn = () => {
          p.randomSeed(SEED);
          p.noiseSeed(SEED);
          nodes = Array.from({ length: NODE_CAP }, () => ({
            x: p.random(p.width),
            y: p.random(p.height),
            off: p.random(1000), // per-node noise offset → varied flow
            r: p.random(1.1, 2.6),
          }));
        };

        const applyTheme = () => {
          const c = readThemeColors();
          colors.accent = c.accent;
          colors.muted = c.muted;
        };

        const renderFrame = () => {
          p.clear();
          const { accent, muted } = colors;

          // tethers first (behind nodes), opacity falls off with distance
          p.noStroke();
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const d = Math.hypot(dx, dy);
              if (d < LINK_DIST) {
                const a = (1 - d / LINK_DIST) * 60;
                p.stroke(accent.r, accent.g, accent.b, a);
                p.strokeWeight(1);
                p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
              }
            }
          }

          // nodes on top, accent-tinted glow
          p.noStroke();
          for (const n of nodes) {
            p.fill(accent.r, accent.g, accent.b, 200);
            p.circle(n.x, n.y, n.r * 2);
            p.fill(muted.r, muted.g, muted.b, 26);
            p.circle(n.x, n.y, n.r * 6); // soft halo
          }
        };

        const step = () => {
          for (const n of nodes) {
            // flow-field angle from layered Perlin noise
            const angle =
              p.noise(n.x * NOISE_SCALE, n.y * NOISE_SCALE, n.off) *
              p.TWO_PI *
              2;
            n.x += Math.cos(angle) * DRIFT;
            n.y += Math.sin(angle) * DRIFT;
            n.off += 0.0008;
            // wrap toroidally so density stays stable
            if (n.x < -20) n.x = p.width + 20;
            if (n.x > p.width + 20) n.x = -20;
            if (n.y < -20) n.y = p.height + 20;
            if (n.y > p.height + 20) n.y = -20;
          }
        };

        p.setup = () => {
          const c = p.createCanvas(host.offsetWidth, host.offsetHeight);
          c.parent(host);
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2)); // cap DPR
          applyTheme();
          spawn();
          if (reduceMotion) {
            renderFrame(); // single static frame, no loop
            p.noLoop();
          }
        };

        p.draw = () => {
          step();
          renderFrame();
        };

        p.windowResized = () => {
          p.resizeCanvas(host.offsetWidth, host.offsetHeight);
        };

        // expose for the MutationObserver below
        (p as p5Type & { __applyTheme?: () => void }).__applyTheme = () => {
          applyTheme();
          if (reduceMotion) renderFrame();
        };
      };

      instance = new P5(sketch, host);

      // recolor on theme switch (next-themes flips data-theme on <html>)
      observer = new MutationObserver(() => {
        const inst = instance as
          | (p5Type & { __applyTheme?: () => void })
          | null;
        inst?.__applyTheme?.();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    });

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      idleHandle = w.requestIdleCallback(() => {
        if (!cancelled) startP5();
      });
    } else {
      idleHandle = window.setTimeout(() => {
        if (!cancelled) startP5();
      }, 200) as unknown as number;
    }

    return () => {
      cancelled = true;
      if (idleHandle != null) {
        if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
      observer?.disconnect();
      instance?.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.35]"
    />
  );
}
