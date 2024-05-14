import Image from "next/image";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
export default async function Home() {
  return (
    <>
      <NavBar></NavBar>
      <Hero></Hero>
    </>
  );
}
