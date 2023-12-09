/* eslint-disable no-unused-vars */
import React from 'react';
import TriviaGame from './components/TriviaGame';

function App({ initialState }) {
  return (
    <div className="App">
      <h1>Trivia Game</h1>
      <TriviaGame initialState={initialState} />
    </div>
  );
}

export default App;
