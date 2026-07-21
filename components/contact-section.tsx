"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeader } from "@/components/section-header";
import { MonoLink } from "@/components/mono-link";
import { MagneticButton } from "@/components/magnetic-button";
import { Barcode } from "@/components/barcode";
import { KanjiMark } from "@/components/kanji-mark";
import { profile } from "@/content";
import { cn } from "@/lib/utils";

function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-line"
      style={{
        paddingBlock: "1.5rem",
        paddingInline: "var(--gutter)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center 2xl:max-w-[90rem]">
        <div className="flex items-center gap-3">
          <KanjiMark className="h-3.5 w-3.5 text-ember" />
          <p className="mono-label text-ink-faint">
            © 2026 Saketh Kanchi
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Barcode bars={14} className="h-3" />
          <p className="mono-micro text-ink-faint">
            Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

export function ContactSection() {
  const reduce = useReducedMotion();
  const poster = ["Let's build", "something that", "ships."];

  return (
    <>
      <SectionWrapper id="contact" aria-label="Contact">
        <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
          <SectionHeader render="06" label="Contact" reveal="word" />

          <div className="mt-10 flex flex-col gap-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.55, ease: "easeOut" }
              }
            >
              {poster.map((line, i) => (
                <p
                  key={line}
                  className={cn(
                    "font-display text-[clamp(2.4rem,8vw,4.75rem)] font-bold leading-[1.0] tracking-tight",
                    i === poster.length - 1 ? "text-ember" : "text-ink",
                  )}
                >
                  {line}
                </p>
              ))}
            </motion.div>

            <p className="max-w-prose text-sm text-ink-dim sm:text-base">
              Open to AI / full-stack roles and founding-engineer conversations.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton>
                <a href={`mailto:${profile.email}`} className="btn-bone">
                  Email me →
                </a>
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
