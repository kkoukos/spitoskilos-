"use client";

import Image from "next/image";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex items-center flex-col w-full h-screen text-primary-text">
        <div className="w-full bg-dog-back h-4/5 bg-no-repeat bg-cover bg-right-bottom flex flex-col items-center justify-between">
          <Hero></Hero>
        </div>
      </div>
      <div className="flex items-center flex-col w-full h-screen text-primary-text"></div>
    </>
  );
}
