"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./useReducedMotion";
export function Tilt({ children, max = 6, className }: {
  children: React.ReactNode; max?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * max, rotateX: -py * max, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
  }
  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
  }
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transformStyle: "preserve-3d" }} className={className}>{children}</div>;
}
