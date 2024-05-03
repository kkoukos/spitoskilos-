"use client";

import Image from "next/image";
import NavBarSticky from "../../components/NavBarSticky";
import Filters from "./components/Filters";

export default function Home() {
  return (
    <>
      <div className="h-[200vh]">
        <NavBarSticky></NavBarSticky>
        <Filters></Filters>
      </div>
    </>
  );
}
