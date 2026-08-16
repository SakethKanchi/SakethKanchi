"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  render: string;
  label: string;
  className?: string;
  reveal?: "line" | "word";
  as?: "h1" | "h2" | "h3";
}

// Section label — mono index + hairline + Space Grotesk title.
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
        "flex flex-wrap items-baseline gap-x-4 gap-y-2",
        className,
      )}
    >
      <span className="mono-label tabular-nums text-ember">
        {`${render} //`}
      </span>
      <span className="font-sans text-[clamp(1.35rem,2.5vw,1.55rem)] font-medium tracking-tight text-ink">
        {reveal === "word" ? (
          <span className="inline-flex gap-[0.2em]">
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
      <span
        aria-hidden
        className="hidden h-px min-w-[3rem] flex-1 sm:block"
        style={{
          background:
            "linear-gradient(90deg, var(--ember-line), var(--line) 40%, transparent)",
        }}
      />
    </Tag>
  );
}
