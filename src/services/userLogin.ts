import { apiBaseUrl } from "@/constants";
import axios from "axios";

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: userEmail,
      password: userPassword,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      throw new Error("Authentication Failed: " + error.message);
    } else {
      // Handle unexpected errors
      throw new Error("An unexpected error occurred");
    }
  }
}
