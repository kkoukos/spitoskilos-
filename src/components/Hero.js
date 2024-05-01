"use client";

import {
  LocationOnOutlined,
  Place,
  Savings,
  Search,
  SquareFoot,
} from "@mui/icons-material";
import Image from "next/image";
import { League_Spartan } from "next/font/google";
const spartan_light = League_Spartan({
  subsets: ["latin"],
  weight: ["300"],
});

export default function Hero() {
  return (
    <div className="flex items-center flex-col w-full h-full justify-center text-4xl gap-12">
      <h2>Search, Discover, Find Your Dream Home</h2>
      <div className="max-w-[1080px] bg-white flex p-4 rounded-xl flex w-3/5 justify-between ">
        <div className="flex flex-col w-5/12 border-r-2  relative">
          <label
            for="area"
            className="text-zinc-700 text-base flex items-center "
          >
            <Place fontSize="small"></Place> Location
          </label>
          <div className={spartan_light.className}>
            <input
              id="area"
              className="w-11/12 text-zinc-600 text-lg pl-1 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="e.g Alimos,Vari,Pagrati"
            ></input>
            <div className="z-10 w-full absolute bg-white mt-4 text-zinc-600 text-lg pb-4 rounded-b-xl flex flex-col  items-center border-2">
              {" "}
              <div className="w-11/12  pl-4 flex items-start border-b-2 my-2 hover:text-zinc-800 cursor-pointer gap-2">
                <LocationOnOutlined> </LocationOnOutlined> <p>TEST</p>
              </div>
            </div>
          </div>
          {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"> */}
        </div>
        <div className="flex flex-col w-2/12 pl-6">
          <label for="area" className="text-black text-base flex items-center ">
            <Savings fontSize="small"></Savings> Price
          </label>
          <div className={spartan_light.className}>
            <input
              id="area"
              className="w-full text-zinc-600 text-lg pl-1 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="From-to €"
            ></input>
          </div>
          {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"> */}
        </div>
        <div className="flex flex-col w-2/12 pl-6  border-r-2">
          <label for="area" className="text-black text-base flex items-center ">
            <SquareFoot></SquareFoot> Surface
          </label>
          <div className={spartan_light.className}>
            <input
              id="area"
              className="w-full text-zinc-600 text-lg pl-1 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="From-to €"
            ></input>
          </div>
          {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"> */}
        </div>
        <div className="w-3/12 flex justify-end items-center">
          <div className=" py-4 pr-8 pl-5 bg-blue-500 rounded-lg text-white text-lg gap-2 cursor-pointer hover:bg-blue-600 duration-500">
            <Search></Search> SEARCH
          </div>
        </div>
      </div>
    </div>
  );
}
