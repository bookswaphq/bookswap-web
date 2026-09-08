import type { Metadata } from "next";
import { Footer, Navbar, Support } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with BookSwap. Contact our support team by email with questions, problems, or account requests.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportPage() {
  return (
    <main
      className="font-body min-h-screen flex flex-col items-center"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <Navbar />
      <Support />
      <Footer />
    </main>
  );
}
