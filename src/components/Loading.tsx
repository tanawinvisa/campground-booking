import Image from "next/image";
import { LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Image
        src={"/images/loading.svg"}
        alt="loading"
        className=" w-[24rem] max-w-none"
        width={1824}
        height={1080}
      />
      <h1 className="text-gray-900">
        Loading... <LinearProgress />
      </h1>
    </div>
  );
}
