/**
 * Art direction and layout for the hero's two reading nooks.
 *
 * Kept free of three.js so the SVG fallback can draw the same composition —
 * same nook positions, same shelf, same pair of travelling books — without
 * pulling the 3D bundle onto phones.
 */

export type Spine = {
  /** Spine thickness on the x axis. */
  w: number;
  /** Spine height on the y axis. */
  h: number;
  color: string;
  /** A lighter band, like a title strip across the spine. */
  band?: boolean;
  /** Small lean, in radians, so a shelf reads as lived-in. */
  tilt?: number;
};

/** Warm editorial palette: parchment, lamplight, and the BookSwap purple. */
export const PALETTE = {
  /** Panel the whole scene sits on. */
  panel: "#F7F0E4",
  panelDeep: "#EFE4D2",

  /** Alcove wall, lit at the top by the pendant lamp. */
  wallTop: "#F6E9D3",
  wallBottom: "#E9D9BE",
  floor: "#DFCBAA",

  /** Lamplight. */
  lamp: "#FFC178",
  lampCore: "#FFE7C2",
  shade: "#3B2A38",

  /** Wood. */
  wood: "#B08968",
  woodDark: "#8C6A4F",

  /** Ink + silhouettes. */
  ink: "#2A2130",
  silhouette: "#3A2C3A",

  /** Books. */
  plum: "#5B3A6B",
  brand: "#7F3DFF",
  brandDeep: "#5F27C4",
  terracotta: "#C0653C",
  mustard: "#D9A441",
  forest: "#3F6B57",
  cream: "#F1E4CE",
  slate: "#6B6673",
} as const;

export const BOOK_DEPTH = 0.62;
export const SHELF_GAP = 0.05;

/** Horizontal centre of each nook. */
export const SHELF_X = 2.35;
/** Top surface of the shelf board — where every book stands. */
export const SHELF_TOP_Y = 1.2;
/** Shelf sits a little behind the front of the alcove. */
export const SHELF_Z = -0.35;

/** One full leave → meet → cross → settle → bloom loop, in seconds. */
export const CYCLE_SECONDS = 12;

/** The two travelling books — one from each nook. */
export const HERO_LEFT: Spine = {
  w: 0.26,
  h: 0.95,
  color: PALETTE.brand,
  band: true,
};

export const HERO_RIGHT: Spine = {
  w: 0.26,
  h: 0.88,
  color: PALETTE.terracotta,
  band: true,
};

export const LEFT_SPINES: Spine[] = [
  { w: 0.2, h: 0.76, color: PALETTE.plum, tilt: 0.02 },
  { w: 0.15, h: 0.62, color: PALETTE.cream },
  { w: 0.24, h: 0.84, color: PALETTE.ink, band: true },
  HERO_LEFT,
  { w: 0.17, h: 0.68, color: PALETTE.mustard },
  { w: 0.22, h: 0.8, color: PALETTE.forest, tilt: -0.03 },
  { w: 0.14, h: 0.58, color: PALETTE.slate },
];

export const RIGHT_SPINES: Spine[] = [
  { w: 0.18, h: 0.72, color: PALETTE.forest },
  { w: 0.22, h: 0.86, color: PALETTE.ink, tilt: 0.03 },
  { w: 0.15, h: 0.6, color: PALETTE.cream },
  HERO_RIGHT,
  { w: 0.24, h: 0.8, color: PALETTE.plum, band: true },
  { w: 0.16, h: 0.66, color: PALETTE.mustard },
  { w: 0.2, h: 0.74, color: PALETTE.brandDeep },
];

/** Index of the travelling book inside each row. */
export const HERO_INDEX = 3;

/** Lay a row of spines out left-to-right and return each one's centre x. */
export function layoutRow(spines: Spine[]): { offsets: number[]; width: number } {
  const width =
    spines.reduce((total, spine) => total + spine.w, 0) +
    SHELF_GAP * (spines.length - 1);

  let cursor = -width / 2;
  const offsets = spines.map((spine) => {
    const centre = cursor + spine.w / 2;
    cursor += spine.w + SHELF_GAP;
    return centre;
  });

  return { offsets, width };
}

/* --------------------------------------------------------------- easing  */

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/**
 * How brightly a nook is glowing at cycle position `t`: nothing until the
 * arriving book is nearly home, a swell as it lands, then a slow fade.
 */
export const bloomAt = (t: number) =>
  smoothstep(0.86, 0.93, t) * (1 - smoothstep(0.93, 1, t));

/** How present the meeting glow between the two books is at cycle position `t`. */
export const meetingAt = (t: number) =>
  smoothstep(0.34, 0.44, t) * (1 - smoothstep(0.54, 0.62, t));
