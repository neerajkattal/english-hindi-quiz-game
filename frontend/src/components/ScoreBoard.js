import React from "react";

// Shows which question the player is on and how many they've answered
// correctly out of the total so far.
function ScoreBoard({ current, questionCount, score, total }) {
  return (
    <div className="score-board">
      <p className="progress-indicator">
        Question {current} of {questionCount}
      </p>
      <p className="score-line">
        Score: {score} / {total}
      </p>
    </div>
  );
}

export default ScoreBoard;
