import type { Variants } from "framer-motion";

/** Standard fade + rise used across the marketing site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Softer fade, no movement — for supporting copy. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/** Wrap a group of `fadeUp`/`fadeIn` children to animate them in sequence. */
export function staggerContainer(
  stagger = 0.12,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

/** Shared viewport trigger: animate once, slightly before entering view. */
export const viewport = { once: true, margin: "-80px 0px" };
