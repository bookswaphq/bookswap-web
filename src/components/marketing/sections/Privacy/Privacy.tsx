"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const effectiveDate = "July 21, 2026";

type Block =
  | { type: "text"; text: string }
  | { type: "subtitle"; text: string }
  | { type: "list"; items: string[] };

type Section = {
  title: string;
  blocks: Block[];
};

const sections: Section[] = [
  {
    title: "1. Information We Collect",
    blocks: [
      { type: "subtitle", text: "Account Information" },
      {
        type: "text",
        text: "When you create and use a BookSwap account, we may collect:",
      },
      {
        type: "list",
        items: [
          "Phone number",
          "Display name or username",
          "Profile photo",
          "Account identifier",
          "Account creation and last activity timestamps",
        ],
      },
      { type: "subtitle", text: "Profile Information" },
      { type: "text", text: "Information you voluntarily provide, including:" },
      {
        type: "list",
        items: [
          "Public profile details",
          "Profile image",
          "Bio or other profile information (if provided)",
        ],
      },
      { type: "subtitle", text: "Library & Book Information" },
      {
        type: "text",
        text: "To provide BookSwap's core functionality, we collect information related to books you manage within the app, including:",
      },
      {
        type: "list",
        items: [
          "Books in your library",
          "Wishlist items",
          "Book availability",
          "Book ownership information",
          "User-uploaded book images (if applicable)",
        ],
      },
      { type: "subtitle", text: "Swap Information" },
      { type: "text", text: "To enable book exchanges, we process:" },
      {
        type: "list",
        items: [
          "Swap offers",
          "Offer status",
          "Swap history",
          "Information necessary to facilitate exchanges between users",
        ],
      },
      { type: "subtitle", text: "Messaging" },
      {
        type: "text",
        text: "BookSwap provides in-app messaging between users. Messages, message timestamps, and related metadata are stored solely to provide messaging functionality.",
      },
      { type: "subtitle", text: "Device Information" },
      {
        type: "text",
        text: "When you use the Services, we may automatically collect technical information such as:",
      },
      {
        type: "list",
        items: [
          "Device model",
          "Operating system version",
          "App version",
          "Device language",
          "Push notification token",
          "IP address (when required for security and service operation)",
        ],
      },
    ],
  },
  {
    title: "2. Permissions We Request",
    blocks: [
      { type: "subtitle", text: "Camera" },
      {
        type: "text",
        text: "BookSwap requests camera access solely to allow users to scan book barcodes. We do not access your camera for unrelated purposes.",
      },
      { type: "subtitle", text: "Notifications" },
      {
        type: "text",
        text: "With your permission, BookSwap may send push notifications regarding:",
      },
      {
        type: "list",
        items: [
          "Swap offers",
          "Messages",
          "Account-related updates",
          "Important service notifications",
        ],
      },
      {
        type: "text",
        text: "You can disable notifications at any time through your device settings.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    blocks: [
      { type: "text", text: "We use your information to:" },
      {
        type: "list",
        items: [
          "Create and manage your account",
          "Authenticate your identity",
          "Provide the BookSwap service",
          "Display your public profile",
          "Enable users to exchange books",
          "Store and synchronize your library",
          "Process swap offers",
          "Deliver real-time chat",
          "Send important notifications",
          "Detect fraud, abuse, and security incidents",
          "Improve the performance, reliability, and security of our Services",
          "Comply with legal obligations",
        ],
      },
      { type: "text", text: "We do not sell your personal information." },
    ],
  },
  {
    title: "4. Where Your Data Is Stored",
    blocks: [
      {
        type: "text",
        text: "BookSwap uses multiple secure technologies to provide its services.",
      },
      { type: "subtitle", text: "PostgreSQL" },
      {
        type: "text",
        text: "Most application data, including account information, libraries, wishlists, swap offers, and other operational data, is stored in secure PostgreSQL databases.",
      },
      { type: "subtitle", text: "Firebase Authentication" },
      {
        type: "text",
        text: "Phone number authentication is provided by Google Firebase Authentication.",
      },
      { type: "subtitle", text: "Firebase Firestore" },
      {
        type: "text",
        text: "Real-time chat messages are stored using Firebase Firestore.",
      },
      { type: "subtitle", text: "DigitalOcean Spaces" },
      {
        type: "text",
        text: "Profile photos and book images are stored using DigitalOcean Spaces.",
      },
    ],
  },
  {
    title: "5. Third-Party Service Providers",
    blocks: [
      {
        type: "text",
        text: "BookSwap works with trusted service providers that help us operate our Services. These providers may process information on our behalf. Current providers include:",
      },
      {
        type: "list",
        items: [
          "Google Firebase Authentication",
          "Google Firebase Firestore",
          "Google Firebase Cloud Messaging",
          "DigitalOcean Spaces",
        ],
      },
      {
        type: "text",
        text: "These providers process information only as necessary to provide the Services.",
      },
    ],
  },
  {
    title: "6. Data Sharing",
    blocks: [
      { type: "text", text: "We may share limited information:" },
      {
        type: "list",
        items: [
          "when required to provide the Services;",
          "when required by law;",
          "to protect the rights, safety, or security of BookSwap and its users;",
          "during a merger, acquisition, or transfer of business assets.",
        ],
      },
      {
        type: "text",
        text: "We do not sell or rent personal information to advertisers or data brokers.",
      },
    ],
  },
  {
    title: "7. Data Retention",
    blocks: [
      {
        type: "text",
        text: "We retain your information only as long as necessary to provide the Services, comply with legal obligations, resolve disputes, and enforce our agreements.",
      },
      {
        type: "text",
        text: "When your account is deleted, we will delete or anonymize your personal information within a reasonable period unless we are legally required to retain certain information.",
      },
    ],
  },
  {
    title: "8. Data Security",
    blocks: [
      {
        type: "text",
        text: "We use reasonable administrative, technical, and organizational safeguards to protect your information.",
      },
      {
        type: "text",
        text: "However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    title: "9. Children's Privacy",
    blocks: [
      {
        type: "text",
        text: "BookSwap is not intended for children under the age of 13.",
      },
      {
        type: "text",
        text: "We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without appropriate consent, we will delete that information promptly.",
      },
    ],
  },
  {
    title: "10. Your Privacy Rights",
    blocks: [
      {
        type: "text",
        text: "Depending on your location, applicable laws may provide you with rights regarding your personal information. These rights may include:",
      },
      {
        type: "list",
        items: [
          "Access to your information",
          "Correction of inaccurate information",
          "Deletion of your account and associated data",
          "Restriction of certain processing activities",
          "Withdrawal of consent where applicable",
        ],
      },
      {
        type: "text",
        text: "To exercise these rights, please contact us using the contact information below.",
      },
    ],
  },
  {
    title: "11. International Data Transfers",
    blocks: [
      {
        type: "text",
        text: "Your information may be processed or stored in countries other than your country of residence where our service providers operate.",
      },
      {
        type: "text",
        text: "Where required by applicable law, we implement appropriate safeguards for international data transfers.",
      },
    ],
  },
  {
    title: "12. Future Services",
    blocks: [
      {
        type: "text",
        text: "BookSwap may introduce additional services such as analytics, crash reporting, or other operational tools to improve the application.",
      },
      {
        type: "text",
        text: "If these services involve the collection or processing of personal information, this Privacy Policy will be updated before such processing begins.",
      },
    ],
  },
  {
    title: "13. Changes to This Privacy Policy",
    blocks: [
      {
        type: "text",
        text: "We may update this Privacy Policy from time to time.",
      },
      {
        type: "text",
        text: "If material changes are made, we will update the Effective Date and, where appropriate, notify users through the application or other reasonable means.",
      },
    ],
  },
];

export default function Privacy() {
  return (
    <motion.section
      id="privacy"
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
        Privacy Policy
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        Privacy Policy
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-3 font-mono text-xs"
        style={{ color: "var(--ink-muted)" }}
      >
        Effective Date: {effectiveDate}
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-8 text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        Welcome to BookSwap (&quot;BookSwap,&quot; &quot;we,&quot;
        &quot;our,&quot; or &quot;us&quot;). Your privacy is important to us.
        This Privacy Policy explains how we collect, use, store, disclose, and
        protect your information when you use the BookSwap mobile application,
        our website, and related services (collectively, the
        &quot;Services&quot;).
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-3 text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        By creating an account or using BookSwap, you acknowledge that you have
        read and understood this Privacy Policy.
      </motion.p>

      <div className="mt-12 w-full flex flex-col gap-10">
        {sections.map((section) => (
          <motion.div key={section.title} variants={fadeUp}>
            <h2 className="font-display text-xl font-medium text-[var(--ink)]">
              {section.title}
            </h2>

            <div className="mt-3 flex flex-col gap-3">
              {section.blocks.map((block, i) => {
                if (block.type === "subtitle") {
                  return (
                    <h3
                      key={i}
                      className="font-display text-base font-medium text-[var(--ink)] mt-1"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={i}
                      className="list-disc pl-5 flex flex-col gap-1.5 text-sm sm:text-base"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={i}
                    className="text-sm sm:text-base"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </motion.div>
        ))}

        <motion.div variants={fadeUp}>
          <h2 className="font-display text-xl font-medium text-[var(--ink)]">
            14. Contact Us
          </h2>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "var(--ink-soft)" }}
          >
            If you have any questions about this Privacy Policy or wish to
            exercise your privacy rights, please contact us:
          </p>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "var(--ink-soft)" }}
          >
            Website:{" "}
            <a
              href="https://www.bookswapapp.com"
              className="underline underline-offset-2"
              style={{ color: "var(--primary)" }}
            >
              https://www.bookswapapp.com
            </a>
          </p>
          <p
            className="mt-1 text-sm sm:text-base"
            style={{ color: "var(--ink-soft)" }}
          >
            Email:{" "}
            <a
              href="mailto:support@bookswapapp.com"
              className="underline underline-offset-2"
              style={{ color: "var(--primary)" }}
            >
              support@bookswapapp.com
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
