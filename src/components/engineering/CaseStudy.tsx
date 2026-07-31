"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const meta = [
  { label: "Timeline", value: "2023 – 2024" },
  { label: "Team", value: "3 people" },
  { label: "Platforms", value: "iOS + Android" },
];

type Section = {
  title: string;
  paragraphs: string[];
  quote?: string;
};

const sections: Section[] = [
  {
    title: "Where it started",
    paragraphs: [
      "Reading leaves you with shelves of finished books you will probably never open again. Meanwhile, the next reader who would love them has no easy way to find them. BookSwap started from that small mismatch — and from a simple conviction that a good book is too good to sit idle.",
      "Two ideas sat underneath it. The first was sustainability: a finished book is not clutter, it is a story waiting for its next owner, and swapping keeps it moving instead of gathering dust or ending up as waste. The second was community — readers already love talking about what they read, and a swap is a reason to meet someone nearby who shares the habit.",
      "The premise was deliberately small. Let people list the books they have finished, discover books other readers have close by, and trade them, with a little chat to arrange the handoff. A phone-first app for readers, shaped by the way readers actually behave.",
    ],
    quote: "A finished book is not clutter — it is a story waiting for its next reader.",
  },
  {
    title: "Deciding what to build first",
    paragraphs: [
      "The hardest part of a first version is leaving things out. The scope was cut down to a single loop that had to feel effortless: sign in, build a small library, find a book, make an offer, and message to arrange the swap. Everything else — recommendations, rich media, social features — went onto a later list.",
      "Work was planned in short cycles across four milestones, each one a piece of that loop. The goal was never to ship every feature; it was to ship the one that mattered and make the swap actually work, end to end.",
    ],
  },
  {
    title: "Choosing the foundations",
    paragraphs: [
      "With a small team and no budget for wrong turns, every piece of technology had to earn its place. The early plan leaned on a large managed backend, but as the real needs came into focus, the choices got simpler — and cheaper.",
      "Signing in by phone, real-time chat, and push notifications were handed to Firebase, which did them well and for free at the scale of an early beta. The books themselves — a catalogue far larger and more interconnected than a chat app — moved to a database and a small custom service the team could shape exactly around the product.",
      "None of this was decided once and left alone. The stack shifted more than once, always for the same reason: use the tool that is strongest for the job, and do not pay — in money or in complexity — for power the app does not need yet.",
    ],
  },
  {
    title: "The wall nobody expected",
    paragraphs: [
      "Every project has a moment where something simple refuses to be simple. Here it was book search. Looking a book up by its barcode was instant on a laptop and painfully slow — tens of seconds — on the actual server. Same code, wildly different result.",
      "The fix came from understanding why: the query was quietly ignoring the index built for exactly this lookup. Reworking it so the database could use that index properly brought the wait down from unusable to a fraction of a second — the kind of problem that is invisible until you hit it and obvious once you understand it.",
    ],
    quote: "Same code, wildly different result — the kind of bug that teaches you more than any tutorial.",
  },
  {
    title: "A shelf with every book on it",
    paragraphs: [
      "For search to feel effortless, the app had to know about a book before the reader finished typing. That meant loading a very large catalogue of book editions into the database and making it searchable — on a modest server with little memory to spare.",
      "Getting several gigabytes of data to import without the machine falling over took patience and a few tricks, but the payoff was worth it: a reader can scan a cover or type a title and watch it appear instantly, as if the app had been waiting for that exact book.",
    ],
  },
  {
    title: "Keeping it standing",
    paragraphs: [
      "Shipping software is one thing; keeping it running quietly in the background is another. There were the ordinary, humbling problems of a real service — a process that slowly ate memory until it fell over, uploads rejected for being a megabyte too large, timeouts that only showed up under load.",
      "Each one got chased down and fixed, and each one left the system a little sturdier. Not glamorous work, but it is the difference between a demo and something a friend can actually use without ever noticing the plumbing.",
    ],
  },
  {
    title: "Onto real phones",
    paragraphs: [
      "Building for a young, fast-moving platform means the ground keeps shifting underneath you. Over the life of the project the app was moved onto new build tooling and stepped through several framework upgrades, each one asking for small migrations and careful patching so nothing broke on the way.",
      "It is unglamorous maintenance, but it is exactly what keeps an app installable and alive, rather than frozen at the version it was born in.",
    ],
  },
  {
    title: "Shipping",
    paragraphs: [
      "The finish line for the first version was not a launch party but something quieter: getting it into the hands of real readers. The app went out through TestFlight and Google Play internal testing as a small proof of concept, opened first to friends and family — the people honest enough to tell you what does not work.",
      "Getting there meant navigating certificates, builds, and the review pipelines of two app stores — the last, unavoidable stretch between it works on my phone and anyone can install it.",
    ],
  },
  {
    title: "What it added up to",
    paragraphs: [
      "BookSwap grew from a simple belief — that books are worth passing on, and readers are worth connecting — into a working product spanning a mobile app, a custom backend, and a data pipeline, shipped to both major app stores.",
      "The technical wins matter, but the point was always the loop: a finished book on one shelf finding its way to a reader who wants it, with a conversation in between. That is the part worth building.",
    ],
  },
];

export default function CaseStudy() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer(0.08)}
        className="w-full max-w-2xl px-6 pt-32 pb-8 flex flex-col text-left"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Case Study
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="font-display mt-4 text-4xl sm:text-5xl font-medium leading-tight text-[var(--ink)]"
        >
          Building BookSwap
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-base sm:text-lg"
          style={{ color: "var(--ink-soft)" }}
        >
          A phone-first app for giving finished books a second life — and the
          journey of turning that idea into something real, from a blank page to
          the App Store and Google Play.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
        >
          {meta.map((m) => (
            <div key={m.label}>
              <div
                className="font-mono text-[11px] tracking-wide uppercase"
                style={{ color: "var(--ink-muted)" }}
              >
                {m.label}
              </div>
              <div className="mt-1 text-sm font-medium text-[var(--ink)]">
                {m.value}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 h-px w-full"
          style={{ background: "var(--border)" }}
        />
      </motion.section>

      {/* Story */}
      {sections.map((section) => (
        <motion.section
          key={section.title}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08)}
          className="w-full max-w-2xl px-6 py-8 flex flex-col text-left"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl sm:text-3xl font-medium text-[var(--ink)]"
          >
            {section.title}
          </motion.h2>

          <div className="mt-5 flex flex-col gap-4">
            {section.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-base leading-relaxed"
                style={{ color: "var(--ink-soft)" }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {section.quote && (
            <motion.blockquote
              variants={fadeUp}
              className="mt-8 border-l-2 pl-5 font-display text-xl sm:text-2xl font-medium leading-snug text-[var(--ink)]"
              style={{ borderColor: "var(--primary)" }}
            >
              {section.quote}
            </motion.blockquote>
          )}
        </motion.section>
      ))}

      {/* Closing */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer(0.08)}
        className="w-full max-w-2xl px-6 pt-8 pb-16 flex flex-col text-left"
      >
        <motion.div
          variants={fadeUp}
          className="mb-10 h-px w-full"
          style={{ background: "var(--border)" }}
        />

        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="btn-primary rounded-full px-6 py-3 text-sm font-medium inline-block"
          >
            Explore the product
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-xs"
          style={{ color: "var(--ink-muted)" }}
        >
          Built with React Native, Firebase, and a custom Python / PostgreSQL
          backend.
        </motion.p>
      </motion.section>
    </div>
  );
}
