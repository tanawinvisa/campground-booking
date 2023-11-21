"use client";

import bookingService from "@/services/booking";
import { Booking } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import Modal from "./Modal";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

export default function BookingList() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([] as Booking[]);

  useEffect(() => {
    if (session && session.user) {
      bookingService.setToken(session.user.token);
      console.log(session.user.role);
      bookingService.getAll().then((response) => {
        const filteredBookings =
          session.user.role === "admin"
            ? response.data
            : response.data.filter(
                (booking) => booking.user._id === session.user._id
              );
        setBookings(filteredBookings);
      });
    }
  }, [session]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(
    null as string | null
  );
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
      <ul role="list" className="space-y-4 divide-y divide-gray-100">
        {bookings.map((booking) => (
          <li key={booking._id} className=" overflow-hidden  px-6 py-4 ">
            <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-start space-x-4">
                <FireplaceIcon className="h-5 w-5 text-amber-500" />
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {booking.campground.name}
                  </h2>
                  <p className="flex items-center  text-gray-500">
                    <LocationOnIcon className="h-5 w-5 mr-1 text-gray-500" />
                    {booking.campground.address}
                  </p>
                  <p className="flex items-center text-gray-500">
                    <LocalPhoneIcon className="h-5 w-5 mr-1 text-gray-500" />
                    {booking.campground.tel}
                  </p>
                  {session && session.user.role === "admin" && (
                    <p className="flex items-center text-gray-500">
                      <PersonIcon className="h-5 w-5 mr-1 text-gray-500" />
                      {booking.user.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end space-y-2">
                <p className="text-gray-900">
                  Booking: {formatDate(booking.bookingDate)}
                </p>
                <p className="text-gray-900">
                  Checkout: {formatDate(booking.checkoutDate)}
                </p>
                <div className="flex gap-2">
                  <Link
                    className=" text-gray-900  focus:outline-none focus:shadow-outline"
                    href={{
                      pathname: `/booking/${booking._id}`,
                      query: {
                        campgroundId: booking.campground.id,
                        bookingDate: booking.bookingDate,
                        checkoutDate: booking.checkoutDate,
                      },
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 focus:outline-none focus:shadow-outline"
                    onClick={() => openConfirmModal(booking._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
``;
