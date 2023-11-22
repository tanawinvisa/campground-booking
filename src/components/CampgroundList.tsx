"use client";
import Link from "next/link";
import CampgroundCard from "./CampgroundCard";
import { useState, useEffect } from "react";
import campgroundService from "@/services/campground";
import { useSession } from "next-auth/react";

export default function CampgroundList() {
  // const mockdata = [{id:'3', name:'Camp3', picture:'/images/camp3.JPG'},{id:'4', name:'Camp4', picture:'/images/camp4.JPG'},{id:'5', name:'Camp5', picture:'/images/camp5.JPG'},{id:'6', name:'Camp6', picture:'/images/camp6.JPG'}]
  const [campgroundJson, setCampgroundJson] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log(campJsonReady);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      campgroundService.setToken(session.user.token);
      if (session.user.role === "admin") {
        setIsAdmin(true);
      }
    }
    console.log("use effect", session);
  }, [session]);

  console.log("list", session);
  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const campgroundfetch = await campgroundService.getAll();
        setCampgroundJson(campgroundfetch);
      } catch (error) {
        console.log(error, "error");
      }
      if (session && session.user) {
        campgroundService.setToken(session.user.token);
        if (session.user.role === "admin") {
          setIsAdmin(true);
        }
      }
      console.log("use effect", session);
    };
    fetchCampgrounds();
    // console.log('json',campgroundJson)
  }, []);
  // console.log('json',campgroundJson)

  return (
    <div>
      <div className="gap-x-[60px] gap-y-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {campgroundJson?.data.map((item: Object) => (
          <div key={item.id} className="flex justify-center items-center">
            <Link href={`/campgrounds/${item.id}`}>
              <CampgroundCard
                campName={item.name}
                imgSrc={item.picture}
                campId={item.id}
                isAdmin={isAdmin}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
