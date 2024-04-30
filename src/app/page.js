import Image from "next/image";
import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";
export default function Home() {
  return (
    <div className="flex items-center flex-col w-full h-screen">
      <div className="w-full bg-red-600 h-4/5 bg-no-repeat bg-cover bg-bottom ">
        {/* to outer div einai gia to image to inner gia na organonei ta pragmata */}
        <div className="w-full bg-blue-500 flex flex-col items-center pt-10 pb-10">
          <div className="flex justify-between w-11/12 ">
            <div className="flex items-center gap-2">
              <img src={LogoImg.src} className="h-12"></img>
              <img src={LogoTxt.src} className="h-8"></img>
            </div>
            <div className="flex w-4/12  h-18 items-center justify-end gap-10">
              <div>ABOUT US</div>
              <div>FAQ </div>
              <div>CONTACT US</div>
              <div className="border-2 p-2 rounded-lg hover:bg-white hover:text-slate-500">
                LOG IN/ REGISTER{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
