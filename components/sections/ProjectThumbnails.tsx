/**
 * On-brand CSS/SVG thumbnails for the projects (no real screenshots).
 * Theme-aware via tokens only — they read correctly in all 8 themes.
 *
 * These are the visual centerpiece: treated like polished product shots with
 * accent lighting, layered depth (inner highlights, soft top sheen), and
 * realistic product detail. All color is token-derived (var(--accent),
 * var(--fg), var(--line)) so contrast holds across every theme.
 */

/** Kitty — a polished mini code-editor: gutter, syntax, status bar, swatches. */
export function KittyThumb() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border border-line bg-bg">
      {/* accent light bleed from top-left — gives the shot depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 0% 0%, color-mix(in oklch, var(--accent) 14%, transparent), transparent 60%)",
        }}
      />
      {/* top inner highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--fg) 18%, transparent), transparent)",
        }}
      />

      {/* title bar */}
      <div className="relative flex items-center gap-1.5 border-b border-line bg-surface/80 px-3 py-2 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/45" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
        <span className="ml-2 font-mono text-[10px] text-fg">theme.json</span>
        <span className="ml-auto font-mono text-[9px] text-accent">● kitty</span>
      </div>

      {/* code body with gutter */}
      <div className="relative flex font-mono text-[11px] leading-[1.5]">
        {/* gutter */}
        <div className="flex flex-col items-end gap-[3px] border-r border-line/70 bg-surface/30 px-2 py-3 text-muted/60">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} aria-hidden="true">{n}</span>
          ))}
        </div>
        {/* code */}
        <div className="flex flex-col gap-[3px] px-3.5 py-3">
          <div className="flex gap-2">
            <span className="text-accent">const</span>
            <span className="text-fg">kitty</span>
            <span className="text-muted">=</span>
            <span className="text-fg">{"{"}</span>
          </div>
          <div className="flex gap-2 pl-4">
            <span className="text-fg/80">accent</span>
            <span className="text-muted">:</span>
            <span className="text-accent">&quot;#9b8cff&quot;</span>
            <span className="text-muted">,</span>
          </div>
          <div className="flex gap-2 pl-4">
            <span className="text-fg/80">contrast</span>
            <span className="text-muted">:</span>
            <span className="text-accent">&quot;AA&quot;</span>
            <span className="text-muted">,</span>
          </div>
          <div className="flex gap-2 pl-4">
            <span className="text-fg/80">downloads</span>
            <span className="text-muted">:</span>
            <span className="text-fg">10_000</span>
            <span className="text-muted">,</span>
          </div>
          <div className="flex gap-2">
            <span className="text-fg">{"}"}</span>
          </div>
        </div>
      </div>

      {/* status bar with swatches */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-line bg-accent/10 px-3 py-1.5">
        <span className="font-mono text-[9px] text-accent">main</span>
        <span className="font-mono text-[9px] text-muted">UTF-8 · TS</span>
        <span className="ml-auto flex gap-1.5">
          <span className="h-3.5 w-3.5 rounded-sm bg-accent shadow-[0_0_8px_-1px_color-mix(in_oklch,var(--accent)_80%,transparent)]" />
          <span className="h-3.5 w-3.5 rounded-sm bg-fg/55" />
          <span className="h-3.5 w-3.5 rounded-sm bg-muted" />
          <span className="h-3.5 w-3.5 rounded-sm border border-line bg-surface" />
        </span>
      </div>
    </div>
  );
}

/** Parley — a polished transcript + live waveform: chat rows, REC pill, bars. */
export function ParleyThumb() {
  // Deterministic pseudo-random bar heights (stable across renders/SSR).
  const bars = [9, 16, 24, 13, 28, 19, 32, 22, 14, 26, 11, 21, 30, 17, 25, 12, 23, 15, 27, 18, 31, 20];
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border border-line bg-bg">
      {/* accent light bleed from bottom (where the waveform lives) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 100%, color-mix(in oklch, var(--accent) 13%, transparent), transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--fg) 18%, transparent), transparent)",
        }}
      />

      {/* header */}
      <div className="relative flex items-center gap-2 border-b border-line bg-surface/80 px-3 py-2 backdrop-blur-sm">
        <span className="font-mono text-[10px] text-fg"># general</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[9px] font-medium text-accent">REC</span>
        </span>
      </div>

      {/* transcript rows */}
      <div className="relative space-y-2.5 px-3 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-accent shadow-[0_0_8px_-1px_color-mix(in_oklch,var(--accent)_80%,transparent)]" />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-accent">@alex</span>
            <span className="h-2 w-32 rounded bg-fg/30" />
          </div>
        </div>
        <div className="flex items-start gap-2 pl-6">
          <span className="h-2 w-20 rounded bg-muted/45" />
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-fg/40" />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-muted">@sam</span>
            <span className="h-2 w-24 rounded bg-fg/30" />
          </div>
        </div>
      </div>

      {/* live waveform */}
      <div className="absolute inset-x-0 bottom-0 flex h-14 items-center gap-[3px] border-t border-line bg-surface/60 px-3 backdrop-blur-sm">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-accent"
            style={{
              height: `${h}px`,
              opacity: 0.5 + (h / 32) * 0.5,
              boxShadow: h > 24 ? "0 0 6px -1px color-mix(in oklch, var(--accent) 80%, transparent)" : undefined,
            }}
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
