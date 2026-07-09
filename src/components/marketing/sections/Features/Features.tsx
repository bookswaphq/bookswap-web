export default function Features() {
  const features = [
    {
      ch: "Chapter I",
      title: "Discover books",
      copy: "Explore books from other readers and find your next story from real shelves.",
    },
    {
      ch: "Chapter II",
      title: "Offer a swap",
      copy: "Send exchange offers for books you want and share the ones you're ready to pass on.",
    },
    {
      ch: "Chapter III",
      title: "Exchange stories",
      copy: "Accept offers, chat with readers, and arrange your book exchange with ease.",
    },
  ];

  return (
    <section
      id="features"
      className="w-full max-w-4xl px-6 py-20 flex flex-col items-center text-center"
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        The Tale So Far
      </span>

      <h2 className="font-display mt-4 text-3xl sm:text-4xl font-medium max-w-lg text-[var(--ink)]">
        Three chapters of a good swap
      </h2>

      <div className="mt-14 grid sm:grid-cols-3 gap-8 w-full">
        {features.map((f) => (
          <div
            key={f.title}
            className="card-lift rounded-2xl p-6 flex flex-col items-center text-center"
            style={{
              background: "var(--paper-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{
                background: "var(--primary-soft)",
              }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: "var(--primary)",
                }}
              />
            </div>

            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{
                color: "var(--ink-muted)",
              }}
            >
              {f.ch}
            </span>

            <h3 className="font-display mt-2 text-lg font-medium text-[var(--ink)]">
              {f.title}
            </h3>

            <p
              className="mt-2 text-sm max-w-[220px]"
              style={{
                color: "var(--ink-soft)",
              }}
            >
              {f.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}