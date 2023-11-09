import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <div className="w-screen top-0 sticky drop-shadow-lg bg-white">
        <Navbar />
      </div>
      <div className="py-4 ">
        <Hero />
      </div>
    </main>
  );
}
