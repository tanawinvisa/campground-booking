export default function AddCampgroundForm (){

    const addHospital = async (addHospital: FormData) => {
        "use server"
        const name = addHospital.get("name")
        const address = addHospital.get("address")
        const district = addHospital.get("district")
        const province = addHospital.get("province")
        const postalcode = addHospital.get("postalcode")
        const tel = addHospital.get("tel")
        const picture = addHospital.get("picture")
        console.log(name,address,district,province,postalcode,tel,picture)

        try {
            console.log(name,address,district,province,postalcode,tel,picture)
            await dbConnect()
            const hospital = await Hospital.create({
                name,
                address,
                district,
                province,
                postalcode,
                tel,
                picture
            })
        } catch (error) {
            console.log(error)
        }
        revalidateTag("hospitals")
        redirect("/hospital")

    }

    return(
        <div>
            <h1>Create Campground</h1>
            <form>
                <div>
                    <div>
                        <label htmlFor="name">Campground Name</label>
                    </div>
                    <div>
                        <input type="text" placeholder="Name" id="name" name="name" required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="address">Address</label>
                    </div>
                    <div>
                        <input type="text" placeholder="Address" id="address" name="address" required></input>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <label htmlFor="district">District</label>
                        </div>
                        <div>
                            <input type="text" placeholder="District" id="district" name="district" required></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="province">Province</label>
                        </div>
                        <div>
                            <input type="text" placeholder="Province" id="province" name="province" required></input>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <label htmlFor="postalcode">Postal code</label>
                        </div>
                        <div>
                            <input type="text" placeholder="Postal code" id="postalcode" name="postalcode" required></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="tel">Phone number</label>
                        </div>
                        <div>
                            <input type="text" placeholder="06X-XXX-XXXX" id="tel" name="tel" required></input>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="picture">Picture URL</label>
                    </div>
                    <div>
                        <input type="text" placeholder="URL" id="picture" name="picture" required></input>
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