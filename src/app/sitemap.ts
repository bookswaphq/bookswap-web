import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // English and Turkish home pages list each other (hreflang in the sitemap).
  const homeLanguages = { en: siteConfig.url, tr: `${siteConfig.url}/tr` };

  // /engineering is marked noindex (portfolio/case-study page, not
  // meant to compete with the main site in search) so it's left out here.
  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteConfig.url}/tr`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteConfig.url}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/delete-account`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
