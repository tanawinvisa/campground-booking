import BookingList from "@/components/BookingList";

export default function Home() {
  return (
    <main>
      <div className="w-screen h-screen dark:bg-[#1a1a2e]">
        <div className="lg:px-12">
          <BookingList />
        </div>
      </div>
    </main>
  );
}
