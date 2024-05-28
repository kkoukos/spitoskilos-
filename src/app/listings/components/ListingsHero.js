"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import NavBarSticky from "../../../components/NavBarSticky";
import Filters from ".././components/Filters";
import PropertyDisplay from ".././components/PropertyDisplay";

export default function ListingsHero({ children, user, loggedIn }) {
  const [favorites, setFavorites] = useState(user.favorites || null);
  console.log(favorites);

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const [lat, setLat] = useState(searchParams.get("lat") || 30);
  const [lng, setLng] = useState(searchParams.get("lng") || 30);
  const [type, setType] = useState(searchParams.get("type") || "Buy");

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const [markersList, setMarkersList] = useState([]); // State to store latLngList

  const [name, setName] = useState(searchParams.get("name") || "location");
  const [category, setCategory] = useState(
    searchParams.get("category") || "House"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/allListings", { cache: "no-store" }); // Fetch data

        const tempListings = await response.json(); // Parse JSON
        setListings(tempListings);
        setFilteredListings(tempListings);
        // Map through listings to create latLngList

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

    setMarkersList(tempMarkers);
  }, [filteredListings]);

  return (
    <>
      <div className="h-screen flex flex-col ">
        {children}
        <Filters
          listings={listings}
          filteredListings={filteredListings}
          setFilteredListings={setFilteredListings}
          category_temp={category}
          type_temp={type}
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
          setFavorites={setFavorites}
          favorites={favorites}
          loggedIn={loggedIn}
        ></PropertyDisplay>
      </div>
    </>
  );
}
