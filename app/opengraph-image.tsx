import { ImageResponse } from "next/og";

export const alt = "Saketh Kanchi — Full-Stack Engineer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "72px 80px",
          background: "#0e1016",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Indigo accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: "#9b8cff",
          }}
        />

        {/* Decorative accent circle */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,140,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Monospace label */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#9b8cff",
            marginBottom: "24px",
            letterSpacing: "0.05em",
          }}
        >
          // full-stack engineer
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#e7e9ee",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          Saketh Kanchi
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#8b8fa8",
            letterSpacing: "-0.01em",
          }}
        >
          Full-Stack Engineer · AI-powered products
        </div>

        {/* Indigo divider */}
        <div
          style={{
            marginTop: "48px",
            width: "64px",
            height: "4px",
            background: "#9b8cff",
            borderRadius: "2px",
          }}
        />

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#9b8cff",
            opacity: 0.7,
          }}
        >
          saketh-kanchi.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
