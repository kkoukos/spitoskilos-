"use client";

<script src="http://localhost:3001"></script>

import { useState } from "react";
import Image from "next/image";
import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [predictions, setPredictions] = useState([]);

  return (
    <div className="flex items-center flex-col w-full h-screen">
      <div className="w-full bg-dog-back h-4/5 bg-no-repeat bg-cover bg-right-bottom ">
        {/* to outer div einai gia to image to inner gia na organonei ta pragmata */}
        <div className="w-full  flex flex-col items-center pt-4">
          <div className="flex backdrop-blur-xl justify-between w-11/12  rounded-md p-5">
            <div className="flex items-center gap-2 ">
              <img
                src={LogoImg.src}
                className="h-12 cursor-pointer rotate-animation  duration-500"
              ></img>
              <style jsx>{`
                @keyframes rotateAnimation {
                  0% {
                    transform: rotate(0deg);
                  }
                  12.5% {
                    transform: rotate(62deg);
                  }
                  25% {
                    transform: rotate(0deg);
                  }
                  37.5% {
                    transform: rotate(-48deg);
                  }
                  50% {
                    transform: rotate(0deg);
                  }
                  62.5% {
                    transform: rotate(34deg);
                  }
                  75% {
                    transform: rotate(0deg);
                  }
                  87.5% {
                    transform: rotate(-16deg);
                  }
                  100% {
                    transform: rotate(0deg);
                  }
                }
                .rotate-animation:hover {
                  animation: rotateAnimation 1.5s forwards;
                }
              `}</style>
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
