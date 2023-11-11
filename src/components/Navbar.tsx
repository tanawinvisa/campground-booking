import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import Link from "next/link";

function Navbar() {
  const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "Campground", href: "#", current: false },
    { name: "Booking", href: "#", current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <nav className="flex flex-1 h-full items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center px-2">
            <LocalFireDepartmentRoundedIcon
              className="h-8 w-auto"
              style={{ color: "#f59e0b" }}
            />
          </div>

          <nav className="flex items-center gap-6 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "text-gray-900 border-b-2 border-amber-500"
                    : "text-gray-400 hover:text-gray-500 hover:border-b-2 hover:border-gray-300",
                  "flex items-center justify-center text-sm font-medium h-full"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </nav>
        <nav className="flex">
          <Link
            href={"/api/auth/signin"}
            className="text-gray-900 hover:text-gray-500 text-sm font-medium"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
