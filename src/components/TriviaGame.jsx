// @ts-nocheck
import React, { useState, useEffect } from "react";
import Player from "./Player";
import Question from "./Question";

const categories = ["History", "Science", "Mathematics", "Cinema", "Random"];

const TriviaGame = () => {
  const initialState = [
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 },
  ];

  const [players, setPlayers] = useState(initialState);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [shouldLoadNewQuestion, setShouldLoadNewQuestion] = useState(false);

  useEffect(() => {
    if (players[currentPlayerIndex].score >= 10) {
      setGameOver(true);
    }
  }, [players, currentPlayerIndex]);

  const handleAnswer = (isCorrect, question) => {
    if (isCorrect) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].score += 1; 
      setPlayers(updatedPlayers);
      localStorage.setItem(`player${currentPlayerIndex + 1}Score`, updatedPlayers[currentPlayerIndex].score);
    }
  
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setShouldLoadNewQuestion(true);
  };
  

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setUsedQuestions([]);
    setShouldLoadNewQuestion(true);
  };

  const handleNextQuestion = () => {
    setShouldLoadNewQuestion(true);
  };

  return (
    <div className="trivia-game">
      {players.map((player, index) => (
        <Player key={index} playerName={player.name} score={player.score} />
      ))}
      {!gameOver && (
        <>
          <div>
            <h2>Turn of: {players[currentPlayerIndex].name}</h2>
            <p>Selected category: {selectedCategory || "Not selected"}</p>
          </div>
          <div>
            <h2>Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category} onClick={() => handleCategorySelection(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
          {selectedCategory !== null && (
            <Question
              category={selectedCategory}
              onAnswer={handleAnswer}
              usedQuestions={usedQuestions}
              setUsedQuestions={setUsedQuestions}
              onNextQuestion={handleNextQuestion}
            />
          )}
        </>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>{players[currentPlayerIndex].name} wins!</p>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;
