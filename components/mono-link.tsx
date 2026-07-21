import { cn } from "@/lib/utils";

interface MonoLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

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
        "mono-body tracking-wide text-ink-dim",
        "underline-offset-[0.2em] decoration-[var(--ember-line)]",
        "relative inline-block",
        "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat",
        "transition-[background-size,color] duration-300 ease-out",
        "hover:bg-[length:100%_1px] hover:text-ember",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ember)]",
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
