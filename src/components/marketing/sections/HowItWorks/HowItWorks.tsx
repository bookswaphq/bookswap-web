"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { useLocale } from "@/i18n/LocaleContext";

export default function HowItWorks() {
  const { t } = useLocale();
  const steps = t.howItWorks.steps.map((step, i) => ({ n: String(i + 1), ...step }));

  return (
    <motion.section
      id="how-it-works"
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
        {t.howItWorks.eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        {t.howItWorks.title}
      </motion.h2>

      <div className="mt-14 w-full flex flex-col gap-6">
        {steps.map((step) => (
          <motion.div
            key={step.n}
            variants={fadeUp}
            className="card-lift rounded-2xl flex items-center gap-5 p-5 text-left border"
            style={{
              background: "var(--paper-card)",
              borderColor: "var(--border)",
            }}
          >
            <span
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              style={{
                background: "var(--primary-soft)",
                color: "var(--primary)",
              }}
            >
              {step.n}
            </span>

            <div>
              <h3 className="font-display text-base font-medium text-[var(--ink)]">
                {step.title}
              </h3>

              <p
                className="mt-1 text-sm"
                style={{
                  color: "var(--ink-soft)",
                }}
              >
                {step.copy}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}