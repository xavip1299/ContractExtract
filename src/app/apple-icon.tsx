import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2563EB",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        {/* Document shape */}
        <div
          style={{
            background: "white",
            width: "95px",
            height: "115px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "relative",
          }}
        >
          <div style={{ background: "#2563EB", width: "60px", height: "8px", borderRadius: "4px", opacity: 0.7 }} />
          <div style={{ background: "#2563EB", width: "60px", height: "8px", borderRadius: "4px", opacity: 0.7 }} />
          <div style={{ background: "#2563EB", width: "40px", height: "8px", borderRadius: "4px", opacity: 0.7 }} />
          {/* Spark dot */}
          <div
            style={{
              position: "absolute",
              top: "-12px",
              right: "-12px",
              background: "#FCD34D",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
