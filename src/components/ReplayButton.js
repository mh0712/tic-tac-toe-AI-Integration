import React from "react";

export function ReplayButton({ onClick }) {
  return (
    <button id="play-again" onClick={onClick}>
      Play Again
    </button>
  );
}
