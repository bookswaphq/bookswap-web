"use client";

import { motion } from "framer-motion";
import { fadeIn, viewport } from "@/lib/motion";

export default function Footer() {
  return (
    <motion.footer
      id="support"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeIn}
      className="w-full px-6 py-12 flex flex-col items-center text-center"
      style={{
        background: "var(--ink)",
        color: "rgba(255,255,255,0.65)",
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="font-display text-2xl font-medium"
          style={{ color: "white" }}
        >
          BookSwap
        </span>

        <p className="text-sm max-w-xs">
          Give finished books a new journey. Discover, exchange, and keep
          stories moving.
        </p>

        <a
          href="mailto:hello@bookswap.app"
          className="font-mono text-xs tracking-wide transition-opacity hover:opacity-80"
          style={{
            color: "var(--primary-soft)",
          }}
        >
          hello@bookswap.app
        </a>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-8 text-xs">
        <a href="#faq" className="transition-opacity hover:opacity-80">
          FAQ
        </a>

        <a href="#safety" className="transition-opacity hover:opacity-80">
          Trust &amp; Safety
        </a>

        <a href="/privacy" className="transition-opacity hover:opacity-80">
          Privacy Policy
        </a>

        {/* <a href="/terms" className="transition-opacity hover:opacity-80">
          Terms of Service
        </a> */}

        <a href="/engineering" className="transition-opacity hover:opacity-80">
          Engineering
        </a>
      </div>

      <div
        className="w-full max-w-sm h-px my-8"
        style={{
          background: "rgba(255,255,255,0.12)",
        }}
      />

      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
        <span>
          © {new Date().getFullYear()} BookSwap
        </span>

        <span className="hidden sm:inline">·</span>

        <span>Istanbul</span>
      </div>
    </motion.footer>
  );
}