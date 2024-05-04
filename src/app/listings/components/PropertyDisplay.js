"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ListingsGallery from "../components/ListingsGallery";
import ListingsMap from "../components/ListingsMap";
import { useState, useEffect, Suspense } from "react";
import Map from "../../../components/Map";
import { Spinner } from "@nextui-org/react";

export default function PropertyDisplay() {
  const searchParams = useSearchParams();
  const [lat, setLat] = useState(30);
  const [lng, setLng] = useState(30);
  useEffect(() => {
    setLat(searchParams.get("lat"));
    setLng(searchParams.get("lng"));
  }, [searchParams]);
  const [markersList, setMarkersList] = useState([]); // State to store latLngList

  const [finalListings, setFinalListings] = useState([]); // State to store latLngList
  const [name, setName] = useState(searchParams.get("name") || "location");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/allListings"); // Fetch data
        const listings = await response.json(); // Parse JSON
        setFinalListings(listings);
        // Map through listings to create latLngList
        const newMarkersList = listings.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }));
        setMarkersList(newMarkersList); // Set latLngList state
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once
  return (
    <>
      <div
        className="flex w-full "
        style={{
          maxHeight: "calc(100vh - 204px)",
          minHeight: "calc(100vh - 204px)",
        }}
      >
        <Suspense fallback={<Spinner size="lg" />}>
          {loading ? (
            <div className=" flex items-center justify-center w-full h-full">
              <Spinner size="lg" />{" "}
            </div>
          ) : (
            // Display spinner while loading
            <>
              <div className="w-1/2 ">
                <ListingsGallery data={finalListings} name={name} />
              </div>
              <div className="w-full h-full">
                <Map lat={lat} lng={lng} markers={markersList} />
              </div>
            </>
          )}
        </Suspense>
      </div>
    </>
  );
}
