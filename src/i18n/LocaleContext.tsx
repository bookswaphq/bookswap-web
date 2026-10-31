"use client";

import { createContext, useContext, useEffect } from "react";
import { dictionaries, HOME_PATH, type Dictionary, type Locale } from "./dictionaries";

type LocaleValue = { locale: Locale; t: Dictionary; homePath: string };

// English by default: pages without a provider (privacy, support, delete-account,
// engineering) keep rendering exactly as before.
const LocaleContext = createContext<LocaleValue>({
  locale: "en",
  t: dictionaries.en,
  homePath: HOME_PATH.en,
});

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  // The root layout renders <html lang="en"> for every page; correct it on /tr.
  // (The server HTML already marks the content with <main lang="tr"> and hreflang.)
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale], homePath: HOME_PATH[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** The current language's copy, the language, and its home path ("/" or "/tr"). */
export function useLocale() {
  return useContext(LocaleContext);
}
