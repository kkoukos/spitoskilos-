"use server";

import Image from "next/image";

import NavBarSticky from "../../components/NavBarSticky";
import ListingsHero from "./components/ListingsHero";
import { cookies } from "next/headers";

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
    <ListingsHero user={user} loggedIn={loggedIn}>
      <NavBarSticky />
    </ListingsHero>
  );
}
