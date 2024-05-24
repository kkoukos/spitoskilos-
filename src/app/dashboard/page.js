"use server";
import { cookies } from "next/headers";

import DashboardMain from "./components/DashboardMain";

export default async function Home() {
  let view = "1";
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
      <DashboardMain user={user}></DashboardMain>
    </div>
  );
}
