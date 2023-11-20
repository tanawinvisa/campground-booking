"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex">
      {!session ? (
        <Link
          href={"/auth/signin"}
          className="text-gray-900 hover:text-gray-500 text-sm font-medium"
        >
          Sign In
        </Link>
      ) : (
        <Link
          href={"/api/auth/signout"}
          className="text-gray-900 hover:text-gray-500 text-sm font-medium"
        >
          Sign Out
        </Link>
      )}
    </nav>
  );
};

export default SignInButton;
