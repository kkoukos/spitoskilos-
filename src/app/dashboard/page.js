import Image from "next/image";
import MainPanel from "./components/MainPanel";
import NavBarSide from "../../components/NavBarSide";
export default async function Home() {
  return (
    <div className="w-screen h-screen flex">
      <NavBarSide></NavBarSide>
      <MainPanel></MainPanel>
    </div>
  );
}
