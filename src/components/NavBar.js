"use server";

import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";
import Logo from "./Logo";
import { cookies } from "next/headers";
import LogOutButton from "./LogOutButton";

export default async function NavBar({ user, loggedIn }) {
  return (
    <div className="w-full flex flex-col items-center pt-4 z-50 fixed text-primary-text">
      <div className="flex backdrop-blur-xl justify-between w-11/12 rounded-lg p-5">
        <Logo></Logo>
        <div className="flex w-5/12 h-18 items-center justify-end gap-10">
          <div className="py-4 cursor-pointer  border-transparent border-b-4 hover:border-primary-text">
            About us
          </div>
          <div className=" py-4 cursor-pointer border-transparent border-b-4 hover:border-primary-text ">
            Contact us
          </div>
          <div className=" py-4 cursor-pointer border-transparent border-b-4 hover:border-primary-text ">
            FAQ
          </div>
          {!loggedIn && (
            <div className="flex gap-4">
              <a href="/login">
                <div className="border-2 p-2 rounded-lg hover:bg-white hover:text-slate-500 duration-500 cursor-pointer">
                  Sign in
                </div>
              </a>
              {/* <a href="/login">
                <div className="border-2 p-2 rounded-lg bg-white text-slate-500 cursor-pointer">
                  Sign In
                </div>
              </a> */}
            </div>
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
