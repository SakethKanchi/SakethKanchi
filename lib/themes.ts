export type ThemeName =
  | "indigo-night"
  | "tokyo-night"
  | "catppuccin-mocha"
  | "catppuccin-latte"
  | "rose-pine"
  | "rose-pine-dawn"
  | "gruvbox"
  | "nord";

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  swatch: string;
  mode: "dark" | "light";
}

export const THEMES: ThemeMeta[] = [
  { name: "indigo-night", label: "Indigo Night", swatch: "#9b8cff", mode: "dark" },
  { name: "tokyo-night", label: "Tokyo Night", swatch: "#7aa2f7", mode: "dark" },
  { name: "catppuccin-mocha", label: "Catppuccin Mocha", swatch: "#cba6f7", mode: "dark" },
  { name: "catppuccin-latte", label: "Catppuccin Latte", swatch: "#8839ef", mode: "light" },
  { name: "rose-pine", label: "Rosé Pine", swatch: "#ebbcba", mode: "dark" },
  { name: "rose-pine-dawn", label: "Rosé Pine Dawn", swatch: "#d7827e", mode: "light" },
  { name: "gruvbox", label: "Gruvbox", swatch: "#fabd2f", mode: "dark" },
  { name: "nord", label: "Nord", swatch: "#88c0d0", mode: "dark" },
];

export const DEFAULT_THEME: ThemeName = "indigo-night";
