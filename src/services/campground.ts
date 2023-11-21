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
  const { data } = await axios.get<Campground[]>(`${apiBaseUrl}/campgrounds`, config);

  return data;
};


const get = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get<Campground>(
    `${apiBaseUrl}/campgrounds/${id}`,
    config
  );
  return data;
};


const campgroundService = { setToken, getAll, get };

export default campgroundService;
