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
  _id: string;
  bookingDate: string;
  checkoutDate: string;
  user: User;
  campground: bookingCampground;
  createdAt?: string;
}

export type NewBooking = Omit<Booking, "user" | "campground" | "_id">;

export interface Campground {
  id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
}

export interface Campgrounds {
  success: boolean;
  count: number;
  data: Campground[];
}

export interface bookingCampground {
  id: string;
  name: string;
  address: string;
  tel: string;
}

export interface Bookings {
  success: boolean;
  count: number;
  data: Booking[];
}
