export default function Footer() {
  return (
    <footer
      id="support"
      className="w-full flex flex-col items-center gap-2 px-6 py-10 text-xs"
      style={{
        background: "var(--forest-dark)",
        color: "rgba(243,239,226,0.6)",
      }}
    >
      <span
        className="font-display text-sm"
        style={{ color: "var(--paper)" }}
      >
        BookSwap
      </span>

      <span>hello@bookswap.app · Istanbul</span>

      <span>
        © {new Date().getFullYear()} BookSwap. All rights reserved.
      </span>
    </footer>
  );
}