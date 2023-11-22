import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Campground, Campgrounds, NewCampground } from "@/types";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const { data } = await axios.get<Campgrounds>(`${apiBaseUrl}/campgrounds`);

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<{ success: boolean; data: Campground }>(
    `${apiBaseUrl}/campgrounds/${id}`
  );
  return data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(
    `${apiBaseUrl}/campgrounds/${id}`,
    config
  );

  return response.data;
};

const create = async (campground: NewCampground) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post<Campground>(
    `${apiBaseUrl}/campgrounds`,
    campground,
    config
  );
  return data;
};

const update = async (campground: Campground, id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${apiBaseUrl}/campgrounds/${id}`,
    campground,
    config
  );
  return response.data;
};

const campgroundService = { setToken, getAll, get, remove, create, update };

export default campgroundService;
