"use client";

import dynamic from "next/dynamic";

// Client-only p5 backdrop — kept out of the SSR HTML and deferred to idle.
const GenerativeBg = dynamic(
  () => import("@/components/hero/GenerativeBg").then((m) => m.GenerativeBg),
  { ssr: false },
);

/**
 * A single, very subtle full-page backdrop. Fixed so it never scrolls, pinned
 * behind all content (-z-10), and capped at low opacity so it can't hurt text
 * contrast in any theme. A faint radial vignette anchors it toward the sidebar.
 */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-50"
    >
      <GenerativeBg />
    </div>
  );
}
