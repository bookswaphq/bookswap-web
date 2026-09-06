"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import HeroVisual from "@/components/three/HeroVisual";

export default function Hero() {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.11, 0.08)}
      className="relative w-full flex flex-col items-center text-center px-6 pt-32 pb-8 sm:pt-36 overflow-hidden"
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
        className="font-display mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight text-[var(--ink)] text-balance"
      >
        Your finished book is{" "}
        <span className="italic" style={{ color: "var(--primary)" }}>
          someone else&apos;s
        </span>{" "}
        next story.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-5 text-lg max-w-xl"
        style={{ color: "var(--ink-soft)" }}
      >
        Two shelves, one exchange. BookSwap helps you find the book you want on
        another reader&apos;s shelf and send one of yours back the other way.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center"
      >
        <a
          href="#showcase"
          className="btn-primary rounded-xl px-6 py-3 font-medium"
        >
          Discover Books
        </a>

        <a
          href="#how-it-works"
          className="btn-outline rounded-xl px-6 py-3 font-medium"
        >
          How Swapping Works
        </a>
      </motion.div>

      {/* Two shelves trading a pair of books. WebGL on desktop, CSS elsewhere. */}
      <motion.div variants={fadeUp} className="w-full max-w-5xl mt-5 sm:mt-6">
        <HeroVisual />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="font-mono text-[11px] tracking-[0.18em] uppercase mt-3"
        style={{ color: "var(--ink-muted)" }}
      >
        28M+ titles · offer · match · swap
      </motion.p>
    </motion.section>
  );
}
