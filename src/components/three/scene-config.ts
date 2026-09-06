/**
 * Art direction and layout for the hero's two shelves.
 *
 * The two shelves are meant to read as two different rooms: different wood,
 * different height on the wall, and different things living on them — a trailing
 * ivy on one, a small plum lamp on the other. Kept free of three.js so the SVG
 * fallback can draw the same composition without the 3D bundle.
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

/** Light neutral ground, warm woods, and one plum accent. */
export const PALETTE = {
  /** The panel the shelves float on. */
  panel: "#F4F2ED",
  panelDeep: "#EAE7E0",
  shadow: "#3B3540",

  /** Two different woods, one per room. */
  oak: "#C39A6B",
  oakDark: "#A87F52",
  walnut: "#9A7150",
  walnutDark: "#7E5A3E",

  /** Props. */
  plum: "#5B3A6B",
  plumDeep: "#432A50",
  lampWarm: "#FFD9A6",
  terracotta: "#C0653C",
  leaf: "#4E7A55",
  leafLight: "#6D9A6B",
  stem: "#3E5E45",

  /** Books. */
  brand: "#7F3DFF",
  brandDeep: "#5F27C4",
  ink: "#2A2130",
  mustard: "#D9A441",
  forest: "#3F6B57",
  cream: "#EFE6D6",
  slate: "#7C7686",
} as const;

export const BOOK_DEPTH = 0.6;
export const SHELF_GAP = 0.05;

/** One full leave → meet → cross → settle → glow loop, in seconds. */
export const CYCLE_SECONDS = 12;

/** Width of each shelf board. */
export const BOARD_WIDTH = 3.1;
/** Where the props sit, measured from the middle of the board. */
export const PROP_X = 1.2;
/** Shelf boards sit a little behind the front of the scene. */
export const SHELF_Z = -0.25;

/** The two rooms. Different wood, different height, different things on them. */
export const SHELVES = {
  left: { x: -2.2, top: 1.3, wood: PALETTE.oak, edge: PALETTE.oakDark },
  right: { x: 2.2, top: 1.06, wood: PALETTE.walnut, edge: PALETTE.walnutDark },
} as const;

/** The two travelling books — one from each shelf. */
export const HERO_LEFT: Spine = {
  w: 0.26,
  h: 0.92,
  color: PALETTE.brand,
  band: true,
};

export const HERO_RIGHT: Spine = {
  w: 0.26,
  h: 0.86,
  color: PALETTE.terracotta,
  band: true,
};

export const LEFT_SPINES: Spine[] = [
  { w: 0.2, h: 0.74, color: PALETTE.plum, tilt: 0.02 },
  { w: 0.15, h: 0.6, color: PALETTE.cream },
  { w: 0.24, h: 0.82, color: PALETTE.ink, band: true },
  HERO_LEFT,
  { w: 0.17, h: 0.66, color: PALETTE.mustard },
  { w: 0.22, h: 0.78, color: PALETTE.forest, tilt: -0.03 },
];

export const RIGHT_SPINES: Spine[] = [
  { w: 0.18, h: 0.7, color: PALETTE.forest },
  { w: 0.22, h: 0.84, color: PALETTE.ink, tilt: 0.03 },
  { w: 0.15, h: 0.58, color: PALETTE.cream },
  HERO_RIGHT,
  { w: 0.24, h: 0.78, color: PALETTE.plum, band: true },
  { w: 0.2, h: 0.72, color: PALETTE.brandDeep },
];

/** Index of the travelling book inside each row. */
export const HERO_INDEX = 3;

/** Books lying flat, stacked at the inner end of each shelf. */
export type FlatBook = { w: number; h: number; d: number; color: string; skew: number };

export const LEFT_STACK: FlatBook[] = [
  { w: 0.54, h: 0.075, d: 0.4, color: PALETTE.forest, skew: 0.03 },
  { w: 0.5, h: 0.065, d: 0.37, color: PALETTE.cream, skew: -0.05 },
  { w: 0.44, h: 0.06, d: 0.34, color: PALETTE.mustard, skew: 0.02 },
];

export const RIGHT_STACK: FlatBook[] = [
  { w: 0.52, h: 0.07, d: 0.39, color: PALETTE.ink, skew: -0.02 },
  { w: 0.46, h: 0.065, d: 0.35, color: PALETTE.brand, skew: 0.045 },
];

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
 * How brightly a shelf is glowing at cycle position `t`: nothing until the
 * arriving book is nearly home, a swell as it lands, then a slow fade.
 */
export const bloomAt = (t: number) =>
  smoothstep(0.86, 0.93, t) * (1 - smoothstep(0.93, 1, t));

/** How present the light between the two books is at cycle position `t`. */
export const meetingAt = (t: number) =>
  smoothstep(0.34, 0.44, t) * (1 - smoothstep(0.54, 0.62, t));
