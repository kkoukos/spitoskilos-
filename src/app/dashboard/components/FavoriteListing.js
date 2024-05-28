import { Delete, Edit, Favorite } from "@mui/icons-material";
import { Button, Chip } from "@nextui-org/react";

export default function FavoriteListing({ listing }) {
  return (
    <div className="relative w-[365px] h-72  rounded-xl  border-gray-500 border-1 text-white   mx-2 mt-2 items-center flex flex-col">
      <div className="w-full h-[60%] flex flex-col justify-center items-center ">
        <img
          className="w-full h-full bg-white rounded-t-xl hover:rounded-lg hover:w-[95%] hover:h-[95%] duration-200 hover:bg-[#112536] cursor-pointer peer"
          src={listing?.pictures[0]}
        ></img>
        <Chip className="z-50  absolute right-4  top-[55%] peer-hover:right-6 peer-hover:top-[53%] duration-200 ">
          {listing?.type.toUpperCase()}
        </Chip>
      </div>
      <div className="h-[40%] z-10 w-[87.5%]">
        <h1 className="font-bold text-xl pt-2">
          {listing?.propertyCategory + ", " + listing?.surface + "m²"}{" "}
        </h1>
        <h2>{listing?.area}</h2>
        <div className="h-1/3 flex justify-between items-end">
          <div className="font-bold text-xl">
            € {listing?.price.toLocaleString()}
          </div>{" "}
          <Button isIconOnly color="danger" size="sm" var>
            <Favorite />
          </Button>
        </div>
      </div>
    </div>
  );
}
