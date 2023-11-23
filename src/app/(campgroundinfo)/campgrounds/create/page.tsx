"use client";
import AddCampgroundForm from "@/components/AddCampgroundForm";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function CreateCampground({
  params,
}: {
  params: { campId: string };
}) {
  const searchParams = useSearchParams();
  const campId = searchParams.get("campgroundId");

  return (
    <main className=" w-screen h-screen bg-[url('/images/camp2.jpeg')] flex items-center justify-center">
      <div className="">
        <AddCampgroundForm campId={campId} />
      </div>
    </main>
  );
}
