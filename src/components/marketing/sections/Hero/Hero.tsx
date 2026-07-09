export default function Hero() {
  return (
    <section className="w-full max-w-2xl flex flex-col items-center text-center px-6 pt-40 pb-20">
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full"
        style={{
          color: "var(--brass)",
          border: "1px solid var(--brass)",
        }}
      >
        Now boarding readers
      </span>

      <h1 className="font-display mt-6 text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
        Discover books.
        <br />
        Exchange stories.
        <br />
        Meet readers.
      </h1>

      <p
        className="mt-6 text-lg max-w-md"
        style={{ color: "rgba(33,29,22,0.65)" }}
      >
        BookSwap turns your shelf into a doorway. List what you&apos;ve
        finished, find what&apos;s next, and hand it off to someone nearby.
      </p>

      <div className="mt-9 flex flex-wrap gap-4 justify-center">
        <a
          href="#waitlist"
          className="btn-primary rounded-xl px-6 py-3 font-medium"
        >
          Join Waitlist
        </a>

        <a
          href="/engineering"
          className="btn-outline rounded-xl px-6 py-3 font-medium"
        >
          View Engineering
        </a>
      </div>

      {/* Signature illustration */}
      <div className="spine-group mt-16 flex items-end gap-2 h-36">
        <div
          className="spine w-8 rounded-t-sm"
          style={
            {
              height: "70%",
              background: "var(--forest)",
              "--tilt": "-3deg",
            } as React.CSSProperties
          }
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={
            {
              height: "95%",
              background: "var(--oxblood)",
              "--tilt": "2deg",
            } as React.CSSProperties
          }
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={
            {
              height: "55%",
              background: "var(--brass)",
              "--tilt": "-2deg",
            } as React.CSSProperties
          }
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={
            {
              height: "100%",
              background: "var(--ink)",
              "--tilt": "3deg",
            } as React.CSSProperties
          }
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={
            {
              height: "65%",
              background: "var(--forest-dark)",
              "--tilt": "-4deg",
            } as React.CSSProperties
          }
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={
            {
              height: "85%",
              background: "var(--oxblood)",
              "--tilt": "1deg",
            } as React.CSSProperties
          }
        />
      </div>
    </section>
  );
}


