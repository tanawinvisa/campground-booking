import AddCampgroundForm from "@/components/AddCampgroundForm";

export default function CreateCampground(){
    return(
        <main className="flex items-center justify-center min-h-screen bg-cover bg-[url('/images/camp2.jpeg')]">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <AddCampgroundForm />
            </div>
        </main>
    )
}