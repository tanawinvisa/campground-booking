"use client"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/navigation';
export default function AddCampgroundButton () {

    const router = useRouter();

    return (
        <button className="w-[150px] h-[50px] rounded-xl bg-amber-500 py-2 text-white text-base"
                onClick={()=> router.push("/campground/create")}
        >
                        <AddCircleIcon className='text-white mr-2'/>
                        Create new
        </button>
    )
}