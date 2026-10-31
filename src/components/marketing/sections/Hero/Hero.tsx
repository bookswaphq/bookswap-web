"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import HeroVisual from "@/components/three/HeroVisual";
import AppStoreButton from "@/components/marketing/AppStoreButton";
import GooglePlayButton from "@/components/marketing/GooglePlayButton";

export default function Hero() {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.11, 0.08)}
      className="relative w-full flex flex-col items-center text-center px-6 pt-32 pb-8 sm:pt-36 overflow-hidden"
    >
      <motion.h1
        variants={fadeUp}
        className="font-display max-w-4xl text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight text-[var(--ink)] text-balance"
      >
        Your finished book is{" "}
        <span className="italic" style={{ color: "var(--primary)" }}>
          someone else&apos;s
        </span>{" "}
        next story.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        // Two lines on purpose, broken after the comma: left to wrap on its own, "swap."
        // ended up alone on the second line. On phones the forced break is off and
        // text-balance evens out the lines instead.
        className="mt-5 text-lg max-w-xl text-balance"
        style={{ color: "var(--ink-soft)" }}
      >
        Discover books nearby, connect with local readers,
        <br className="hidden sm:block" /> and offer a swap.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <AppStoreButton campaign="website-hero" />

        <GooglePlayButton campaign="website-hero" />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-3 text-[13px]"
        style={{ color: "var(--ink-muted)" }}
      >
        Free to download
      </motion.p>

      <motion.a
        variants={fadeUp}
        href="#how-it-works"
        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium
          text-[#7F3DFF] underline underline-offset-4 decoration-[#7F3DFF]/40
          transition-colors hover:text-[#6E2EE6] hover:decoration-[#6E2EE6]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F3DFF]
          focus-visible:ring-offset-4 rounded-sm"
      >
        See how swapping works
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.a>

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
