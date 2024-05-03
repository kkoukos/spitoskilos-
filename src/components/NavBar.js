import React from "react";

import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="w-full flex flex-col items-center pt-4 z-50 fixed text-primary-text">
      <div className="flex backdrop-blur-xl justify-between w-11/12 rounded-md p-5">
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
          <div className="border-2 p-2 rounded-lg hover:bg-white hover:text-slate-500 duration-500 cursor-pointer">
            LOG IN/ REGISTER
          </div>
        </div>
      </div>
    </div>
  );
}
