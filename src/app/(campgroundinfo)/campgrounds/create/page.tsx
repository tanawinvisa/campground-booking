"use client"
import AddCampgroundForm from "@/components/AddCampgroundForm";
import Image from "next/image";
import { useSearchParams } from "next/navigation";


export default function CreateCampground({ params }: { params: { campId: string } }){

    const searchParams = useSearchParams();
    const campId = searchParams.get("campgroundId");

    return(
        <main className="absolute w-screen h-screen">
            <Image 
            src='/images/camp2.jpeg'
                alt="Your Image"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md z-10">
                <AddCampgroundForm 
                    campId={campId}
                />
            </div>
        </main>
    )
}