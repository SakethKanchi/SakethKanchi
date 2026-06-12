import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: name + tagline */}
          <div className="flex flex-col gap-1">
            <span className="font-bold tracking-tight text-fg">{profile.name}</span>
            <span className="text-sm text-muted">{profile.role}</span>
          </div>

          {/* Right: socials + email */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {social.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="rounded-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {profile.email}
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t border-line/50 pt-6 text-xs text-muted">
          © 2026 Saketh Kanchi
        </div>
      </div>
    </footer>
  );
}
