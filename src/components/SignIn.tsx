"use client";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";

type Props = {
  callbackUrl?: string;
  error?: string;
};

export default function SignIn(props: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      setModalMessage("An error occurred while login. " + res.error);
      setIsModalOpen(true);
    } else {
      router.push(props.callbackUrl ?? "/");
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal} title="Signin Error">
        <p>{modalMessage}</p>
        <button
          onClick={closeModal}
          className="mt-4 py-2 px-4 text-white rounded-md bg-red-400"
        >
          Close
        </button>
      </Modal>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {error ? <div className="text-2xl tex-red-500">{error}</div> : ""}
        <div className="flex flex-col justify-center items-center gap-10">
          <LocalFireDepartmentRoundedIcon
            className="mx-auto h-10 w-auto"
            style={{ color: "#f59e0b" }}
          />
          <h2 className="text-center text-2xl font-bold leading-9  text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="flex flex-col gap-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/auth/signup"
              className="font-semibold leading-6 text-amber-600 hover:text-amber-500"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
