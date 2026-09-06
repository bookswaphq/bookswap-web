"use client";

import { useMemo } from "react";
import {
  BOARD_WIDTH,
  type FlatBook,
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_SPINES,
  LEFT_STACK,
  PALETTE,
  PROP_X,
  RIGHT_SPINES,
  RIGHT_STACK,
  SHELVES,
  type Spine,
  layoutRow,
} from "./scene-config";

/**
 * The same two shelves, drawn flat. This is what phones, reduced-motion
 * visitors and browsers without WebGL get — it carries the same story (two
 * books leave their shelves, meet in the middle and trade places) without
 * loading three.js.
 */

/** Scene units → SVG units. */
const S = 64;
/** Scene y at the top of the frame; everything is measured down from here. */
const TOP_Y = 3.05;
const BOTTOM_Y = 0.16;

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
    { at: 0.22, dx: 0, dy: rise(1.58), rot: -6 * origin },
    { at: 0.36, dx: lane - home, dy: rise(1.9), rot: -14 * origin },
    { at: 0.5, dx: lane * 0.66 - home, dy: rise(1.86), rot: -18 * origin },
    { at: 0.64, dx: -lane - home, dy: rise(1.94), rot: 9 * origin },
    { at: 0.78, dx: away - home, dy: rise(1.58), rot: 4 * origin },
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
        const below = books
          .slice(0, index)
          .reduce((sum, other) => sum + other.h * S, 0);
        return { book, y: baseline - below - h, w: book.w * S, h };
      }),
    [books, baseline]
  );

  return (
    <g>
      {placed.map(({ book, y, w, h }, index) => {
        return (
          <g key={index}>
            <rect x={x - w / 2} y={y} width={w} height={h} rx={1.5} fill={book.color} />
            <rect
              x={x + w / 2 - 3}
              y={y + h * 0.12}
              width={3}
              height={h * 0.76}
              fill="#F4EEE2"
            />
          </g>
        );
      })}
    </g>
  );
}

/** A point and a tangent angle along a cubic bezier, for placing ivy leaves. */
function onCurve(p: [number, number][], t: number) {
  const u = 1 - t;
  const at = (k: 0 | 1) =>
    u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k];
  const slope = (k: 0 | 1) =>
    3 * u * u * (p[1][k] - p[0][k]) +
    6 * u * t * (p[2][k] - p[1][k]) +
    3 * t * t * (p[3][k] - p[2][k]);

  return { x: at(0), y: at(1), angle: (Math.atan2(slope(1), slope(0)) * 180) / Math.PI };
}

function Ivy({ x, baseline }: { x: number; baseline: number }) {
  const curve: [number, number][] = useMemo(
    () => [
      [x + 3, baseline - 8],
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
          size: 9 * (1 - t * 0.45),
          light: i % 3 === 0,
        };
      }),
    [curve]
  );

  return (
    <g>
      {/* Pot. */}
      <rect x={x - 9} y={baseline - 16} width={18} height={16} rx={3} fill={PALETTE.terracotta} />
      <rect x={x - 10.5} y={baseline - 19} width={21} height={4} rx={1.5} fill="#A8552F" />

      {/* Trailing vine. */}
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

function Lamp({ x, baseline }: { x: number; baseline: number }) {
  return (
    <g>
      <circle className="bs-lamp" cx={x} cy={baseline - 22} r={30} fill="url(#bs-warm)" />
      <rect x={x - 9} y={baseline - 4} width={18} height={4} rx={2} fill={PALETTE.plumDeep} />
      <rect x={x - 1.4} y={baseline - 24} width={2.8} height={21} fill={PALETTE.plumDeep} />
      <path
        d={`M ${x - 12} ${baseline - 23} L ${x + 12} ${baseline - 23} L ${x + 8} ${baseline - 38} L ${x - 8} ${baseline - 38} Z`}
        fill={PALETTE.plum}
      />
    </g>
  );
}

function ShelfUnit({
  side,
  shelf,
  spines,
  stack,
  prop,
}: {
  side: -1 | 1;
  shelf: (typeof SHELVES)["left"] | (typeof SHELVES)["right"];
  spines: Spine[];
  stack: FlatBook[];
  prop: "ivy" | "lamp";
}) {
  const { offsets } = useMemo(() => layoutRow(spines), [spines]);
  const cx = shelf.x * S;
  const baseline = px(shelf.top);
  const propX = cx + side * PROP_X * S;

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

      {spines.map((spine, index) =>
        index === HERO_INDEX ? null : (
          <SpineRect
            key={index}
            spine={spine}
            x={cx + offsets[index] * S}
            baseline={baseline}
          />
        )
      )}

      <Stack books={stack} x={cx - side * PROP_X * S} baseline={baseline} />

      {prop === "ivy" ? (
        <Ivy x={propX} baseline={baseline} />
      ) : (
        <Lamp x={propX} baseline={baseline} />
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

  const halfWidth = 3.95 * S;

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
        @keyframes bs-lamp {
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
        .bs-lamp { animation: bs-lamp 6s ease-in-out infinite; opacity: 0.75; }
        .bs-meeting {
          animation: bs-meeting 24s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .bs-traveller, .bs-wash, .bs-lamp, .bs-meeting { animation: none !important; }
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

        <ShelfUnit
          side={-1}
          shelf={SHELVES.left}
          spines={LEFT_SPINES}
          stack={LEFT_STACK}
          prop="ivy"
        />
        <ShelfUnit
          side={1}
          shelf={SHELVES.right}
          spines={RIGHT_SPINES}
          stack={RIGHT_STACK}
          prop="lamp"
        />

        {/* The light that gathers between the books as they meet. */}
        <circle className="bs-meeting" cx={0} cy={px(1.9)} r={52} fill="url(#bs-spark)" />

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
