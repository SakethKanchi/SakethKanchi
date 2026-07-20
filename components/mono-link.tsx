import { cn } from "@/lib/utils";

interface MonoLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  // Optional arrow glyph appended after the label. Default: no arrow.
  external?: boolean;
  children: React.ReactNode;
}

// Geist Mono anchor with an underline-grow hover affordance.
// Reduced-motion disables the transition globally via `globals.css`
// (`prefers-reduced-motion` block), so no per-component gate needed.
export function MonoLink({
  href,
  external,
  children,
  className,
  ...rest
}: MonoLinkProps) {
  const isExternal =
    external ?? /^(https?:|mailto:|tel:)/.test(href);

  return (
    <a
      href={href}
      className={cn(
        "font-mono text-sm tracking-wide text-zinc-300",
        "underline-offset-[0.2em] decoration-zinc-500/60",
        "relative inline-block",
        // Underline grows from 0 → full on hover via a background-image trick.
        "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat",
        "transition-[background-size] duration-300 ease-out",
        "hover:bg-[length:100%_1px] hover:text-zinc-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]",
        className,
      )}
      rel={isExternal ? "noreferrer noopener" : undefined}
      target={isExternal ? "_blank" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}