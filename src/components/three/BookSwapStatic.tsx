"use client";

import { useMemo } from "react";
import {
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_SPINES,
  PALETTE,
  RIGHT_SPINES,
  SHELF_TOP_Y,
  SHELF_X,
  type Spine,
  layoutRow,
} from "./scene-config";

/**
 * The same two reading nooks, drawn flat. This is what phones, reduced-motion
 * visitors and browsers without WebGL get — it carries the same story (two
 * books leave their shelves, meet in the middle, trade places, and the nooks
 * warm up as they land) without loading three.js.
 */

/** Scene units → SVG units. */
const S = 60;
/** Scene y of the arch apex; everything is measured down from here. */
const TOP_Y = 3.62;
const FLOOR_Y = -0.42;

const px = (sceneY: number) => (TOP_Y - sceneY) * S;

const ARCH_HALF = 117;
const SPRING_Y = px(1.687);
const FLOOR_PX = px(FLOOR_Y);
const SHELF_PX = px(SHELF_TOP_Y);

/** The flight of one book, as offsets from its home slot. */
type Pose = { at: number; dx: number; dy: number; rot: number };

function storyboard(home: number, away: number, origin: -1 | 1): Pose[] {
  const lane = 0.44 * S * origin;
  const rise = (y: number) => -(y - SHELF_TOP_Y) * S;

  return [
    { at: 0, dx: 0, dy: 0, rot: 0 },
    { at: 0.09, dx: 0, dy: 0, rot: 0 },
    { at: 0.22, dx: 0, dy: rise(1.82), rot: -6 * origin },
    { at: 0.36, dx: lane - home, dy: rise(2.16), rot: -14 * origin },
    { at: 0.5, dx: lane * 0.66 - home, dy: rise(2.1), rot: -18 * origin },
    { at: 0.64, dx: -lane - home, dy: rise(2.2), rot: 9 * origin },
    { at: 0.78, dx: away - home, dy: rise(1.82), rot: 4 * origin },
    { at: 0.89, dx: away - home, dy: 0, rot: 0 },
    { at: 1, dx: away - home, dy: 0, rot: 0 },
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

/* ------------------------------------------------------------------ parts */

function SpineRect({ spine, x }: { spine: Spine; x: number }) {
  const w = spine.w * S;
  const h = spine.h * S;

  return (
    <g
      transform={`rotate(${((spine.tilt ?? 0) * 180) / Math.PI} ${x} ${SHELF_PX})`}
    >
      <rect
        x={x - w / 2}
        y={SHELF_PX - h}
        width={w}
        height={h}
        rx={2}
        fill={spine.color}
      />
      {spine.band ? (
        <rect
          x={x - w * 0.25}
          y={SHELF_PX - h * 0.72}
          width={w * 0.5}
          height={2.5}
          rx={1.25}
          fill={PALETTE.lampCore}
          opacity={0.85}
        />
      ) : null}
    </g>
  );
}

function Nook({
  side,
  spines,
  clipId,
}: {
  side: -1 | 1;
  spines: Spine[];
  clipId: string;
}) {
  const { offsets, width } = useMemo(() => layoutRow(spines), [spines]);
  const cx = side * SHELF_X * S;
  const board = (width + 0.34) * S;

  const arch = `M ${cx - ARCH_HALF} ${FLOOR_PX} L ${cx - ARCH_HALF} ${SPRING_Y} A ${ARCH_HALF} ${ARCH_HALF} 0 0 1 ${cx + ARCH_HALF} ${SPRING_Y} L ${cx + ARCH_HALF} ${FLOOR_PX} Z`;

  return (
    <g>
      <clipPath id={clipId}>
        <path d={arch} />
      </clipPath>

      <path d={arch} fill="url(#bs-wall)" />

      <g clipPath={`url(#${clipId})`}>
        {/* Floor of the nook. */}
        <rect
          x={cx - ARCH_HALF}
          y={px(0.24)}
          width={ARCH_HALF * 2}
          height={FLOOR_PX - px(0.24)}
          fill={PALETTE.floor}
        />

        {/* Reader, sitting out of focus under the lamp. */}
        <g
          opacity={0.115}
          fill={PALETTE.silhouette}
          transform={`translate(${cx + side * 0.52 * S} ${px(0.44)}) scale(${-side * 0.3} 0.3) translate(-160 -180)`}
        >
          <g transform="translate(96 176) rotate(-4)">
            <rect x={-34} y={-80} width={62} height={224} rx={26} />
          </g>
          <rect x={70} y={232} width={168} height={40} rx={18} />
          <rect x={208} y={262} width={22} height={72} rx={10} />
          <rect x={84} y={262} width={20} height={68} rx={9} />
          <circle cx={150} cy={84} r={30} />
          <g transform="translate(146 168) rotate(6)">
            <rect x={-34} y={-62} width={74} height={130} rx={32} />
          </g>
          <rect x={150} y={210} width={96} height={34} rx={17} />
          <rect x={214} y={232} width={30} height={62} rx={14} />
          <g transform="translate(196 150) rotate(-19)">
            <rect x={-46} y={-13} width={84} height={26} rx={12} />
            <rect x={26} y={-34} width={16} height={66} rx={5} />
          </g>
        </g>

        {/* Lamplight pooling on the back wall. */}
        <ellipse
          className="bs-bloom"
          cx={cx}
          cy={px(2.05)}
          rx={120}
          ry={112}
          fill="url(#bs-pool)"
        />
      </g>

      {/* Pendant lamp. */}
      <line
        x1={cx}
        y1={px(3.6)}
        x2={cx}
        y2={px(2.86)}
        stroke={PALETTE.shade}
        strokeWidth={1.6}
      />
      <path
        d={`M ${cx} ${px(2.86)} L ${cx + 18} ${px(2.5)} L ${cx - 18} ${px(2.5)} Z`}
        fill={PALETTE.shade}
      />
      <circle
        className="bs-bloom"
        cx={cx}
        cy={px(2.46)}
        r={26}
        fill="url(#bs-pool)"
      />
      <circle cx={cx} cy={px(2.48)} r={5} fill={PALETTE.lampCore} />

      {/* Shelf. */}
      <rect
        x={cx - board / 2}
        y={SHELF_PX}
        width={board}
        height={6}
        rx={3}
        fill={PALETTE.wood}
      />
      <rect
        x={cx - board / 2}
        y={SHELF_PX + 6}
        width={board}
        height={2.5}
        fill={PALETTE.woodDark}
        opacity={0.7}
      />

      {spines.map((spine, index) =>
        index === HERO_INDEX ? null : (
          <SpineRect key={index} spine={spine} x={cx + offsets[index] * S} />
        )
      )}
    </g>
  );
}

/* --------------------------------------------------------------- exported */

export default function BookSwapStatic() {
  const left = useMemo(() => layoutRow(LEFT_SPINES), []);
  const right = useMemo(() => layoutRow(RIGHT_SPINES), []);

  const leftHome = (-SHELF_X + left.offsets[HERO_INDEX]) * S;
  const rightHome = (SHELF_X + right.offsets[HERO_INDEX]) * S;
  const leftAway = (SHELF_X + right.offsets[HERO_INDEX]) * S;
  const rightAway = (-SHELF_X + left.offsets[HERO_INDEX]) * S;

  const css = useMemo(
    () =>
      [
        keyframesFor("bs-left", storyboard(leftHome, leftAway, -1)),
        keyframesFor("bs-right", storyboard(rightHome, rightAway, 1)),
      ].join(" "),
    [leftHome, leftAway, rightHome, rightAway]
  );

  const viewWidth = (SHELF_X * S + ARCH_HALF + 16) * 2;

  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center select-none"
    >
      <style>{`
        ${css}
        @keyframes bs-bloom {
          0%, 38%   { opacity: 0.42; }
          47%       { opacity: 0.95; }
          62%, 88%  { opacity: 0.42; }
          97%       { opacity: 0.95; }
          100%      { opacity: 0.55; }
        }
        @keyframes bs-meeting {
          0%, 16%  { opacity: 0; transform: scale(0.7); }
          25%      { opacity: 0.75; transform: scale(1); }
          32%      { opacity: 0; transform: scale(0.7); }
          66%      { opacity: 0; transform: scale(0.7); }
          75%      { opacity: 0.75; transform: scale(1); }
          84%, 100%{ opacity: 0; transform: scale(0.7); }
        }
        .bs-traveller {
          animation: 24s linear infinite;
          transform-box: fill-box;
          transform-origin: center bottom;
        }
        .bs-bloom { animation: bs-bloom 24s ease-in-out infinite; opacity: 0.42; }
        .bs-meeting {
          animation: bs-meeting 24s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .bs-traveller, .bs-bloom, .bs-meeting { animation: none !important; }
        }
      `}</style>

      <svg
        viewBox={`${-viewWidth / 2} -6 ${viewWidth} ${FLOOR_PX + 14}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="bs-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PALETTE.wallTop} />
            <stop offset="62%" stopColor={PALETTE.wallBottom} />
            <stop offset="100%" stopColor={PALETTE.floor} />
          </linearGradient>

          <radialGradient id="bs-pool">
            <stop offset="0%" stopColor={PALETTE.lamp} stopOpacity={0.72} />
            <stop offset="45%" stopColor={PALETTE.lamp} stopOpacity={0.26} />
            <stop offset="100%" stopColor={PALETTE.lamp} stopOpacity={0} />
          </radialGradient>

          <radialGradient id="bs-spark">
            <stop offset="0%" stopColor={PALETTE.lampCore} stopOpacity={0.9} />
            <stop offset="100%" stopColor={PALETTE.lampCore} stopOpacity={0} />
          </radialGradient>
        </defs>

        <Nook side={-1} spines={LEFT_SPINES} clipId="bs-clip-left" />
        <Nook side={1} spines={RIGHT_SPINES} clipId="bs-clip-right" />

        {/* The light that gathers between the books as they meet. */}
        <circle
          className="bs-meeting"
          cx={0}
          cy={px(2.14)}
          r={54}
          fill="url(#bs-spark)"
        />

        <g className="bs-traveller" style={{ animationName: "bs-left" }}>
          <SpineRect spine={HERO_LEFT} x={leftHome} />
        </g>
        <g className="bs-traveller" style={{ animationName: "bs-right" }}>
          <SpineRect spine={HERO_RIGHT} x={rightHome} />
        </g>
      </svg>
    </div>
  );
}
