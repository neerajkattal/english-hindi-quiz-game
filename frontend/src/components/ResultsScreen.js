import React from "react";

// Shows the final score and a breakdown of every question in the session,
// marking each one correct or wrong.
function ResultsScreen({ history, onRestart }) {
  const correctCount = history.filter((item) => item.correct).length;

  return (
    <div className="results-screen">
      <h2>Quiz Complete!</h2>
      <p className="final-score">
        You got {correctCount} out of {history.length} correct
      </p>
      <ul className="results-list">
        {history.map((item, index) => (
          <li
            key={index}
            className={item.correct ? "result-correct" : "result-wrong"}
          >
            <span className="result-word">{item.english_word}</span>
            <span className="result-answer">
              Your answer: {item.selected_hindi} {item.correct ? "✓" : "✗"}
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
