"use client";

import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import Image from "next/image";

export default function Filters() {
  return (
    <>
      <div className="w-full  pt-2 h-20 flex justify-center">
        <div className="w-11/12  h-full flex justify-between items-center">
          <div className="flex justify-start w-1/4 gap-4">
            <Select label="Rent" color="[#14293A]" variant="faded">
              <SelectItem>TEST</SelectItem>
            </Select>

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
