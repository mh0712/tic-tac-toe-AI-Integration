import React, { useState, useEffect } from "react";
import "../scss/TicTacToe.css";
import { CalculateWinner } from "./CalculateWinner";
import { ReplayButton } from "./ReplayButton";
import { Minimax } from "./Minimax";

function TicTacToe() {
  let ai = "O";
  let human = "X";

  // Creating an array of 9 elements, all initialized to null.
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [xIsNext, setXIsNext] = useState(true);

  const [myTurnBackground, setTurn] = useState(true);

  // Added winningIndexes to store the winning squares indices
  const winningIndexes = CalculateWinner(board);
  const isGameWon = winningIndexes !== null;

  // Considering the ai and the human both do clicks
  const handleClick = (index) => {
    if (isGameWon || board[index]) {
      return;
    }

    const squares = [...board]; // using spread operator to copy the elements from an existing array called 'board'.

    squares[index] = xIsNext ? human : ai;
    setBoard(squares);
    setXIsNext(!xIsNext);
  };
  // ################
  //  AI Turn
  // ################
  useEffect(() => {
    if (!xIsNext) {
      // AI's turn
      const squares = [...board];
      let bestScore = -Infinity;
      let bestMove = null;

      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = ai;
          const score = Minimax(squares, human, ai, false); // Minimax with depth parameter
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
        setXIsNext(true); // Set it back to the human's turn
      }
    }
  }, [xIsNext, board]);


  // Reset the board to its default state.
  const handleReplayClick = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setTurn(true);
  };

  const renderSquare = (index) => {
    // check if this is a winning square
    const isWinningSquare = winningIndexes ? winningIndexes.includes(index) : false;
    return (
      <div
        className={`box align ${isWinningSquare ? "winning-squares" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  // const winner = CalculateWinner(board);
  const status = winningIndexes
    ? `Winner: ${board[winningIndexes[0]]}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="turn-container">
        <h3>Turn For</h3>
        <div
          className={`turn-box align ${
            myTurnBackground ? "turn-background" : ""
          }`}
        >
          X
        </div>
        <div
          className={`turn-box align ${
            myTurnBackground ? "" : "turn-background"
          }`}
        >
          O
        </div>
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
