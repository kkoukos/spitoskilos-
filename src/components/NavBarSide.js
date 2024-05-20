"use server";

import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";
import { Favorite, HolidayVillage, Person } from "@mui/icons-material";
import Logo from "./Logo";
import { cookies } from "next/headers";
import LogOutButton from "./LogOutButton";
import { Avatar, Navbar } from "@nextui-org/react";
import NavBarSelect from "./NavBarSelect";

export default async function NavBarSide() {
  const sessionCookie = await cookies().get("session")?.value;

  let loggedIn = false;
  let user = { _id: "", name: "", username: "" };
  if (sessionCookie === undefined) {
    loggedIn = false;
  } else {
    user = JSON.parse(sessionCookie);

    loggedIn = true;
  }

  return (
    <div className="flex items-center justify-center h-full bg-[#14293A] text-primary-text w-1/5  max-w-64 border-r-1 border-gray-700">
      <div className="flex flex-col justify-between items-center h-[91.5%]">
        <div className="flex flex-col gap-8">
          <Logo></Logo>
          <div className="flex flex-col gap-2">
            <NavBarSelect title="Profile" selected={true}>
              <Person />
            </NavBarSelect>
            <NavBarSelect title="Listings">
              <HolidayVillage />
            </NavBarSelect>
            <NavBarSelect title="Favorites">
              <Favorite />
            </NavBarSelect>
          </div>
        </div>

        <div className="flex items-center justify-between  border-1 border-gray-700 rounded-lg p-4 py-2">
          <Avatar name={user.name}></Avatar>
          <div className=" p-2 rounded-lg ">{user.username}</div>
        </div>
      </div>
    </div>
  );
}
