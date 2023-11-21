import campgroundService from "@/services/campground"
import Image from "next/image"
import AddCircleIcon from '@mui/icons-material/AddCircle';



export default async function CampgroundDetailPage ({params} : {params : {id: string}}) {
    const campgroundDetail = await campgroundService.get(params.id)

    console.log(campgroundDetail)
    return(
        <main className="flex flex-row px-24 w-screen mt-24">
            <div className="flex flex-col w-full justify-center">
                <h1 className="font-mediem text-2xl">{campgroundDetail.data.name}</h1>
                <div className="flex flex-row w-full mt-4">
                    <div className="w-[50%] inline-block">
                        <Image 
                            src={campgroundDetail.data.picture}
                            alt="Campground Pictue"
                            // layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            width={420}
                            height={420}
                        />
                    </div>
                    <div className="flex flex-col w-[50%] justify-between">
                        <p>
                            {campgroundDetail.data.address }{` `}{campgroundDetail.data.district}{` `}
                            {campgroundDetail.data.province}{` `} {campgroundDetail.data.postalcode}<br/>
                            {campgroundDetail.data.tel}
                        </p>
                        <button className="w-[150px] h-[50px] rounded-xl bg-amber-500 py-2 text-white text-base">
                        <AddCircleIcon className='text-white mr-2'/>
                            Reserve now
                         </button>
                    </div>

                </div>
            </div>
        </main>
    )
}