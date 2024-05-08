import React from "react";

import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";
import Logo from "./Logo";

export default function NavBarSticky() {
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
          <a href="/login">
            <div className="border-2 p-2 rounded-lg hover:bg-white hover:text-slate-500 duration-500 cursor-pointer">
              LOG IN/ REGISTER
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
