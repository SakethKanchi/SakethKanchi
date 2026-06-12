import { profile } from "@/content/profile";

export function ResumeButton() {
  return (
    <a
      href={profile.resumePath}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      Résumé
    </a>
  );
}
