import React, { useState, useEffect } from "react";
import "../scss/TicTacToe.css";
import { CalculateWinner } from "./CalculateWinner";
import { ReplayButton } from "./ReplayButton";
import { Minimax } from "./Minimax";

export function TicTacToe() {
  let ai = "O";
  let human = "X";

  // Initial state
  const initialBoard = Array(9).fill(null);
  // let startPlayer = true;
  const [board, setBoard] = useState(initialBoard); 
  const [startPlayer, setStartPlayer] = useState(true);
  const [xIsNext, setXIsNext] = useState(startPlayer);
  const [myTurnBackground, setMyTurnBackground] = useState(true);

  // Check if the game is won
  const winningIndexes = CalculateWinner(board);
  const isGameWon = winningIndexes !== null;

  // Handle square click
  const handleClick = (index) => {
    if (isGameWon || board[index]) {
      return;
    }

    const squares = [...board]; 
    squares[index] = xIsNext ? human : ai;
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  // AI's turn using useEffect
  useEffect(() => {
    if (!xIsNext && !isGameWon) {
      const squares = [...board];
      let bestScore = -Infinity;
      let bestMove = null;

      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = ai;
          const score = Minimax(squares, ai, human, false); 
          squares[i] = null;

          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }

      if (bestMove !== null) {
        squares[bestMove] = ai;
        setBoard(squares);
        setXIsNext(true);
      }
    }
  }, [xIsNext, board, isGameWon]);

  // Reset the board.
  const handleReplayClick = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(startPlayer);
  };

  // render a square
  const renderSquare = (index) => {
    // Check if this is a winning square
    const isWinningSquare = winningIndexes ? winningIndexes[1].includes(index) : false;
    return (
      <div
        className={`box align ${isWinningSquare ? "winning-squares" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  // Determine game status
  const status = winningIndexes
    ? `Winner: ${board[winningIndexes[1][0]]}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  // Handling the player's turn
  const handleTurnFor = () => {
    setMyTurnBackground(!myTurnBackground)
    setStartPlayer(!startPlayer)
    setBoard(Array(9).fill(null));
    setXIsNext(!startPlayer);
  }

  return (
    <div>
      <div className="turn-container">
        <h3>Turn For</h3>
        <div
          onClick={handleTurnFor}
          className={`turn-box align ${myTurnBackground ? "turn-background" : ""}`}
          >X</div>
        <div 
          onClick={handleTurnFor}
          className={`turn-box align ${!myTurnBackground ? "turn-background" : ""}`}
          >O</div>
        <div className="bg"></div>
      </div>
      <div className="main-grid">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <h2 id="results">{status}</h2>
      <ReplayButton onClick={handleReplayClick} />
    </div>
  );
}

export default TicTacToe;
