"use client";

import BookingForm from "@/components/BookingForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function Home({ params }: { params: { bookingId: string } }) {
  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");
  let bookingDate = searchParams.get("bookingDate");
  let checkoutDate = searchParams.get("checkoutDate");

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  if (bookingDate && checkoutDate) {
    bookingDate = formatDate(bookingDate);
    checkoutDate = formatDate(checkoutDate);
  }

  return (
    <main className="p-8 py-16 pb-8">
      <div className="flex justify-center items-center flex-col">
        <div className="w-full sm:w-[60%]">
          {!campgroundId || !bookingDate || !checkoutDate ? (
            "Cant find query Params"
          ) : (
            <BookingForm
              campgroundId={campgroundId}
              oldBookingDate={bookingDate}
              oldCheckoutDate={checkoutDate}
              editingBookingId={params.bookingId}
            />
          )}
        </div>
      </div>
    </main>
  );
}
