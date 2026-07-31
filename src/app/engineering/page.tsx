import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/marketing";
import CaseStudy from "@/components/engineering/CaseStudy";

export const metadata: Metadata = {
  title: "Engineering Case Study",
  description:
    "How BookSwap was scoped, architected, built, and shipped — a React Native app, a custom Python/PostgreSQL backend, and a self-hosted data pipeline, from zero to the App Store and Google Play.",
  robots: { index: true, follow: true },
};

export default function EngineeringPage() {
  return (
    <main
      className="font-body min-h-screen flex flex-col items-center"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <Navbar />
      <CaseStudy />
      <Footer />
    </main>
  );
}
