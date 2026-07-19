"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const faqs = [
  {
    q: "Is BookSwap free?",
    a: "Yes. Browsing books, listing your own, and swapping with other readers is free.",
  },
  {
    q: "How do I get access?",
    a: "We're inviting readers in small groups rather than opening to everyone at once. Join the waitlist and we'll email you when it's your turn.",
  },
  {
    q: "Which platforms does it run on?",
    a: "BookSwap is built with React Native and is rolling out on iOS first, with other platforms planned.",
  },
  {
    q: "How does a swap actually happen?",
    a: "You agree on a book-for-book trade, then arrange a handoff through in-app chat — most readers meet locally or find a drop-off that works for both sides.",
  },
  {
    q: "What data do you collect?",
    a: "Only what's needed to run BookSwap — matching you with nearby readers and managing your swaps. A full privacy policy will be published before general launch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.08)}
      className="w-full max-w-2xl px-6 py-20 flex flex-col items-center text-center"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Questions, Answered
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        Before you ask
      </motion.h2>

      <div className="mt-12 w-full flex flex-col gap-3 text-left">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={item.q}
              variants={fadeUp}
              className="rounded-2xl border overflow-hidden"
              style={{
                background: "var(--paper-card)",
                borderColor: isOpen ? "var(--primary)" : "var(--border)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-base font-medium text-[var(--ink)]">
                  {item.q}
                </span>

                <span
                  className="shrink-0 font-mono text-lg leading-none"
                  style={{ color: "var(--primary)" }}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-5 pb-5 text-sm"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
