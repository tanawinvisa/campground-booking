"use client";
import CampgroundList from "@/components/CampgroundList";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import campgroundService from "@/services/campground";
import AddCampgroundButton from "@/components/AddCampgroundButton";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Campground } from "@/types";

export default function Campgrounds() {
  const { data: session } = useSession();
  return (
    <main className="p-8 py-16 pb-8">
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <Suspense fallback={<Loading />}>
            <CampgroundList />
          </Suspense>
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          {session?.user.role === "admin" && <AddCampgroundButton />}
        </div>
      </div>
    </main>
  );
}
