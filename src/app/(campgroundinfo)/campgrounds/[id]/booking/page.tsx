import BookingForm from "@/components/BookingForm";

export default async function Home({ params }: { params: { id: string } }) {

  return (
    <main className="p-8 py-16 pb-8">
      <div className="flex justify-center items-center flex-col">
        <div className="w-full sm:w-[60%]">
          <BookingForm
            campgroundId={params.id}
            oldBookingDate=""
            oldCheckoutDate=""
            editingBookingId=""
          />
        </div>
      </div>
    </main>
  );
}
