import { Delete, Edit } from "@mui/icons-material";
import { Button, Chip } from "@nextui-org/react";

import AlertDialogListing from "./AlertDialogListing";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ListingCard({ listing }) {
  async function handleDelete() {
    const response = await fetch("/api/deleteListing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing_id: listing?._id }),
    });

    console.log(response);

    response.json().then((data) => {
      console.log(data);
      const success = data.success;
      console.log(success);
      if (success) {
        router.push("/dashboard");
      }
    });

    router.push("/dashboard");
  }

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClick = () => {
    window.location.href = `https://www.fineline.gr/listings/${listing?._id}`;
  };

  return (
    <div className="w-full h-72  rounded-xl  border-gray-500 border-1 flex text-white mb-2 hover:bg-[#112536]">
      <div className="w-2/5  flex items-center justify-center">
        <img
          className="w-[80%] h-[80%] border-1 border-gray-700 rounded-lg cursor-pointer"
          src={listing?.pictures[0]}
          alt="Listing Image"
          onClick={handleClick}
        />
      </div>
      <div className="w-3/5 flex flex-col items-center h-full justify-center">
        {" "}
        {/* centers div below */}
        <div className="h-[80%] w-full  text-xl font-bold tracking-wide flex flex-col justify-between">
          <div className="flex flex-col w-[95%] ">
            <div className="flex items-center  justify-between">
              {listing?.propertyCategory + ", " + listing?.surface + "m²"}{" "}
              <Chip size="sm">{listing?.type.toUpperCase()}</Chip>
            </div>
            <div className="font-normal tracking-tight text-md text-gray-300">
              {listing?.area}
            </div>
          </div>

          <div className="w-[95%] flex justify-between ">
            <div className=" tracking-tight text-xl font-semibold">
              € {listing?.price.toLocaleString()}
            </div>
            <div className="flex gap-2">
              {/* <Button isIconOnly color="default" size="sm">
                <Edit />
              </Button> */}
              <Button
                isIconOnly
                color="danger"
                size="sm"
                onPress={handleOpenDialog}
              >
                <AlertDialogListing
                  open={open}
                  onClose={handleCloseDialog}
                  onAgree={handleDelete}
                />
                <Delete />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
