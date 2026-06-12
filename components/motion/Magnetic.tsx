"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./useReducedMotion";
export function Magnetic({ children, strength = 0.3, className }: {
  children: React.ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power3.out" });
  }
  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
  }
  return <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className ?? ""}`}>{children}</span>;
}
