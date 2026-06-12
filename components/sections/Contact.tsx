"use client";

import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { toast } from "sonner";

export function Contact() {
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast("Copied");
    } catch {
      toast.error("Couldn't copy — email: " + profile.email);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line py-14 lg:py-16"
    >
      <Reveal>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-fg">
          Contact
        </h2>
        <p className="mb-8 max-w-prose text-[17px] leading-relaxed text-muted">
          Got a role or a project in mind? The form lands in my inbox. Prefer
          email or socials? Reach me directly.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
        {/* Form */}
        <Reveal delay={0.06} className="lg:col-span-3">
          <ContactForm />
        </Reveal>

        {/* Always-visible fallback: copy email + socials */}
        <Reveal delay={0.12} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-5">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email ${profile.email}`}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span className="font-mono text-xs text-accent">@</span>
              {profile.email}
            </button>

            <ul className="flex flex-col gap-3">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span aria-hidden="true">↗</span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
