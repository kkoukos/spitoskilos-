"use client";

import Image from "next/image";
import PropertyCard from "../components/PropertyCard";

export default function ListingsGallery() {
  const data = [
    {
      _id: "6634ff0bc2a272c8dd47c997",
      price: 200000,
      description: "This is the residence discription",
      surface: 120,
      area: "Iasonidou 27, Eliniko",
      dateOfUpload: "2024-05-27T22:00:00.000Z",
      availability: "Available now",
      dateOfConstruction: 2017,
      propertyCategory: "Flat",
      latitude: 37.9168548,
      longitude: 23.7186146,
      numberOfBathrooms: 2,
      numberOfBedrooms: 3,
    },
    {
      _id: "f482bb09d24a9ce1b987a761",
      price: 250000,
      description: "Modern apartment in the heart of the city",
      surface: 100,
      area: "Thrakis 58, Glyfada",
      dateOfUpload: "2024-05-28T22:00:00.000Z",
      availability: "Available now",
      dateOfConstruction: 2015,
      propertyCategory: "Flat",
      latitude: 37.870162,
      longitude: 23.753962,
      numberOfBathrooms: 2,
      numberOfBedrooms: 2,
    },
    {
      _id: "a2c73e307d844cc5953e458a",
      price: 175000,
      description: "Cozy seaside condo with stunning views",
      surface: 85,
      area: "Poseidonos 143, Alimos",
      dateOfUpload: "2024-05-29T22:00:00.000Z",
      availability: "Available now",
      dateOfConstruction: 2020,
      propertyCategory: "Condo",
      latitude: 37.9022,
      longitude: 23.725,
      numberOfBathrooms: 1,
      numberOfBedrooms: 2,
    },
    {
      _id: "6634ff0bc2a272c8dd47c997",
      price: 200000,
      description: "This is the residence discription",
      surface: 120,
      area: "Iasonidou 27, Eliniko",
      dateOfUpload: "2024-05-27T22:00:00.000Z",
      availability: "Available now",
      dateOfConstruction: 2017,
      propertyCategory: "Flat",
      latitude: 37.9168548,
      longitude: 23.7186146,
      numberOfBathrooms: 2,
      numberOfBedrooms: 3,
    },
    {
      _id: "f482bb09d24a9ce1b987a761",
      price: 250000,
      description: "Modern apartment in the heart of the city",
      surface: 100,
      area: "Thrakis 58, Glyfada",
      dateOfUpload: "2024-05-28T22:00:00.000Z",
      availability: "Available now",
      dateOfConstruction: 2015,
      propertyCategory: "Flat",
      latitude: 37.870162,
      longitude: 23.753962,
      numberOfBathrooms: 2,
      numberOfBedrooms: 2,
    },
    {
      _id: "a2c73e307d844cc5953e458a",
      price: 175000,
      description: "Cozy seaside condo with stunning views",
      surface: 85,
      area: "Poseidonos 143, Alimos",
      dateOfUpload: "2024-05-29T22:00:00.000Z",
      availability: "Available now",
      dateOfConstruction: 2020,
      propertyCategory: "Condo",
      latitude: 37.9022,
      longitude: 23.725,
      numberOfBathrooms: 1,
      numberOfBedrooms: 2,
    },
  ];

  return (
    <>
      <div
        className="bg-gray-100 w-full p-6 flex flex-col "
        style={{ maxHeight: "calc(100vh - 204px)" }}
      >
        <div className="text-2xl mb-4">Homes for sale: LOCATION</div>
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
