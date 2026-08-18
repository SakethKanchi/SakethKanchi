import { ImageResponse } from "next/og";
import { projectDetails, getProjectDetail } from "@/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// One social card per dossier, prerendered at build time.
export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export default async function Og({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getProjectDetail(slug);
  const title = d?.title ?? "Project";
  const discipline = d?.disciplineTag ?? "";

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
          backgroundColor: "#11141c",
          color: "#eceef4",
          fontFamily: "Georgia, ui-serif, serif",
        }}
      >
        <div
          style={{
            fontSize: "0.95rem",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f2a93b",
            marginBottom: "1.25rem",
          }}
        >
          Project dossier
        </div>
        <div
          style={{
            fontSize: title.length > 24 ? "3.25rem" : "4.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: "1.25rem",
            fontSize: "1.75rem",
            fontFamily: "ui-monospace, monospace",
            color: "#f2a93b",
          }}
        >
          {discipline}
        </div>
        <div
          style={{
            marginTop: "0.75rem",
            fontFamily: "ui-monospace, monospace",
            fontSize: "1.1rem",
            color: "#8c95a9",
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
            color: "#6b7388",
          }}
        >
          sakethkanchi.com
        </div>
      </div>
    ),
    size,
  );
}
