'use client'
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import campgroundService from "@/services/campground"


export default function AddCampgroundForm (){
    

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalcode, setPostalCode] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [picture, setPicture] = useState<string>("");

    

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
          const campground = await campgroundService.create(newCampground);
          console.log("Campground created:", campground);
        } catch (error) {
          console.error("Error creating campground:", error);
        }
      };

    return(
        <div>
            <h1>Create Campground</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="name">Campground Name</label>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            id="name" 
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required>

                        </input>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="address">Address</label>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Address" 
                            id="address" 
                            name="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required>
                        </input>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <label htmlFor="district">District</label>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            placeholder="District" 
                            id="district" 
                            name="district" 
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="province">Province</label>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            placeholder="Province" 
                            id="province" 
                            name="province" 
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            required>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <label htmlFor="postalcode">Postal code</label>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Postal code" 
                                id="postalcode" 
                                name="postalcode" 
                                value={postalcode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="tel">Phone number</label>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                placeholder="06X-XXX-XXXX" 
                                id="tel" 
                                name="tel" 
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                required>
                            </input>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="picture">Picture URL</label>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="URL" 
                            id="picture" 
                            name="picture" 
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                            required>
                        </input>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="w-[100%] h-[44px] rounded-xl bg-amber-500 py-1 text-white text-base"
                            type="submit"
                    >
                            Add Campground
                    </button>
                </div>
            </form>
        </div>
    )
}