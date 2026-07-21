import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav";
import { CustomCursorLazy } from "@/components/custom-cursor-lazy";
import { profile } from "@/content";
import { LenisProvider } from "@/components/lenis-provider";

// Body / UI — medium for section titles, regular for copy. No 600/700 needed.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-space-grotesk",
  fallback: ["system-ui", "sans-serif"],
});

// Mono labels only use regular weight in the design system.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-space-mono",
  fallback: ["ui-monospace", "monospace"],
});

// Display — only bold is used (hero / splash / contact / metrics).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["700"],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
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

// Film grain — low-opacity lo-fi texture over pure black.
const GRAIN_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaGxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        spaceGrotesk.variable,
        spaceMono.variable,
        fraunces.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-paper text-ink-dim antialiased">
        {/* Theme first — prevents flash of wrong paper color before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("splash_seen")==="1")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.setAttribute("data-splash","1");}catch(e){}})();`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
          style={{
            backgroundImage: `url("${GRAIN_URI}")`,
            opacity: "var(--grain-opacity)",
          }}
        />
        <a
          href="#main"
          className={cn(
            "absolute left-4 top-4 z-50 -translate-y-16 px-4 py-2 mono-body text-ink opacity-0 transition",
            "focus:translate-y-0 focus:opacity-100",
            "focus:rounded-[2px] focus:bg-paper-raised focus:outline focus:outline-2 focus:outline-[var(--ember)]",
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
        <CustomCursorLazy />
        <Analytics />
      </body>
    </html>
  );
}
