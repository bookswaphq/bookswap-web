export default function About() {
  return (
    <section
      id="about"
      className="w-full max-w-2xl px-6 py-24 flex flex-col items-center text-center"
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--brass)" }}
      >
        About
      </span>

      <p className="font-display mt-6 text-2xl sm:text-3xl italic leading-snug text-[var(--ink)]">
        &ldquo;Books are meant to be read, shared, and discovered again.
        BookSwap helps every story find its next reader.&rdquo;
      </p>

      <p
        className="mt-6 text-sm max-w-md"
        style={{ color: "var(--ink-soft)" }}
      >
        BookSwap is a simple way for readers to exchange books they have
        finished and discover new ones from other shelves. List your books,
        connect with readers, make swap offers, and keep stories moving.
      </p>
    </section>
  );
}