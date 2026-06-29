import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="flex flex-col gap-1 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="font-bold tracking-tight text-fg">{profile.name}</span>
        <span>© 2026 {profile.name}</span>
      </div>
    </footer>
  );
}
