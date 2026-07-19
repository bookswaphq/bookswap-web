"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

export default function Features() {
  const features = [
    {
      ch: "Chapter I",
      title: "Scan to add",
      copy: "Point your camera at any barcode and add a book to your shelf in seconds — no typing required.",
    },
    {
      ch: "Chapter II",
      title: "See who's nearby",
      copy: "Every book shows how many readers already own it, so you know a swap is possible before you ask.",
    },
    {
      ch: "Chapter III",
      title: "Chat inside the app",
      copy: "Agree on the details and arrange your handoff without ever leaving BookSwap.",
    },
  ];

  return (
    <motion.section
      id="features"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="w-full max-w-4xl px-6 py-20 flex flex-col items-center text-center"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Built For Readers
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium max-w-lg text-[var(--ink)]"
      >
        The details that make it easy
      </motion.h2>

      <div className="mt-14 grid sm:grid-cols-3 gap-8 w-full">
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className="card-lift rounded-2xl p-6 flex flex-col items-center text-center"
            style={{
              background: "var(--paper-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{
                background: "var(--primary-soft)",
              }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: "var(--primary)",
                }}
              />
            </div>

            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{
                color: "var(--ink-muted)",
              }}
            >
              {f.ch}
            </span>

            <h3 className="font-display mt-2 text-lg font-medium text-[var(--ink)]">
              {f.title}
            </h3>

            <p
              className="mt-2 text-sm max-w-[220px]"
              style={{
                color: "var(--ink-soft)",
              }}
            >
              {f.copy}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}