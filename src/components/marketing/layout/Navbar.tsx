export default function Navbar() {
  return (
    <header className="fixed top-5 z-50 w-full flex justify-center px-4">
      <nav
        className="w-full max-w-3xl flex items-center justify-between gap-6 rounded-full px-6 py-3 backdrop-blur-md"
        style={{
          background: "rgba(243, 239, 226, 0.75)",
          border: "1px solid rgba(33,29,22,0.1)",
        }}
      >
        <a
          href="/"
          className="font-display text-lg tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          BookSwap
        </a>

        <div className="hidden md:flex items-center gap-7 text-sm">
          <a href="#features" className="hover:opacity-70 transition-opacity">
            Features
          </a>

          <a href="#about" className="hover:opacity-70 transition-opacity">
            About
          </a>

          <a
            href="#how-it-works"
            className="hover:opacity-70 transition-opacity"
          >
            How it works
          </a>

          <a href="#support" className="hover:opacity-70 transition-opacity">
            Contact us
          </a>
        </div>

        <a
          href="#waitlist"
          className="btn-primary rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
        >
          Join Waitlist
        </a>
      </nav>
    </header>
  );
}