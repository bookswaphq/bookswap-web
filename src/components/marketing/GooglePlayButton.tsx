import { playStoreLink, type PlayStoreCampaign } from "@/lib/site";

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
  /** Where the button sits; tags the link so Play Console reports it separately. */
  campaign: PlayStoreCampaign;
  className?: string;
};

/**
 * The Google Play store badge. Same shape and colour as the App Store badge, so the
 * pair reads as one row with neither store looking secondary.
 */
export default function GooglePlayButton({ campaign, className = "" }: Props) {
  return (
    <a
      href={playStoreLink(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get BookSwap on Google Play"
      className={`inline-flex h-14 shrink-0 items-center justify-center gap-3
        whitespace-nowrap rounded-2xl bg-[#7F3DFF] px-6 font-medium text-white
        shadow-[0_4px_14px_rgba(127,61,255,0.18)]
        transition-[background-color,box-shadow,transform] duration-200
        hover:bg-[#6E2EE6] hover:shadow-[0_6px_20px_rgba(127,61,255,0.26)]
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F3DFF]
        focus-visible:ring-offset-4 motion-reduce:transition-none
        ${className}`}
    >
      <PlayMark size={26} />

      <span className="flex flex-col items-start gap-0.5">
        <span className="text-[11px] font-normal leading-tight text-white/85">
          Get it on
        </span>
        <span className="text-[19px] font-semibold leading-tight tracking-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}
