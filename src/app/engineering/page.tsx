import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Case Study",
  description:
    "End-to-end design and development of a React Native book exchange platform.",
  robots: { index: false, follow: true },
};

export default function CaseStudy() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold">BookSwap Case Study</h1>

      <p className="mt-6 text-gray-600">
        End-to-end design and development of a React Native book exchange platform.
      </p>
    </main>
  );
}