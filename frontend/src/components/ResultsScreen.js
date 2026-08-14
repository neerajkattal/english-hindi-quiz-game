import React, { useState } from "react";

import { speakHindi } from "../utils/speech";

// Formats a whole number of seconds as "Xm Ys" (or just "Ys" under a minute).
function formatElapsed(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

// Shows the final score and a breakdown of every question in the session,
// marking each one correct or wrong. A speaker button on each row lets the
// player re-listen to the correct pronunciation while reviewing.
function ResultsScreen({ history, elapsedSeconds, onRestart }) {
  const correctCount = history.filter((item) => item.correct).length;
  const [copied, setCopied] = useState(false);

  const handleCopyResults = () => {
    const summary = `English → Hindi Quiz: ${correctCount}/${history.length} correct in ${formatElapsed(
      elapsedSeconds
    )}`;

    // The Clipboard API isn't available in every browser/context (e.g. some
    // older browsers, or non-HTTPS origins other than localhost), so just
    // skip silently rather than throwing if it's missing.
    if (!navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="results-screen">
      <h2>Quiz Complete!</h2>
      <p className="final-score">
        You got {correctCount} out of {history.length} correct
      </p>
      <p className="elapsed-time">Time: {formatElapsed(elapsedSeconds)}</p>
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
      <button className="copy-results-button" onClick={handleCopyResults}>
        {copied ? "Copied!" : "Copy Results"}
      </button>
    </div>
  );
}

export default ResultsScreen;
