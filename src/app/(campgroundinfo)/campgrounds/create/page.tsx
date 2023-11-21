import AddCampgroundForm from "@/components/AddCampgroundForm";
import Image from "next/image";

export default function CreateCampground(){
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
                <AddCampgroundForm />
            </div>
        </main>
    )
}