"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Sparse code atmosphere — a few floating multi-line snippets on the right,
// not a full-screen rain. Type stays primary; reduced-motion freezes drift.

type Snippet = {
  lines: string[];
  /** Anchor 0–1 within the hero box (x from left, y from top). */
  ax: number;
  ay: number;
  /** Idle drift amplitude (css px) and phase. */
  amp: number;
  phase: number;
  speed: number;
  opacity: number;
  fontSize: number;
};

const SNIPPETS: Omit<Snippet, "fontSize">[] = [
  {
    lines: [
      "const agent = await createAgent({",
      "  model: 'grok',",
      "  tools: registry,",
      "})",
    ],
    ax: 0.58,
    ay: 0.18,
    amp: 10,
    phase: 0.2,
    speed: 0.18,
    opacity: 0.22,
  },
  {
    lines: [
      "for await (const chunk of stream) {",
      "  yield encodeSSE(chunk)",
      "}",
    ],
    ax: 0.72,
    ay: 0.48,
    amp: 14,
    phase: 1.4,
    speed: 0.14,
    opacity: 0.2,
  },
  {
    lines: [
      "const hits = await retrieve(query, 8)",
      "return rerank(hits, { model })",
    ],
    ax: 0.62,
    ay: 0.72,
    amp: 12,
    phase: 2.7,
    speed: 0.16,
    opacity: 0.18,
  },
];

type Scheme = "dark" | "light";

function readScheme(): Scheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function paint(
  ctx: CanvasRenderingContext2D,
  cssW: number,
  cssH: number,
  dpr: number,
  scheme: Scheme,
  scrollT: number,
  timeSec: number,
  reduce: boolean,
) {
  const w = Math.max(1, Math.round(cssW * dpr));
  const h = Math.max(1, Math.round(cssH * dpr));
  if (ctx.canvas.width !== w || ctx.canvas.height !== h) {
    ctx.canvas.width = w;
    ctx.canvas.height = h;
  }

  const bg = scheme === "light" ? "#fafafa" : "#09090b";
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Small screens: hide snippets entirely — not enough room beside type.
  if (cssW < 720) return;

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.textBaseline = "top";

  const fade = 1 - Math.min(1, Math.max(0, (scrollT - 0.4) / 0.55)) * 0.85;
  const scrollLift = scrollT * cssH * 0.12;

  const ink =
    scheme === "light"
      ? { r: 82, g: 82, b: 91 }
      : { r: 161, g: 161, b: 170 };
  const accent =
    scheme === "light"
      ? { r: 3, g: 105, b: 161 }
      : { r: 56, g: 189, b: 248 };
  const mute =
    scheme === "light"
      ? { r: 161, g: 161, b: 170 }
      : { r: 113, g: 113, b: 122 };

  const fontSize = cssW < 1024 ? 12 : 13;
  const lineHeight = fontSize * 1.7;
  ctx.font = `${fontSize}px "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;

  for (const snip of SNIPPETS) {
    const driftY = reduce
      ? 0
      : Math.sin(timeSec * snip.speed + snip.phase) * snip.amp;
    const x = snip.ax * cssW;
    const y = snip.ay * cssH + driftY - scrollLift;

    // Soft left fade so blocks don't compete with the name column.
    const leftGuard = Math.min(1, Math.max(0, (x - cssW * 0.42) / (cssW * 0.2)));
    const a = snip.opacity * fade * (0.55 + 0.45 * leftGuard);
    if (a < 0.02) continue;

    snip.lines.forEach((line, i) => {
      const ly = y + i * lineHeight;
      if (ly < -lineHeight || ly > cssH + lineHeight) return;

      const trimmed = line.trimStart();
      if (
        /^(const|for|return|await|yield)\b/.test(trimmed) ||
        trimmed.startsWith("model:") ||
        trimmed.startsWith("tools:")
      ) {
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${Math.min(0.55, a * 1.15)})`;
      } else if (trimmed.startsWith("//") || trimmed === "})") {
        ctx.fillStyle = `rgba(${mute.r},${mute.g},${mute.b},${Math.min(0.4, a * 0.9)})`;
      } else {
        ctx.fillStyle = `rgba(${ink.r},${ink.g},${ink.b},${Math.min(0.48, a)})`;
      }
      ctx.fillText(line, x, ly);
    });
  }

  ctx.restore();
}

export function HeroAtmosphere({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const schemeRef = useRef<Scheme>("dark");
  const scrollTRef = useRef(0);
  const timeRef = useRef(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const fadeOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0.05]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollTRef.current = v;
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    schemeRef.current = readScheme();
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onScheme = () => {
      schemeRef.current = mq.matches ? "light" : "dark";
    };
    mq.addEventListener("change", onScheme);

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    measure();
    startRef.current = performance.now();
    setReady(true);

    const draw = (t: number) => {
      const { w, h, dpr } = sizeRef.current;
      if (w < 1 || h < 1) return;
      timeRef.current = (t - startRef.current) / 1000;
      paint(
        ctx,
        w,
        h,
        dpr,
        schemeRef.current,
        scrollTRef.current,
        timeRef.current,
        !!reduce,
      );
    };

    draw(performance.now());

    let running = true;
    const loop = (t: number) => {
      if (!running) return;
      if (document.visibilityState === "visible") draw(t);
      if (!reduce) rafRef.current = requestAnimationFrame(loop);
    };

    if (!reduce) {
      rafRef.current = requestAnimationFrame(loop);
    }

    let scrollRaf = 0;
    const unsubScroll = scrollYProgress.on("change", () => {
      if (!reduce) return;
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame((t) => {
        scrollRaf = 0;
        draw(t);
      });
    });

    const ro = new ResizeObserver(() => {
      measure();
      draw(performance.now());
    });
    ro.observe(root);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      unsubScroll();
      ro.disconnect();
      mq.removeEventListener("change", onScheme);
    };
  }, [reduce, scrollYProgress]);

  return (
    <div
      ref={rootRef}
      data-hero-atmosphere
      data-hero-atmosphere-ready={ready ? "true" : "false"}
      data-hero-atmosphere-mode={reduce ? "static" : "code"}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { opacity: fadeOpacity }}
      >
        <canvas
          ref={canvasRef}
          data-hero-atmosphere-canvas
          className="hero-atmosphere-canvas absolute inset-0 h-full w-full"
        />
      </motion.div>

      {/* Soft vignette only — keep negative space around the name */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--background) 25%, transparent) 0%, transparent 18%, transparent 72%, color-mix(in oklab, var(--background) 55%, transparent) 92%, var(--background) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, color-mix(in oklab, var(--background) 88%, transparent) 0%, color-mix(in oklab, var(--background) 55%, transparent) 32%, color-mix(in oklab, var(--background) 12%, transparent) 58%, transparent 78%)",
        }}
      />

      <div
        className="absolute -right-[8%] top-[-10%] h-[42vh] w-[40vw] rounded-full opacity-[0.05] blur-[110px]"
        style={{ background: "var(--accent)" }}
      />
    </div>
  );
}
