"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";

export default function ListingsInfo({ params }) {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);

  const imageUrls = [];

  useEffect(() => {
    const fetchData = async () => {
      const id = params.property; // Example ID, replace with dynamic value as needed
      try {
        const response = await fetch("/api/oneListing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Send the ID in the request body
        });
        const listing = await response.json(); // Parse JSON
        setListing(listing);
        console.log(listing);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  const addToFavorites = async () => {
    console.log("Saving to favorites:", listing);
  };

  return (
    <>
      <div className="relative max-w-full">
        <Swiper navigation className="h-96 max-w-full mx-auto">
          {listing
            ? listing.pictures.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-full w-full"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))
            : imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-full w-full"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      <div className="p-12 mx-12 flex justify-between">
        {listing ? (
          <>
            <div>
              <div className="text-3xl font-extralight ">
                {listing?.propertyCategory + ", " + listing?.surface + "m²"}
              </div>
              <div className="text-small text-gray-600">{listing?.area}</div>

              <div className="text-4xl font-bold text-gray-900 mt-8">
                €{listing?.price.toLocaleString()}
              </div>
              <div className="flex items-center text-gray-400 mt-3 space-x-4">
                <BedOutlinedIcon className="mb-1 text-md" />
                {listing?.numberOfBedrooms}
                <BathtubOutlinedIcon className="mb-1 text-md" />
                {listing?.numberOfBathrooms}
              </div>
              <div className="text-large mt-12 text-gray-500">
                {listing?.description}
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              <button
                onClick={addToFavorites}
                class="bg-transparent hover:bg-gray-300 text-gray-700 py-2 px-4 border border-gray-500 rounded"
              >
                <PlaylistAddCheckOutlinedIcon className="mr-2" />
                Save to Favorites
              </button>
              <div className="text-xl font-semibold text-gray-900">
                <LocalPhoneOutlinedIcon className="mb-1 mr-2 text-md" />
                {/* +30 6938904850 */}
                {listing?.phoneNumber}
                <a
                  // href={`tel:${listing?.phoneNumber}`}

                  href="+30 6938904850"
                  className="text-blue-500 underline mt-4 block"
                >
                  {/* {listing?.phoneNumber} */}
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-3xl font-extralight mb-4">Loading...</div>
        )}
      </div>

      {/* Feature Table */}
      {listing && (
        <div className="p-12 mx-12">
          <div className="text-2xl font-semibold mb-4">Features</div>
          <div className="overflow-auto border rounded-lg shadow">
            <table className="min-w-full text-left bg-white">
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100 w-1/3">
                    Price
                  </td>
                  <td className="py-2 px-4 border-b">
                    €{listing.price.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">
                    Price per m²
                  </td>
                  <td className="py-2 px-4 border-b">
                    €{(listing.price / listing.surface).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">Surface</td>
                  <td className="py-2 px-4 border-b">{listing.surface}m²</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">Bedrooms</td>
                  <td className="py-2 px-4 border-b">
                    {listing.numberOfBedrooms}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">Bathrooms</td>
                  <td className="py-2 px-4 border-b">
                    {listing.numberOfBathrooms}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">
                    Construction Year
                  </td>
                  <td className="py-2 px-4 border-b">
                    {listing.dateOfConstruction}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">Area</td>
                  <td className="py-2 px-4 border-b">{listing.area}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">
                    System code
                  </td>
                  <td className="py-2 px-4 border-b">{listing._id}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">
                    Availability
                  </td>
                  <td className="py-2 px-4 border-b">{listing.availability}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b bg-gray-100">
                    First published
                  </td>
                  <td className="py-2 px-4 border-b">
                    {listing.dateOfUpload.split("T")[0]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
