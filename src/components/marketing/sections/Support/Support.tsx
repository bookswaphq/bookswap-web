"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

const mailtoHref =
  `mailto:${siteConfig.supportEmail}` +
  `?subject=${encodeURIComponent("BookSwap Support Request")}`;

export default function Support() {
  return (
    <motion.section
      id="support"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.06)}
      className="w-full max-w-2xl px-6 pt-32 pb-20 flex flex-col text-left"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Support
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        Support &amp; Contact Us
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-6 text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        Need help with BookSwap? If you have a question about the app, ran into
        a problem, want to report a swap or a user, or would like your account
        or data removed, contact us by email and we&apos;ll help you directly.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-8 w-full rounded-2xl border p-6 sm:p-7"
        style={{
          background: "var(--paper-card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 grid place-items-center w-9 h-9 shrink-0 rounded-full"
            style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
          >
            <Mail size={17} />
          </span>

          <div className="min-w-0">
            <h2 className="font-display text-lg font-medium text-[var(--ink)]">
              Email Support
            </h2>

            <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
              Write to us at:
            </p>

            <a
              href={mailtoHref}
              className="mt-1 block font-mono text-sm sm:text-base break-all underline underline-offset-2"
              style={{ color: "var(--primary)" }}
            >
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>

        <a
          href={mailtoHref}
          className="btn-primary mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
        >
          <Mail size={16} />
          Email Support
        </a>

        <p className="mt-4 text-xs" style={{ color: "var(--ink-muted)" }}>
          We&apos;re a small team and read every message. We aim to reply within
          2 business days.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10">
        <h2 className="font-display text-xl font-medium text-[var(--ink)]">
          What to include
        </h2>

        <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--ink-soft)" }}>
          To help us resolve your issue faster, please tell us:
        </p>

        <ul
          className="mt-3 list-disc pl-5 flex flex-col gap-1.5 text-sm sm:text-base"
          style={{ color: "var(--ink-soft)" }}
        >
          <li>What you were trying to do and what happened instead</li>
          <li>Your device and iOS version (for example, iPhone 14, iOS 18)</li>
          <li>The BookSwap app version, if you know it</li>
          <li>A screenshot, if the problem is something you can see</li>
        </ul>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10">
        <h2 className="font-display text-xl font-medium text-[var(--ink)]">
          Other helpful links
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <Link
            href="/#faq"
            className="flex items-center gap-3 rounded-2xl border px-5 py-4 transition-colors"
            style={{
              background: "var(--paper-card)",
              borderColor: "var(--border)",
            }}
          >
            <MessageCircleQuestion size={18} style={{ color: "var(--primary)" }} />

            <span className="text-sm sm:text-base text-[var(--ink)]">
              Frequently asked questions
            </span>
          </Link>

          <Link
            href="/privacy"
            className="flex items-center gap-3 rounded-2xl border px-5 py-4 transition-colors"
            style={{
              background: "var(--paper-card)",
              borderColor: "var(--border)",
            }}
          >
            <ShieldCheck size={18} style={{ color: "var(--primary)" }} />

            <span className="text-sm sm:text-base text-[var(--ink)]">
              Privacy Policy
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
