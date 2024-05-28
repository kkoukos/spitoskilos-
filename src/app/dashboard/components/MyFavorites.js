import { useEffect, useState } from "react";
import FavoriteListing from "./FavoriteListing";
import FavoriteSkeleton from "./FavoriteSkeleton";

export default function MyFavorites({ user }) {
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = user._id;
        const response = await fetch("/api/favorites/getListings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });

        const tempListings = await response.json();

        setListings(tempListings.listings);
        setLoading(false);
        console.log(tempListings.listings);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData(); // Call fetchData function when component mounts
  }, []);
  return (
    <>
      <h1 className="font-bold text-4xl w-[90%] ">Favorites</h1>
      <div className="h-4/5 bg-[#14293A] border-t-1 border-gray-700 w-[90%] flex justify-center  overflow-scroll">
        <div className="h-fit flex w-fit flex-wrap justify-center pt-4 overflow-scroll ">
          {loading && (
            <>
              <FavoriteSkeleton></FavoriteSkeleton>
              <FavoriteSkeleton></FavoriteSkeleton>
              <FavoriteSkeleton></FavoriteSkeleton>
            </>
          )}
          {!loading && (
            <>
              {listings.map((listing, index) => (
                <FavoriteListing
                  key={index}
                  listing={listing}
                  listings={listings}
                  setListings={setListings}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
