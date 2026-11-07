"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import HeroVisual from "@/components/three/HeroVisual";
import AppStoreButton from "@/components/marketing/AppStoreButton";
import GooglePlayButton from "@/components/marketing/GooglePlayButton";
import { useLocale } from "@/i18n/LocaleContext";

/**
 * One centred column: headline → what the app does → downloads → link, with the
 * two shelves directly underneath so the swap reads as the end of the same story.
 */
export default function Hero() {
  const { t } = useLocale();

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.1, 0.08)}
      className="relative w-full px-5 sm:px-6 pt-28 pb-6 sm:pt-32 lg:pt-32 overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.h1
          variants={fadeUp}
          className="font-display text-[2.6rem] min-[400px]:text-[3rem] sm:text-[3.9rem] lg:text-[4.75rem]
            font-normal leading-[1.04] tracking-[-0.005em] text-[var(--ink)] text-balance"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0' }}
        >
          <span className="block">{t.hero.titleLines.join(" ")}</span>
          {/* Editorial italic: medium weight, softened, with Fraunces' calligraphic "wonk" forms. */}
          <span
            className="block italic font-medium tracking-[-0.01em] text-[var(--primary)]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
          >
            {t.hero.titleEmphasis}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-[var(--ink-soft)] text-balance"
        >
          {t.hero.subtitleLine1}
          <br className="hidden sm:block" /> {t.hero.subtitleLine2}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <AppStoreButton campaign="website-hero" />
          <GooglePlayButton campaign="website-hero" />
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="#how-it-works"
          className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--primary)]
            underline underline-offset-4 decoration-[var(--primary)]/35
            transition-colors hover:text-[var(--primary-dark)] hover:decoration-[var(--primary-dark)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
            focus-visible:ring-offset-4 rounded-sm"
        >
          {t.hero.howItWorksLink}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>

      {/* Two shelves trading a pair of books. The books rise into the space
          between the shelves, so the slot starts just under the link. */}
      <motion.div variants={fadeUp} className="mx-auto mt-6 w-full max-w-[1000px] sm:mt-6">
        <HeroVisual className="relative w-full aspect-[2.3/1]" />
      </motion.div>
    </motion.section>
  );
}
