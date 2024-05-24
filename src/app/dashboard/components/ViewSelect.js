"use client";

import { useState } from "react";
import { Favorite, HolidayVillage, Person } from "@mui/icons-material";

import NavBarSelect from "../../../components/NavBarSelect";

export default function ViewSelect({ view, setView }) {
  const handleSelect = (num) => {
    const newView = [false, false, false];
    newView[num] = true;
    setView(newView);
  };
  return (
    <div className="flex flex-col gap-2">
      <NavBarSelect
        title="Profile"
        selected={view[0]}
        onClick={() => handleSelect(0)}
      >
        <Person />
      </NavBarSelect>
      <NavBarSelect
        title="Listings"
        selected={view[1]}
        onClick={() => handleSelect(1)}
      >
        <HolidayVillage />
      </NavBarSelect>
      <NavBarSelect
        title="Favorites"
        selected={view[2]}
        onClick={() => handleSelect(2)}
      >
        <Favorite />
      </NavBarSelect>
    </div>
  );
}
