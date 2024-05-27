"use client";

import Logo from "./Logo";
import ViewSelect from "../app/dashboard/components/ViewSelect";
import { Avatar, Navbar } from "@nextui-org/react";
import { Logout } from "@mui/icons-material";

export default function NavBarSide({ user, setView, view }) {
  return (
    <div className="flex items-center justify-center h-full bg-[#14293A] text-primary-text w-1/5  max-w-64 border-r-1 border-gray-700">
      <div className="flex flex-col justify-between items-center h-[91.5%]">
        <div className="flex flex-col gap-8">
          <Logo></Logo>
          <ViewSelect setView={setView} view={view}></ViewSelect>
        </div>
        <div>
          <div className="flex items-center justify-between  border-1 border-gray-700 rounded-lg p-4 py-2">
            <Avatar name={user.name} src={user.profile_picture}></Avatar>
            <div className=" p-2 rounded-lg ">{user.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
