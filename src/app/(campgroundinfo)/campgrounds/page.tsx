"use client";
import CampgroundList from "@/components/CampgroundList";
import { Suspense } from "react";
import AddCampgroundButton from "@/components/AddCampgroundButton";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import campgroundService from "@/services/campground";
import { useSession } from "next-auth/react";

export default function Campgrounds() {
    // const campgrounds = campgroundService.getAll();
    const [isAdmin, setIsAdmin] = useState(false);

  const { data: session } = useSession();
    useEffect(() => {
        if (session && session.user) {
            campgroundService.setToken(session.user.token);
            setIsAdmin(true)
        }
    }, [session]);

  return (
    <main className="p-8 py-16 pb-8 h-full dark:bg-[#1a1a2e]">
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <Suspense fallback={<Loading />}>
            <CampgroundList />
          </Suspense>
        </div>
        <div className="w-full flex justify-center items-center mt-10">
          {isAdmin ? <AddCampgroundButton />:null}

        </div>
      </div>
    </main>
  );
}
