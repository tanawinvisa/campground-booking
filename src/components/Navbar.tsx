"use client";

import { usePathname } from "next/navigation";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import Link from "next/link";
import SignInButton from "./SignInButton";
import ThemeToggleButton from "./ThemeToggleButton";

function Navbar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    {
      name: "Campgrounds",
      href: "/campgrounds",
      current: pathname === "/campgrounds",
    },
    { name: "Booking", href: "/booking", current: pathname === "/booking" },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8 z-20 bg-white dark:bg-[#1a1a2e]">
      <div className="relative flex h-16 items-center justify-between">
        <nav className="flex flex-1 h-full items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center px-2">
            <LocalFireDepartmentRoundedIcon className="h-8 w-auto text-amber-500" />
          </div>

          <nav className="flex items-center gap-6 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "text-gray-900 border-b-2 border-amber-500 dark:text-white"
                    : "text-gray-400 hover:text-gray-500 hover:border-b-2 dark:hover:text-gray-300",
                  "flex items-center justify-center text-sm font-medium h-full"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </nav>
        <div className="flex items-center gap-4">
          <SignInButton />
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
