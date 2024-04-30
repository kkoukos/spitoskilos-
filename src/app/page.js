"use client";

import { useState } from 'react';
import { autocomplete } from './autocomplete.js';
import Image from "next/image";
import LogoTxt from "../../public/spitoskilos_logo_txt.png";
import LogoImg from "../../public/spitoskilos_logo_img.svg";


export default function Home() {
  const [inputText, setInputText] = useState('');
  const [predictions, setPredictions] = useState([]);

  const handleInputChange = async (event) => {
    const text = event.target.value;
    setInputText(text);
    if (text.trim() !== '') {
      try {
        const data = await autocomplete(text);
        setPredictions(data.predictions);
      } catch (error) {
        print("error")
        // Handle error
      }
    } else {
      setPredictions([]);
    }
  };

  return (
    <div className="flex items-center flex-col w-full h-screen">
      <div className="w-full bg-dog-back h-4/5 bg-no-repeat bg-cover bg-bottom ">
        {/* to outer div einai gia to image to inner gia na organonei ta pragmata */}
        <div className="w-full  flex flex-col items-center pt-4">
          <div className="flex backdrop-blur-md justify-between w-11/12  rounded-md p-5">
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
          {/* Place the input field and predictions list here */}
          <div className="w-11/12">
            <input type="text" value={inputText} onChange={handleInputChange} />
            {predictions && predictions.length > 0 && (
              <ul>
                {predictions.map((prediction) => (
                  <li key={prediction.place_id}>{prediction.description}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
    
}
