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
import { HeroAtmosphere } from "@/components/hero-atmosphere";

// Hero — 4 stacked lines revealed via a line-mask (each inner span translates
// up out of an `overflow-hidden` outer span), staggered top-to-bottom.
//   name    — Fraunces display, clamp(2.8rem, 6.5vw, 6.5rem)
//   role    — Geist Mono sky-400
//   tagline — Geist Sans zinc-400
//   links   — three MonoLinks
// Atmosphere: canvas code field + scrims behind type (see HeroAtmosphere).
// Reduced-motion: all 4 lines render at translateY(0) with no animation.
// Once the reveal finishes we flip the mask to `overflow: visible` so the
// links line's focus ring (offset-4) is never clipped.
export function Hero({ introReady }: { introReady: boolean }) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const [revealed, setRevealed] = useState(reduce ?? false);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const line: Variants = {
    hidden: { y: "100%" },
    show: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lines = [
    {
      key: "name",
      content: (
        <h1 className="font-display text-[clamp(2.8rem,6.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-zinc-100">
          {profile.name}
        </h1>
      ),
    },
    {
      key: "role",
      content: (
        <p className="font-mono text-[1.25rem] leading-tight text-[var(--accent)] sm:text-[1.5rem]">
          {profile.role}
        </p>
      ),
    },
    {
      key: "tagline",
      content: (
        <p className="max-w-prose font-sans text-[1.125rem] leading-relaxed text-zinc-400 sm:text-[1.25rem]">
          {profile.tagline}
        </p>
      ),
    },
    {
      key: "links",
      content: (
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
          <MonoLink href={profile.github}>GitHub ↗</MonoLink>
          <MonoLink href={profile.linkedin}>LinkedIn ↗</MonoLink>
          <MonoLink href={`mailto:${profile.email}`}>Email ↗</MonoLink>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={heroRef}
      id="top"
      data-section="top"
      aria-label="Hero"
      className="relative grid min-h-dvh place-items-center overflow-hidden px-6 pb-24 pt-32 sm:px-10 xl:px-12"
    >
      <HeroAtmosphere targetRef={heroRef} />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          data-hero-scrub
          className="relative z-10 flex w-full flex-col items-start gap-5 will-change-transform xl:mx-0"
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : introReady ? "show" : "hidden"}
        >
          {lines.map((l, i) => (
            <span
              key={l.key}
              className="line-mask"
              // After reveal (or under reduced-motion where nothing animates),
              // drop the clip so focus rings (offset-4) aren't cut.
              style={revealed || reduce ? { overflow: "visible" } : undefined}
            >
              <motion.span
                data-hero-line
                className="block"
                variants={reduce ? undefined : line}
                // Under reduced motion nothing animates, so pin the line at rest.
                // Without this, Framer SSR-renders the `hidden` variant as an
                // inline `translateY(100%)` that never clears → blank hero.
                initial={reduce ? false : undefined}
                animate={reduce ? { y: 0 } : undefined}
                // Last line finishes last → safe signal that the reveal is done.
                onAnimationComplete={
                  i === lines.length - 1 ? () => setRevealed(true) : undefined
                }
              >
                {l.content}
              </motion.span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
