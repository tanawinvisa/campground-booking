import CampgroundList from "@/components/CampgroundList";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Campgrounds(){
    return(
        <main className="p-8 py-16 pb-8">
            <div className="flex justify-center items-center flex-col">
                <div className="w-full">
                    <CampgroundList />
                </div>
                <div className="w-full flex justify-center items-center mt-5">
                    <button className="w-[150px] h-[50px] rounded-xl bg-amber-500 py-2 text-white text-base">
                        <AddCircleIcon className='text-white mr-2'/>
                        Create new
                    </button>
                </div>
            </div>
        </main>
    )
}

