/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Player from './Player';
import Question from './Question';

const TriviaGame = () => {
  const initialState = () => [
    { name: 'Player 1', score: parseInt(localStorage.getItem('player1Score')) || 0 },
    { name: 'Player 2', score: parseInt(localStorage.getItem('player2Score')) || 0 },
  ];

  const [players, setPlayers] = useState(initialState);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (players[currentPlayerIndex].score >= 10) {
      setGameOver(true);
    }
  }, [players, currentPlayerIndex]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].score += 1;
      setPlayers(updatedPlayers);

      localStorage.setItem(`player${currentPlayerIndex + 1}Score`, updatedPlayers[currentPlayerIndex].score);
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  return (
    <div className="trivia-game">
      {players.map((player, index) => (
        <Player key={index} playerName={player.name} score={player.score} />
      ))}
      {!gameOver && <Question onAnswer={handleAnswer} />}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>{players[currentPlayerIndex].name} wins!</p>
        </div>
      )}
    </div>
  );
}

export default TriviaGame;
