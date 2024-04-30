"use client";

import { useState } from "react";
import { autocomplete } from "./autocomplete.js";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [predictions, setPredictions] = useState([]);

  const handleInputChange = async (event) => {
    const text = event.target.value;
    setInputText(text); // Update inputText state on every change

    if (text.length > 5) {
      if (text.trim() !== "") {
        setPredictions([]);
        try {
          const data = await autocomplete(text);

          setPredictions(data.suggestions); // Update predictions state with new data

          console.log(data.suggestions);
        } catch (error) {
          console.error(error); // Log error to console
          // Handle error
        }
      } else {
        setPredictions([]); // Clear predictions if input is empty
      }
    } else {
      setPredictions([]); // Clear predictions if input length is less than or equal to 5
    }
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
