"use client";

import Image from "next/image";

import NavBarSticky from "../../components/NavBarSticky";
import Filters from "../listings/components/Filters";
import PropertyDisplay from "../listings/components/PropertyDisplay";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <NavBarSticky></NavBarSticky>

        <Filters></Filters>
      </div>
    </>
  );
}
