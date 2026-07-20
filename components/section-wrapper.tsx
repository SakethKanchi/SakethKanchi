"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  // Optional aria-label for the <section> landmark. Defaults to the id
  // title-cased, but consumers should pass a real label.
  "aria-label"?: string;
}

// Wraps each home <section>. Owns the Framer Motion enter fade.
// Scrollspy is owned by <Nav /> (it observes [data-section] elements),
// so this component only sets the data attribute + the motion reveal.
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
      className={cn("relative overflow-hidden scroll-mt-20 py-24", className)}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}