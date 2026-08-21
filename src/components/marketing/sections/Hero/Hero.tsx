"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.12, 0.1)}
      className="w-full max-w-2xl flex flex-col items-center text-center px-6 pt-40 pb-20"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full"
        style={{
          color: "var(--primary)",
          background: "var(--primary-soft)",
          border: "1px solid var(--primary-surface)",
        }}
      >
        Now boarding readers
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="font-display mt-6 text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight text-[var(--ink)]"
      >
        Discover books.
        <br />
        Exchange with readers.
        <br />
        Keep stories moving.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-6 text-lg max-w-md"
        style={{ color: "var(--ink-soft)" }}
      >
        BookSwap helps you discover new reads, offer books you&apos;ve finished,
        and connect with readers to exchange stories.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-9 flex flex-wrap gap-4 justify-center"
      >
        <a
          href="#waitlist"
          className="btn-primary rounded-xl px-6 py-3 font-medium"
        >
          Join the Waitlist
        </a>
      </motion.div>

      {/* Signature bookshelf illustration */}
      <motion.div
        variants={fadeUp}
        className="spine-group mt-16 flex items-end gap-2 h-36"
      >
        <div
          className="spine w-8 rounded-t-sm"
          style={{
            height: "70%",
            background: "var(--primary)",
            "--tilt": "-3deg",
          } as React.CSSProperties}
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={{
            height: "95%",
            background: "var(--ink)",
            "--tilt": "2deg",
          } as React.CSSProperties}
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={{
            height: "55%",
            background: "var(--primary-soft)",
            border: "1px solid var(--border)",
            "--tilt": "-2deg",
          } as React.CSSProperties}
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={{
            height: "100%",
            background: "var(--primary-dark)",
            "--tilt": "3deg",
          } as React.CSSProperties}
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={{
            height: "65%",
            background: "var(--paper-card)",
            border: "1px solid var(--border)",
            "--tilt": "-4deg",
          } as React.CSSProperties}
        />

        <div
          className="spine w-8 rounded-t-sm"
          style={{
            height: "85%",
            background: "var(--primary)",
            "--tilt": "1deg",
          } as React.CSSProperties}
        />
      </motion.div>
    </motion.section>
  );
}