"use server";

import NavBar from "../../../components/NavBarSticky";

import ListingsInfo from "./components/ListingInfo";

export default async function Page({ params }) {
  return (
    <>
      <NavBar></NavBar>

      <ListingsInfo params={params}></ListingsInfo>
    </>
  );
}
