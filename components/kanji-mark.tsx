import { cn } from "@/lib/utils";

/**
 * 技 (skill / technique) — identity seal as an inline SVG path (Noto Sans CJK JP Bold).
 * Avoids loading a full CJK webfont for a single glyph.
 */
const GI_PATH =
  "M58.87 6.36V19.64H38.9V29.94H58.87V41.09H40.48V51.11H45.4L42.53 51.95C46.05 60.49 50.42 67.92 55.9 74.23C49.3 78.41 41.78 81.38 33.52 83.33C35.65 85.75 38.25 90.48 39.46 93.36C48.56 90.67 56.82 86.95 63.97 81.94C70.47 87.14 78.18 91.04 87.28 93.64C88.86 90.85 92.01 86.3 94.43 84.08C86.07 82.03 78.83 78.88 72.79 74.7C80.69 66.81 86.63 56.59 90.16 43.59L83.01 40.71L81.15 41.09H69.92V29.94H90.81V19.64H69.92V6.36ZM53.39 51.11H76.14C73.35 57.52 69.27 63 64.35 67.64C59.7 62.91 56.08 57.34 53.39 51.11ZM17.55 6.36V24.09H6.78V34.4H17.55V50.93C13.09 51.95 9.01 52.88 5.57 53.53L8.45 64.21L17.55 61.88V81.2C17.55 82.59 17.08 83.05 15.78 83.05C14.58 83.05 10.68 83.05 6.96 82.96C8.36 85.84 9.75 90.3 10.12 93.08C16.71 93.08 21.17 92.8 24.33 91.13C27.48 89.37 28.51 86.68 28.51 81.29V59.01L38.44 56.31L37.05 46.1L28.51 48.24V34.4H37.7V24.09H28.51V6.36Z";

export function KanjiMark({
  className,
  title = "技",
}: {
  className?: string;
  /** Accessible name when not aria-hidden by parent. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={cn("inline-block shrink-0", className)}
    >
      <title>{title}</title>
      <path d={GI_PATH} />
    </svg>
  );
}
