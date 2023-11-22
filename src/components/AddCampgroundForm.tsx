"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import campgroundService from "@/services/campground";
import { Campground } from "@/types";

export default function AddCampgroundForm({ campId }: { campId: string }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [tel, setTel] = useState("");
  const [picture, setPicture] = useState("");
  const [campground, setCampground] = useState(null as null | Campground);
  const [isUpdating, setIsUpdating] = useState(false);



    useEffect(()=>{
        const fetchDetails = async () =>{
            try {
                const detail = await campgroundService.get(campId);
                setCampground(detail.data);
              } catch (error) {
                // if (error instanceof AxiosError) {
                //   setModalMessage(error.response?.data.message);
                // } else {
                //   setModalMessage("Error fetching campground:");
                // }
              }
            if(campId){
                const campgroundDetail = await campgroundService.get(campId);
                setCampground(campgroundDetail.data);
                setIsUpdating(true);
            }
        };
        fetchDetails();

    },[campId]);

    useEffect(()=>{
        if(campground != null){
            setName(campground.name)
            setAddress(campground.address)
            setDistrict(campground.district)
            setProvince(campground.province)
            setPostalCode(campground.postalcode)
            setTel(campground.tel)
            setPicture(campground.picture)
        }
    },[campground]);

    const { data: session } = useSession();
    useEffect(() => {
        if (session && session.user) {
            campgroundService.setToken(session.user.token);
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCampground = { name, address, district, province, postalcode, tel, picture };
        try {
           if(session?.user?.role === "admin"){
            if (!picture.includes("https://drive.google.com/")) {
                console.error("Invalid link");
                return;
            }
            const campground = await campgroundService.create(newCampground);
            console.log("Campground created:", campground);
           }else{
            console.log("You don't have a permission.");
           }
          
        } catch (error) {
          console.error("Error creating campground:", error);
        }
    };
 

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCampground = { name, address, district, province, postalcode, tel, picture };
        try {
            if (campId) {
                if(session?.user?.role === "admin"){
                  if (!picture.includes("https://drive.google.com/")) {
                console.error("Invalid link");
                return;
            }
                    const updatedCampground = await campgroundService.update(newCampground,campId);
                    console.log("Campground updated:", campground);
                   }else{
                    console.log("You don't have a permission.");
                   }
            }else{
                console.log("Undefine campground id.")
            }
        } catch (error) {
            console.error("Error deleting campground:", error);
        }
        };



  return (
    <div className="w-full dark:bg-[#1a1a2e]">
      <h1 className="text-2xl font-bold text-gray-700 mb-2 dark:text-white">
        Create Campground
      </h1>
      <form
        onSubmit={isUpdating ? handleUpdate : handleSubmit}
        className="flex flex-col gap-4 px-4"
      >
        <div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
            >
              Campground Name
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-[#f4f4f4] dark:placeholder-[#9e9e9e]"
            ></input>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
            >
              Address
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              required
            ></input>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
              >
                District
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="District"
                id="district"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              ></input>
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
              >
                Province
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Province"
                id="province"
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              ></input>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <div>
              <label
                htmlFor="postalcode"
                className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
              >
                Postal code
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Postal code"
                id="postalcode"
                name="postalcode"
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              ></input>
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
              >
                Phone number
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="06X-XXX-XXXX"
                id="tel"
                name="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              ></input>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="picture"
              className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300"
            >
              Picture URL
            </label>
          </div>
          <div>
            <input
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              type="text"
              placeholder="URL"
              id="picture"
              name="picture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="w-[100%] h-[44px] rounded-xl bg-amber-500 py-1 text-white text-base"
            type="submit"
          >
            {isUpdating ? "Update" : "Add"} Campground
          </button>
        </div>
      </form>
    </div>
  );
}
