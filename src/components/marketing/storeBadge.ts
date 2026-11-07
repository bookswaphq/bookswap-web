/**
 * Shared look of the App Store and Google Play badges: black, white text, a thin grey
 * edge (as the stores' own badges have), the same size so the pair reads as one row.
 */
export const STORE_BADGE_CLASS =
  "inline-flex h-14 min-w-[172px] shrink-0 items-center justify-start gap-2.5 " +
  "whitespace-nowrap rounded-xl border border-[#A6A6A6] bg-black px-4 text-white " +
  "transition-[background-color,transform] duration-200 " +
  "hover:bg-[#1A1A1A] active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8842B8] " +
  "focus-visible:ring-offset-4 motion-reduce:transition-none";
