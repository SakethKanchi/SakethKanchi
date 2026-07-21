"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function SectionWrapper({
  id,
  children,
  className,
  "aria-label": ariaLabel,
}: SectionWrapperProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      data-section={id}
      aria-label={ariaLabel ?? id}
      className={cn("relative overflow-hidden scroll-mt-20", className)}
      style={{
        paddingBlock: "var(--section-y)",
        paddingInline: "var(--gutter)",
      }}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
    >
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}
