"use client";

import dynamic from "next/dynamic";

/** Lazy, client-only — keeps the cursor flourish off the SSR/critical graph. */
const CustomCursor = dynamic(
  () => import("@/lib/use-cursor").then((m) => m.CustomCursor),
  { ssr: false },
);

export function CustomCursorLazy() {
  return <CustomCursor />;
}
