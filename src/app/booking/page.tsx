import BookingList from "@/components/BookingList";

export default function Home() {
  return (
    <main>
      <div className="w-screen">
        <div className="lg:px-12">
          <BookingList />
        </div>
      </div>
    </main>
  );
}
