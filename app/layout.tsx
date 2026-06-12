import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/ui/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Saketh Kanchi — Full-Stack Engineer",
  description: "Full-Stack Engineer specializing in AI-powered applications and intelligent automation.",
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
            {/* Footer added in Task 15 */}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
