"use client";

import bookingService from "@/services/booking";
import { Booking } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import BookingItem from "./BookingItem";
import Image from "next/image";
import Loading from "./Loading";

export default function BookingList() {
  debugger;
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchBookings() {
      if (session?.user) {
        setIsLoading(true);
        try {
          bookingService.setToken(session.user.token);
          const response = await bookingService.getAll();
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchBookings();
  }, [session]);

  const openConfirmModal = (id: string) => {
    setCurrentBookingId(id);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (currentBookingId) {
        await bookingService.remove(currentBookingId);
        setBookings(
          bookings.filter((booking) => booking._id !== currentBookingId)
        );
        setIsConfirmModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      setIsConfirmModalOpen(false);
      setIsErrorModalOpen(true);
    }
  };

  const confirmModalFooter = (
    <div className="flex justify-end gap-4">
      <button
        className="px-4 py-2 rounded bg-red-500 text-white"
        onClick={handleDelete}
      >
        Confirm
      </button>
      <button
        className="px-4 py-2 rounded bg-gray-300"
        onClick={() => setIsConfirmModalOpen(false)}
      >
        Cancel
      </button>
    </div>
  );

  const errorModalFooter = (
    <div className="flex justify-center">
      <button
        className="px-4 py-2 rounded bg-gray-300"
        onClick={() => setIsErrorModalOpen(false)}
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="w-full">
      <Modal
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        title="Confirm Deletion"
        footerContent={confirmModalFooter}
      >
        Are you sure you want to delete this booking?
      </Modal>
      <Modal
        isOpen={isErrorModalOpen}
        closeModal={() => setIsErrorModalOpen(false)}
        title="Error"
        footerContent={errorModalFooter}
      >
        An error occurred while deleting the booking.
      </Modal>
      {isLoading ? (
        <Loading />
      ) : (
        <ul role="list" className="space-y-4 divide-y divide-gray-100">
          {bookings.map((booking) => (
            <BookingItem
              key={booking._id}
              booking={booking}
              handleCancelClick={openConfirmModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
``;
