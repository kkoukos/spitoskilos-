import { Favorite } from "@mui/icons-material";
import { Button, Chip, Skeleton } from "@nextui-org/react";

export default function FavoriteSkeleton() {
  return (
    <div className="relative w-[365px] h-72  rounded-xl  border-gray-500 border-1 text-white   mx-2 mt-2 items-start flex flex-col">
      <div className="w-full h-[60%] flex flex-col justify-center items-center ">
        <Skeleton className="w-full h-full  rounded-t-xl  bg-gray-400"></Skeleton>
      </div>
      <div className="h-[40%] flex flex-col gap-2 ml-4 mt-2">
        <Skeleton className="w-32 h-6  rounded-lg  bg-gray-400"></Skeleton>
        <Skeleton className="w-48 h-6  rounded-lg  bg-gray-400"></Skeleton>
      </div>
    </div>
  );
}
