"use client";
import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="indigo-night"
      enableSystem={false}
      themes={[
        "indigo-night",
        "tokyo-night",
        "catppuccin-mocha",
        "catppuccin-latte",
        "rose-pine",
        "rose-pine-dawn",
        "gruvbox",
        "nord",
      ]}
    >
      {children}
    </NextThemes>
  );
}
