import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ResumeButton } from "./ResumeButton";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="rounded-sm font-bold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
          {profile.name}
        </Link>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <ResumeButton />
        </div>
      </nav>
    </header>
  );
}
