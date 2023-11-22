"use client";

import { Booking } from "@/types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Props {
  booking: Booking;
  handleCancelClick: Function;
}

export default function BookingItem({ booking, handleCancelClick }: Props) {
  const { data: session } = useSession();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <li className=" overflow-hidden  px-6 py-4 ">
      <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-start space-x-4">
          <FireplaceIcon className="h-5 w-5 text-amber-500" />
          <div className="">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
              {booking.campground.name}
            </h2>
            <p className="flex items-center  text-gray-500 dark:text-gray-200">
              <LocationOnIcon className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-200" />
              {booking.campground.address}
            </p>
            <p className="flex items-center text-gray-500 dark:text-gray-200">
              <LocalPhoneIcon className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-200" />
              {booking.campground.tel}
            </p>
            {session && session.user.role === "admin" && (
              <p className="flex items-center text-gray-500 dark:text-gray-200">
                <PersonIcon className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-200" />
                {booking.user.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end space-y-2">
          <p className="text-gray-900 dark:text-white">
            Booking: {formatDate(booking.bookingDate)}
          </p>
          <p className="text-gray-900 dark:text-white">
            Checkout: {formatDate(booking.checkoutDate)}
          </p>
          <div className="flex gap-2">
            <Link
              className=" text-gray-900  focus:outline-none focus:shadow-outline dark:text-white"
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
              onClick={() => handleCancelClick(booking._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
