"use client";

import Image from "next/image";

import NavBar from "../components/NavBar";
import SearchFull from "../components/SearchFull";
import baseAuth from "./lib/auth";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex items-center flex-col w-full h-screen text-primary-text">
        <div className="w-full bg-dog-back h-4/5 bg-no-repeat bg-cover bg-right-bottom flex flex-col items-center justify-between">
          <div className="flex items-center flex-col w-full h-full justify-center text-4xl gap-12">
            <h2>Search, Discover, Find Your Dream Home</h2>
            <SearchFull></SearchFull>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col w-full h-screen text-primary-text"></div>
    </>
  );
}
