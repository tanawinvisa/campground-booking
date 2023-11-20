export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface NewUser {
  email: string;
  password: string;
  name: string;
  tel: string;
  role: string;
}

export interface Booking {
  bookingDate: string;
  checkoutDate: string;
  user: string;
  campground: string;
  createdAt: string;
}

export type NewBooking = Omit<Booking, "user" | "campground">;
