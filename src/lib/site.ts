export const siteConfig = {
  name: "BookSwap",
  url: "https://www.bookswapapp.com",
  description:
    "BookSwap helps readers discover books from real shelves nearby, offer the ones they've finished, and exchange stories with other readers.",
  supportEmail: "support@bookswapapp.com",
  // Single source of truth for every "get the app" link on the site. Links go
  // through appStoreLink() below, which tags them with a campaign.
  appStoreUrl: "https://apps.apple.com/app/book-swaps/id6476162048",
  /**
   * App Store Connect provider token (the `pt` of a campaign link). Not a secret: it
   * appears in every campaign link. Find it in App Store Connect → Analytics → Sources
   * → "Generate a Campaign Link". Until it is set, links still carry their campaign
   * (`ct`), but App Store Connect only attributes them once both are present.
   */
  appStoreProviderToken: "126723899",
  // The production Android app (book-swap app.config.ts: android.package).
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.harmony.bookswap.android",
};

/**
 * Where on the site an App Store link sits. Each one shows up as its own campaign in
 * App Store Connect → Analytics → Sources → Campaigns, so the placements can be
 * compared: impressions, downloads and conversion per button.
 */
export type AppStoreCampaign = "website-hero" | "website-navbar" | "website-download";

/** The App Store URL tagged with `campaign` (Apple campaign link: pt, ct, mt=8). */
export function appStoreLink(campaign: AppStoreCampaign): string {
  const url = new URL(siteConfig.appStoreUrl);
  if (siteConfig.appStoreProviderToken) {
    url.searchParams.set("pt", siteConfig.appStoreProviderToken);
  }
  url.searchParams.set("ct", campaign);
  url.searchParams.set("mt", "8");
  return url.toString();
}

/** Where on the site a Google Play link sits; reported in Play Console by UTM campaign. */
export type PlayStoreCampaign = "website-download";

/**
 * The Google Play URL with a referrer: Play Console attributes installs to its UTM
 * values (Statistics / acquisition reports). The referrer is one URL-encoded string.
 */
export function playStoreLink(campaign: PlayStoreCampaign): string {
  const url = new URL(siteConfig.playStoreUrl);
  const referrer = new URLSearchParams({
    utm_source: "website",
    utm_medium: "store_button",
    utm_campaign: campaign,
  });
  url.searchParams.set("referrer", referrer.toString());
  return url.toString();
}
