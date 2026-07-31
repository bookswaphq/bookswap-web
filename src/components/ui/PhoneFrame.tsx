import Image from "next/image";

type PhoneFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function PhoneFrame({ src, alt, priority }: PhoneFrameProps) {
  return (
    <div
      className="
        relative
        w-full
        rounded-[2.25rem]
        p-[7px]
        transition-all
        duration-300
        select-none
      "
      style={{
        background: "#121214",
        boxShadow: `
          0 0 0 1.5px rgba(255, 255, 255, 0.14) inset,
          0 0 0 1px rgba(0, 0, 0, 0.9),
          0 20px 40px -12px rgba(0, 0, 0, 0.3),
          0 8px 16px -4px rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      {/* iPhone Dynamic Island */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="w-[84px] h-[18px] bg-black rounded-full flex items-center justify-between px-2 shadow-sm border border-white/5">
          {/* Sol Lens */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#0a0a14] border border-white/10 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#1c1c38]/60" />
          </span>
          {/* Sağ Sensör/Kamera */}
          <span className="w-2 h-2 rounded-full bg-[#0d0d18] border border-white/5" />
        </div>
      </div>

      {/* Ekran (Screen Canvas) */}
      <div className="relative w-full aspect-[9/19.5] rounded-[1.8rem] overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 240px, 190px"
          className="object-cover object-top"
          priority={priority}
        />
        {/* Cam Yansıması (Glossy Overlay) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06]" />
      </div>

      {/* iPhone Home Bar */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-white/35 rounded-full z-30 pointer-events-none" />
    </div>
  );
}