"use client";

import bookingService from "@/services/booking";
import campgroundService from "@/services/campground";
import { Campground } from "@/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  campgroundId: string;
  oldBookingDate: string;
  oldCheckoutDate: string;
  editingBookingId: string;
}

export default function BookingForm({
  campgroundId,
  oldBookingDate,
  oldCheckoutDate,
  editingBookingId,
}: Props) {
  const [bookingDate, setBookingDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [campground, setCampground] = useState(null as null | Campground);

  useEffect(() => {
    if (oldBookingDate) {
      setBookingDate(oldBookingDate);
    }

    if (oldCheckoutDate) {
      setCheckoutDate(oldCheckoutDate);
    }
  }, [oldBookingDate, oldCheckoutDate]);

  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      bookingService.setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const data = await campgroundService.get(campgroundId);
        setCampground(data.data);
      } catch (error) {
        console.error("Error fetching campground:", error);
      }
    };

    fetchCampground();
  }, [campgroundId]);

  const handleCancel = () => {
    setBookingDate("");
    setCheckoutDate("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingBookingId) {
      e.preventDefault();
      const newBooking = { bookingDate, checkoutDate };
      try {
        const booking = await bookingService.update(
          newBooking,
          editingBookingId
        );
        console.log("Booking Edited:", booking);
      } catch (error) {
        console.error("Error editing booking:", error);
      }
      return;
    }

    const newBooking = { bookingDate, checkoutDate };
    try {
      const booking = await bookingService.create(newBooking, campgroundId);
      console.log("Booking created:", booking);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Book Your Stay
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {campground?.name}
          </p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="bookingDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Booking Date
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500 sm:max-w-md">
                <input
                  type="date"
                  name="bookingDate"
                  id="bookingDate"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="checkoutDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Checkout Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500  sm:max-w-md">
                  <input
                    type="date"
                    name="checkoutDate"
                    id="checkoutDate"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={checkoutDate}
                    onChange={(e) => setCheckoutDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}