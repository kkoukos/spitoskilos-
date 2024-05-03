"use client";

import Image from "next/image";
import ListingsGallery from "../components/ListingsGallery";
import ListingsMap from "../components/ListingsMap";

export default function PropertyDisplay() {
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <ListingsGallery></ListingsGallery>
        <ListingsMap></ListingsMap>
      </div>
    </>
  );
}
