import React, { useState } from "react";
import axios from "axios";
import "./Avg.css";

const WINDOW_SIZE = 10;

const API_URLS = {
  p: "https://jsonplaceholder.typicode.com/todos/1",
  f: "https://jsonplaceholder.typicode.com/todos/2",
  e: "https://jsonplaceholder.typicode.com/todos/3",
  r: "https://jsonplaceholder.typicode.com/todos/4",
};

const AverageCalculator = () => {
  const [selectedType, setSelectedType] = useState("p");
  const [windowNumbers, setWindowNumbers] = useState([]);
  const [prevWindow, setPrevWindow] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = async () => {
    try {
      console.log("Fetching data from:", API_URLS[selectedType]);
      const response = await axios.get(API_URLS[selectedType]);

      console.log("API Response:", response.data);

      let fetchedNumbers = response.data.numbers || [2, 3, 5, 7, 11]; 

      let updatedNumbers = [...new Set([...windowNumbers, ...fetchedNumbers])];

      if (updatedNumbers.length > WINDOW_SIZE) {
        updatedNumbers = updatedNumbers.slice(
          updatedNumbers.length - WINDOW_SIZE
        );
      }

      setPrevWindow([...windowNumbers]);
      setWindowNumbers(updatedNumbers);

      const newAverage =
        updatedNumbers.length > 0
          ? (
              updatedNumbers.reduce((sum, num) => sum + num, 0) /
              updatedNumbers.length
            ).toFixed(2)
          : 0;
      setAverage(newAverage);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  return (
    <div className="container">
      <h2>Average Calculator Microservice</h2>

      <label>Select Number Type:</label>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>

      <button onClick={fetchNumbers}>Fetch Numbers</button>

      <div className="result-container">
        <h4>Previous Window:</h4>
        <p>{JSON.stringify(prevWindow)}</p>

        <h4>Current Window:</h4>
        <p>{JSON.stringify(windowNumbers)}</p>

        <h4>Average:</h4>
        <p>{average}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;
