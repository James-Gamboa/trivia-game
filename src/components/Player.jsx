/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React from "react";

const Player = ({ playerName, score, isCurrentPlayer }) => {
  return (
    <div className={`player ${isCurrentPlayer ? "current-player" : ""}`}>
      <h2>{playerName}</h2>
      <p>Score: {score}</p>
    </div>
  );
}

export default Player;