import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RagBench — RAG Quality Lab · Saketh Kanchi";

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
            fontSize: "0.95rem",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#d4a06a",
            marginBottom: "1.25rem",
          }}
        >
          01 // Project dossier
        </div>
        <div
          style={{
            fontSize: "4.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          RagBench
        </div>
        <div
          style={{
            marginTop: "1.25rem",
            fontSize: "1.75rem",
            fontFamily: "ui-monospace, monospace",
            color: "#d4a06a",
          }}
        >
          RAG Quality Lab
        </div>
        <div
          style={{
            marginTop: "0.75rem",
            fontFamily: "ui-monospace, monospace",
            fontSize: "1.1rem",
            color: "#958f87",
          }}
        >
          Saketh Kanchi
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
      </div>
    ),
    size,
  );
}
