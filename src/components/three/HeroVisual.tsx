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
 * Decides what goes in the hero's illustration slot. Phones, reduced-motion
 * visitors and browsers without WebGL get the flat version and never download
 * three.js.
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
    <div className="relative w-full h-[150px] sm:h-[192px] md:h-[236px] lg:h-[272px]">
      {use3D ? <BookSwapScene /> : <BookSwapStatic />}
    </div>
  );
}
