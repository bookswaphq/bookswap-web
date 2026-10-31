import type { Locale } from "./dictionaries";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { finished: Promise<void> };
};

/** Resolves once the page in `locale` is on screen (its <main lang> rendered), or after a timeout. */
function waitForLocale(locale: Locale, timeoutMs = 2000): Promise<void> {
  const selector = `main[lang="${locale}"]`;
  return new Promise((resolve) => {
    if (document.querySelector(selector)) return resolve();
    const done = () => {
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    };
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) done();
    });
    const timer = setTimeout(done, timeoutMs);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

/**
 * Switches language with a page curl: the current page peels back from its
 * bottom-right corner, revealing the other language underneath (styles: `.page-turn`
 * in globals.css).
 *
 * Returns false when the browser can't animate it (no View Transitions, or reduced
 * motion); the caller then lets the link navigate normally.
 */
export function turnPageTo(navigate: () => void, locale: Locale): boolean {
  const doc = document as ViewTransitionDocument;
  if (!doc.startViewTransition) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const root = document.documentElement;
  root.classList.add("page-turn");

  // An empty full-screen layer with its own transition name: the browser gives it a
  // group of its own, on which the CSS paints the folded-back flap of the page. It is
  // transparent, so adding it shows nothing on the live page.
  const shade = document.createElement("div");
  shade.setAttribute("aria-hidden", "true");
  shade.style.cssText = "position:fixed;inset:0;pointer-events:none;view-transition-name:page-shade";
  document.body.appendChild(shade);

  const transition = doc.startViewTransition(() => {
    shade.remove(); // only in the "old" state, so it leaves with the turning page
    navigate();
    return waitForLocale(locale);
  });
  transition.finished.finally(() => {
    shade.remove();
    root.classList.remove("page-turn");
  });
  return true;
}
