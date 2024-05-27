"use client";

import TempPic from "../../../../public/pfp.jpg";
import { League_Spartan } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import {
  Clear,
  Delete,
  Edit,
  Logout,
  Preview,
  Save,
  Upload,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MyProfile({ user }) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  function handleEdit() {
    setEditing(!editing);
  }

  async function handleLogOut() {
    event.preventDefault();

    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    response.json().then((data) => {
      console.log(data);
      const success = data.success;
      console.log(success);
      if (success) {
        router.push("/");
      }
    });
  }

  return (
    <>
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
              startContent={<Upload />}
            >
              UPLOAD
            </Button>
          </div>
        </div>
        <div className="w-[60%] h-4/5 flex items-start flex-col gap-6 text-xl justify-between ">
          <div className="ml-5 pl-4 w-4/5 gap-4 flex flex-col border-b-1 border-gray-700 pb-2 ">
            <h1 className="text-2xl font-bold">General Information</h1>
            {!editing && (
              <>
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
                <div className=" flex gap-4 items-center">
                  <Button
                    size="xl"
                    startContent={<Edit />}
                    onPress={handleEdit}
                  >
                    <span className="tracking-wide">Edit Profile</span>
                  </Button>
                  <Button
                    color="danger"
                    size="xl"
                    variant="flat"
                    startContent={<Logout />}
                    onPress={handleLogOut}
                  >
                    Log Out
                  </Button>
                  <Button
                    color="danger"
                    size="xl"
                    variant="bordered"
                    startContent={<Delete />}
                  >
                    Delete Account
                  </Button>
                </div>
              </>
            )}
            {editing && (
              <>
                <div className="flex flex-col justify-between w-full gap-2">
                  <div className="w-3/4 flex gap-1 items-center  justify-between">
                    <p>Name:</p>
                    <Input defaultValue={user.name} className="w-3/4" />
                  </div>

                  <div className="w-3/4 flex  gap-1 items-center justify-between">
                    <p>Email:</p>
                    <Input defaultValue={user.email} className="w-3/4" />
                  </div>
                  <div className="w-3/4 flex  gap-1 items-center justify-between">
                    <p>Phone:</p>
                    <Input defaultValue={user.phone} className="w-3/4" />
                  </div>
                  <div className="mt-6 flex justify-between w-3/4">
                    <Button
                      size="xl"
                      startContent={<Save />}
                      onPress={handleEdit}
                      className="w-[40%]"
                    >
                      <span className="tracking-wide">Save</span>
                    </Button>
                    <Button
                      size="xl"
                      color="danger"
                      startContent={<Clear />}
                      onPress={handleEdit}
                      className="w-[40%]"
                    >
                      <span className="tracking-wide">Cancel</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
