import React, { useState } from "react";

// Lets the player choose how many questions the quiz session should have,
// then hands the chosen count back to App.js to start the game.
function SetupScreen({ onStart }) {
  const [questionCount, setQuestionCount] = useState(10);

  return (
    <div className="setup-screen">
      <p>How many questions would you like?</p>
      <div className="question-count-options">
        {[5, 10, 15, 20].map((count) => (
          <button
            key={count}
            className={`count-button ${questionCount === count ? "selected" : ""}`}
            onClick={() => setQuestionCount(count)}
          >
            {count}
          </button>
        ))}
      </div>
      <button className="start-button" onClick={() => onStart(questionCount)}>
        Start Quiz
      </button>
    </div>
  );
}

export default SetupScreen;
