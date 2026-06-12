import { Tilt } from "@/components/motion/Tilt";
import { cn } from "@/lib/utils";

export function BentoCard({
  className,
  children,
  tilt = true,
}: {
  className?: string;
  children: React.ReactNode;
  tilt?: boolean;
}) {
  const card = (
    <div className={cn("h-full rounded-2xl border border-line bg-surface p-6", className)}>
      {children}
    </div>
  );
  return tilt ? <Tilt className="h-full">{card}</Tilt> : card;
}
