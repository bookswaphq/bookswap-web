"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const features = [
  {
    title: "Scan to add",
    copy: "Point your camera at any barcode and add a book to your shelf in seconds no typing required.",
  },
  {
    title: "Find a swap",
    copy: "See how many readers own a book before you send a swap request.",
  },
  {
    title: "Chat inside the app",
    copy: "Agree on the details and arrange your handoff without ever leaving BookSwap.",
  },
];

export default function Features() {
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
          Inside BookSwap
        </span>

        <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-[var(--ink)] sm:text-4xl">
          A shorter journey between two bookshelves.
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--ink-soft)]">
          Add what you’ve finished, find what you want to read next, and arrange
          the swap in one place.
        </p>
      </motion.header>

      <div className="mx-auto mt-14 w-full max-w-4xl border-t border-[var(--border)]">
        {features.map(({ title, copy }) => (
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
