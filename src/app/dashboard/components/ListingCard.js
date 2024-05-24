import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@nextui-org/react";

export default function ListingCard() {
  return (
    <div className="w-full h-44  rounded-xl  border-gray-500 border-1 flex text-white mb-2">
      <div className="w-2/5  flex items-center justify-center">
        <div className="w-[80%] h-[80%] bg-login-back border-1 border-gray-700 rounded-lg "></div>
      </div>
      <div className="w-3/5 flex flex-col items-center h-full justify-center">
        {" "}
        {/* centers div below */}
        <div className="h-[80%] w-full  text-xl font-bold tracking-wide flex flex-col justify-between">
          <div className="flex flex-col w-[95%] ">
            <span>Apartment, 90m²</span>
            <div className="font-normal tracking-tight text-md text-gray-300">
              Neo Faliro center, Neo Faliro (Piraeus)
            </div>
          </div>

          <div className="w-[95%] flex justify-between ">
            <div className=" tracking-tight text-xl font-semibold">
              € 296,000
            </div>
            <div className="flex gap-2">
              <Button isIconOnly color="default" size="sm">
                <Edit />
              </Button>
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
