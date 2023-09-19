import React, { useState } from "react";
import "../scss/TicTacToe.css";
import { calculateWinner } from "./CalculateWinner";
import { ReplayButton } from "./ReplayButton";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null)); // creating an array of 9 elements, all initialized to null
  const [xIsNext, setXIsNext] = useState(true);

  const [myTurnBackground, setTurn] = useState(true);
  const toggleBackground = () => {
    setTurn(!myTurnBackground);
  };

  const handleClick = (index) => {
    const squares = [...board]; // using spread operator to copy the elements from an existing array called 'board'.

    if (calculateWinner(squares)) {
        // *** Write your code here ***  

        // bade zabit el win lign 
        // winbBackground = "win-background"
      return;
    }
    if (squares[index]) {
        return;
    }

    squares[index] = xIsNext ? "X" : "O";
    setBoard(squares);
    setXIsNext(!xIsNext);
    toggleBackground();
  };

  const handleReplayClick = () => {
    // Reset the board to its default state.
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setTurn(true);
  };

  const renderSquare = (index) => {
    return (
      <div className="box align" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${board[winner[0]]}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div class="turn-container">
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
