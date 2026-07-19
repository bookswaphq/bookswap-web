import Image from "next/image";

type PhoneFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function PhoneFrame({ src, alt, priority }: PhoneFrameProps) {
  return (
    <div
      className="relative w-full rounded-[1.75rem] p-1.5"
      style={{
        background: "var(--paper-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 24px 48px -28px var(--shadow-color)",
      }}
    >
      <span
        className="absolute left-1/2 top-4 -translate-x-1/2 w-9 h-1.5 rounded-full z-10"
        style={{ background: "var(--border)" }}
      />

      <div className="relative w-full aspect-[9/19.5] rounded-[1.4rem] overflow-hidden bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 240px, 190px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}
