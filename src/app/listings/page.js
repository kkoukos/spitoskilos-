"use server";

import Image from "next/image";

import NavBarSticky from "../../components/NavBarSticky";
import ListingsHero from "./components/ListingsHero";

export default async function Home() {
  return (
    <ListingsHero>
      <NavBarSticky />
    </ListingsHero>
  );
}
