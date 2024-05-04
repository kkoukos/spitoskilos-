"use client";

import Image from "next/image";
import PropertyCard from "../components/PropertyCard";

export default function ListingsGallery(props) {
  let { data, name } = props;

  return (
    <>
      <div
        className="bg-gray-100 w-full p-6 flex flex-col h-full"
        style={{ maxHeight: "calc(100vh - 204px)" }}
      >
        <div className="text-2xl mb-4">Homes for sale: {name}</div>
        <div className="text-xs mb-4">Showing {data.length} results</div>

        <div className="flex-col overflow-y-scroll no-scrollbar">
          <div className="flex flex-wrap justify-center">
            {data.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
