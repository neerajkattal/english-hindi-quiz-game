import React from "react";

import { FlameIcon } from "./Icons";

// Progress through the round (one segment per question, coloured by result),
// the score so far, and the current answer streak.
function ScoreBoard({ history, answered, questionCount, score, streak, bestStreak }) {
  // Once the current question is answered it's already in `history`.
  const current = Math.min(answered ? history.length : history.length + 1, questionCount);
  return (
    <div className="score-board">
      <div className="progress" aria-label={`Question ${current} of ${questionCount}`}>
        {Array.from({ length: questionCount }, (_, i) => {
          const item = history[i];
          const state = item ? (item.correct ? "right" : "wrong") : i === history.length && !answered ? "now" : "";
          return <span key={i} className={`progress-seg ${state}`} />;
        })}
      </div>
      <div className="score-row">
        <span>
          Question {current} of {questionCount}
        </span>
        <span>
          Score {score}/{history.length}
        </span>
        <span key={streak} className={`streak ${streak >= 3 ? "hot" : ""}`} title={`Best streak this round: ${bestStreak}`}>
          <FlameIcon /> {streak}
        </span>
      </div>
    </div>
  );
}

export default ScoreBoard;
