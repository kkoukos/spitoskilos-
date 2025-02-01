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
import { MailOutline, Remove } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ListingsInfo({ params, user, loggedIn }) {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [favorites, setFavorites] = useState(user.favorites);
  const imageUrls = [];

  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

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
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  const addToFavorites = async () => {
    try {
      const listing_id = params.property;
      const response = await fetch("/api/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing_id, // replace with actual listing ID
        }),
      });
      const { success, message } = await response.json(); // Parse JSON
      if (success) {
        setFavorites([...favorites, listing._id]);
        toast.success("Added to favorites");
      }
      console.log(resp);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const listing_id = params.property;
      const response = await fetch("/api/favorites/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing_id, // replace with actual listing ID
        }),
      });
      const { success, message } = await response.json(); // Parse JSON
      if (success) {
        setFavorites(favorites.filter((id) => id !== listing_id));
        toast.success("Removed from favorites");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="relative max-w-full ">
        <Swiper navigation className="h-[34rem] w-[60%] max-w-[1400px] mx-auto">
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
      <div className="w-full flex flex-col items-center py-12">
        <div className="flex w-[60%] max-w-[1400px]">
          {listing ? (
            <>
              <div className="w-[70%] ">
                <div className=" flex justify-between w-full">
                  <div className="text-3xl font-extralight ">
                    {listing?.propertyCategory + ", " + listing?.surface + "m²"}
                  </div>
                  {loggedIn ? (
                    favorites.includes(listing._id) ? (
                      <button
                        onClick={removeFromFavorites}
                        className="bg-transparent hover:bg-gray-300 text-gray-700 py-2 px-4 border border-gray-500 rounded"
                      >
                        <Remove className="mr-2" />
                        Remove from Favorites
                      </button>
                    ) : (
                      <button
                        onClick={addToFavorites}
                        className="bg-transparent hover:bg-gray-300 text-gray-700 py-2 px-4 border border-gray-500 rounded"
                      >
                        <PlaylistAddCheckOutlinedIcon className="mr-2" />
                        Save to Favorites
                      </button>
                    )
                  ) : (
                    <button
                      onClick={handleLoginRedirect}
                      className="bg-transparent hover:bg-gray-300 text-gray-700 py-2 px-4 border border-gray-500 rounded"
                    >
                      Login to Save
                    </button>
                  )}
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

                {listing && (
                  <div className=" w-full ">
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
                            <td className="py-2 px-4 border-b bg-gray-100">
                              Surface
                            </td>
                            <td className="py-2 px-4 border-b">
                              {listing.surface}m²
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b bg-gray-100">
                              Bedrooms
                            </td>
                            <td className="py-2 px-4 border-b">
                              {listing.numberOfBedrooms}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b bg-gray-100">
                              Bathrooms
                            </td>
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
                            <td className="py-2 px-4 border-b bg-gray-100">
                              Area
                            </td>
                            <td className="py-2 px-4 border-b">
                              {listing.area}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b bg-gray-100">
                              System code
                            </td>
                            <td className="py-2 px-4 border-b">
                              {listing._id}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b bg-gray-100">
                              Availability
                            </td>
                            <td className="py-2 px-4 border-b">
                              {listing.availability}
                            </td>
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
              </div>
              <div className="w-[30%] flex flex-col items-center">
                <div className="w-[90%] border rounded-xl flex items-center  pl-2 py-2 drop-shadow-xl leading-4">
                  <img
                    src="https://ddwzfbmuwqqymeflaocl.supabase.co/storage/v1/object/public/userphotos/kkoukos"
                    className="h-14 w-14 rounded-full"
                  ></img>

                  <div className="pl-2">
                    <p className="text-sm text-gray-500">Property owner</p>
                    <p className="text-xl font-semibold">Kostas Koukos</p>
                    <div className="w-full flex justify-between">
                      kostaskoukos2003@gmail.com
                    </div>
                    <div className="w-full flex justify-between">
                      +30 6989745884
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-3xl font-extralight mb-4">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}
