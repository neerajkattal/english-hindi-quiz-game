import React from "react";

import { speakHindi } from "../utils/speech";

// Shows the final score and a breakdown of every question in the session,
// marking each one correct or wrong. A speaker button on each row lets the
// player re-listen to the correct pronunciation while reviewing.
function ResultsScreen({ history, elapsedSeconds, onRestart }) {
  const correctCount = history.filter((item) => item.correct).length;

  return (
    <div className="results-screen">
      <h2>Quiz Complete!</h2>
      <p className="final-score">
        You got {correctCount} out of {history.length} correct
      </p>
      <p className="elapsed-time">Time: {elapsedSeconds}s</p>
      <ul className="results-list">
        {history.map((item, index) => (
          <li
            key={index}
            className={item.correct ? "result-correct" : "result-wrong"}
          >
            <span className="result-word">{item.english_word}</span>
            <span className="result-answer">
              Your answer: {item.selected_hindi} {item.correct ? "✓" : "✗"}
              <button
                className="speak-button"
                onClick={() => speakHindi(item.correct_hindi)}
                aria-label={`Hear how ${item.correct_hindi} is pronounced`}
              >
                🔊
              </button>
            </span>
            {!item.correct && (
              <span className="result-correct-answer">
                Correct answer: {item.correct_hindi}
              </span>
            )}
          </li>
        ))}
      </ul>
      <button className="start-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}

export default ResultsScreen;
