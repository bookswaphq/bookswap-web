"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

export default function About() {
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
        About BookSwap
      </motion.span>

      <motion.p
        variants={fadeUp}
        className="font-display mt-6 text-2xl sm:text-3xl italic leading-snug text-[var(--ink)]"
      >
        &ldquo;Books are meant to be read, shared, and discovered again.
        BookSwap helps every story find its next reader.&rdquo;
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-6 text-sm max-w-md"
        style={{ color: "var(--ink-soft)" }}
      >
        BookSwap is a simple way for readers to exchange books they&apos;ve
        finished and discover new ones from other shelves. List your books,
        receive swap offers, chat with readers, and give every story a new
        journey.
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