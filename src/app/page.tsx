"use client";
import BrowseCampground from "@/components/BrowseCampground";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <div className="py-3 dark:bg-[#1a1a2e]">
        <Hero />
      </div>
      <BrowseCampground />
    </main>
  );
}
