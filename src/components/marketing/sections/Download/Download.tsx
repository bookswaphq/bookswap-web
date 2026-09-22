"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import AppStoreButton from "@/components/marketing/AppStoreButton";
import GooglePlayButton from "@/components/marketing/GooglePlayButton";

export default function Download() {
  return (
    <motion.section
      id="download"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="w-full max-w-xl px-6 py-24 flex flex-col items-center text-center"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Out now
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        Keep stories moving
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-3 text-sm max-w-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        BookSwap is live on the App Store. Download it, add the books you&apos;ve
        finished, and start swapping with readers near you.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <AppStoreButton />
        <GooglePlayButton />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="font-mono text-[11px] tracking-[0.18em] uppercase mt-5"
        style={{ color: "var(--ink-muted)" }}
      >
        Free · iPhone · Android soon
      </motion.p>
    </motion.section>
  );
}
