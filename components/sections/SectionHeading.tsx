import { Reveal } from "@/components/motion/Reveal";

/**
 * Shared section header: mono index numeral + confident heading + gradient
 * hairline rule. Gives the page a consistent "current section" rhythm. The
 * numbered index is deliberate here — the right column reads as an ordered
 * sequence (About → Experience → Projects → Skills → Contact).
 */
export function SectionHeading({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-8 flex items-baseline gap-4">
        <span className="section-index text-sm">{index}</span>
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-fg sm:text-[1.75rem]">
          {children}
        </h2>
        <span
          aria-hidden="true"
          className="hairline mb-1.5 hidden flex-1 sm:block"
        />
      </div>
    </Reveal>
  );
}
