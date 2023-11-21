import BrowseCampground from "@/components/BrowseCampground";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <div className="py-3 ">
        <Hero />
      </div>
      <BrowseCampground />
    </main>
  );
}
