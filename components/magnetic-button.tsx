"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MAX_OFFSET = 8;

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches && !reduce);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduce]);

  if (!enabled) return children;

  return (
    <motion.span
      data-magnetic
      className="inline-block"
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.35 }}
      onPointerEnter={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: Math.max(
            -MAX_OFFSET,
            Math.min(MAX_OFFSET, (event.clientX - (rect.left + rect.width / 2)) * 0.16),
          ),
          y: Math.max(
            -MAX_OFFSET,
            Math.min(MAX_OFFSET, (event.clientY - (rect.top + rect.height / 2)) * 0.16),
          ),
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );
}
