"use client";

import { useMemo } from "react";
import {
  BOARD_WIDTH,
  type FlatBook,
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_FRAME_X,
  LEFT_SPINES,
  PALETTE,
  PROP_X,
  RIGHT_MUG_X,
  RIGHT_SPINES,
  RIGHT_STACK,
  RIGHT_STACK_X,
  SHELVES,
  type Spine,
  layoutRow,
} from "./scene-config";

/**
 * The same two shelves, drawn flat. This is what phones, reduced-motion
 * visitors and browsers without WebGL get — the same two rooms and the same
 * story, without loading three.js.
 */

/** Scene units → SVG units. */
const S = 64;
/** Scene y at the top of the frame; everything is measured down from here. */
const TOP_Y = 2.86;
const BOTTOM_Y = 0.1;

const px = (sceneY: number) => (TOP_Y - sceneY) * S;
const BOARD_PX = BOARD_WIDTH * S;

/* ------------------------------------------------------------ storyboard */

type Pose = { at: number; dx: number; dy: number; rot: number };

function storyboard(
  home: number,
  away: number,
  homeY: number,
  awayY: number,
  origin: -1 | 1
): Pose[] {
  const lane = 0.44 * S * origin;
  const rise = (y: number) => -(y - homeY) * S;

  return [
    { at: 0, dx: 0, dy: 0, rot: 0 },
    { at: 0.09, dx: 0, dy: 0, rot: 0 },
    { at: 0.22, dx: 0, dy: rise(1.5), rot: -6 * origin },
    { at: 0.36, dx: lane - home, dy: rise(1.78), rot: -14 * origin },
    { at: 0.5, dx: lane * 0.66 - home, dy: rise(1.74), rot: -18 * origin },
    { at: 0.64, dx: -lane - home, dy: rise(1.82), rot: 9 * origin },
    { at: 0.78, dx: away - home, dy: rise(1.5), rot: 4 * origin },
    { at: 0.89, dx: away - home, dy: rise(awayY), rot: 0 },
    { at: 1, dx: away - home, dy: rise(awayY), rot: 0 },
  ];
}

/** Turn a storyboard into a there-and-back @keyframes block. */
function keyframesFor(name: string, poses: Pose[]) {
  const frame = (pct: number, pose: Pose) =>
    `${pct.toFixed(2)}% { transform: translate(${pose.dx.toFixed(1)}px, ${pose.dy.toFixed(1)}px) rotate(${pose.rot}deg); }`;

  const out = poses.map((pose) => frame(pose.at * 50, pose));
  const back = poses
    .slice(0, -1)
    .reverse()
    .map((pose) => frame(100 - pose.at * 50, pose));

  return `@keyframes ${name} { ${out.concat(back).join(" ")} }`;
}

/* ----------------------------------------------------------------- parts */

function SpineRect({
  spine,
  x,
  baseline,
}: {
  spine: Spine;
  x: number;
  baseline: number;
}) {
  const w = spine.w * S;
  const h = spine.h * S;

  return (
    <g transform={`rotate(${((spine.tilt ?? 0) * 180) / Math.PI} ${x} ${baseline})`}>
      <rect x={x - w / 2} y={baseline - h} width={w} height={h} rx={2} fill={spine.color} />
      {spine.band ? (
        <rect
          x={x - w * 0.25}
          y={baseline - h * 0.72}
          width={w * 0.5}
          height={2.5}
          rx={1.25}
          fill="#FFFFFF"
          opacity={0.75}
        />
      ) : null}
    </g>
  );
}

function Stack({
  books,
  x,
  baseline,
}: {
  books: FlatBook[];
  x: number;
  baseline: number;
}) {
  // Cumulative heights, so each book sits on the one below it.
  const placed = useMemo(
    () =>
      books.map((book, index) => {
        const h = book.h * S;
        const below = books.slice(0, index).reduce((sum, other) => sum + other.h * S, 0);
        return { book, y: baseline - below - h, w: book.w * S, h };
      }),
    [books, baseline]
  );

  return (
    <g>
      {placed.map(({ book, y, w, h }, index) => (
        <g key={index}>
          <rect x={x - w / 2} y={y} width={w} height={h} rx={1.5} fill={book.color} />
          <rect x={x + w / 2 - 3} y={y + h * 0.12} width={3} height={h * 0.76} fill="#F4EEE2" />
        </g>
      ))}
    </g>
  );
}

