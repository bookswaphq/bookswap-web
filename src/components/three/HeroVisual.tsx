"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import BookSwapStatic from "./BookSwapStatic";
import { PALETTE } from "./scene-config";

const BookSwapScene = dynamic(() => import("./BookSwapScene"), {
  ssr: false,
  loading: () => <BookSwapStatic />,
});

/** Fine paper grain, inline so nothing has to be fetched. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

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
 * The warm panel the reading nooks sit in, and the decision about what goes
 * inside it. Phones, reduced-motion visitors and browsers without WebGL get
 * the flat version and never download three.js.
 */
export default function HeroVisual() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () =>
      setUse3D(wide.matches && !calm.matches && supportsWebGL());

    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);

    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[32px]"
      style={{
        background: `linear-gradient(180deg, #FBFAF7 0%, ${PALETTE.panel} 48%, ${PALETTE.panelDeep} 100%)`,
        boxShadow:
          "inset 0 0 0 1px rgba(59,53,64,0.07), 0 24px 56px -46px rgba(59,53,64,0.45)",
      }}
    >
      <div className="relative h-[200px] sm:h-[264px] md:h-[326px] lg:h-[378px]">
        {use3D ? <BookSwapScene /> : <BookSwapStatic />}
      </div>

      {/* Vignette, so the lamplight has somewhere to fall off to. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 92% at 50% 40%, rgba(59,53,64,0) 55%, rgba(59,53,64,0.09) 100%)",
        }}
      />

      {/* Paper grain. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: GRAIN, opacity: 0.045 }}
      />
    </div>
  );
}
