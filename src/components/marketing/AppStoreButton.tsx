import { siteConfig } from "@/lib/site";

/** Apple's logo glyph, drawn inline so the button stays crisp at any size. */
function AppleMark({ size = 18 }: { size?: number }) {
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
      <path d="M16.36 12.71c.02 2.5 2.2 3.33 2.23 3.35-.02.06-.35 1.2-1.15 2.38-.69 1.02-1.4 2.03-2.53 2.05-1.11.02-1.47-.65-2.73-.65-1.27 0-1.67.63-2.72.67-1.09.04-1.92-1.1-2.62-2.11-1.42-2.07-2.51-5.85-1.05-8.4.73-1.27 2.03-2.08 3.44-2.1 1.07-.02 2.08.72 2.73.72.66 0 1.89-.89 3.18-.76.54.02 2.06.22 3.04 1.65-.08.05-1.81 1.06-1.79 3.2M14.3 5.1c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.54.62-1 1.61-.88 2.56.93.07 1.87-.47 2.46-1.16" />
    </svg>
  );
}

type Props = {
  /** `compact` is the navbar pill; `full` is the two-line store badge. */
  variant?: "full" | "compact";
  className?: string;
};

/**
 * Single entry point for every "get the app" link on the site, so the store
 * URL lives in one place (siteConfig.appStoreUrl).
 */
export default function AppStoreButton({
  variant = "full",
  className = "",
}: Props) {
  const base =
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap " +
    "bg-[#7F3DFF] text-white font-medium " +
    "transition-[background-color,box-shadow,transform] duration-200 " +
    "hover:bg-[#6E2EE6] active:scale-[0.98] " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-[#7F3DFF] focus-visible:ring-offset-4 " +
    "motion-reduce:transition-none";

  if (variant === "compact") {
    return (
      <a
        href={siteConfig.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download BookSwap on the App Store"
        className={`${base} h-10 gap-2 rounded-full px-4 text-sm ${className}`}
      >
        <AppleMark size={18} />
        <span className="hidden sm:inline">App Store</span>
        <span className="sm:hidden">Get</span>
      </a>
    );
  }

  return (
    <a
      href={siteConfig.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download BookSwap on the App Store"
      className={`${base} h-14 gap-3 rounded-2xl px-6
        shadow-[0_4px_14px_rgba(127,61,255,0.18)]
        hover:shadow-[0_6px_20px_rgba(127,61,255,0.26)]
        ${className}`}
    >
      <AppleMark size={28} />

      <span className="flex flex-col items-start gap-0.5">
        <span className="text-[11px] font-normal leading-tight text-white/85">
          Download on the
        </span>
        <span className="text-[19px] font-semibold leading-tight tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}