"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "showcase", label: "Tour" }, // veya "Showcase" / "Preview"
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "waitlist", label: "Join" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-5 z-50 w-full flex justify-center px-4">
      <nav
        className="w-full max-w-3xl flex items-center justify-between gap-6 rounded-full px-6 py-3 backdrop-blur-xl transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.82)",
          border: "1px solid var(--border)",
          boxShadow: "0 10px 30px -20px var(--shadow-color)",
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
          {links.map((link) => {
            const active = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="transition-colors duration-200"
                style={{
                  color: active
                    ? "var(--primary)"
                    : "var(--ink-soft)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          href="#waitlist"
          className="btn-primary rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
        >
          Join the Waitlist
        </a>
      </nav>
    </header>
  );
}