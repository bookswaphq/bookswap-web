"use client";

export default function WaitlistForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    console.log(data.get("email"));

    // TODO: connect API / waitlist service
  }

  return (
    <form
      className="mt-8 w-full flex flex-col sm:flex-row gap-3"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>

      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-xl px-4 py-3 text-sm border outline-none"
        style={{
          borderColor: "rgba(27,23,32,0.15)",
          background: "var(--paper-card)",
          color: "var(--ink)",
        }}
      />

      <button
        type="submit"
        className="btn-primary rounded-xl px-6 py-3 font-medium text-sm"
      >
        Join Waitlist
      </button>
    </form>
  );
}