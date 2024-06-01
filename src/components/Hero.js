"use client";
import SearchFull from "../components/SearchFull";
import { useState } from "react";
export default function Hero() {
  const [type, setType] = useState(1);

  function handleTypeClick() {
    if (type === 1) {
      setType(0);
    } else {
      setType(1);
    }
  }
  return (
    <>
      <div className="flex items-center flex-col w-full h-screen text-primary-text">
        <div className="w-full bg-login-back h-[90%] bg-no-repeat bg-cover bg-right-bottom flex flex-col items-center justify-between">
          <div className="flex items-center flex-col w-full h-full justify-center text-4xl ">
            <h2 className="font-bold">
              Search, Discover, Find Your Dream Home
            </h2>
            {type === 1 && (
              <div className="max-w-[1080px] w-3/5 flex text-lg gap-2 ml-4 mb-2 items-center">
                <div className="border-2 px-4 bg-[#346891] border-[#346891] rounded-xl cursor-default">
                  Buy
                </div>
                <div
                  className="border-2 border-white px-2 rounded-xl hover:bg-white cursor-pointer hover:opacity-50 hover:text-black"
                  onClick={handleTypeClick}
                >
                  <span>Rent</span>
                </div>
              </div>
            )}
            {type === 0 && (
              <div className="max-w-[1080px] w-3/5 flex text-lg gap-2 ml-4 mb-2 items-center">
                <div
                  className="border-2 border-white px-4 rounded-xl hover:bg-white cursor-pointer hover:opacity-50 hover:text-black"
                  onClick={handleTypeClick}
                >
                  Buy
                </div>
                <div className="border-2 px-2 bg-[#346891] border-[#346891] rounded-xl cursor-default">
                  <span>Rent</span>
                </div>
              </div>
            )}

            <SearchFull type={type}></SearchFull>
          </div>
        </div>
      </div>
    </>
  );
}
