"use client";

import { useCountUp } from "@/lib/use-count-up";

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
      className="mono-body text-ember"
    >
      <span className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none tracking-tight tabular-nums text-ember">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      {label ? (
        <span className="ml-2 align-baseline text-ink-muted">{label}</span>
      ) : null}
    </p>
  );
}
