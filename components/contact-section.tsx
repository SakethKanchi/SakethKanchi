"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeader } from "@/components/section-header";
import { MonoLink } from "@/components/mono-link";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { profile } from "@/content";

function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-zinc-900 px-6 py-10 sm:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-1 2xl:max-w-[90rem]">
        <p className="font-mono text-xs text-zinc-500">
          © 2026 Saketh Kanchi
        </p>
      </div>
    </footer>
  );
}

// Contact — 3 oversized left-aligned lines (Let's build / something that / ships.),
// one zinc-300 line, primary CTA Email button + GitHub/LinkedIn mono links,
// Footer.
export function ContactSection() {
  const reduce = useReducedMotion();

  const poster = ["Let's build", "something that", "ships."];

  return (
    <>
      <SectionWrapper
        id="contact"
        aria-label="Contact"
        className="px-6 sm:px-10"
      >
        <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
          <SectionHeader render="06" label="Contact" reveal="word" />

          <div className="mt-12 flex flex-col gap-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
            >
              {poster.map((line) => (
                <p
                  key={line}
                  className="font-display text-[clamp(2.5rem,9vw,5.5rem)] font-semibold leading-[1.0] tracking-tight text-zinc-100"
                >
                  {line}
                </p>
              ))}
            </motion.div>

            <p className="max-w-prose text-sm text-zinc-300 sm:text-base">
              Open to AI / full-stack roles and founding-engineer conversations.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  render={
                    <a
                      href={`mailto:${profile.email}`}
                      className="!border-[var(--accent)] !px-5 !py-2 font-mono text-sm text-zinc-100 hover:!bg-[var(--accent)]/10"
                    />
                  }
                >
                  Email me →
                </Button>
              </MagneticButton>
              <MonoLink href={profile.github}>GitHub ↗</MonoLink>
              <MonoLink href={profile.linkedin}>LinkedIn ↗</MonoLink>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}