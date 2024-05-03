"use client";

import Image from "next/image";

export default function Filters() {
  return (
    <>
      <div className="w-full bg-gray-500 pt-2 h-20 flex justify-center">
        <div className="w-11/12 bg-red-400 h-full flex justify-between items-center">
          <div className="flex justify-start w-1/4 gap-4">
            <div>RENT</div>
            <div>BUY</div>
            <div>TYPE</div>
            <div>SURFACE</div>
            <div>FILTERS</div>
          </div>
          <div className="w-1/3 flex justify-center">SEARCH</div>
          <div className="w-1/4 flex justify-center">VIEW</div>
        </div>
      </div>
    </>
  );
}
