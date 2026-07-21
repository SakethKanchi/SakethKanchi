"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { profile } from "@/content";
import { MonoLink } from "@/components/mono-link";
import { Barcode } from "@/components/barcode";
import { KanjiMark } from "@/components/kanji-mark";
import { cn } from "@/lib/utils";

// Hero — editorial landing:
//   oversized Fraunces name, kanji watermark, dossier meta rail, bone CTA.
export function Hero({ introReady }: { introReady: boolean }) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const [revealed, setRevealed] = useState(reduce ?? false);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const line: Variants = {
    hidden: { y: "100%" },
    show: {
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const RESUME_URL = `${BASE_PATH}/resume.pdf`;

  return (
    <section
      ref={heroRef}
      id="top"
      data-section="top"
      aria-label="Hero"
      className="relative min-h-dvh overflow-hidden pb-20 pt-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      {/* Oversized kanji watermark — 技 (skill / technique) */}
      <KanjiMark
        className="pointer-events-none absolute -right-8 top-1/2 h-[clamp(12rem,42vw,27rem)] w-[clamp(12rem,42vw,27rem)] -translate-y-1/2 select-none text-ember opacity-[0.07] sm:right-0 light:opacity-[0.14]"
      />

      {/* Hairline frame edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-14 h-px bg-[var(--line)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-7rem)] w-full max-w-7xl flex-col justify-center 2xl:max-w-[90rem]">
        <motion.div
          data-hero-scrub
          className="grid w-full gap-12 will-change-transform lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : introReady ? "show" : "hidden"}
        >
          {/* Primary column */}
          <div className="flex flex-col gap-6">
            <span
              className="line-mask"
              style={revealed || reduce ? { overflow: "visible" } : undefined}
            >
              <motion.span
                data-hero-line
                className="block"
                variants={reduce ? undefined : line}
                initial={reduce ? false : undefined}
                animate={reduce ? { y: 0 } : undefined}
              >
                <p className="label-upper text-ember">
                  Portfolio // Full-Stack AI
                </p>
              </motion.span>
            </span>

            <span
              className="line-mask"
              style={revealed || reduce ? { overflow: "visible" } : undefined}
            >
              <motion.span
                data-hero-line
                className="block"
                variants={reduce ? undefined : line}
                initial={reduce ? false : undefined}
                animate={reduce ? { y: 0 } : undefined}
              >
                <h1 className="font-display text-[clamp(3.2rem,9vw,5.75rem)] font-bold leading-[0.95] tracking-tight text-ink">
                  {profile.name.split(" ")[0]}
                  <br />
                  <span className="text-ink-dim">{profile.name.split(" ").slice(1).join(" ")}</span>
                </h1>
              </motion.span>
            </span>

            <span
              className="line-mask"
              style={revealed || reduce ? { overflow: "visible" } : undefined}
            >
              <motion.span
                data-hero-line
                className="block"
                variants={reduce ? undefined : line}
                initial={reduce ? false : undefined}
                animate={reduce ? { y: 0 } : undefined}
              >
                <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-dim sm:text-[1.125rem]">
                  {profile.tagline}
                </p>
              </motion.span>
            </span>

            <span
              className="line-mask"
              style={revealed || reduce ? { overflow: "visible" } : undefined}
            >
              <motion.span
                data-hero-line
                className="block"
                variants={reduce ? undefined : line}
                initial={reduce ? false : undefined}
                animate={reduce ? { y: 0 } : undefined}
                onAnimationComplete={() => setRevealed(true)}
              >
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${profile.email}`} className="btn-bone">
                    Email me
                  </a>
                  <a
                    href={RESUME_URL}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="btn-ghost"
                  >
                    Resume ↗
                  </a>
                  <div className="ml-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <MonoLink href={profile.github}>GitHub</MonoLink>
                    <MonoLink href={profile.linkedin}>LinkedIn</MonoLink>
                  </div>
                </div>
              </motion.span>
            </span>
          </div>

          {/* Dossier side rail */}
          <aside className="flex w-full flex-col gap-0 border border-line lg:w-64">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="mono-label text-ember">Dossier</span>
              <Barcode bars={12} className="h-4" />
            </div>
            <DossierRow label="Role" value={profile.role} />
            <DossierRow label="Location" value={profile.location} />
            <DossierRow label="Status" value="Open to roles" accent="sage" />
            <DossierRow label="Focus" value="RAG · LLM · Full-stack" last />
            <div className="border-t border-line px-4 py-3">
              <p className="mono-micro text-ink-faint">
                ED. 2026 · SK-{profile.name.split(" ")[0].toUpperCase().slice(0, 3)}
              </p>
            </div>
          </aside>
        </motion.div>

        {/* Bottom system strip */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center border-t border-line py-4">
          <p className="mono-label text-ember">Scroll ↓</p>
        </div>
      </div>
    </section>
  );
}

function DossierRow({
  label,
  value,
  last,
  accent,
}: {
  label: string;
  value: string;
  last?: boolean;
  accent?: "ember" | "sage";
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[5.5rem_1fr] gap-3 px-4 py-3",
        !last && "border-b border-line",
      )}
    >
      <span className="dossier-key">{label}</span>
      <span
        className={cn(
          "dossier-val",
          accent === "sage" && "text-sage",
          accent === "ember" && "text-ember",
          !accent && "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}
