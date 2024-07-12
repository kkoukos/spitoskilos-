import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Button, Skeleton } from "@nextui-org/react";

export default function ListingCard() {
  return (
    <div className="w-full h-72 rounded-xl  border-gray-500 border-1 flex text-white mb-2">
      <div className="w-2/5  flex items-center justify-center">
        <Skeleton className="w-[80%] h-[80%]  rounded-lg  bg-gray-400"></Skeleton>
      </div>
      <div className="w-3/5 flex flex-col items-center h-full justify-center">
        {" "}
        {/* centers div below */}
        <div className="h-[80%] w-full  text-xl font-bold tracking-wide flex flex-col justify-between">
          <div className="flex flex-col w-[95%] gap-2">
            <Skeleton className="w-40 h-6  rounded-lg  bg-gray-400"></Skeleton>

            <Skeleton className="w-48 h-6  rounded-lg  bg-gray-400"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
