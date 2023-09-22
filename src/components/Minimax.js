import { CalculateWinner } from "./CalculateWinner";


// minimax algorithm
export function Minimax (squares, player, opponent, isMaximizing) {
    const winningArray = CalculateWinner(squares);
    let winner = winningArray
    if(winner) {
        winner = winningArray[0];
    }

  if (winner === opponent) {
    return -1;
  } else if (winner === player) {
    return 1;
  } else if (!squares.includes(null)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = player;
        const score = Minimax(squares, player, opponent, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    console.log(bestScore)
    return isMaximizing ? bestScore : bestMove;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = opponent;
        const score = Minimax(squares, player, opponent, true);
        squares[i] = null;
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}
