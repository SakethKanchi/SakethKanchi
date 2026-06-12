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
    <section id="contact" className="py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <span className="font-mono text-xs tracking-tight text-accent">
            // contact
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-fg md:text-5xl">
            Get in touch
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Form */}
        <Reveal delay={0.06} className="lg:col-span-3">
          <ContactForm />
        </Reveal>

        {/* Always-visible fallback: copy email + socials */}
        <Reveal delay={0.12} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-6">
            <p className="max-w-prose text-base leading-relaxed text-muted">
              Prefer email or socials? Reach me directly — the form sends to the
              same inbox.
            </p>

            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email ${profile.email}`}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-accent-soft"
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
                    className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
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
