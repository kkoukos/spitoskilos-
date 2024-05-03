"use client";

import Image from "next/image";
import NavBarSticky from "../../components/NavBarSticky";
import Filters from "./components/Filters";
import PropertyDisplay from "./components/PropertyDisplay";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <NavBarSticky></NavBarSticky>
        <Filters></Filters>
        <PropertyDisplay></PropertyDisplay>
      </div>
    </>
  );
}
