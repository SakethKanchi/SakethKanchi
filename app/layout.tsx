import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sakethkanchi.com"),
  title: "Saketh Kanchi — Full-Stack Engineer",
  description:
    "Full-Stack Engineer building AI-powered products: RAG systems, LLM agents, and developer tools. Shipped a dev tool with 10,000+ users.",
  keywords: [
    "Saketh Kanchi",
    "Full-Stack Engineer",
    "React",
    "Node.js",
    "Python",
    "RAG",
    "LLM",
    "AI Engineer",
  ],
  authors: [{ name: "Saketh Kanchi" }],
  openGraph: {
    title: "Saketh Kanchi — Full-Stack Engineer",
    description:
      "AI-powered products that ship — RAG systems, LLM agents, developer tools.",
    type: "website",
    url: "https://sakethkanchi.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saketh Kanchi — Full-Stack Engineer",
    description: "AI-powered products that ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-bg text-fg font-sans antialiased min-h-screen">
        <ThemeProvider>
          <SmoothScroll>
            <Nav />
            <main className="mx-auto max-w-6xl px-6">{children}</main>
            <Footer />
          </SmoothScroll>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
