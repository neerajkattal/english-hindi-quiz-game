import React, { useState } from "react";

// Lets the player choose how many questions the round should have,
// then hands the chosen count back to App.js to start the game.
function SetupScreen({ topic, onStart, onBack }) {
  const [questionCount, setQuestionCount] = useState(10);

  return (
    <div className="setup-screen card screen-enter">
      {topic.hindi && (
        <p className="setup-hindi" lang="hi">
          {topic.hindi}
        </p>
      )}
      <h2>{topic.name}</h2>
      <p className="muted">How many words this round?</p>
      <div className="count-options" role="radiogroup" aria-label="Number of questions">
        {[5, 10, 15, 20].map((count) => (
          <button
            key={count}
            role="radio"
            aria-checked={questionCount === count}
            className={`count-button ${questionCount === count ? "selected" : ""}`}
            onClick={() => setQuestionCount(count)}
          >
            {count}
          </button>
        ))}
      </div>
      <button className="primary-button" onClick={() => onStart(questionCount)}>
        Start round
      </button>
      <button className="link-button" onClick={onBack}>
        ← Back to topics
      </button>
    </div>
  );
}

export default SetupScreen;
