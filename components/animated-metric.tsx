"use client";

import { useCountUp } from "@/lib/use-count-up";

// AnimatedMetric — the single count-up moment on the site (Kitty VS Code Theme
// card). Renders `<count>+` in display serif accent. SSR baseline is `0+`;
// on scroll-into-view it animates 0 → `to` once. Reduced-motion renders the
// final value immediately (handled inside useCountUp).
//
// Only ever used for the Kitty `10,000+ downloads` metric — no other metric on
// the site animates (RagBench WIP callout, OSS stars, experience numbers stay
// static by design).
export function AnimatedMetric({
  to,
  suffix = "+",
  label,
}: {
  to: number;
  suffix?: string;
  label?: string;
}) {
  const { ref, value } = useCountUp(to, 1500);

  return (
    <p
      ref={ref as React.Ref<HTMLParagraphElement>}
      className="font-mono text-sm text-[var(--accent)]"
    >
      <span className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-none tracking-tight tabular-nums">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      {label ? (
        <span className="ml-2 align-baseline text-zinc-400">{label}</span>
      ) : null}
    </p>
  );
}
