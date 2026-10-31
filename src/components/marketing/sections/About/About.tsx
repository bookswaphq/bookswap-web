"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { useLocale } from "@/i18n/LocaleContext";

export default function About() {
  const { t } = useLocale();
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.12)}
      className="w-full max-w-2xl px-6 py-24 flex flex-col items-center text-center"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        {t.about.eyebrow}
      </motion.span>

      <motion.p
        variants={fadeUp}
        className="font-display mt-6 text-2xl sm:text-3xl italic leading-snug text-[var(--ink)]"
      >
        &ldquo;{t.about.quote}&rdquo;
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-6 text-sm max-w-md"
        style={{ color: "var(--ink-soft)" }}
      >
        {t.about.body}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-8 w-16 h-1 rounded-full"
        style={{
          background: "var(--primary)",
        }}
      />
    </motion.section>
  );
}