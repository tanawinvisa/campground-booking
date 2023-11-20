"use client";

import bookingService from "@/services/booking";
import { Booking } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function BookingForm() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([] as Booking[]);

  useEffect(() => {
    if (session && session.user) {
      bookingService.setToken(session.user.token);
      bookingService.getAll().then((response) => {
        setBookings(response.data);
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

  return (
    <div className="w-full">
      <ul role="list" className="space-y-4 divide-y divide-gray-100">
        {bookings.map((booking) => (
          <li key={booking._id} className=" overflow-hidden  px-6 py-4 ">
            <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-start space-x-4">
                <LocationOnIcon className="h-5 w-5 text-gray-600" />
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {booking.campground.name}
                  </h2>
                  <p className="text-gray-500">{booking.campground.address}</p>
                  <p className="flex items-center text-gray-500">
                    <LocalPhoneIcon className="h-5 w-5 mr-1 text-gray-500" />
                    {booking.campground.tel}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end space-y-2">
                <p className="text-gray-600">
                  Booking: {formatDate(booking.bookingDate)}
                </p>
                <p className="text-gray-600">
                  Checkout: {formatDate(booking.checkoutDate)}
                </p>
                <div className="flex gap-2">
                  <button className=" text-gray-900  focus:outline-none focus:shadow-outline">
                    Edit
                  </button>
                  <button className="text-red-500 focus:outline-none focus:shadow-outline">
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
