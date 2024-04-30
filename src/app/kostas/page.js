"use client";

import { useState, useRef } from "react";
import { autocomplete } from "./autocomplete.js";
import { useDebounceEff } from "./hooks.js";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [predictions, setPredictions] = useState([]);
  var debouncedText = useDebounceEff(inputText);

  // Declare timer constant
  const timerRef = useRef(null);

  const handleInputChange = async (event) => {
    const text = event.target.value;
    setInputText(text);

    // Clear the previous timeout
    clearTimeout(timerRef.current);

    // Set a new timeout
    timerRef.current = setTimeout(async () => {
      setPredictions([]);
      if (text.length > 5) {
        try {
          console.log(text);
          const data = await autocomplete(text);
          setPredictions(data.suggestions);
          console.log(data.suggestions);
        } catch (error) {
          console.error("ERROR1", error);
          // Handle error
        }
      }
    }, 800); // Timeout duration, 1000 milliseconds = 1 second
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-600 text-black">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* Place the input field and predictions list here */}
        <div className="w-11/12">
          <input
            type="text"
            value={inputText} // Bind inputText state to input value
            onChange={handleInputChange}
            className="text-black"
          />
          {predictions && predictions.length > 0 && (
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
          )}
        </div>
      </div>
    </main>
  );
}
