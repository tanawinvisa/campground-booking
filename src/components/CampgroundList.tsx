import Link from "next/link"
import CampgroundCard from "./CampgroundCard"

export default async function CampgroundList({campJson}:{campJson:Object}) {

    const mockdata = [{id:'3', name:'Camp3', picture:'/images/camp3.JPG'},{id:'4', name:'Camp4', picture:'/images/camp4.JPG'},{id:'5', name:'Camp5', picture:'/images/camp5.JPG'},{id:'6', name:'Camp6', picture:'/images/camp6.JPG'}]
    const campJsonReady = await campJson;
    console.log(campJsonReady);

    return (
        <div>
        <div className='gap-x-[60px] gap-y-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {mockdata.map((item: Object) => (
                    <div key={item.id} className="flex justify-center items-center">
                        <Link href={`/campground/${item.id}`}>
                            <CampgroundCard 
                            campName={item.name}
                            imgSrc={item.picture}
                            campId={item.id}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}