import HomePage, { homeMetadata } from "@/components/marketing/HomePage";

export const metadata = homeMetadata("en");

export default function MarketingPage() {
  return <HomePage locale="en" />;
}
