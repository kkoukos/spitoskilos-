import Image from "next/image";
import DogBack from "../../public/dog_back.png";
export default function Home() {
  return (
    <div className="flex items-center flex-col w-full h-screen">
      <div className="w-full bg-dog-back h-3/4 bg-no-repeat bg-cover bg-bottom"></div>
    </div>
  );
}
