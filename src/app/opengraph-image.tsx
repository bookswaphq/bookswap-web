import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getAppIconDataUri() {
  const filePath = path.join(process.cwd(), "public", "bookswap-icon.png");
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default function OpengraphImage() {
  const appIcon = getAppIconDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8F5F1",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "#F0E5F8",
            top: -140,
            right: -100,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "#F6EFFB",
            bottom: -120,
            left: -80,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={appIcon}
          width={140}
          height={140}
          style={{ borderRadius: 32, marginBottom: 32 }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#1B1720",
          }}
        >
          BookSwap
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#6B6673",
            marginTop: 16,
          }}
        >
          Discover books. Exchange stories.
        </div>
      </div>
    ),
    { ...size }
  );
}
