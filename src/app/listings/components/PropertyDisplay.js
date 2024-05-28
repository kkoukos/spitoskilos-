"use client";

import Image from "next/image";

import ListingsGallery from "../components/ListingsGallery";
import { useState, useEffect, Suspense } from "react";
import Map from "../../../components/Map";
import { Spinner } from "@nextui-org/react";

export default function PropertyDisplay({
  listings,
  filteredListings,
  name,
  markersList,
  lat,
  lng,
  loading,
  setFavorites,
  favorites,
  loggedIn,
}) {
  // Empty dependency array ensures useEffect runs only once
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
              <div className="w-[35%] min-w-[35%] ">
                <ListingsGallery
                  data={filteredListings}
                  name={name}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  loggedIn={loggedIn}
                />
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
