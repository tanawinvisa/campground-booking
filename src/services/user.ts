import axios from "axios";

import { apiBaseUrl } from "../constants";
import { User } from "next-auth";
import { NewUser } from "@/types";

const create = async (newUser: NewUser) => {
  const { data } = await axios.post<User>(
    `${apiBaseUrl}/auth/register`,
    newUser
  );
  return data;
};

const userService = {
  create,
};

export default userService;
