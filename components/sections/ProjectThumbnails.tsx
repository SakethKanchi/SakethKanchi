/**
 * On-brand CSS/SVG thumbnails for the projects (no real screenshots).
 * Theme-aware via tokens only — they read correctly in all 8 themes.
 */

/** Kitty — a mini VS Code "editor" mock: window dots, fake syntax, swatches. */
export function KittyThumb() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-line bg-bg">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/25" />
        <span className="ml-2 font-mono text-[10px] text-fg">theme.json</span>
      </div>

      {/* fake code — full-opacity tokens so it reads (and passes AA) in every theme */}
      <div className="space-y-1.5 px-4 py-3 font-mono text-[11px] leading-none">
        <div className="flex gap-2">
          <span className="text-fg" aria-hidden="true">1</span>
          <span className="text-accent">const</span>
          <span className="text-fg">kitty</span>
          <span className="text-fg">=</span>
          <span className="text-fg">{"{"}</span>
        </div>
        <div className="flex gap-2 pl-4">
          <span className="text-fg" aria-hidden="true">2</span>
          <span className="text-accent">accent</span>
          <span className="text-fg">:</span>
          <span className="text-fg">&quot;#9b8cff&quot;,</span>
        </div>
        <div className="flex gap-2 pl-4">
          <span className="text-fg" aria-hidden="true">3</span>
          <span className="text-accent">contrast</span>
          <span className="text-fg">:</span>
          <span className="text-fg">&quot;AA&quot;,</span>
        </div>
        <div className="flex gap-2">
          <span className="text-fg" aria-hidden="true">4</span>
          <span className="text-fg">{"}"}</span>
        </div>
      </div>

      {/* swatch row */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        <span className="h-4 w-4 rounded bg-accent" />
        <span className="h-4 w-4 rounded bg-fg/60" />
        <span className="h-4 w-4 rounded bg-muted" />
        <span className="h-4 w-4 rounded border border-line bg-surface" />
      </div>
    </div>
  );
}

/** Parley — a transcript + waveform mock: chat rows + audio bars. */
export function ParleyThumb() {
  // Deterministic pseudo-random bar heights (stable across renders/SSR).
  const bars = [9, 16, 24, 13, 28, 19, 32, 22, 14, 26, 11, 21, 30, 17, 25, 12, 23, 15];
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-line bg-bg">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="font-mono text-[10px] text-fg"># general · recording</span>
      </div>

      {/* chat rows */}
      <div className="space-y-2 px-3 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-accent/70" />
          <span className="h-2.5 w-28 rounded bg-fg/25" />
        </div>
        <div className="flex items-start gap-2 pl-6">
          <span className="h-2.5 w-20 rounded bg-muted/50" />
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-fg/40" />
          <span className="h-2.5 w-24 rounded bg-fg/25" />
        </div>
      </div>

      {/* waveform */}
      <div className="absolute inset-x-0 bottom-0 flex h-12 items-center gap-[3px] border-t border-line bg-surface/70 px-3">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-accent"
            style={{ height: `${h}px`, opacity: 0.55 + (h / 32) * 0.45 }}
          />
        ))}
      </div>
    </div>
  );
}

export const PROJECT_THUMBS: Record<string, () => React.ReactNode> = {
  "Kitty — VS Code Theme": KittyThumb,
  "Parley — Discord Meeting Bot": ParleyThumb,
};
