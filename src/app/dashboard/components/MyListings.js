"use client";

import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import ListingSkeleton from "./ListingSkeleton";
import { Button } from "@nextui-org/react";
import { AddCircle } from "@mui/icons-material";

import { useRouter } from "next/navigation";
export default function MyListings({ user }) {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/returnUserListings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user._id }),
        });

        const tempListings = await response.json();
        setListings(tempListings);
        setLoading(false);
        console.log(tempListings);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData(); // Call fetchData function when component mounts
  }, []);
  const router = useRouter();
  const handleClick = () => {
    router.push("/newListing");
  };
  return (
    <>
      <h1 className="font-bold text-4xl w-[90%] ">My Listings</h1>
      <div className="h-4/5 bg-[#14293A] border-t-1 border-gray-700 w-[90%] flex items-start">
        <div className="flex flex-col h-full w-full">
          <div className="flex w-full justify-between mt-4 mb-4 items-end">
            <h1>Currently showing: {listings.length} listings</h1>
            <Button
              size="sm"
              startContent={<AddCircle size="sm" />}
              onClick={handleClick}
            >
              New Listing
            </Button>
          </div>
          <div className="flex-col w-full h-[90%] overflow-scroll gap-6">
            {/* <ListingCard></ListingCard> */}

            {loading && (
              <>
                <ListingSkeleton></ListingSkeleton>
                <ListingSkeleton></ListingSkeleton>
                <ListingSkeleton></ListingSkeleton>
              </>
            )}
            {!loading && (
              <>
                {listings.map((listing, index) => (
                  <ListingCard key={index} listing={listing} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
