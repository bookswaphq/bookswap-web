export default function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "List your book",
      copy: "Add a book from your shelf with a cover, title, and a little detail about it.",
    },
    {
      n: "2",
      title: "Receive swap offers",
      copy: "Other readers can offer books they want to exchange with you.",
    },
    {
      n: "3",
      title: "Chat & exchange",
      copy: "Accept an offer, chat with your swap partner, and arrange the exchange.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full max-w-2xl px-6 py-20 flex flex-col items-center text-center"
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        How the Story Goes
      </span>

      <h2 className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]">
        Three pages, one new book
      </h2>

      <div className="mt-14 w-full flex flex-col gap-6">
        {steps.map((step) => (
          <div
            key={step.n}
            className="card-lift rounded-2xl flex items-center gap-5 p-5 text-left border"
            style={{
              background: "var(--paper-card)",
              borderColor: "var(--border)",
            }}
          >
            <span
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              style={{
                background: "var(--primary-soft)",
                color: "var(--primary)",
              }}
            >
              {step.n}
            </span>

            <div>
              <h3 className="font-display text-base font-medium text-[var(--ink)]">
                {step.title}
              </h3>

              <p
                className="mt-1 text-sm"
                style={{
                  color: "var(--ink-soft)",
                }}
              >
                {step.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}