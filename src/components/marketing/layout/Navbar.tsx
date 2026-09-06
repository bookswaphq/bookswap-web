"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { id: "showcase", label: "Tour" },
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 sm:top-5 z-50 w-full flex justify-center px-4">
      <nav
        className="w-full max-w-3xl rounded-3xl md:rounded-full backdrop-blur-xl transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0.78)",
          border: "1px solid var(--border)",
          boxShadow: scrolled
            ? "0 18px 40px -26px var(--shadow-color)"
            : "0 10px 30px -20px var(--shadow-color)",
        }}
      >
        <div className="flex items-center justify-between gap-6 px-5 sm:px-6 py-3">
          <Link
            href="/"
            className="font-display text-lg tracking-tight flex items-center gap-2"
            style={{ color: "var(--ink)" }}
          >
            <span
              aria-hidden="true"
              className="inline-block w-2 h-4 rounded-[2px]"
              style={{ background: "var(--primary)" }}
            />
            BookSwap
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm">
            {links.map((link) => {
              const active = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="transition-colors duration-200"
                  style={{
                    color: active ? "var(--primary)" : "var(--ink-soft)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              className="btn-primary rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
            >
              <span className="hidden sm:inline">Join the Waitlist</span>
              <span className="sm:hidden">Join</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden grid place-items-center w-9 h-9 rounded-full transition-colors"
              style={{
                color: "var(--ink-soft)",
                border: "1px solid var(--border)",
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div
            className="md:hidden px-5 pb-4 pt-1 flex flex-col gap-3 text-sm"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="py-1"
                style={{
                  color:
                    activeSection === link.id
                      ? "var(--primary)"
                      : "var(--ink-soft)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
