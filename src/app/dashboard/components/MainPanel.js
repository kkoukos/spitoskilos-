import { League_Spartan } from "next/font/google";
import TempPic from "../../../../public/pfp.jpg";
import { Button, Input } from "@nextui-org/react";
import { Delete, Edit } from "@mui/icons-material";

export default function MainPanel({ user }) {
  return (
    <div className="w-full h-full bg-[#0d1e2b] flex items-center justify-center ">
      <div className="w-11/12 h-[91.5%] bg-[#14293A] rounded-xl border-1 border-gray-700 text-white flex flex-col justify-evenly items-center max-w-[1550px]">
        <h1 className="font-bold text-4xl w-[90%] ">My Profile</h1>
        <div className="h-4/5 bg-[#14293A] border-t-1 border-gray-700 w-[90%] flex items-center">
          <div className="w-[40%] h-4/5 flex flex-col items-center gap-6 border-r-1 border-gray-700">
            <img
              src={TempPic.src}
              className="w-3/5 border-1 rounded-xl border-gray-500 "
            />
            <div className="w-3/5 flex justify-between">
              <Button
                isIconOnly
                color="danger"
                aria-label="Delete photo."
                size="lg"
              >
                <Delete />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="w-3/4 text-white hover:text-black"
              >
                UPLOAD
              </Button>
            </div>
          </div>
          <div className="w-[60%] h-4/5 flex items-start flex-col gap-6 text-xl justify-between ">
            <div className="ml-5 pl-4 w-4/5 gap-4 flex flex-col border-b-1 border-gray-700 pb-2 ">
              <h1 className="text-2xl font-bold">General Information</h1>
              <div className="flex justify-between w-full">
                <div className="w-3/4 flex flex-col gap-1">
                  <p>Name:</p>
                  <div className="text-gray-400">{user.name}</div>
                </div>
                <div className="w-3/4 flex flex-col gap-1">
                  <p>Username:</p>
                  <div className="text-gray-400">{user.username}</div>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-3/4 flex flex-col gap-1">
                  <p>Email:</p>
                  <div className="text-gray-400">{user.email}</div>
                </div>
                <div className="w-3/4 flex flex-col gap-1">
                  <p>Phone:</p>
                  <div className="text-gray-400">{user.phone}</div>
                </div>
              </div>
              <div>
                <Button size="xl" startContent={<Edit />}>
                  <span className="tracking-wide">Edit Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
