"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
  // Running page number, like a book's header: 01 on the hero, then one per section.
  const pageIndex = activeSection ? sectionIds.indexOf(activeSection as (typeof sectionIds)[number]) + 2 : 1;
  const pageNumber = String(Math.max(1, pageIndex)).padStart(2, "0");

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
    // The hero is watched too, so scrolling back up resets the page number to 01.
    const sections = ["hero", ...sectionIds]
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
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300"
      style={{
        background: scrolled || menuOpen ? "rgba(248,245,241,0.94)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
      }}
    >
      <nav className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="flex items-center justify-between gap-6 pt-5 pb-3 sm:pt-6">
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
              // Narrow phones (< 380px): the icon alone, so the language switch
              // and the menu button still fit on one row.
              className="h-[19px] sm:h-[21px] w-auto object-contain max-[379px]:hidden"
            />
          </Link>

          <div className="flex items-center gap-5 xl:gap-7">
            <div className="hidden lg:flex items-center gap-6 xl:gap-7 text-[15px]">
              {links.map((link) => {
                const active = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={sectionHref(link.id)}
                    aria-current={active ? "location" : undefined}
                    className="whitespace-nowrap transition-colors duration-200 hover:text-[var(--primary)]"
                    style={{ color: active ? "var(--primary)" : "var(--ink)" }}
                  >
                    {link.label}
                  </a>
                );
              })}

              <Link
                href="/support"
                className="whitespace-nowrap text-[var(--ink)] transition-colors duration-200 hover:text-[var(--primary)]"
              >
                {t.nav.support}
              </Link>
            </div>

            <span aria-hidden="true" className="hidden lg:block h-6 w-px bg-[var(--ink)]/70" />

            {/* Language switch: both codes in the book serif, the current one in brand
                colour. A tap goes straight to the other language (with the page-turn). */}
            <Link
              href={HOME_PATH[otherLocale]}
              onClick={switchLanguage}
              hrefLang={otherLocale}
              lang={otherLocale}
              aria-label={t.nav.switchLanguage.ariaLabel}
              title={t.nav.switchLanguage.ariaLabel}
              className="group font-display inline-flex items-center gap-1.5 rounded-sm text-[17px]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-4"
            >
              {(["en", "tr"] as const).map((code, index) => (
                <span key={code} className="inline-flex items-center gap-1.5" aria-hidden="true">
                  {index > 0 ? <span className="text-[var(--ink)]">/</span> : null}
                  <span
                    lang={code}
                    className={
                      code === locale
                        ? "text-[var(--primary)]"
                        : "text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--primary)]"
                    }
                  >
                    {code.toUpperCase()}
                  </span>
                </span>
              ))}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="lg:hidden grid place-items-center w-9 h-9 -mr-1.5 text-[var(--ink)]"
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* The running head's rule, ending in the page number. */}
        <div aria-hidden="true" className="flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--ink)]/45" />
          <span className="font-display italic text-[15px] leading-none text-[var(--ink-soft)] tabular-nums translate-y-[1px]">
            {pageNumber}
          </span>
        </div>

        {menuOpen ? (
          <div className="lg:hidden flex flex-col gap-1 pt-3 pb-5 text-base">
            {links.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={() => setMenuOpen(false)}
                className="py-1.5"
                style={{
                  color: activeSection === link.id ? "var(--primary)" : "var(--ink)",
                }}
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/support"
              onClick={() => setMenuOpen(false)}
              className="py-1.5 text-[var(--ink)]"
            >
              {t.nav.support}
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
