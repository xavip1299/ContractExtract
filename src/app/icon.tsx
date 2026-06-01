import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "7px",
        }}
      >
        {/* Document shape */}
        <div
          style={{
            background: "white",
            width: "17px",
            height: "21px",
            borderRadius: "2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            position: "relative",
          }}
        >
          {/* Lines representing contract text */}
          <div style={{ background: "#2563EB", width: "11px", height: "2px", borderRadius: "1px", opacity: 0.7 }} />
          <div style={{ background: "#2563EB", width: "11px", height: "2px", borderRadius: "1px", opacity: 0.7 }} />
          <div style={{ background: "#2563EB", width: "7px", height: "2px", borderRadius: "1px", opacity: 0.7 }} />
          {/* Spark dot */}
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "#FCD34D",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
