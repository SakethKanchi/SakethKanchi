import { cn } from "@/lib/utils";

/** Decorative barcode motif — pure visual, aria-hidden. */
export function Barcode({
  bars = 18,
  className,
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn("barcode", className)}>
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} style={{ height: "100%" }} />
      ))}
    </span>
  );
}
