import {
  Navbar,
  Hero,
  Showcase,
  Features,
  HowItWorks,
  About,
  Safety,
  FAQ,
  Waitlist,
  Footer,
} from "@/components/marketing";
import { Analytics } from "@vercel/analytics/react";

export default function MarketingPage() {
  return (
    <main
      className="font-body min-h-screen flex flex-col items-center"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <Navbar />
      <Hero />
      <Showcase />
      <HowItWorks />
      <Features />
      <About />
      <Safety />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
