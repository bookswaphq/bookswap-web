"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { useLocale } from "@/i18n/LocaleContext";

export default function Features() {
  const { t } = useLocale();
  return (
    <motion.section
      id="features"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.12)}
      className="w-full max-w-5xl px-6 py-24"
    >
      <motion.header
        variants={fadeUp}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--primary)]">
          {t.features.eyebrow}
        </span>

        <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-[var(--ink)] sm:text-4xl">
          {t.features.title}
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--ink-soft)]">
          {t.features.subtitle}
        </p>
      </motion.header>

      <div className="mx-auto mt-14 w-full max-w-4xl border-t border-[var(--border)]">
        {t.features.items.map(({ title, copy }) => (
          <motion.article
            key={title}
            variants={fadeUp}
            className="grid gap-4 border-b border-[var(--border)] py-9 text-left md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-14"
          >
            <h3 className="max-w-md font-display text-xl font-medium leading-snug text-[var(--ink)] sm:text-2xl">
              {title}
            </h3>

            <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] md:pt-0.5">
              {copy}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
