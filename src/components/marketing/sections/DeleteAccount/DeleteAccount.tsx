"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

/*
 * Public account-deletion page. Google Play requires apps with account
 * creation to offer a way to request deletion without the app installed;
 * this page is the URL declared under App content → Data deletion.
 * Keep the deleted/retained lists in sync with the Privacy Policy and the
 * Play Data safety form.
 */

const processingDays = 30;

const deleted = [
  "Your profile: name, phone number or Google/Apple sign-in, profile photo, bio and other details",
  "Your library and wishlist",
  "All swap offers you sent or received",
  "Your push-notification and device registrations",
];

const retained = [
  "Messages you sent stay in the other person's conversation so their chat history remains complete. Your name and photo are removed and you appear as \"Deleted user\". Nothing in the messages links back to you.",
];

const subject = encodeURIComponent("Account deletion request");
const body = encodeURIComponent(
  "Please delete my BookSwap account.\n\nRegistered phone number (if I signed up with my phone number): +",
);
const mailto = `mailto:${siteConfig.supportEmail}?subject=${subject}&body=${body}`;

const paragraph = "text-sm sm:text-base";
const muted = { color: "var(--ink-soft)" } as const;

export default function DeleteAccount() {
  return (
    <motion.section
      id="delete-account"
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
        Your account
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        Delete your BookSwap account
      </motion.h1>

      <motion.p variants={fadeUp} className={`mt-8 ${paragraph}`} style={muted}>
        You can delete your account and the personal data BookSwap holds about
        you at any time. There are two ways to do it.
      </motion.p>

      <div className="mt-12 w-full flex flex-col gap-10">
        <motion.div variants={fadeUp}>
          <h2 className="font-display text-xl font-medium text-[var(--ink)]">
            1. In the app (immediate)
          </h2>
          <p className={`mt-3 ${paragraph}`} style={muted}>
            Open BookSwap, go to the <strong>Profile</strong> tab, choose{" "}
            <strong>Delete Account</strong> and confirm. Your account is
            deleted straight away. This cannot be undone.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="font-display text-xl font-medium text-[var(--ink)]">
            2. By request (no app needed)
          </h2>
          <p className={`mt-3 ${paragraph}`} style={muted}>
            If you no longer have the app installed, email us:
          </p>
          <ul
            className={`mt-3 list-disc pl-5 flex flex-col gap-1.5 ${paragraph}`}
            style={muted}
          >
            <li>
              Signed up with a <strong>phone number</strong>: email us from any
              address and include that number.
            </li>
            <li>
              Signed up with <strong>Google</strong>: email us from the address
              of that Google account.
            </li>
            <li>
              Signed up with <strong>Apple</strong>: delete your account in the
              app (reinstall it from the App Store if needed). If you can&apos;t,
              email us and we&apos;ll help.
            </li>
          </ul>
          <p className={`mt-3 ${paragraph}`} style={muted}>
            <a
              href={mailto}
              className="underline underline-offset-2"
              style={{ color: "var(--primary)" }}
            >
              {siteConfig.supportEmail}
            </a>
          </p>
          <p className={`mt-3 ${paragraph}`} style={muted}>
            To make sure the request really comes from you, we may ask you to
            confirm it from that phone number, or by replying to our email at
            your Google account&apos;s address. Once verified, we delete the
            account within <strong>{processingDays} days</strong> and confirm
            by email.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="font-display text-xl font-medium text-[var(--ink)]">
            What is deleted
          </h2>
          <ul
            className={`mt-3 list-disc pl-5 flex flex-col gap-1.5 ${paragraph}`}
            style={muted}
          >
            {deleted.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={`mt-3 ${paragraph}`} style={muted}>
            Your details are also removed from everything other users can see.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="font-display text-xl font-medium text-[var(--ink)]">
            What is kept
          </h2>
          <ul
            className={`mt-3 list-disc pl-5 flex flex-col gap-1.5 ${paragraph}`}
            style={muted}
          >
            {retained.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="font-display text-xl font-medium text-[var(--ink)]">
            Questions
          </h2>
          <p className={`mt-3 ${paragraph}`} style={muted}>
            See our{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2"
              style={{ color: "var(--primary)" }}
            >
              Privacy Policy
            </a>{" "}
            for the full picture of what we collect and why, or write to{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="underline underline-offset-2"
              style={{ color: "var(--primary)" }}
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