/** A point and a tangent angle along a cubic bezier, for placing leaves. */
function onCurve(p: [number, number][], t: number) {
  const u = 1 - t;
  const at = (k: 0 | 1) =>
    u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k];
  const slope = (k: 0 | 1) =>
    3 * u * u * (p[1][k] - p[0][k]) +
    6 * u * t * (p[2][k] - p[1][k]) +
    3 * t * t * (p[3][k] - p[2][k]);

  // Round every value that ends up in an attribute: Math.atan2 can differ in
  // its last digit between the server's engine and the browser's, and React
  // reports that as a hydration mismatch.
  const round = (value: number) => Math.round(value * 1000) / 1000;

  return {
    x: round(at(0)),
    y: round(at(1)),
    angle: round((Math.atan2(slope(1), slope(0)) * 180) / Math.PI),
  };
}

function Plant({ x, baseline }: { x: number; baseline: number }) {
  const curve: [number, number][] = useMemo(
    () => [
      [x + 3, baseline - 10],
      [x + 34, baseline + 34],
      [x - 26, baseline + 74],
      [x + 6, baseline + 124],
    ],
    [x, baseline]
  );

  const leaves = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const t = 0.1 + (0.9 * i) / 9;
        const at = onCurve(curve, t);
        return {
          ...at,
          side: i % 2 === 0 ? 1 : -1,
          size: Math.round(9 * (1 - t * 0.45) * 100) / 100,
          light: i % 3 === 0,
        };
      }),
    [curve]
  );

  return (
    <g>
      {/* Sage pot. */}
      <path
        d={`M ${x - 9} ${baseline - 15} L ${x + 9} ${baseline - 15} L ${x + 7} ${baseline} L ${x - 7} ${baseline} Z`}
        fill={PALETTE.sage}
      />
      <rect x={x - 10.5} y={baseline - 18.5} width={21} height={4} rx={1.5} fill={PALETTE.sageDark} />

      {/* Greenery trailing over the edge. */}
      <path
        d={`M ${curve[0][0]} ${curve[0][1]} C ${curve[1][0]} ${curve[1][1]}, ${curve[2][0]} ${curve[2][1]}, ${curve[3][0]} ${curve[3][1]}`}
        fill="none"
        stroke={PALETTE.stem}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {leaves.map((leaf, index) => (
        <g
          key={index}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle + leaf.side * 60})`}
          fill={leaf.light ? PALETTE.leafLight : PALETTE.leaf}
        >
          <ellipse cx={leaf.size * 0.9} cy={0} rx={leaf.size} ry={leaf.size * 0.68} />
          <path
            d={`M ${leaf.size * 1.85} 0 L ${leaf.size * 1.15} ${leaf.size * 0.42} L ${leaf.size * 1.15} ${-leaf.size * 0.42} Z`}
          />
        </g>
      ))}
    </g>
  );
}

/** A small framed mountain drawing, leaning on the shelf. */
function Frame({ x, baseline }: { x: number; baseline: number }) {
  const w = 0.52 * S;
  const h = 0.44 * S;
  const top = baseline - h;

  return (
    <g transform={`rotate(-3 ${x} ${baseline})`}>
      <rect x={x - w / 2} y={top} width={w} height={h} rx={3} fill={PALETTE.tan} />
      <clipPath id="bs-frame-clip">
        <rect x={x - w / 2 + 4} y={top + 4} width={w - 8} height={h - 8} rx={1.5} />
      </clipPath>
      <g clipPath="url(#bs-frame-clip)">
        <rect x={x - w / 2 + 4} y={top + 4} width={w - 8} height={h - 8} fill={PALETTE.paper} />
        <circle cx={x + w * 0.2} cy={top + h * 0.32} r={5} fill="#E7C98B" />
        <path
          d={`M ${x - w / 2} ${baseline} L ${x - w * 0.18} ${top + h * 0.35} L ${x + w * 0.04} ${top + h * 0.62} L ${x + w * 0.22} ${top + h * 0.42} L ${x + w / 2} ${baseline} Z`}
          fill={PALETTE.sage}
        />
        <path
          d={`M ${x - w / 2} ${baseline} L ${x - w * 0.06} ${top + h * 0.42} L ${x + w * 0.4} ${baseline} Z`}
          fill={PALETTE.moss}
        />
      </g>
    </g>
  );
}

/** A ceramic mug at the front of the shelf. */
function Mug({ x, baseline, handle }: { x: number; baseline: number; handle: -1 | 1 }) {
  const w = 0.2 * S;
  const h = 0.22 * S;

  return (
    <g>
      <path
        d={`M ${x - w / 2} ${baseline - h} L ${x + w / 2} ${baseline - h} L ${x + w * 0.42} ${baseline} L ${x - w * 0.42} ${baseline} Z`}
        fill={PALETTE.cream}
      />
      <rect x={x - w * 0.46} y={baseline - 4} width={w * 0.92} height={3} fill={PALETTE.plum} />
      <ellipse cx={x} cy={baseline - h} rx={w * 0.5} ry={2.6} fill="#6B4A2E" />
      <path
        d={`M ${x + (handle * w) / 2} ${baseline - h * 0.75} a 5.5 5.5 0 0 ${handle > 0 ? 1 : 0} 0 ${h * 0.45}`}
        fill="none"
        stroke={PALETTE.cream}
        strokeWidth={3}
      />
    </g>
  );
}

/** Reading glasses, folded and left on top of the stack. */
function Glasses({ x, baseline }: { x: number; baseline: number }) {
  const r = 5.4;

  return (
    <g stroke={PALETTE.ink} strokeWidth={2.2} fill="none" transform={`rotate(-6 ${x} ${baseline})`}>
      <circle cx={x - r - 1} cy={baseline - r} r={r} />
      <circle cx={x + r + 1} cy={baseline - r} r={r} />
      <path d={`M ${x - 1.2} ${baseline - r} L ${x + 1.2} ${baseline - r}`} />
      <path d={`M ${x - 2 * r - 2} ${baseline - r - 1} L ${x - 2 * r - 9} ${baseline - r + 2}`} />
    </g>
  );
}

function ShelfUnit({
  side,
  shelf,
  spines,
  room,
}: {
  side: -1 | 1;
  shelf: (typeof SHELVES)["left"] | (typeof SHELVES)["right"];
  spines: Spine[];
  room: "plants" | "corner";
}) {
  const { offsets } = useMemo(() => layoutRow(spines), [spines]);
  const cx = shelf.x * S;
  const baseline = px(shelf.top);

  return (
    <g>
      {/* Shadows under the board. */}
      <ellipse cx={cx} cy={baseline + 22} rx={BOARD_PX * 0.55} ry={22} fill="url(#bs-shadow)" opacity={0.7} />
      <ellipse
        className="bs-wash"
        cx={cx}
        cy={baseline + 13}
        rx={BOARD_PX * 0.36}
        ry={11}
        fill="url(#bs-shadow)"
        opacity={0.8}
      />

      {/* Board, front edge and brackets. */}
      <rect x={cx - BOARD_PX / 2} y={baseline} width={BOARD_PX} height={6} rx={2.5} fill={shelf.wood} />
      <rect x={cx - BOARD_PX / 2} y={baseline + 5} width={BOARD_PX} height={2.5} fill={shelf.edge} opacity={0.8} />
      {[-1, 1].map((bracket) => (
        <rect
          key={bracket}
          x={cx + bracket * (BOARD_PX / 2 - 0.5 * S) - 3}
          y={baseline + 7}
          width={6}
          height={11}
          rx={1.5}
          fill={shelf.edge}
        />
      ))}

      {room === "plants" ? (
        <Frame x={cx - side * LEFT_FRAME_X * S} baseline={baseline} />
      ) : null}

      {spines.map((spine, index) =>
        index === HERO_INDEX ? null : (
          <SpineRect key={index} spine={spine} x={cx + offsets[index] * S} baseline={baseline} />
        )
      )}

      {room === "plants" ? (
        <Plant x={cx + side * PROP_X * S} baseline={baseline} />
      ) : (
        <>
          <g className="bs-lampglow">
            <circle
              cx={cx + side * PROP_X * S}
              cy={baseline - 22}
              r={32}
              fill="url(#bs-warm)"
            />
          </g>
          <rect x={cx + side * PROP_X * S - 9} y={baseline - 4} width={18} height={4} rx={2} fill={PALETTE.plumDeep} />
          <rect x={cx + side * PROP_X * S - 1.4} y={baseline - 24} width={2.8} height={21} fill={PALETTE.plumDeep} />
          <path
            d={`M ${cx + side * PROP_X * S - 12} ${baseline - 23} L ${cx + side * PROP_X * S + 12} ${baseline - 23} L ${cx + side * PROP_X * S + 8} ${baseline - 38} L ${cx + side * PROP_X * S - 8} ${baseline - 38} Z`}
            fill={PALETTE.plum}
          />

          <Stack books={RIGHT_STACK} x={cx + side * RIGHT_STACK_X * S} baseline={baseline} />
          <Glasses x={cx + side * (RIGHT_STACK_X + 0.02) * S} baseline={baseline} />
          <Mug x={cx + side * RIGHT_MUG_X * S} baseline={baseline} handle={side} />
        </>
      )}
    </g>
  );
}

/* --------------------------------------------------------------- exported */

export default function BookSwapStatic() {
  const left = useMemo(() => layoutRow(LEFT_SPINES), []);
  const right = useMemo(() => layoutRow(RIGHT_SPINES), []);

  const leftHome = (SHELVES.left.x + left.offsets[HERO_INDEX]) * S;
  const rightHome = (SHELVES.right.x + right.offsets[HERO_INDEX]) * S;
  const leftAway = (SHELVES.right.x + right.offsets[HERO_INDEX]) * S;
  const rightAway = (SHELVES.left.x + left.offsets[HERO_INDEX]) * S;

  const css = useMemo(
    () =>
      [
        keyframesFor(
          "bs-left",
          storyboard(leftHome, leftAway, SHELVES.left.top, SHELVES.right.top, -1)
        ),
        keyframesFor(
          "bs-right",
          storyboard(rightHome, rightAway, SHELVES.right.top, SHELVES.left.top, 1)
        ),
      ].join(" "),
    [leftHome, leftAway, rightHome, rightAway]
  );

  const halfWidth = 3.9 * S;

  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center select-none"
    >
      <style>{`
        ${css}
        @keyframes bs-wash {
          0%, 38%   { opacity: 0.5; }
          47%       { opacity: 0.9; }
          62%, 88%  { opacity: 0.5; }
          97%       { opacity: 0.9; }
          100%      { opacity: 0.6; }
        }
        @keyframes bs-lampglow {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 0.95; }
        }
        @keyframes bs-meeting {
          0%, 16%   { opacity: 0; transform: scale(0.7); }
          25%       { opacity: 0.8; transform: scale(1); }
          32%, 66%  { opacity: 0; transform: scale(0.7); }
          75%       { opacity: 0.8; transform: scale(1); }
          84%, 100% { opacity: 0; transform: scale(0.7); }
        }
        .bs-traveller {
          animation: 24s linear infinite;
          transform-box: fill-box;
          transform-origin: center bottom;
        }
        .bs-wash { animation: bs-wash 24s ease-in-out infinite; }
        .bs-lampglow { animation: bs-lampglow 6s ease-in-out infinite; opacity: 0.75; }
        .bs-meeting {
          animation: bs-meeting 24s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .bs-traveller, .bs-wash, .bs-lampglow, .bs-meeting { animation: none !important; }
        }
      `}</style>

      <svg
        viewBox={`${-halfWidth} 0 ${halfWidth * 2} ${px(BOTTOM_Y)}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="presentation"
      >
        <defs>
          <radialGradient id="bs-shadow">
            <stop offset="0%" stopColor={PALETTE.shadow} stopOpacity={0.42} />
            <stop offset="60%" stopColor={PALETTE.shadow} stopOpacity={0.14} />
            <stop offset="100%" stopColor={PALETTE.shadow} stopOpacity={0} />
          </radialGradient>

          <radialGradient id="bs-warm">
            <stop offset="0%" stopColor={PALETTE.lampWarm} stopOpacity={0.85} />
            <stop offset="55%" stopColor={PALETTE.lampWarm} stopOpacity={0.22} />
            <stop offset="100%" stopColor={PALETTE.lampWarm} stopOpacity={0} />
          </radialGradient>

          <radialGradient id="bs-spark">
            <stop offset="0%" stopColor="#FFF3DE" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#FFF3DE" stopOpacity={0} />
          </radialGradient>
        </defs>

        <ShelfUnit side={-1} shelf={SHELVES.left} spines={LEFT_SPINES} room="plants" />
        <ShelfUnit side={1} shelf={SHELVES.right} spines={RIGHT_SPINES} room="corner" />

        {/* The light that gathers between the books as they meet. */}
        <circle className="bs-meeting" cx={0} cy={px(1.78)} r={52} fill="url(#bs-spark)" />

        <g className="bs-traveller" style={{ animationName: "bs-left" }}>
          <SpineRect spine={HERO_LEFT} x={leftHome} baseline={px(SHELVES.left.top)} />
        </g>
        <g className="bs-traveller" style={{ animationName: "bs-right" }}>
          <SpineRect spine={HERO_RIGHT} x={rightHome} baseline={px(SHELVES.right.top)} />
        </g>
      </svg>
    </div>
  );
}
