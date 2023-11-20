import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Booking, Bookings, NewBooking } from "@/types";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get<Bookings>(`${apiBaseUrl}/bookings`, config);
  return data;
};

const create = async (newBooking: NewBooking, campgroundId: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post<Booking>(
    `${apiBaseUrl}/campgrounds/${campgroundId}/booking`,
    newBooking,
    config
  );
  return data;
};

const get = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get<Booking>(
    `${apiBaseUrl}/bookings/${id}`,
    config
  );
  return data;
};

const update = async (newBooking: NewBooking, id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${apiBaseUrl}/${id}`, newBooking, config);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${apiBaseUrl}/${id}`, config);

  return response.data;
};
const bookingService = { setToken, getAll, create, get, update, remove };

export default bookingService;
