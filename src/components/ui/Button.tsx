import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-purple-600 text-white hover:bg-purple-700"
      : "border border-gray-200 text-gray-900 hover:bg-gray-50";

  return (
    <button
      className={`
        px-6 py-3 
        rounded-full 
        font-medium 
        transition
        ${styles}
      `}
    >
      {children}
    </button>
  );
}