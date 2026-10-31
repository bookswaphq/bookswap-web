"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/i18n/LocaleContext";

export default function Safety() {
  const { t } = useLocale();
  return (
    <motion.section
      id="safety"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="w-full max-w-2xl px-6 py-20 flex flex-col items-center text-center"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        {t.safety.eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        {t.safety.title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-md text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        {t.safety.subtitle}
      </motion.p>

      <div className="mt-12 w-full flex flex-col gap-4 text-left">
        {t.safety.tips.map((tip) => (
          <motion.div
            key={tip.title}
            variants={fadeUp}
            className="rounded-2xl border p-5"
            style={{
              background: "var(--paper-card)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="font-display text-base font-medium text-[var(--ink)]">
              {tip.title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
              {tip.copy}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        className="mt-8 text-xs"
        style={{ color: "var(--ink-muted)" }}
      >
        {t.safety.reportBefore}{" "}
        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="underline underline-offset-2"
          style={{ color: "var(--primary)" }}
        >
          {t.safety.reportLink}
        </a>
        {t.safety.reportAfter.startsWith(",") ? "" : " "}
        {t.safety.reportAfter}
      </motion.p>
    </motion.section>
  );
}
