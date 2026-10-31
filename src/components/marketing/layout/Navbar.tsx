"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

import { useLocale } from "@/i18n/LocaleContext";
import { HOME_PATH } from "@/i18n/dictionaries";
import { turnPageTo } from "@/i18n/pageTurn";

const sectionIds = ["showcase", "how-it-works", "features", "about", "faq"] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, homePath } = useLocale();
  const links = sectionIds.map((id) => ({ id, label: t.nav.links[id] }));
  const otherLocale = locale === "en" ? "tr" : "en";
  const router = useRouter();

  // Language switch turns the page like a book; falls back to a plain link.
  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    const href = HOME_PATH[otherLocale];
    const animated = turnPageTo(() => {
      setMenuOpen(false);
      router.push(href);
    }, otherLocale);
    if (animated) event.preventDefault();
  };
  // "/#faq" on English, "/tr#faq" on Turkish; absolute so it works from /privacy too.
  const sectionHref = (id: string) => `${homePath}#${id}`;

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
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

  const backToHero = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    if (!document.getElementById("hero")) return;

    event.preventDefault();
    setMenuOpen(false);

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 sm:top-5 z-50 w-full flex justify-center px-4">
      <nav
        className="w-full max-w-3xl rounded-3xl lg:rounded-full backdrop-blur-xl transition-[background-color,box-shadow] duration-300"
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
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3">
          <Link
            href={homePath}
            onClick={backToHero}
            aria-label={t.nav.backToTop}
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/bookswap-icon.png"
              alt=""
              aria-hidden="true"
              width={34}
              height={34}
              priority
              className="h-[26px] w-[26px] sm:h-[29px] sm:w-[29px]"
            />

            <Image
              src="/bookswap-wordmark.png"
              alt="BookSwap"
              width={1015}
              height={223}
              priority
              // Narrow phones (< 380px): the icon alone, so the language ribbon,
              // the download button and the menu button still fit on one row.
              className="h-[19px] sm:h-[21px] w-auto object-contain max-[379px]:hidden"
            />
          </Link>

          <div className="hidden lg:flex ml-auto items-center gap-5 xl:gap-6 text-sm">
            {links.map((link) => {
              const active = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={sectionHref(link.id)}
                  className="whitespace-nowrap transition-colors duration-200"
                  style={{
                    color: active ? "var(--primary)" : "var(--ink-soft)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            <Link
              href="/support"
              className="whitespace-nowrap transition-colors duration-200"
              style={{ color: "var(--ink-soft)" }}
            >
              {t.nav.support}
            </Link>
          </div>

          {/* lg:ml-1 / xl:ml-2 on top of the row's 16px gap: the ribbon sits the same
              distance from "Support" as the links are from each other (20px / 24px). */}
          <div className="flex items-center gap-2 lg:ml-1 xl:ml-2">
            {/* Language switch as a satin bookmark ribbon, attached to the top of the page:
                it runs down over the bar and hangs out below it. The label sits on the
                bar's centre line, level with the links; the chevron says it's a language
                switch. The slot keeps the row's height; the ribbon is positioned over it.
                The bar is 16px (sm: 20px) from the top, plus 1px border and 12px padding,
                so the slot starts 29px (sm: 33px) down; the ribbon ends 26px below the
                slot (13px below the bar). */}
            <span className="relative h-10 w-[34px] shrink-0">
              <Link
                href={HOME_PATH[otherLocale]}
                onClick={switchLanguage}
                hrefLang={otherLocale}
                lang={otherLocale}
                aria-label={t.nav.switchLanguage.ariaLabel}
                title={t.nav.switchLanguage.ariaLabel}
                className="absolute left-0 top-[-29px] sm:top-[-33px] block h-[95px] sm:h-[99px] w-[34px]
                  drop-shadow-[0_2px_2.5px_rgba(70,20,10,0.32)]
                  transition-transform duration-300 ease-out
                  hover:translate-y-[2px] active:translate-y-[4px]
                  focus-visible:outline-none focus-visible:[&>span]:outline focus-visible:[&>span]:outline-2
                  focus-visible:[&>span]:outline-offset-2 focus-visible:[&>span]:outline-[#7F3DFF]
                  motion-reduce:transition-none"
              >
                <span
                  className="relative block h-full w-full"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)",
                    // Top to bottom: shade where it comes in from the page edge; darker
                    // selvage edges with a light line just inside them; brick-red satin.
                    background: [
                      "linear-gradient(180deg, rgba(40,8,4,0.3) 0, transparent 10px)",
                      "linear-gradient(90deg, rgba(50,10,5,0.38) 0, rgba(255,220,210,0.16) 1.5px, transparent 3.5px, transparent calc(100% - 3.5px), rgba(255,220,210,0.16) calc(100% - 1.5px), rgba(50,10,5,0.38) 100%)",
                      "linear-gradient(90deg, #86301F 0%, #9E3B2C 30%, #A9463A 50%, #9A392A 70%, #842E20 100%)",
                    ].join(", "),
                  }}
                >
                  {/* Measured from the ribbon's end: label centred 46px up (= the slot's
                      centre), chevron under it. */}
                  <span
                    className="absolute inset-x-0 bottom-[46px] translate-y-1/2 text-center
                      text-[13px] font-semibold leading-none tracking-[0.02em] text-white"
                    style={{ textShadow: "0 1px 1px rgba(60,10,5,0.45)" }}
                  >
                    {t.nav.switchLanguage.label}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    size={13}
                    strokeWidth={2.5}
                    className="absolute left-1/2 bottom-[25px] -translate-x-1/2 text-white/90"
                    style={{ filter: "drop-shadow(0 1px 1px rgba(60,10,5,0.4))" }}
                  />
                </span>
              </Link>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="lg:hidden grid place-items-center w-9 h-9 rounded-full transition-colors"
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
            className="lg:hidden px-5 pb-4 pt-1 flex flex-col gap-3 text-sm"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
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

            <Link
              href="/support"
              onClick={() => setMenuOpen(false)}
              className="py-1"
              style={{ color: "var(--ink-soft)" }}
            >
              {t.nav.support}
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
