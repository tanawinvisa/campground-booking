"use client";
import Link from "next/link";
import CampgroundCard from "./CampgroundCard";
import { useState, useEffect } from "react";
import campgroundService from "@/services/campground";
import { useSession } from "next-auth/react";
import { Campground } from "@/types";
import Loading from "./Loading";

export default function CampgroundList() {
  // const mockdata = [{id:'3', name:'Camp3', picture:'/images/camp3.JPG'},{id:'4', name:'Camp4', picture:'/images/camp4.JPG'},{id:'5', name:'Camp5', picture:'/images/camp5.JPG'},{id:'6', name:'Camp6', picture:'/images/camp6.JPG'}]
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      try {
        const { data } = await campgroundService.getAll();
        setCampgrounds(data);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setIsLoading(false);
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
  }, [session]);

  const handleDelete = async (campId: string) => {
    try {
      if (campId) {
        if (isAdmin) {
          const deletedCampground = await campgroundService.remove(campId);
          if (deletedCampground) {
            setCampgrounds(
              campgrounds.filter((camp: Campground) => camp.id !== campId)
            );
          }
          console.log("Campground deleted:", deletedCampground);
        } else {
          console.log("You don't have a permission.");
        }
      } else {
        console.log("Undefine campground id.");
      }
    } catch (error) {
      console.error("Error deleting campground:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="gap-x-[60px] gap-y-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {campgrounds?.map((item) => (
            <div key={item.id} className="flex justify-center items-center">
              <Link href={`/campgrounds/${item.id}`}>
                <CampgroundCard
                  campName={item.name}
                  imgSrc={item.picture}
                  campId={item.id}
                  isAdmin={isAdmin}
                  handleDelete={handleDelete}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
