import campgroundService from "@/services/campground";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";

export default async function CampgroundDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campgroundDetail = await campgroundService.get(params.id);

  console.log(campgroundDetail);

  return (
    <main className="flex flex-row px-24 w-screen h-screen dark:bg-[#1a1a2e]">
      <div className="flex flex-col w-full mt-24">
        <h1 className="font-medium text-2xl dark:text-white">
          {campgroundDetail.data.name}
        </h1>
        <div className="flex flex-row w-full mt-4">
          <div className="w-[50%] inline-block">
            <Image
              src={campgroundDetail.data.picture}
              alt="Campground Picture"
              width={420}
              height={420}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="flex flex-col w-[50%] justify-between pl-8">
            <p className="text-gray-500 mb-4 dark:text-gray-200">
              <span className="font-medium">
                {campgroundDetail.data.address} {campgroundDetail.data.district}{" "}
                {campgroundDetail.data.province}{" "}
                {campgroundDetail.data.postalcode}
              </span>
              <br />
              Tel: {campgroundDetail.data.tel}
            </p>
            <Link
              href={{
                pathname: `/campgrounds/${params.id}/booking`,
              }}
            >
              <p className="w-[150px] h-[50px] rounded-xl bg-amber-500 py-2 text-white text-base hover:bg-yellow-500 focus:outline-none focus:ring focus:border-yellow-300 flex justify-center items-center">
                <AddCircleIcon className="text-white mr-2" />
                Reserve now
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
