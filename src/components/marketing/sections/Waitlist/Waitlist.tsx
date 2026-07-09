import WaitlistForm from "./WaitlistForm";

export default function Waitlist() {
  return (
    <section
      id="waitlist"
      className="w-full max-w-xl px-6 py-20 flex flex-col items-center text-center"
    >
      <h2 className="font-display text-3xl sm:text-4xl font-medium text-[var(--ink)]">
        Save your spot on the shelf

      </h2>

      <p
        className="mt-3 text-sm max-w-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        We're letting readers in slowly, city by city.
      </p>

      <WaitlistForm />
    </section>
  );
}