import { League_Spartan } from "next/font/google";
import TempPic from "../../../../public/pfp.jpg";

export default function MainPanel() {
  return (
    <div className="w-full h-full bg-[#0d1e2b] flex items-center justify-center ">
      <div className="w-11/12 h-[91.5%] bg-[#14293A] rounded-xl border-1 border-gray-700 text-white flex flex-col justify-evenly items-center max-w-[1550px]">
        <h1 className="font-bold text-4xl w-[90%] ">My Profile</h1>
        <div className="h-4/5 bg-[#14293A] border-t-1 border-gray-700 w-[90%] flex">
          <div className="w-[40%] h-full flex flex-col items-center justify-center">
            <img
              src={TempPic.src}
              className="w-3/4 border-1 rounded-xl border-gray-500 "
            />
            <div className="flex justify-between"></div>
          </div>
          <div className="w-[60%] h-full bg-red-200">PROFILE PICTURE</div>
        </div>
      </div>
    </div>
  );
}
