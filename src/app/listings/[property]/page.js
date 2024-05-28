"use server";

import { cookies } from "next/headers";
import NavBar from "../../../components/NavBarSticky";

import ListingsInfo from "./components/ListingInfo";

export default async function Page({ params }) {
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
    <>
      <NavBar></NavBar>

      <ListingsInfo
        params={params}
        user={user}
        loggedIn={loggedIn}
      ></ListingsInfo>
    </>
  );
}
