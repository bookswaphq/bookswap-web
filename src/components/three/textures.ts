import * as THREE from "three";
import { PALETTE } from "./scene-config";

/**
 * Painted backdrops for the two nooks. Drawing the alcove, its lamplight and
 * the reader silhouette onto canvases — rather than modelling them — keeps the
 * scene closer to an illustration than to a rendering, and costs one draw call
 * each. All of these run in the browser only; the scene is client-side.
 */

function rounded(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
  ctx.fill();
}

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

/** The arched alcove: warm wall, lamplight pooling near the top, floor below. */
export function makeArchTexture() {
  return canvasTexture(512, 560, (ctx) => {
    const W = 512;
    const H = 560;
    const inset = 8;
    const radius = W / 2 - inset;
    const springLine = 268;

    const arch = () => {
      ctx.beginPath();
      ctx.moveTo(inset, H);
      ctx.lineTo(inset, springLine);
      ctx.arc(W / 2, springLine, radius, Math.PI, 0);
      ctx.lineTo(W - inset, H);
      ctx.closePath();
    };

    // Soft drop shadow so the alcove lifts off the page panel.
    ctx.save();
    ctx.shadowColor = "rgba(42, 33, 48, 0.20)";
    ctx.shadowBlur = 34;
    ctx.shadowOffsetY = 14;
    const wall = ctx.createLinearGradient(0, springLine - radius, 0, H);
    wall.addColorStop(0, PALETTE.wallTop);
    wall.addColorStop(0.62, PALETTE.wallBottom);
    wall.addColorStop(1, PALETTE.floor);
    ctx.fillStyle = wall;
    arch();
    ctx.fill();
    ctx.restore();

    ctx.save();
    arch();
    ctx.clip();

    // Lamplight washing down the back wall.
    const pool = ctx.createRadialGradient(W / 2, 150, 10, W / 2, 190, 330);
    pool.addColorStop(0, "rgba(255, 205, 140, 0.62)");
    pool.addColorStop(0.45, "rgba(255, 196, 128, 0.26)");
    pool.addColorStop(1, "rgba(255, 190, 120, 0)");
    ctx.fillStyle = pool;
    ctx.fillRect(0, 0, W, H);

    // Floor, and the shadow the alcove throws into its own corners.
    ctx.fillStyle = PALETTE.floor;
    ctx.fillRect(0, 484, W, H - 484);

    const corner = ctx.createLinearGradient(0, 360, 0, 560);
    corner.addColorStop(0, "rgba(42, 33, 48, 0)");
    corner.addColorStop(1, "rgba(42, 33, 48, 0.20)");
    ctx.fillStyle = corner;
    ctx.fillRect(0, 360, W, 200);

    const sides = ctx.createLinearGradient(0, 0, W, 0);
    sides.addColorStop(0, "rgba(42, 33, 48, 0.16)");
    sides.addColorStop(0.25, "rgba(42, 33, 48, 0)");
    sides.addColorStop(0.75, "rgba(42, 33, 48, 0)");
    sides.addColorStop(1, "rgba(42, 33, 48, 0.16)");
    ctx.fillStyle = sides;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // Thin ink keyline, the way an illustration would be inked.
    ctx.strokeStyle = "rgba(42, 33, 48, 0.13)";
    ctx.lineWidth = 3;
    arch();
    ctx.stroke();
  });
}

/** A reader in an armchair, in profile, drawn white so the material can tint it. */
export function makeSilhouetteTexture() {
  return canvasTexture(320, 360, (ctx) => {
    ctx.fillStyle = "#FFFFFF";

    // Armchair, seen from the side: back, seat, and a turned front leg.
    ctx.save();
    ctx.translate(96, 176);
    ctx.rotate(-0.07);
    rounded(ctx, -34, -80, 62, 224, 26);
    ctx.restore();

    rounded(ctx, 70, 232, 168, 40, 18);
    rounded(ctx, 208, 262, 22, 72, 10);
    rounded(ctx, 84, 262, 20, 68, 9);

    // The reader: head, curved back, legs crossed toward the light.
    ctx.beginPath();
    ctx.arc(150, 84, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(146, 168);
    ctx.rotate(0.1);
    rounded(ctx, -34, -62, 74, 130, 32);
    ctx.restore();

    rounded(ctx, 150, 210, 96, 34, 17);
    rounded(ctx, 214, 232, 30, 62, 14);

    // Arm and the book it is holding up to the lamp.
    ctx.save();
    ctx.translate(196, 150);
    ctx.rotate(-0.34);
    rounded(ctx, -46, -13, 84, 26, 12);
    rounded(ctx, 26, -34, 16, 66, 5);
    ctx.restore();
  });
}

/** Soft round falloff, used for lamp bloom and for grounding shadows. */
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
