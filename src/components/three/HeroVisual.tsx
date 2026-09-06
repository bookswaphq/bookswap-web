"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import BookSwapStatic from "./BookSwapStatic";

const BookSwapScene = dynamic(() => import("./BookSwapScene"), {
  ssr: false,
  loading: () => <BookSwapStatic />,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Decides whether this visitor gets the WebGL shelf or the CSS one, and only
 * then pulls three.js in. Phones, reduced-motion visitors and browsers without
 * WebGL never download the 3D bundle at all.
 */
export default function HeroVisual() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setUse3D(wide.matches && !calm.matches && supportsWebGL());

    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);

    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  return (
    <div className="relative w-full h-[190px] sm:h-[240px] md:h-[310px] lg:h-[360px] flex items-center justify-center">
      {/* Soft brand glow behind the shelves. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, var(--primary-soft) 0%, transparent 70%)",
        }}
      />

      {use3D ? <BookSwapScene /> : <BookSwapStatic />}
    </div>
  );
}
