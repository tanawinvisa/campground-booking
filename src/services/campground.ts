import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Campground } from "@/types";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get<Campground[]>(
    `${apiBaseUrl}/campgrounds`,
    config
  );

  return data;
};

const get = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get<{ success: boolean; data: Campground }>(
    `${apiBaseUrl}/campgrounds/${id}`,
    config
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

const campgroundService = { setToken, getAll, get, remove };

export default campgroundService;
