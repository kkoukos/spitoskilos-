import { Delete, Edit } from "@mui/icons-material";
import { Button, Chip } from "@nextui-org/react";

export default function ListingCard({ listing }) {
  return (
    <div className="w-full h-72  rounded-xl  border-gray-500 border-1 flex text-white mb-2 hover:bg-[#112536]">
      <div className="w-2/5  flex items-center justify-center">
        <img
          className="w-[80%] h-[80%] border-1 border-gray-700 rounded-lg "
          src={listing?.pictures[0]}
        ></img>
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
              <Button isIconOnly color="danger" size="sm">
                <Delete />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
