"use server";

import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";
import Logo from "./Logo";
import { cookies } from "next/headers";
import LogOutButton from "./LogOutButton";
export default async function NavBarSticky() {
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
    <div className="w-full flex flex-col items-center z-50  text-primary-text bg-[#14293A]">
      <div className="flex  justify-between w-full rounded-md px-4 py-6 items-center">
        <Logo></Logo>
        <div className="flex w-4/12 h-18 items-baseline justify-end gap-10">
          <div className="py-4 cursor-pointer  border-transparent border-b-4 hover:border-primary-text">
            ABOUT US
          </div>
          <div className=" py-4 cursor-pointer border-transparent border-b-4 hover:border-primary-text ">
            FAQ
          </div>
          <div className=" py-4 cursor-pointer border-transparent border-b-4 hover:border-primary-text ">
            CONTACT US
          </div>
          {!loggedIn && (
            <a href="/login">
              <div className="border-2 p-2 rounded-lg hover:bg-white hover:text-slate-500 duration-500 cursor-pointer">
                LOG IN/ REGISTER
              </div>
            </a>
          )}
          {loggedIn && (
            <>
              <a href="/dashboard">
                <div className="border-2 p-2 rounded-lg hover:bg-white hover:text-slate-500 duration-500 cursor-pointer">
                  {user.username}
                </div>
              </a>
              {/* <LogOutButton /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
