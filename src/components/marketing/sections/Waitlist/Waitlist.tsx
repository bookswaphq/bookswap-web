import WaitlistForm from "./WaitlistForm";

export default function Waitlist() {
  return (
    <section
      id="waitlist"
      className="w-full max-w-xl px-6 py-24 flex flex-col items-center text-center"
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Early readers
      </span>

      <h2 className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]">
        Save your spot on the shelf
      </h2>

      <p
        className="mt-3 text-sm max-w-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        BookSwap is coming soon. Join the waitlist to be among the first
        readers to discover, exchange, and share books.
      </p>

      <div
        className="mt-1 w-full rounded-3xl p-6"

      >
        <WaitlistForm />
      </div>
    </section>
  );
}