"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import NavBarSticky from "../../components/NavBarSticky";
import Filters from "./components/Filters";
import PropertyDisplay from "./components/PropertyDisplay";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const [lat, setLat] = useState(30);
  const [lng, setLng] = useState(30);

  useEffect(() => {
    setLat(searchParams.get("lat"));
    setLng(searchParams.get("lng"));
  }, [searchParams]);

  const [markersList, setMarkersList] = useState([]); // State to store latLngList

  const [name, setName] = useState(searchParams.get("name") || "location");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/allListings", { cache: "no-store" }); // Fetch data

        const tempListings = await response.json(); // Parse JSON
        setListings(tempListings);
        setFilteredListings(tempListings);
        // Map through listings to create latLngList
        console.log(listings);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData(); // Call fetchData function when component mounts
  }, []);
  useEffect(() => {
    let tempMarkers = filteredListings.map(({ latitude, longitude }) => ({
      lat: latitude,
      lng: longitude,
    }));
    console.log(tempMarkers);

    setMarkersList(tempMarkers);
  }, [filteredListings]);

  return (
    <>
      <div className="h-screen flex flex-col ">
        <NavBarSticky></NavBarSticky>
        <Filters
          listings={listings}
          filteredListings={filteredListings}
          setFilteredListings={setFilteredListings}
        ></Filters>

        <PropertyDisplay
          listings={listings}
          filteredListings={filteredListings}
          setListings={setListings}
          name={name}
          markersList={markersList}
          lat={lat}
          lng={lng}
          loading={loading}
        ></PropertyDisplay>
      </div>
    </>
  );
}
