import campgroundService from "@/services/campground"

export default async function CampgroundDetailPage ({params} : {params : {id: string}}) {
    const campgroundDetail = await campgroundService.get(params.id)

    console.log(campgroundDetail)
    return(
        <main className="flex flex-row">
            <h1>{campgroundDetail.name}</h1>
            <div>

            </div>
            <div>

            </div>
        </main>
    )
}