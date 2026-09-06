"use client";

import { useMemo } from "react";
import {
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_SPINES,
  PALETTE,
  RIGHT_SPINES,
  SHELF_X,
  type Spine,
  layoutRow,
} from "./scene-config";

/**
 * Dependency-free stand-in for the WebGL hero: the same two shelves and the
 * same pair of travelling books, drawn as an SVG from the shared layout so the
 * books line up with the gaps they left behind. Used on small screens, when the
 * visitor prefers reduced motion, and wherever WebGL is unavailable — the
 * global reduced-motion rule in globals.css freezes it into a still image.
 */

/** Scene units → SVG units. */
const S = 44;
const BOARD_H = 8;
const UPRIGHT_W = 6;

type Placed = { spine: Spine; x: number };

function shelfGeometry(spines: Spine[], shelfX: number) {
  const { offsets, width } = layoutRow(spines);
  const board = width + 0.5;

  const placed: Placed[] = spines.map((spine, index) => ({
    spine,
    x: (shelfX + offsets[index]) * S,
  }));

  return {
    placed,
    boardX: (shelfX - board / 2) * S,
    boardW: board * S,
    heroX: (shelfX + offsets[HERO_INDEX]) * S,
    top: -Math.max(...spines.map((s) => s.h)) * S,
  };
}

function SpineRect({ spine, x }: Placed) {
  const w = spine.w * S;
  const h = spine.h * S;
  const outlined =
    spine.color === PALETTE.paperCard || spine.color === PALETTE.primarySoft;

  return (
    <g transform={`rotate(${((spine.tilt ?? 0) * 180) / Math.PI} ${x} 0)`}>
      <rect
        x={x - w / 2}
        y={-h}
        width={w}
        height={h}
        rx={1.5}
        fill={spine.color}
        stroke={outlined ? PALETTE.border : "none"}
        strokeWidth={outlined ? 1 : 0}
      />
      {spine.band ? (
        <rect
          x={x - w * 0.28}
          y={-h * 0.72}
          width={w * 0.56}
          height={3}
          rx={1.5}
          fill="#FFFFFF"
          opacity={0.85}
        />
      ) : null}
    </g>
  );
}

function Shelf({
  geometry,
}: {
  geometry: ReturnType<typeof shelfGeometry>;
}) {
  return (
    <g>
      {geometry.placed.map((placed, index) =>
        index === HERO_INDEX ? null : (
          <SpineRect key={index} spine={placed.spine} x={placed.x} />
        )
      )}

      {[0, 1].map((side) => (
        <rect
          key={side}
          x={
            side === 0
              ? geometry.boardX
              : geometry.boardX + geometry.boardW - UPRIGHT_W
          }
          y={-1.72 * S}
          width={UPRIGHT_W}
          height={1.72 * S}
          rx={2}
          fill={PALETTE.woodEdge}
        />
      ))}

      <rect
        x={geometry.boardX}
        y={0}
        width={geometry.boardW}
        height={BOARD_H}
        rx={BOARD_H / 2}
        fill={PALETTE.woodEdge}
      />
    </g>
  );
}

export default function BookSwapStatic() {
  const left = useMemo(() => shelfGeometry(LEFT_SPINES, -SHELF_X), []);
  const right = useMemo(() => shelfGeometry(RIGHT_SPINES, SHELF_X), []);

  const dx = right.heroX - left.heroX;
  const lift = 1.95 * S;

  const minX = left.boardX - 14;
  const maxX = right.boardX + right.boardW + 14;
  const top = -(1.72 + 2.05) * S;

  return (
    <div aria-hidden="true" className="w-full h-full flex items-center justify-center select-none">
      <style>{`
        @keyframes bs-swap {
          0%,   10% { transform: translate(0px, 0px) rotate(0deg); }
          50%       { transform: translate(var(--bs-hx), calc(var(--bs-lift) * -1)) rotate(180deg); }
          90%, 100% { transform: translate(var(--bs-dx), 0px) rotate(360deg); }
        }
        .bs-traveller {
          animation: bs-swap 9s cubic-bezier(0.65, 0, 0.35, 1) infinite alternate;
          transform-box: fill-box;
          transform-origin: center;
        }
        /* Rest the books in their own shelves instead of freezing mid-flight. */
        @media (prefers-reduced-motion: reduce) {
          .bs-traveller { animation: none !important; }
        }
      `}</style>

      <svg
        viewBox={`${minX} ${top} ${maxX - minX} ${-top + BOARD_H + 6}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="presentation"
      >
        <Shelf geometry={left} />
        <Shelf geometry={right} />

        <g
          className="bs-traveller"
          style={
            {
              "--bs-dx": `${dx}px`,
              "--bs-hx": `${dx / 2}px`,
              "--bs-lift": `${lift}px`,
            } as React.CSSProperties
          }
        >
          <SpineRect spine={HERO_LEFT} x={left.heroX} />
        </g>

        <g
          className="bs-traveller"
          style={
            {
              "--bs-dx": `${-dx}px`,
              "--bs-hx": `${-dx / 2}px`,
              "--bs-lift": `${lift * 0.1}px`,
            } as React.CSSProperties
          }
        >
          <SpineRect spine={HERO_RIGHT} x={right.heroX} />
        </g>
      </svg>
    </div>
  );
}
