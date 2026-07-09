export default function Features() {
  const features = [
    {
      title: "Discover books",
      copy: "Browse books from other readers and find your next read from real shelves.",
    },
    {
      title: "Offer a swap",
      copy: "Send exchange offers for books you want and share books you're ready to pass on.",
    },
    {
      title: "Chat & arrange",
      copy: "Accept offers, message readers, and coordinate your book exchange easily.",
    },
  ];

  return (
    <section
      id="features"
      className="w-full max-w-4xl px-6 py-20 flex flex-col items-center text-center"
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--brass)" }}
      >
        Features
      </span>

      <h2 className="font-display mt-4 text-3xl sm:text-4xl font-medium max-w-lg text-[var(--ink)]">
        Everything a book swap needs
      </h2>

      <div className="mt-12 grid sm:grid-cols-3 gap-6 w-full">
        {features.map((f) => (
          <div
            key={f.title}
            className="card-lift rounded-2xl p-6 text-left border"
            style={{
              background: "var(--paper-card)",
              borderColor: "rgba(27,23,32,0.1)",
            }}
          >
            <h3 className="font-display text-xl font-medium text-[var(--ink)]">
              {f.title}
            </h3>

            <p
              className="mt-2 text-sm"
              style={{ color: "var(--ink-soft)" }}
            >
              {f.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}