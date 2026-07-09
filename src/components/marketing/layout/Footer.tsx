export default function Footer() {
  return (
    <footer
      id="support"
      className="w-full px-6 py-12 flex flex-col items-center text-center"
      style={{
        background: "var(--primary)",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="font-display text-2xl font-medium"
          style={{ color: "white" }}
        >
          BookSwap
        </span>

        <p className="text-sm max-w-xs">
          Give finished books a new journey. Discover, exchange, and keep
          stories moving.
        </p>

        <a
          href="mailto:hello@bookswap.app"
          className="font-mono text-xs tracking-wide transition-opacity hover:opacity-80"
          style={{ color: "var(--brass)" }}
        >
          hello@bookswap.app
        </a>
      </div>

      <div
        className="w-full max-w-sm h-px my-8"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />

      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
        <span>
          © {new Date().getFullYear()} BookSwap
        </span>

        <span className="hidden sm:inline">·</span>

        <span>Istanbul</span>
      </div>
    </footer>
  );
}