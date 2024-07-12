"use client";

import SelectView from "./SelectView";
import { useState } from "react";
import MainView from "./MainView";

export default function MainPart({ user }) {
  const [view, setView] = useState([true, false]);

  return (
    <div className="w-screen h-screen flex bg-[#14293A] flex flex-col items-center text-white">
      <SelectView view={view} setView={setView} />
      <MainView view={view} user={user} />
    </div>
  );
}
