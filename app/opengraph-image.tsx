import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Saketh Kanchi — Full-Stack AI Engineer";

// OG: pure black paper, bone ink, mono role line.
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
          backgroundColor: "#000000",
          color: "#cdc4ba",
          fontFamily: "Georgia, ui-serif, serif",
        }}
      >
        <div
          style={{
            fontSize: "1rem",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#d4a06a",
            marginBottom: "1.5rem",
          }}
        >
          Portfolio // Full-Stack AI
        </div>
        <div
          style={{
            fontSize: "5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Saketh Kanchi
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "1.75rem",
            fontFamily: "ui-monospace, monospace",
            color: "#d4a06a",
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
            fontSize: "0.95rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7a756e",
          }}
        >
          sakethkanchi.com
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "5rem",
            fontSize: "2rem",
            fontFamily: "system-ui, sans-serif",
            color: "#d4a06a",
            opacity: 0.85,
          }}
        >
          技
        </div>
      </div>
    ),
    size,
  );
}
