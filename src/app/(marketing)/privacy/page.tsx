import { Footer, Navbar } from "@/components/marketing";
import Privacy from "@/components/marketing/sections/Privacy/Privacy";

export default function PrivacyPage() {
  return (
    <main
      className="font-body min-h-screen flex flex-col items-center"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <Navbar />
      <Privacy />
      <Footer />
    </main>
  );
}
