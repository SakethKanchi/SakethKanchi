# Optional frame-synced video hero

**Status:** Deferred. This document does not authorize runtime video implementation.

## Prerequisites

- User supplies or explicitly asks to generate a suitable 6-second cinematic clip.
- Clip direction: a slow push through fog, concrete/brutalist material, or abstract technical atmosphere. It must preserve enough negative space for hero copy.
- This remains excluded from `cinematic-motion` until a separate explicit request.

## Future implementation shape

1. Extract 100–150 1080p frames from the source clip.
2. Preload frames with bounded concurrency and expose real loading progress; do not show a fake progress value.
3. Draw the current frame to a `<canvas>` using `drawImage`.
4. Map `scrollYProgress` to `Math.round(progress * (frameCount - 1))`, not absolute scroll pixels, so the sequence follows document height.
5. Reserve canvas dimensions before loading to prevent layout shift.
6. On mobile, either preload the complete optimized sequence or use a `<video>` element whose `currentTime` follows scroll progress. Choose from measured memory and network cost, not assumed parity.
7. Under `prefers-reduced-motion`, render a single static poster frame and start no scroll-scrub or playback loop.

## Non-goals

- No Higgsfield generation, video asset, frame extraction, canvas draw loop, or route/component change is part of current implementation.
- No additional animation framework is needed; Framer Motion scroll progress remains sufficient.
