"use client";

import { useState, useRef } from "react";
import { autocomplete } from "./autocomplete.js";
import { createEntry } from "./create.js";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [predictions, setPredictions] = useState([]);
  const timerRef = useRef(null);
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    const result = await createEntry(formData);

    if (result?.error) {
      setError(result.error);
    }
  }

  // Declare timer constant

  const handleClick = async (event) => {
    event.preventDefault();
    console.log("kostas");
  };

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
        <form action={handleSubmit}>
          <input type="text" name="input"></input>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-3 rounded"
          >
            redis
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="w-11/12">
          <input
            id="location"
            name="location"
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
      <div>
        <div onClick={handleClick()}>TEST</div>
      </div>
    </main>
  );
}
