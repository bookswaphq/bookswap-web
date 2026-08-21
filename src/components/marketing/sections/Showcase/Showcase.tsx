"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import PhoneFrame from "@/components/ui/PhoneFrame";

interface Feature {
  id: string;
  title: string;
  description: string;
  alt: string;
  src?: string;
  primarySrc?: string;
  secondarySrc?: string;
}

const features: Feature[] = [
  {
    id: "scan",
    title: "Instant Barcode Scan",
    description:
      "Scan any book's barcode to add it to your shelf in seconds no manual entry needed.",
    src: "/screenshots/barcode-scan.png",
    alt: "Barcode scanning screen showing instant book detail recognition",
  },
  {
    id: "search",
    title: "Find Books to Swap",
    description:
      "Explore books, see how many readers own the ones you want, and send a swap request.",
    src: "/screenshots/search-owners.png",
    alt: "Search results screen displaying available book owners nearby",
  },
  {
    id: "library",
    title: "Wishlist & Library",
    description:
      "Organize your library and keep track of the books you'd like to receive in a swap.",
    src: "/screenshots/library.png",
    alt: "Personal library and wishlist management screen",
  },
  {
    id: "chat",
    title: "Chat & Swap Offers",
    description:
      "Send quick exchange requests and coordinate easy handovers via built-in messaging.",
    primarySrc: "/screenshots/offer-details.png",
    secondarySrc: "/screenshots/chat.png",
    alt: "Dual screen layout showing real-time chat and swap offer modal",
  },
];

export default function Showcase() {
  return (
    <motion.section
      id="showcase"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="w-full max-w-4xl px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center text-center"
    >
      {/* Header */}
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Product Tour
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl sm:text-4xl font-medium text-[var(--ink)]"
      >
        See BookSwap in action
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-md text-sm sm:text-base text-[var(--ink-soft)]"
      >
        From discovering a book to chatting with your swap partner.
      </motion.p>

      {/* Grid - Cut Effect Layer Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-14 w-full">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              p-6
              pt-7
              pb-0
              flex flex-col items-center
              text-center
              shadow-[0_8px_30px_rgb(0,0,0,0.04)]
              h-[420px] sm:h-[430px]
            "
            style={{
              background: "var(--paper-card, #ffffff)",
            }}
          >
            {/* Metin Kutusu (Sabit Üst Bölüm) */}
            <div className="relative z-20 max-w-xs shrink-0">
              <h3 className="font-display text-lg font-medium text-[var(--ink)]">
                {feature.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
                {feature.description}
              </p>
            </div>

            {/* Görsel Alanı - Dengeli Gap ve Taşma Değerleri */}
            <div className="relative z-10 w-full flex-1 flex items-end justify-center overflow-hidden pt-4 mt-2">
              {feature.secondarySrc && feature.primarySrc ? (
                /* Çift Ekranlı Cut Effect */
                <div className="relative w-full max-w-[280px] h-full flex items-end justify-center">
                  {/* Sol Ekran */}
                  <div
                    className="
                      absolute
                      left-2 sm:left-4
                      bottom-[-50px] sm:bottom-[-40px]
                      w-[145px] sm:w-[155px]
                      z-20
                      shadow-xl
                      transition-transform
                      duration-300
                      group-hover:translate-y-[-6px]
                    "
                  >
                    <PhoneFrame
                      src={feature.primarySrc}
                      alt={feature.alt}
                      priority={idx === 0}
                    />
                  </div>
                  {/* Sağ Ekran */}
                  <div
                    className="
                      absolute
                      right-2 sm:right-4
                      bottom-[-80px] sm:bottom-[-70px]
                      w-[140px] sm:w-[150px]
                      z-10
                      opacity-80
                      transition-transform
                      duration-300
                      group-hover:translate-y-[-4px]
                    "
                  >
                    <PhoneFrame
                      src={feature.secondarySrc}
                      alt={`${feature.alt} secondary`}
                    />
                  </div>
                </div>
              ) : (
                /* Tek Ekranlı Cut Effect */
                <div
                  className="
                    w-[165px] sm:w-[175px]
                    translate-y-14 sm:translate-y-16
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:translate-y-12 sm:group-hover:translate-y-14
                  "
                >
                  <PhoneFrame
                    src={feature.src!}
                    alt={feature.alt}
                    priority={idx === 0}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}