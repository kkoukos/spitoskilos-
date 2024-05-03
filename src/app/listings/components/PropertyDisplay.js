"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ListingsGallery from "../components/ListingsGallery";
import ListingsMap from "../components/ListingsMap";
import { useState, useEffect } from "react";
import Map from "../../../components/Map";

export default function PropertyDisplay() {
  const searchParams = useSearchParams();
  const [lat, setLat] = useState(30);
  const [lng, setLng] = useState(30);
  useEffect(() => {
    setLat(searchParams.get("lat"));
    setLng(searchParams.get("lng"));
  }, [searchParams]);
  const [markersList, setMarkersList] = useState([]); // State to store latLngList
  const [markersList2, setMarkersList2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/allListings"); // Fetch data
        const listings = await response.json(); // Parse JSON

        // Map through listings to create latLngList
        const newMarkersList = listings.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }));

        setMarkersList(newMarkersList); // Set latLngList state
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <ListingsGallery></ListingsGallery>
        {/* {markersList.length > 0 && ( // Render map only if latLngList is not empty
          <ListingsMap
            lat="37.983810"
            lng="23.727539"
            markersList={markersList}
          ></ListingsMap>
        )} */}

        <div className="bg-red-900 w-full h-full">
          <Map
            className="w-full h"
            lat={lat}
            lng={lng}
            markers={markersList2}
          />
        </div>
      </div>
    </>
  );
}
