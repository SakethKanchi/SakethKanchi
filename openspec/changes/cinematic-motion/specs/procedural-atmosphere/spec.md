## ADDED Requirements

### Requirement: Procedural atmosphere canvas renders beneath all content

Every route SHALL render one client-side, `aria-hidden`, `pointer-events-none` WebGL canvas fixed to the viewport at `z-0`. It SHALL render behind grain, hero glows, navigation, and all readable content. Canvas setup failure SHALL leave the existing CSS background and page content usable without throwing an uncaught error.

#### Scenario: Canvas remains non-interactive and behind content

- **WHEN** any route renders in a WebGL-capable browser
- **THEN** one fixed canvas occupies the viewport at `z-0` and is `aria-hidden`
- **AND** text, links, form controls, selection, and navigation remain interactive above it

#### Scenario: WebGL is unavailable

- **WHEN** the browser cannot create a WebGL context or compile the shader
- **THEN** no uncaught error reaches the console
- **AND** the existing scheme-adaptive CSS background and all page content remain readable

### Requirement: Atmosphere is soft, scheme-adaptive, and bounded

The fragment shader SHALL combine two or three soft `smoothstep` radial blobs with low-opacity evolving value or simplex noise. It SHALL derive its primary and background colors from `--accent` and `--background`, use a muted violet complementary color, and avoid hard circles, images, or external network assets. Its canvas drawing buffer SHALL use half viewport resolution and resize to remain correct after viewport changes.

#### Scenario: Shader provides ambient color without harming contrast

- **WHEN** the shader is visible in dark or light color schemes
- **THEN** blobs are soft, subtle, and adapt to CSS color variables
- **AND** foreground text remains readable with at least its previously verified contrast

#### Scenario: Resize retains full coverage

- **WHEN** the viewport dimensions or device pixel ratio change
- **THEN** the canvas continues to cover the viewport without stretching its drawing buffer or creating page layout shift

### Requirement: Animation is lifecycle-safe and respects reduced motion

For motion-capable users, the shader SHALL advance a `u_time` uniform with `requestAnimationFrame`, skip drawing while `document.visibilityState` is not `"visible"`, and release animation, buffers, programs, and listeners on unmount. For reduced-motion users, it SHALL render exactly one static frame with time `0` and start no animation loop.

#### Scenario: Hidden document does not consume animation frames

- **WHEN** the document visibility state becomes hidden
- **THEN** the atmosphere animation performs no draw work until the document becomes visible again

#### Scenario: Reduced-motion canvas is static

- **WHEN** the OS reports `prefers-reduced-motion: reduce`
- **THEN** the canvas draws one initial frame with `u_time = 0`
- **AND** it does not schedule a recurring animation frame

#### Scenario: Component unmount cleans up WebGL resources

- **WHEN** the canvas component unmounts
- **THEN** any scheduled animation frame, event listeners, shader program, and created buffers are released
