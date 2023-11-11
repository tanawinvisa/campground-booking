import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-stone-100 shadow-2xl sm:rounded-3xl overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-x-20 my-2">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Welcome to
              <br />
              <span className="text-amber-800">Campground</span>
            </h2>
            <p className="z-10 mt-6 text-lg leading-8 text-gray-800">
              Our website brings the ease of digital booking to the great
              outdoors, ensuring a seamless user experience from the comfort of
              your screen to the comfort of your tent.
            </p>
            <div className="mt-10 flex justify-center gap-x-6 lg:justify-start">
              <Link
                href="#"
                className="z-10 rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                Get started
              </Link>
            </div>
          </div>
          <div className="relative mt-12 h-80 lg:mt-8 ">
            <Image
              className="absolute -top-48 w-[60rem] max-w-none"
              src={"/images/camping.svg"}
              alt="camping"
              width={1824}
              height={1080}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
