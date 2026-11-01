import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { dictionaries, HOME_PATH, type Locale } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
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

/**
 * Structured data for one language: the app itself (free, iPhone and Android, store
 * links) and the FAQ, so search engines read them as facts rather than page text.
 * The FAQ is built from the same dictionary as the visible FAQ, so the two never drift.
 */
function homeJsonLd(locale: Locale) {
  const t = dictionaries[locale];
  const pageUrl = locale === "en" ? siteConfig.url : `${siteConfig.url}${HOME_PATH[locale]}`;
  const privacy = t.faq.privacy;
  const faqs = [
    ...t.faq.items,
    { q: privacy.q, a: `${privacy.before} ${privacy.link} (${siteConfig.url}/privacy) ${privacy.after}` },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: siteConfig.name,
      description: t.meta.description,
      url: pageUrl,
      inLanguage: locale,
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      installUrl: [siteConfig.appStoreUrl, siteConfig.playStoreUrl],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: pageUrl,
      inLanguage: locale,
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
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
        <script
          type="application/ld+json"
          // "<" escaped so no string in the data can close the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeJsonLd(locale)).replace(/</g, "\\u003c"),
          }}
        />
      </main>
    </LocaleProvider>
  );
}
