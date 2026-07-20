import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Saketh Kanchi — Full-Stack AI Engineer";

// Type-only OG card: zinc-950 bg, name in Geist Sans (system fallback),
// role in Geist Mono sky-400, hostname bottom-right. No portrait, no gradient.
export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5rem",
          backgroundColor: "#09090b",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: "5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
          Saketh Kanchi
        </div>
        <div
          style={{
            marginTop: "1.25rem",
            fontSize: "2rem",
            fontFamily: "ui-monospace, monospace",
            color: "#38bdf8",
          }}
        >
          Full-Stack AI Engineer
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            right: "5rem",
            fontFamily: "ui-monospace, monospace",
            fontSize: "1rem",
            color: "#71717a",
          }}
        >
          sakethkanchi.com
        </div>
      </div>
    ),
    size,
  );
}