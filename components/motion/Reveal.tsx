"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    // Guard against the first-paint window where the reduced-motion state
    // hasn't resolved yet: re-check the media query at run time so we never
    // apply autoAlpha:0 (which would leave content hidden) under reduce.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || prefersReduced || !ref.current) return;
    gsap.from(ref.current, {
      y: 24, autoAlpha: 0, duration: 0.7, delay, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { scope: ref, dependencies: [reduced] });
  return <div ref={ref} className={className}>{children}</div>;
}
