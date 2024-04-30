import Image from "next/image";
import DogBack from "../../public/dog_back.png";
export default function Home() {
  return (
    <div className="flex items-center flex-col w-auto h-screen">
      <div className="w-full ">
        <img src={DogBack.src} className="w-full h-128 "></img>
      </div>
    </div>
  );
}
