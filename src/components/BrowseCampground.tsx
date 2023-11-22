"use client";

import { useAllCampgrounds } from "@/hooks/campgroundHook";
import Link from "next/link";
import { useEffect, useState } from "react";
import InteractiveCard from "./InteractiveCard";
import Image from "next/image";
import { Campground } from "@/types";

export default function BrowseCampground() {
  const { campgrounds, error } = useAllCampgrounds();
  const [displayedCampgrounds, setDisplayedCampgrounds] = useState<
    Campground[]
  >([]);

  useEffect(() => {
    // Adjust the number of campgrounds to display based on screen width
    const updateDisplayedCampgrounds = () => {
      if (campgrounds) {
        const width = window.innerWidth;
        let numberOfCampgrounds;

        if (width < 640) {
          // smaller than 'sm'
          numberOfCampgrounds = 1;
        } else if (width >= 640 && width < 1280) {
          numberOfCampgrounds = 3;
        } else {
          // 'xl' and larger
          numberOfCampgrounds = 5;
        }

        setDisplayedCampgrounds(campgrounds.slice(0, numberOfCampgrounds));
      }
    };

    window.addEventListener("resize", updateDisplayedCampgrounds);
    updateDisplayedCampgrounds(); // Initial update

    return () =>
      window.removeEventListener("resize", updateDisplayedCampgrounds);
  }, [campgrounds]);
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 dark:bg-[#1a1a2e]">
        <h2 className="text-gray-900 text-xl font-medium dark:text-gray-200">CAMPGROUNDS</h2>
        <Link href="/campgrounds" className="text-amber-500">
          Browse all Campgrounds
        </Link>
      </div>
      <div className="flex justify-around overflow-hidden flex-none gap-3 dark:bg-[#1a1a2e] pb-5">
        {displayedCampgrounds &&
          displayedCampgrounds.map((campground) => (
            <Link key={campground.id} href={`/campgrounds/${campground.id}`}>
              <InteractiveCard contentName="Khaoyai">
                <div className="">
                  <div className="w-full h-[200px] relative">
                    <Image
                      src={campground.picture}
                      alt="Picture"
                      fill={true}
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="h-[80px] w-full flex justify-center items-center">
                    <p className="text-xl dark:text-gray-300">{campground.name}</p>
                  </div>
                </div>
              </InteractiveCard>
            </Link>
          ))}
      </div>
    </div>
  );
}
