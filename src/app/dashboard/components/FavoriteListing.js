import { Delete, Edit, Favorite, HeartBroken } from "@mui/icons-material";
import { Button, Chip } from "@nextui-org/react";
import { useState } from "react";

export default function FavoriteListing({ listing, listings, setListings }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const removeFromFavorites = async () => {
    try {
      const listing_id = listing._id;
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
        setListings(listings.filter((listing) => listing._id !== listing_id));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  return (
    <div className="relative w-[365px] h-72  rounded-xl  border-gray-500 border-1 text-white   mx-2 mt-2 items-center flex flex-col">
      <a
        className="w-full h-[60%] flex flex-col justify-center items-center "
        href={"/listings/" + listing._id}
      >
        <img
          className="w-full h-full bg-white rounded-t-xl hover:rounded-lg hover:w-[95%] hover:h-[95%] duration-200 hover:bg-[#112536] cursor-pointer peer"
          src={listing?.pictures[0]}
        ></img>

        <Chip className="z-50  absolute right-4  top-[55%] peer-hover:right-6 peer-hover:top-[53%] duration-200 ">
          {listing?.type.toUpperCase()}
        </Chip>
      </a>

      <div className="h-[40%] z-10 w-[87.5%]">
        <h1 className="font-bold text-xl pt-2">
          {listing?.propertyCategory + ", " + listing?.surface + "m²"}{" "}
        </h1>
        <h2>{listing?.area}</h2>
        <div className="h-1/3 flex justify-between items-end">
          <div className="font-bold text-xl">
            € {listing?.price.toLocaleString()}
          </div>{" "}
          <Button
            isIconOnly
            color="danger"
            size="sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={removeFromFavorites}
          >
            {isHovered ? <HeartBroken /> : <Favorite />}
          </Button>
        </div>
      </div>
    </div>
  );
}
