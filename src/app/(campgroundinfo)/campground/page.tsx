import CampgroundList from "@/components/CampgroundList";
import AddCampgroundForm from "@/components/AddCampgroundForm";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material"
import campgroundService from "@/services/campground";
import AddCampgroundButton from "@/components/AddCampgroundButton";

export default async function Campgrounds(){

    const campgrounds = campgroundService.getAll();

    // const session = await getServerSession(authOptions);
    // if (!session || !session.user.token) return null
    // const profile = session ? await getUserProfile(session.user.token) : null;

    return(
        <main className="p-8 py-16 pb-8">
            <div className="flex justify-center items-center flex-col">
                <div className="w-full">
                <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                    <CampgroundList 
                    campJson={campgrounds}
                    />
                </Suspense>
                </div>
                <div className="w-full flex justify-center items-center mt-5">
                    <AddCampgroundButton />
                </div>
            </div>
        </main>
    )
}

