import Image from "next/image";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import LogInAction from "../components/LogInAction";
import CallForAction from "../components/CallForAction";
import Footer from "../components/Footer";
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
    <>
      <NavBar user={user} loggedIn={loggedIn}></NavBar>
      <Hero></Hero>
      {!loggedIn && <LogInAction></LogInAction>}
      <CallForAction></CallForAction>
      <Footer></Footer>
    </>
  );
}
