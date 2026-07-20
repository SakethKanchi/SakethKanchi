"use client";

import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const options = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 2,
  infinite: false,
  orientation: "vertical" as const,
};

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return (
      <div data-lenis-root data-lenis-mode="native">
        {children}
      </div>
    );
  }

  return (
    <div data-lenis-root data-lenis-mode="smooth">
      <ReactLenis root options={options}>
        {children}
      </ReactLenis>
    </div>
  );
}
