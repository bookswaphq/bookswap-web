import * as THREE from "three";
import { PALETTE } from "./scene-config";

/**
 * Small painted props. Drawing the ivy rather than modelling it keeps the
 * scene closer to an illustration, and costs one draw call.
 * These run in the browser only; the scene is client-side.
 */

function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

type Point = { x: number; y: number };

/** A point and a tangent angle along a cubic bezier. */
function onCurve(p: Point[], t: number) {
  const u = 1 - t;
  const at = (k: "x" | "y") =>
    u * u * u * p[0][k] +
    3 * u * u * t * p[1][k] +
    3 * u * t * t * p[2][k] +
    t * t * t * p[3][k];
  const slope = (k: "x" | "y") =>
    3 * u * u * (p[1][k] - p[0][k]) +
    6 * u * t * (p[2][k] - p[1][k]) +
    3 * t * t * (p[3][k] - p[2][k]);

  return {
    x: at("x"),
    y: at("y"),
    angle: Math.atan2(slope("y"), slope("x")),
  };
}

function vine(
  ctx: CanvasRenderingContext2D,
  path: Point[],
  options: { from: number; leaves: number; size: number; width: number }
) {
  ctx.strokeStyle = PALETTE.stem;
  ctx.lineWidth = options.width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  ctx.bezierCurveTo(
    path[1].x,
    path[1].y,
    path[2].x,
    path[2].y,
    path[3].x,
    path[3].y
  );
  ctx.stroke();

  for (let i = 0; i < options.leaves; i += 1) {
    const t = options.from + ((1 - options.from) * i) / (options.leaves - 1);
    const at = onCurve(path, t);
    const side = i % 2 === 0 ? 1 : -1;
    // Leaves get smaller toward the tip of the vine.
    const scale = options.size * (1 - t * 0.45);

    ctx.save();
    ctx.translate(at.x, at.y);
    ctx.rotate(at.angle + side * 1.05);
    ctx.fillStyle = i % 3 === 0 ? PALETTE.leafLight : PALETTE.leaf;
    ctx.beginPath();
    ctx.ellipse(scale * 0.9, 0, scale, scale * 0.68, 0, 0, Math.PI * 2);
    ctx.fill();
    // The notch that makes it read as a leaf rather than a dot.
    ctx.beginPath();
    ctx.moveTo(scale * 1.85, 0);
    ctx.lineTo(scale * 1.15, scale * 0.42);
    ctx.lineTo(scale * 1.15, -scale * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

/** Ivy trailing down over the edge of a shelf. */
export function makeIvyTexture() {
  return canvasTexture(300, 560, (ctx) => {
    vine(
      ctx,
      [
        { x: 168, y: 30 },
        { x: 254, y: 168 },
        { x: 66, y: 322 },
        { x: 126, y: 522 },
      ],
      { from: 0.1, leaves: 12, size: 24, width: 6 }
    );

    vine(
      ctx,
      [
        { x: 150, y: 34 },
        { x: 54, y: 128 },
        { x: 186, y: 228 },
        { x: 108, y: 352 },
      ],
      { from: 0.18, leaves: 8, size: 19, width: 5 }
    );
  });
}

/** Soft round falloff, used for glows and for the shadows under the shelves. */
export function makeGlowTexture() {
  return canvasTexture(256, 256, (ctx) => {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.28, "rgba(255,255,255,0.55)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.16)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  });
}
