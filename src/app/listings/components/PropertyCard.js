import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

export default function PropertyCard({
  property,
  setFavorites,
  isFavorite,
  favorites,
  loggedIn,
}) {
  const detailsUrl = `/listings/${property._id}`;

  const addToFavorites = async () => {
    try {
      const listing_id = property._id;
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
        setFavorites([...favorites, listing_id]);
        toast.success("Added to favorites");
      }
      console.log(resp);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const listing_id = property._id;
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

      <a
        href={detailsUrl}
        className="relative flex w-full bg-white shadow-lg rounded-xl mt-4 mb-4 border-1 hover:shadow-2xl transition-shadow duration-300 h-56"
      >
        <img
          //   object-cover, fits the image when the window is smaller
          className="w-1/3 object-cover rounded-l-xl"
          src={property.pictures[0]}
          alt="Property Photo"
        />
        <div className="w-2/3 p-4 ">
          <div className="text-lg font-bold">
            {property.propertyCategory}, {property.surface}m²
          </div>
          <p className=" text-sm ">{property.area}</p>
          <p className=" text-gray-400 mt-2 truncate h-1/4 w-[90%]">
            {property.description}
          </p>

          <div className="flex items-center text-gray-400 mt-3 space-x-4">
            <BedOutlinedIcon className="mb-1 text-md" />
            {property.numberOfBedrooms}
            <BathtubOutlinedIcon className="mb-1 text-md" />
            {property.numberOfBathrooms}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-xl font-bold text-gray-900">
              {/* .toLocaleString() vazei komma "," stis xiliades*/}€
              {property.price.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Updated: {new Date(property.dateOfUpload).toLocaleDateString()}
            </div>
          </div>
        </div>
        {}
        {!isFavorite && loggedIn && (
          <Button
            isIconOnly
            color="danger"
            variant="ghost"
            radius="full"
            onClick={(e) => {
              e.preventDefault(); // Prevents the default behavior of the button
              e.stopPropagation(); // Prevents the event from bubbling up
              addToFavorites();
            }}
            className="m-2 z-10"
          >
            <FavoriteBorderIcon />
          </Button>
        )}

        {isFavorite && loggedIn && (
          <Button
            isIconOnly
            color="danger"
            variant="solid"
            radius="full"
            onClick={(e) => {
              e.preventDefault(); // Prevents the default behavior of the button
              e.stopPropagation(); // Prevents the event from bubbling up
              removeFromFavorites();
            }}
            className="m-2 z-10"
          >
            <FavoriteBorderIcon />
          </Button>
        )}
      </a>
    </>
  );
}
