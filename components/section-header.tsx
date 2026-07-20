"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  render: string; // "01" | "02" | ...
  label: string;
  className?: string;
  reveal?: "line" | "word";
  // Optional `as` for heading level. Default h2 (section landmark heading).
  as?: "h1" | "h2" | "h3";
}

// `[ NN — Label ]` — Surendar/amanbuilds numbered bracket.
// Brackets + number + em-dash in Geist Mono, label in Geist Sans.
// Zinc-500 chrome, zinc-100 label, wide letter-spaced.
export function SectionHeader({
  render,
  label,
  className,
  reveal = "line",
  as: Tag = "h2",
}: SectionHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <Tag
      className={cn(
        "font-mono text-xs uppercase tracking-[0.25em] text-zinc-500",
        "flex items-center gap-2",
        className,
      )}
    >
      <span aria-hidden data-section-label-chrome className="text-zinc-500">
        [
      </span>
      <span data-section-label-chrome className="text-zinc-500 tabular-nums">
        {render}
      </span>
      <span aria-hidden data-section-label-chrome className="text-zinc-500">
        —
      </span>
      <span className="font-display text-sm normal-case tracking-[0.15em] text-zinc-100">
        {reveal === "word" ? (
          <span className="inline-flex gap-[0.15em]">
            {label.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-section-label-word
                className="line-mask inline-block overflow-hidden"
              >
                <motion.span
                  initial={reduce ? false : { y: "100%" }}
                  whileInView={reduce ? undefined : { y: 0 }}
                  transition={{
                    delay: reduce ? 0 : index * 0.05,
                    duration: reduce ? 0 : 0.5,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        ) : (
          label
        )}
      </span>
      <span aria-hidden data-section-label-chrome className="text-zinc-500">
        ]
      </span>
    </Tag>
  );
}