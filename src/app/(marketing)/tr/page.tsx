import HomePage, { homeMetadata } from "@/components/marketing/HomePage";

// Turkish home page: same sections as "/", Turkish copy, hreflang-linked to English.
export const metadata = homeMetadata("tr");

export default function TurkishMarketingPage() {
  return <HomePage locale="tr" />;
}
