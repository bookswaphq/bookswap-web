/** Generic play glyph — placeholder until the official Play badge art is in `public/`. */
function PlayMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11.14-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

type Props = {
  className?: string;
};

/**
 * Android isn't shipped yet — this is a deliberately inert badge that sits
 * next to the App Store button so the pair reads as one row.
 */
export default function GooglePlayButton({ className = "" }: Props) {
  return (
    <button
      type="button"
      disabled
      aria-label="Google Play — coming soon"
      className={`
        inline-flex h-14 cursor-not-allowed items-center justify-center
        gap-3 whitespace-nowrap rounded-2xl border border-gray-200
        bg-gray-100 px-6 text-gray-500
        ${className}
      `}
    >
      <PlayMark />

      <span className="flex flex-col items-start gap-0.5">
        <span className="text-[11px] font-normal leading-tight">
          Coming soon on
        </span>
        <span className="text-[19px] font-semibold leading-tight tracking-tight">
          Google Play
        </span>
      </span>
    </button>
  );
}
