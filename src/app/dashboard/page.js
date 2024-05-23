"use server";
import { cookies } from "next/headers";

import MainPanel from "./components/MainPanel";
import NavBarSide from "../../components/NavBarSide";
export default async function Home() {
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
    <div className="w-screen h-screen flex">
      <NavBarSide user={user}></NavBarSide>
      <MainPanel user={user}></MainPanel>
    </div>
  );
}
