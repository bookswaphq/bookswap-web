"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import WaitlistForm from "./WaitlistForm";

export default function Waitlist() {
  return (
    <motion.section
      id="waitlist"
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
        Early readers
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
        BookSwap is getting ready to launch on the App Store. Join the waitlist and we'll let you know when it's available.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-1 w-full rounded-3xl p-6">
        <WaitlistForm />
      </motion.div>
    </motion.section>
  );
}