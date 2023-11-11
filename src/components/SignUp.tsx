"use client";

import userService from "@/services/user";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const User = await userService.create({
        email,
        password,
        name,
        tel,
        role: "user",
      });
      console.log(User);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="grid grid-cols-3 h-full items-center ">
      <div className="flex flex-col items-center justify-center h-full bg-white col-span-2 ">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-bold leading-9  text-gray-900">
              New Here? Sign up now!
            </h2>
            <p className="text-sm text-gray-500">
              Already has an account?{" "}
              <a
                href="/auth/signin"
                className="font-semibold leading-6 text-amber-600 hover:text-amber-500"
              >
                Login
              </a>
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-5 ">
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-2 border-gray-300 border-[1px] rounded-2xl"
              ></input>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-5 py-2 border-gray-300 border-[1px] rounded-2xl"
              ></input>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="password2">Type Password Again</label>
              <input
                id="password2"
                type="password"
                placeholder="Type password again"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="px-5 py-2 border-gray-300 border-[1px] rounded-2xl"
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">Name</label>
              <input
                id="name"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-5 py-2 border-gray-300 border-[1px] rounded-2xl"
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tel">Tel</label>
              <input
                id="tel"
                type="tel"
                placeholder="0802212122"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="px-5 py-2 border-gray-300 border-[1px] rounded-2xl"
              ></input>
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-amber-500 py-2 mt-2 text-white"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <Image
          className="object-cover overflow-hidden"
          src={"/images/signup.png"}
          alt="camping"
          fill={true}
        ></Image>
        <h2> Join us now!</h2>
      </div>
    </div>
  );
}
