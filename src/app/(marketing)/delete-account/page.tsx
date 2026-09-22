import { Footer, Navbar } from "@/components/marketing";
import DeleteAccount from "@/components/marketing/sections/DeleteAccount/DeleteAccount";

export const metadata = {
  title: "Delete your account",
  description:
    "How to delete your BookSwap account, in the app or by request, and what happens to your data.",
};

export default function DeleteAccountPage() {
  return (
    <main
      className="font-body min-h-screen flex flex-col items-center"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <Navbar />
      <DeleteAccount />
      <Footer />
    </main>
  );
}
