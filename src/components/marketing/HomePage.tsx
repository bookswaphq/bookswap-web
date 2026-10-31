import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { dictionaries, HOME_PATH, type Locale } from "@/i18n/dictionaries";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero/Hero";
import Showcase from "./sections/Showcase/Showcase";
import HowItWorks from "./sections/HowItWorks/HowItWorks";
import Features from "./sections/Features/Features";
import About from "./sections/About/About";
import Safety from "./sections/Safety/Safety";
import FAQ from "./sections/FAQ/FAQ";
import Download from "./sections/Download/Download";

/**
 * hreflang pair shared by both home pages: each language points at itself and at the
 * other, and English is the fallback for every other language.
 */
const languageAlternates = {
  en: HOME_PATH.en,
  tr: HOME_PATH.tr,
  "x-default": HOME_PATH.en,
};

/** Home-page metadata for one language (title, description, canonical, hreflang). */
export function homeMetadata(locale: Locale): Metadata {
  const { title, description } = dictionaries[locale].meta;
  return {
    // `absolute` skips the "%s · BookSwap" template from the root layout.
    title: { absolute: title },
    description,
    alternates: { canonical: HOME_PATH[locale], languages: languageAlternates },
    openGraph: {
      type: "website",
      siteName: "BookSwap",
      title,
      description,
      url: HOME_PATH[locale],
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** The marketing home page in one language; `/` and `/tr` both render this. */
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <main
        lang={locale}
        className="font-body min-h-screen flex flex-col items-center"
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
        }}
      >
        <Navbar />
        <Hero />
        <Showcase />
        <HowItWorks />
        <Features />
        <About />
        <Safety />
        <FAQ />
        <Download />
        <Footer />
      </main>
    </LocaleProvider>
  );
}
