"use client";
import { useState } from "react";
import MainPanel from "./MainPanel";
import NavBarSide from "../../../components/NavBarSide";

export default function DashboardMain({ user }) {
  const [view, setView] = useState([true, false, false]);
  return (
    <div className="w-screen h-screen flex">
      <NavBarSide user={user} setView={setView} view={view}></NavBarSide>
      <MainPanel user={user} view={view}></MainPanel>
    </div>
  );
}
