import React from "react";

// Shows how many questions were answered correctly out of the total.
function ScoreBoard({ score, total }) {
  return (
    <p className="score-board">
      Score: {score} / {total}
    </p>
  );
}

export default ScoreBoard;
