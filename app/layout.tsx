import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav";
import { CustomCursor } from "@/lib/use-cursor";
import { profile } from "@/content";
import { LenisProvider } from "@/components/lenis-provider";

// Fraunces — display serif (hero name, section labels, contact poster, Kitty
// counter). Weights 400 + 600, `display: swap` so LCP text paints in the
// serif fallback then swaps without relayout. Exposes `--font-display`.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sakethkanchi.github.io/SakethKanchi";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saketh Kanchi — Full-Stack AI Engineer",
    template: "%s — Saketh Kanchi",
  },
  description:
    "Saketh Kanchi — Full-Stack AI Engineer building RAG systems, LLM integrations, and production full-stack features in React, Node.js, and Python.",
  applicationName: "Saketh Kanchi",
  authors: [{ name: "Saketh Kanchi", url: SITE_URL }],
  creator: "Saketh Kanchi",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Saketh Kanchi",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saketh Kanchi — Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer building RAG systems, LLM integrations, and production full-stack features.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Person schema (brief §11.4).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  jobTitle: profile.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jersey City",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  sameAs: [profile.github, profile.linkedin],
};

// Film grain — inline SVG feTurbulence noise as a base64 data-URI. ~380 bytes,
// no external fetch. Rendered as a fixed pointer-events-none aria-hidden
// overlay (globals: mix-blend-overlay, very low opacity) on every route.
const GRAIN_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        fraunces.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/*
          Pre-hydration splash lock — hides the fixed nav before React mounts so
          it never peeks above the loader. Mirrors splash.tsx skip rules:
          sessionStorage splash_seen / prefers-reduced-motion → leave unlocked.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("splash_seen")==="1")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.setAttribute("data-splash","1");}catch(e){}})();`,
          }}
        />
        {/*
          Film grain — fixed below all content. pointer-events-none + aria-hidden
          means it never intercepts input or appears in the accessibility tree.
        */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN_URI}")` }}
        />
        {/*
          Skip-to-content — first focusable element. Offscreen (NOT sr-only)
          so Chrome's sequential tab order keeps it: sr-only's clip-path makes
          the element invisible to Tab. Translate-down on focus reveals it.
        */}
        <a
          href="#main"
          className={cn(
            "absolute left-4 top-4 z-50 -translate-y-16 px-4 py-2 font-mono text-sm text-zinc-100 opacity-0 transition",
            "focus:translate-y-0 focus:opacity-100",
            "focus:rounded-md focus:bg-zinc-900 focus:outline focus:outline-2 focus:outline-[var(--ring)]",
          )}
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Nav />
        <LenisProvider>
          <main id="main" className="relative z-10">
            {children}
          </main>
        </LenisProvider>
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}