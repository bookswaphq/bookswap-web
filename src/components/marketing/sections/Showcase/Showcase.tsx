"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { useLocale } from "@/i18n/LocaleContext";

type FeatureId = "scan" | "search" | "library" | "chat";

interface Feature {
  id: FeatureId;
  src?: string;
  primarySrc?: string;
  secondarySrc?: string;
}

// Images only; titles, descriptions and alt texts come from the dictionary.
const features: Feature[] = [
  { id: "scan", src: "/screenshots/barcode-scan.png" },
  { id: "search", src: "/screenshots/search-owners.png" },
  { id: "library", src: "/screenshots/library.png" },
  { id: "chat", primarySrc: "/screenshots/offer-details.png", secondarySrc: "/screenshots/chat.png" },
];

export default function Showcase() {
  const { t } = useLocale();
  return (
    <motion.section
      id="showcase"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="w-full max-w-4xl px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center text-center"
    >
      {/* Header */}
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        {t.showcase.eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        {t.showcase.title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-md text-sm sm:text-base text-[var(--ink-soft)]"
      >
        {t.showcase.subtitle}
      </motion.p>

      {/* Grid - Cut Effect Layer Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-14 w-full">
        {features.map((feature, idx) => {
          const copy = t.showcase.features[feature.id];
          return (
          <motion.div
            key={feature.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              p-6
              pt-7
              pb-0
              flex flex-col items-center
              text-center
              shadow-[0_8px_30px_rgb(0,0,0,0.04)]
              h-[420px] sm:h-[430px]
            "
            style={{
              background: "var(--paper-card, #ffffff)",
            }}
          >
            {/* Metin Kutusu (Sabit Üst Bölüm) */}
            <div className="relative z-20 max-w-xs shrink-0">
              <h3 className="font-display text-lg font-medium text-[var(--ink)]">
                {copy.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
                {copy.description}
              </p>
            </div>

            {/* Görsel Alanı - Dengeli Gap ve Taşma Değerleri */}
            <div className="relative z-10 w-full flex-1 flex items-end justify-center overflow-hidden pt-4 mt-2">
              {feature.secondarySrc && feature.primarySrc ? (
                /* Çift Ekranlı Cut Effect */
                <div className="relative w-full max-w-[280px] h-full flex items-end justify-center">
                  {/* Sol Ekran */}
                  <div
                    className="
                      absolute
                      left-2 sm:left-4
                      bottom-[-50px] sm:bottom-[-40px]
                      w-[145px] sm:w-[155px]
                      z-20
                      shadow-xl
                      transition-transform
                      duration-300
                      group-hover:translate-y-[-6px]
                    "
                  >
                    <PhoneFrame
                      src={feature.primarySrc}
                      alt={copy.alt}
                      priority={idx === 0}
                    />
                  </div>
                  {/* Sağ Ekran */}
                  <div
                    className="
                      absolute
                      right-2 sm:right-4
                      bottom-[-80px] sm:bottom-[-70px]
                      w-[140px] sm:w-[150px]
                      z-10
                      opacity-80
                      transition-transform
                      duration-300
                      group-hover:translate-y-[-4px]
                    "
                  >
                    <PhoneFrame
                      src={feature.secondarySrc}
                      alt={copy.alt}
                    />
                  </div>
                </div>
              ) : (
                /* Tek Ekranlı Cut Effect */
                <div
                  className="
                    w-[165px] sm:w-[175px]
                    translate-y-14 sm:translate-y-16
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:translate-y-12 sm:group-hover:translate-y-14
                  "
                >
                  <PhoneFrame
                    src={feature.src!}
                    alt={copy.alt}
                    priority={idx === 0}
                  />
                </div>
              )}
            </div>
          </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}