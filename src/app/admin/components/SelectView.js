"use client";

import { House, People } from "@mui/icons-material";
import Logo from "../../../components/Logo";

import NavBarOption from "./NavBarOption";

export default function SelectView({ view, setView }) {
  const handleSelect = (num) => {
    const newView = [false, false];
    newView[num] = true;
    setView(newView);
  };

  return (
    <>
      <div className="h-[10%] flex w-[90%] items-center justify-start gap-12">
        <Logo />
        <NavBarOption
          selected={view[0]}
          onClick={() => handleSelect(0)}
          title="USERS"
        >
          <People />
        </NavBarOption>

        {/* <NavBarOption
          selected={view[1]}
          onClick={() => handleSelect(1)}
          title="LISTINGS"
        >
          <House />
        </NavBarOption> */}
      </div>
    </>
  );
}
