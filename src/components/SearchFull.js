"use client";

import {
  HomeWork,
  LocationOnOutlined,
  Place,
  Savings,
  Search,
  SquareFoot,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import { useState, useRef } from "react";
import { PlacesConnector } from "../connectors/PlacesConnector.js";

const spartan_light = League_Spartan({
  subsets: ["latin"],
  weight: ["300"],
});

export default function SearchFull({ type }) {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [dropdownPred, setDropdownPred] = useState(false);
  const timerRef = useRef(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("House");
  const [dropdownCat, setDropdownCat] = useState(false);
  const [placeId, setPlaceId] = useState(null);

  const catList = ["House", "Commercial", "Land", "Other"];

  function handleAllDropdowns() {
    setDropdownPred(false);
    setDropdownCat(false);
  }

  const handleInputChange = async (event) => {
    const text = event.target.value;
    setInputText(text);
    setPlaceId(null);
    // Clear the previous timeout
    clearTimeout(timerRef.current);

    // Set a new timeout
    timerRef.current = setTimeout(async () => {
      setPredictions([]);
      if (text.length > 5) {
        try {
          const data = await PlacesConnector(text);
          setPredictions(data.suggestions);
        } catch (error) {
          console.error("Error in place api:", error);
          // Handle error
        }
      }
    }, 800); // Timeout duration, 1000 milliseconds = 1 second
  };

  const handleLocationClick = async (event) => {
    const key = event.target.getAttribute("data-key"); // inputText = event.id;

    setPlaceId(key);
    setInputText(event.target.innerText);
    setPredictions(false);
  };
  const handleCatClick = async (event) => {
    const key = event.target.getAttribute("data-key"); // inputText = event.id;

    setCategory(key);

    setDropdownCat(false);
  };

  const handelSearchButton = async (event) => {
    if (placeId == null) {
      return console.log("null search");
    }
    let str_type = "Buy";
    if (type === 0) {
      str_type = "Rent";
    }

    const data = {
      placesId: placeId,
    };

    try {
      const response = await fetch("api/returnLatLon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { lat, lon } = await response.json();

        router.push(
          `/listings?lat=${lat}&lng=${lon}&name=${inputText}&category=${category}&type=${str_type}`
        );
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }

    // const { lat, lon } = await handlePlacesId(placeId);
  };

  return (
    <div className="max-w-[1080px] bg-white flex p-4 rounded-xl flex w-3/5 justify-between ">
      <div className="flex flex-col w-5/12 border-r-2  relative">
        <label
          htmlFor="area"
          className="text-zinc-700 text-base flex items-center "
        >
          <Place fontSize="small"></Place> Location
        </label>
        <div className={spartan_light.className}>
          <input
            id="area"
            className="w-11/12 text-zinc-600 text-lg pl-1 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="e.g Alimos,Vari,Pagrati"
            value={inputText}
            onChange={handleInputChange}
            onClick={() => {
              handleAllDropdowns();
              setDropdownPred(true);
            }}
          ></input>
          {/* {predictions && predictions.length > 0 && (
            <ul>
              {predictions.map((prediction) => (
                <li
                  key={
                    prediction.placePrediction.structuredFormat.mainText.text
                  }
                >
                  {prediction.placePrediction.structuredFormat.mainText.text},
                  {
                    prediction.placePrediction.structuredFormat.secondaryText
                      .text
                  }
                </li>
              ))}
            </ul>
          )} */}
          {predictions && inputText.length > 3 && dropdownPred && (
            <div className="z-10 w-full max-h-[300px] absolute bg-white mt-4 text-zinc-600 text-lg pb-4 rounded-b-xl flex flex-col  items-center border-2 overflow-scroll">
              {" "}
              {predictions.map((prediction, index) => (
                <div
                  className="w-11/12  pl-4 flex items-start border-b-2 my-2 hover:text-zinc-800 cursor-pointer gap-2"
                  key={"result" + index}
                >
                  <LocationOnOutlined> </LocationOnOutlined>{" "}
                  <p
                    data-key={prediction.placePrediction.place}
                    onClick={handleLocationClick}
                  >
                    {prediction.placePrediction.structuredFormat.mainText.text},
                    {
                      prediction.placePrediction.structuredFormat.secondaryText
                        .text
                    }
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"> */}
      </div>
      <div className="flex flex-col w-2/12 pl-4 relative">
        <label
          htmlFor="area"
          className="text-black text-base flex items-center "
        >
          <HomeWork></HomeWork> Category
        </label>
        <div
          className={spartan_light.className}
          onClick={() => {
            handleAllDropdowns();
            setDropdownCat(!dropdownCat);
          }}
        >
          <input
            id="area"
            className="w-full text-black text-lg pl-1 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder=""
            value={category}
          ></input>
          {dropdownCat && (
            <div className="z-10 w-full max-h-[220px] absolute bg-white mt-4 text-zinc-600 text-lg pb-4 rounded-b-xl flex flex-col  items-center border-2 overflow-scroll">
              {catList.map((cat, index) => (
                <div
                  className="w-11/12  pl-2 flex items-start border-b-2 my-2 hover:text-zinc-800 cursor-pointer gap-2"
                  key={"result" + index}
                >
                  <p data-key={cat} onClick={handleCatClick}>
                    {cat}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-2/12 pl-6  border-r-2">
        <label
          htmlFor="area"
          className="text-black text-base flex items-center "
        >
          <Savings fontSize="small"></Savings> Price
        </label>
        <div className={spartan_light.className}>
          <input
            id="area"
            className="w-full text-zinc-600 text-lg pl-1 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="From-to €"
          ></input>
        </div>
        {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"> */}
      </div>
      <div className="w-3/12 flex justify-end items-center">
        <div
          className=" py-4 pr-8 pl-5 bg-[#224561] rounded-lg text-white text-lg gap-2 cursor-pointer hover:bg-[#14293A] duration-500"
          onClick={handelSearchButton}
        >
          <Search></Search> SEARCH
        </div>
      </div>
    </div>
  );
}
