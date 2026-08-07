import React from "react";

// Shows which question the player is on, how many they've answered
// correctly out of the total so far, and their current answer streak.
function ScoreBoard({ current, questionCount, score, total, streak, bestStreak }) {
  return (
    <div className="score-board">
      <p className="progress-indicator">
        Question {current} of {questionCount}
      </p>
      <p className="score-line">
        Score: {score} / {total}
      </p>
      <p className="streak-line">
        Streak: {streak} (Best: {bestStreak})
      </p>
    </div>
  );
}

export default ScoreBoard;
