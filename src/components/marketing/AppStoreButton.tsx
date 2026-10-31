import { appStoreLink, type AppStoreCampaign } from "@/lib/site";
import { STORE_BADGE_CLASS } from "./storeBadge";

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
  /** Where the button sits; tags the link so App Store Connect reports it separately. */
  campaign: AppStoreCampaign;
  className?: string;
};

/**
 * The App Store badge: black, white Apple mark, "Download on the / App Store" - the
 * store's own badge look, so it reads instantly. Single entry point for every App Store
 * link (siteConfig.appStoreUrl, tagged by appStoreLink()).
 */
export default function AppStoreButton({ campaign, className = "" }: Props) {
  return (
    <a
      href={appStoreLink(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download BookSwap on the App Store"
      className={`${STORE_BADGE_CLASS} ${className}`}
    >
      <AppleMark size={30} />

      <span className="flex flex-col items-start">
        <span className="text-[11px] font-normal leading-tight">Download on the</span>
        <span className="text-[22px] font-semibold leading-none tracking-tight">App Store</span>
      </span>
    </a>
  );
}
