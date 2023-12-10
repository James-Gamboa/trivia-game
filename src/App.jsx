/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React from "react";
import TriviaGame from "./components/TriviaGame";

function App({ initialState }) {
  return (
    <div className="App">
      <h1>Trivia Game</h1>
      <TriviaGame initialState={initialState} />
    </div>
  );
}

export default App;
