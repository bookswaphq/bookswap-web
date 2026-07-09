export default function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "List your book",
      copy: "Add a book from your shelf, upload a cover, and let other readers discover it.",
    },
    {
      n: "02",
      title: "Receive swap offers",
      copy: "Readers can send exchange offers for books they want to trade with you.",
    },
    {
      n: "03",
      title: "Accept & exchange",
      copy: "Chat with your swap partner, arrange the details, and give your book a new journey.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full flex flex-col items-center text-center px-6 py-24"
      style={{
        background: "var(--primary)",
        color: "white",
      }}
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--brass)" }}
      >
        How it works
      </span>

      <h2 className="font-display mt-4 text-3xl sm:text-4xl font-medium">
        Swap books in three simple steps
      </h2>

      <div className="relative mt-16 max-w-md w-full flex flex-col gap-14">
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full"
          width="2"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            className="stitch-line"
            stroke="var(--brass)"
            strokeWidth="2"
          />
        </svg>

        {steps.map((step) => (
          <div
            key={step.n}
            className="relative z-10 flex flex-col items-center"
          >
            <span
              className="font-mono text-xs w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "var(--brass)",
                color: "var(--ink)",
              }}
            >
              {step.n}
            </span>

            <h3 className="font-display mt-3 text-xl font-medium">
              {step.title}
            </h3>

            <p
              className="mt-1 text-sm max-w-xs"
              style={{
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {step.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}