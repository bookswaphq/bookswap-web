import {
  Navbar,
  Hero,
  //Features,
  // HowItWorks,
  // About,
  // Waitlist,
  // Footer,
} from "@/components/marketing";

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
      {/* <Features />
      <HowItWorks />
      <About />
      <Waitlist />
      <Footer /> */}
    </main>
  );
}