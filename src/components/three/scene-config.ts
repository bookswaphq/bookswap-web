/**
 * Shared geometry + palette description for the hero book-swap scene.
 * Kept out of the R3F component so the static fallback can reuse the same
 * proportions and colours without pulling three.js into the bundle.
 */

export type Spine = {
  /** Spine thickness on the x axis. */
  w: number;
  /** Spine height on the y axis. */
  h: number;
  color: string;
  /** Whether the spine gets a lighter "title" band. */
  band?: boolean;
  /** Small lean, in radians, so the shelf reads as lived-in. */
  tilt?: number;
};

export const PALETTE = {
  primary: "#7F3DFF",
  primaryDark: "#6E2EE6",
  primarySurface: "#EEE4FF",
  primarySoft: "#F5F0FF",
  ink: "#1B1720",
  inkMuted: "#9A95A3",
  paperCard: "#FFFFFF",
  success: "#3F6B57",
  border: "#E8E5EC",
  wood: "#EDE8F3",
  woodEdge: "#DED7E8",
} as const;

/** Depth of every book and of the shelf boards. */
export const BOOK_DEPTH = 0.92;
export const SHELF_GAP = 0.055;

/** The two travelling books — one lives on each shelf. */
export const HERO_LEFT: Spine = {
  w: 0.34,
  h: 1.42,
  color: PALETTE.primary,
  band: true,
};

export const HERO_RIGHT: Spine = {
  w: 0.34,
  h: 1.34,
  color: PALETTE.success,
  band: true,
};

export const LEFT_SPINES: Spine[] = [
  { w: 0.24, h: 1.18, color: PALETTE.ink, tilt: 0.02 },
  { w: 0.18, h: 1.02, color: PALETTE.primarySurface },
  { w: 0.3, h: 1.3, color: PALETTE.primaryDark, band: true },
  { w: 0.16, h: 0.94, color: PALETTE.paperCard },
  HERO_LEFT,
  { w: 0.22, h: 1.24, color: PALETTE.inkMuted, tilt: -0.03 },
  { w: 0.28, h: 1.06, color: PALETTE.primarySoft },
  { w: 0.2, h: 1.34, color: PALETTE.ink },
];

export const RIGHT_SPINES: Spine[] = [
  { w: 0.2, h: 1.26, color: PALETTE.primaryDark },
  { w: 0.26, h: 1.06, color: PALETTE.paperCard, tilt: 0.03 },
  { w: 0.18, h: 1.36, color: PALETTE.ink, band: true },
  { w: 0.3, h: 1.12, color: PALETTE.primarySurface },
  HERO_RIGHT,
  { w: 0.22, h: 0.98, color: PALETTE.primary },
  { w: 0.16, h: 1.22, color: PALETTE.inkMuted, tilt: -0.02 },
  { w: 0.26, h: 1.1, color: PALETTE.primarySoft },
];

/** Index of the travelling book inside each spine row. */
export const HERO_INDEX = 4;

/** Seconds for one full lift → cross → settle → rest loop. */
export const CYCLE_SECONDS = 9;

/** Horizontal centre of each shelf in scene units. */
export const SHELF_X = 2.05;

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
