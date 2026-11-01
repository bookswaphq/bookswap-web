import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // When each page's content last changed. A build date (new Date()) changes on every
  // deploy, so search engines learn to ignore it; real dates tell them what to
  // re-crawl. Update the date when you change that page.
  const updated = {
    home: new Date("2026-11-01"),
    support: new Date("2026-09-08"),
    privacy: new Date("2026-07-21"),
    deleteAccount: new Date("2026-09-22"),
  };
  // English and Turkish home pages list each other (hreflang in the sitemap).
  const homeLanguages = { en: siteConfig.url, tr: `${siteConfig.url}/tr` };

  // /engineering is marked noindex (portfolio/case-study page, not
  // meant to compete with the main site in search) so it's left out here.
  return [
    {
      url: siteConfig.url,
      lastModified: updated.home,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteConfig.url}/tr`,
      lastModified: updated.home,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteConfig.url}/support`,
      lastModified: updated.support,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: updated.privacy,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/delete-account`,
      lastModified: updated.deleteAccount,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
