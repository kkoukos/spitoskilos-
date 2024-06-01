"use server";
import { Button } from "@nextui-org/react";
import LogInImage from "../../public/loginActionPhoto.png";
export default async function LogInAction() {
  return (
    <div className=" flex items-center justify-center w-full">
      <div className="flex items-center justify-between h-72 w-1/2 max-w-[1080px]">
        <div className="text-black  ">
          <h1 className="font-bold text-2xl">Save your favorite listings.</h1>
          <p className="text-lg">Sign in for a more personalized experience</p>
          <Button variant="bordered" color="primary" className="mt-2">
            <span className="p-2 font-bold text-xl">Sign In </span>
          </Button>
        </div>
        <img src={LogInImage.src} className="h-72 "></img>
      </div>
    </div>
  );
}
