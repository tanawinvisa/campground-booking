"use client";

import userService from "@/services/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    if (success) {
      router.push("/auth/signin");
    }
  };

  const [passwordError, setPasswordError] = useState("");

  const validatePasswords = () => {
    if (password !== password2) {
      setPasswordError("Passwords do not match!");
      return false;
    }
    setPasswordError(""); // Clear error message if passwords match
    return true;
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!validatePasswords()) {
      return; // Stop the form submission if passwords don't match
    }
    try {
      const User = await userService.create({
        email,
        password,
        name,
        tel,
        role: "user",
      });
      setModalMessage(`${User.name} created successfully!`);
      setSuccess(true);
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = "An error occurred while creating the user.";
      setModalMessage(errorMessage);
      setSuccess(false);
      setIsModalOpen(true);
    }
  };
  return (
    <div className="h-full dark:bg-[#1a1a2e]">
      <Modal isOpen={isModalOpen} closeModal={closeModal} title="Signup Status">
        <p>{modalMessage}</p>
        <button
          onClick={closeModal}
          className={
            success
              ? "mt-4 py-2 px-4 text-white rounded-md bg-green-400"
              : "mt-4 py-2 px-4 text-white rounded-md bg-red-400"
          }
        >
          {success ? "Continue" : "Close"}
        </button>
      </Modal>
      <div className="grid grid-cols-3 h-full items-center dark:bg-[#1a1a2e]">
        <div className="flex flex-col items-center px-5 justify-center h-full bg-white col-span-3 lg:col-span-2 dark:bg-[#1a1a2e]">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-bold leading-9  text-gray-900 dark:text-white">
                New Here? Sign up now!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
              <div className="flex flex-col gap-2 col-span-2 dark:text-white">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-2 border-gray-300 border-[1px] rounded-2xl"
                ></input>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="password" className="dark:text-white">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`px-5 py-2 border-${
                    passwordError ? "red-500" : "gray-300"
                  } border-[1px] rounded-2xl`}
                ></input>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="password2" className="dark:text-white">Confirm your password</label>
                <input
                  id="password2"
                  type="password"
                  placeholder="Type password again"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className={`px-5 py-2 border-${
                    passwordError ? "red-500" : "gray-300"
                  } border-[1px] rounded-2xl`}
                ></input>
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="dark:text-white">Name</label>
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
                <label htmlFor="tel" className="dark:text-white">Tel</label>
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
        <div className="relative h-full w-full flex flex-col items-center justify-center invisible lg:visible">
          <Image
            className="object-cover overflow-hidden"
            src={"/images/signup.png"}
            alt="camping"
            fill={true}
          ></Image>
          <h2> Join us now!</h2>
        </div>
      </div>
    </div>
  );
}
