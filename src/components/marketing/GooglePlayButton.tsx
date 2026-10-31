"use client";

import { playStoreLink, type PlayStoreCampaign } from "@/lib/site";
import { STORE_BADGE_CLASS } from "./storeBadge";
import { useLocale } from "@/i18n/LocaleContext";

/** The four-colour Play triangle, as on Google Play's own badge. */
function PlayMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 26"
      width={size}
      height={(size * 26) / 24}
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <path d="M1.2.6 13.4 12.9 1.2 25.2C.9 24.9.7 24.4.7 23.8V2C.7 1.4.9.9 1.2.6Z" fill="#00D7FE" />
      <path d="M17.5 17 13.4 12.9 17.5 8.8l4.9 2.8c1.4.8 1.4 2.1 0 2.9L17.5 17Z" fill="#FFCE00" />
      <path d="M17.5 17 13.4 12.9 1.2 25.2c.5.5 1.2.5 2.1.1L17.5 17Z" fill="#FF3A44" />
      <path d="M17.5 8.8 3.3.6C2.4.1 1.7.1 1.2.6L13.4 12.9l4.1-4.1Z" fill="#00F076" />
    </svg>
  );
}

type Props = {
  /** Where the button sits; tags the link so Play Console reports it separately. */
  campaign: PlayStoreCampaign;
  className?: string;
};

/**
 * The Google Play badge: black, the four-colour Play mark, "GET IT ON / Google Play".
 * Same shape and size as the App Store badge (storeBadge.ts).
 */
export default function GooglePlayButton({ campaign, className = "" }: Props) {
  const { t } = useLocale();
  return (
    <a
      href={playStoreLink(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.stores.googlePlay.ariaLabel}
      className={`${STORE_BADGE_CLASS} ${className}`}
    >
      <PlayMark size={26} />

      <span className="flex flex-col items-start">
        {/* Same style as the App Store badge's top line (sentence case), so the two
            buttons read as a pair. */}
        <span className="text-[11px] font-normal leading-tight">{t.stores.googlePlay.top}</span>
        <span className="text-[22px] font-semibold leading-none tracking-tight">{t.stores.googlePlay.bottom}</span>
      </span>
    </a>
  );
}
