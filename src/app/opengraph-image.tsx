import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "APT Recruiting: Physical Therapy, OT & SLP Recruiters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Root-level OG image; cascades to every route that doesn't define its own.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#044463",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 56, backgroundColor: "#1883AA", borderRadius: 3 }} />
          <div style={{ color: "#ffffff", fontSize: 44, fontWeight: 700 }}>APT Recruiting</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            <div style={{ color: "#ffffff" }}>Physical therapy, OT and SLP recruiters.</div>
            <div style={{ color: "#7fc1dd" }}>Run by a licensed speech-language pathologist.</div>
          </div>
          <div style={{ color: "#d3e1ea", fontSize: 28 }}>{SITE.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
