import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const titulo = (searchParams.get("titulo") ?? "Aprende medicina por mecanismo, no por memoria").slice(0, 110);

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: 72, background: "#0f1719", color: "#e6eeef",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#2aa9a5" }} />
          <div style={{ fontSize: 30, fontWeight: 600 }}>Corpus</div>
        </div>
        <div style={{ fontSize: 62, fontWeight: 600, lineHeight: 1.12, letterSpacing: -1.5, maxWidth: 980 }}>
          {titulo}
        </div>
        <div style={{ fontSize: 25, color: "#8fa3a6" }}>
          Plataforma abierta de estudio médico · corpus.study
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
