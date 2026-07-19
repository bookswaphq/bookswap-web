"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import PhoneFrame from "@/components/ui/PhoneFrame";

const screens = [
  {
    src: "/screenshots/discover.png",
    alt: "BookSwap discover feed with recently added and most popular books",
  },
  {
    src: "/screenshots/offer-swap.png",
    alt: "BookSwap swap proposal screen exchanging one book for another",
  },
  {
    src: "/screenshots/receive-offer.png",
    alt: "BookSwap swaps screen with accept and decline actions",
  },
  {
    src: "/screenshots/chat.png",
    alt: "BookSwap chat screen confirming an agreed swap",
  },
];

const phoneItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Showcase() {
  return (
    <motion.section
      id="showcase"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="relative w-full px-6 py-24 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Decorative background circles */}
      <div
        className="pointer-events-none absolute -z-10 rounded-full blur-3xl"
        style={{
          width: 480,
          height: 480,
          top: -160,
          right: -140,
          background: "var(--primary-surface)",
          opacity: 0.6,
        }}
      />
      <div
        className="pointer-events-none absolute -z-10 rounded-full blur-3xl"
        style={{
          width: 380,
          height: 380,
          bottom: -120,
          left: -120,
          background: "var(--primary-soft)",
          opacity: 0.7,
        }}
      />
      <div
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          width: 14,
          height: 14,
          top: "18%",
          left: "12%",
          background: "var(--primary)",
          opacity: 0.35,
        }}
      />
      <div
        className="pointer-events-none absolute -z-10 rounded-full border"
        style={{
          width: 46,
          height: 46,
          bottom: "22%",
          right: "10%",
          borderColor: "var(--primary-surface)",
        }}
      />

      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Product Tour
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium max-w-lg text-[var(--ink)]"
      >
        See BookSwap in action
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-md text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        From discovering a book to chatting with your swap partner.
      </motion.p>

      <motion.div
        variants={staggerContainer(0.1)}
        className="mt-14 grid grid-cols-2 gap-5 sm:gap-8 w-full max-w-[420px] sm:max-w-[520px]"
      >
        {screens.map((screen, i) => (
          <motion.div
            key={screen.src}
            variants={phoneItem}
            className={i % 2 === 1 ? "sm:translate-y-10" : ""}
          >
            <PhoneFrame src={screen.src} alt={screen.alt} priority={i === 0} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
