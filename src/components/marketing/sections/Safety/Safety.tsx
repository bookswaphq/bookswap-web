"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const tips = [
  {
    title: "Chat before you meet",
    copy: "Get a feel for your swap partner in the app before agreeing on a time and place.",
  },
  {
    title: "Meet in public",
    copy: "Coffee shops, libraries, and campus commons are easy, low-key spots for a handoff.",
  },
  {
    title: "Trust your instincts",
    copy: "You can decline or cancel a swap at any point — no explanation needed.",
  },
];

export default function Safety() {
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
        Trust &amp; Safety
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        Swapping is easy when it&apos;s safe
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-md text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        BookSwap connects you with real readers nearby. A few habits make
        every handoff smoother.
      </motion.p>

      <div className="mt-12 w-full flex flex-col gap-4 text-left">
        {tips.map((tip) => (
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
        Something felt off?{" "}
        <a
          href="mailto:hello@bookswap.app"
          className="underline underline-offset-2"
          style={{ color: "var(--primary)" }}
        >
          Tell us
        </a>{" "}
        and we&apos;ll look into it.
      </motion.p>
    </motion.section>
  );
}
