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
    <>
      {/* Soft accent wash anchored to the upper-left (behind the sidebar) plus a
          faint counter-glow lower-right. Token-derived, low alpha so it lifts
          the composition without touching text contrast in any theme. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(48% 42% at 16% 12%, color-mix(in oklch, var(--accent) 13%, transparent), transparent 72%), radial-gradient(40% 40% at 88% 92%, color-mix(in oklch, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-[0.62]"
      >
        <GenerativeBg />
      </div>
    </>
  );
}
