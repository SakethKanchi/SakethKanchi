"use client";

import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

// Lazy, client-only — keeps the p5 backdrop out of the SSR HTML.
const GenerativeBg = dynamic(
  () => import("./GenerativeBg").then((m) => m.GenerativeBg),
  { ssr: false },
);

// First ~10 skills, flattened across groups, for the strip.
const skillPills = skills.flatMap((g) => g.items).slice(0, 10);

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[80vh] flex-col justify-center py-16 md:py-24"
    >
      <GenerativeBg />

      {/* relative bento grid sits above the backdrop */}
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-3 md:auto-rows-[minmax(0,1fr)]">
        {/* 1. Identity — largest, spans 2 cols / 2 rows on desktop */}
        <Reveal delay={0} className="md:col-span-2 md:row-span-2">
          <BentoCard tilt={false} className="flex h-full flex-col justify-between gap-8 p-8 md:p-10">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs tracking-tight text-accent">
                // full-stack engineer
              </span>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-fg md:text-6xl">
                {profile.name}
              </h1>
              <p className="text-lg font-medium text-fg/90 md:text-xl">
                {profile.role}
              </p>
              <p className="max-w-[48ch] text-base leading-relaxed text-muted">
                {profile.tagline}
              </p>
            </div>
            <div>
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  View Projects <span aria-hidden="true">{"→"}</span>
                </a>
              </Magnetic>
            </div>
          </BentoCard>
        </Reveal>

        {/* 2. Stat — accent-soft surface, accent number */}
        <Reveal delay={0.06}>
          <BentoCard className="flex h-full flex-col justify-center gap-1 bg-primary text-primary-foreground">
            <span className="font-mono text-5xl font-bold tracking-tight md:text-6xl">
              {profile.stat.value}
            </span>
            <span className="text-sm font-medium opacity-90">
              {profile.stat.label}
            </span>
          </BentoCard>
        </Reveal>

        {/* 3. Open to work — pulsing dot */}
        {profile.openToWork && (
          <Reveal delay={0.12}>
            <BentoCard className="flex h-full items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-semibold text-fg">Open to work</span>
            </BentoCard>
          </Reveal>
        )}

        {/* 4. Skills strip — full width */}
        <Reveal delay={0.18} className="md:col-span-3">
          <BentoCard tilt={false} className="flex flex-wrap items-center gap-2">
            {skillPills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
              >
                {s}
              </span>
            ))}
          </BentoCard>
        </Reveal>
      </div>
    </section>
  );
}
