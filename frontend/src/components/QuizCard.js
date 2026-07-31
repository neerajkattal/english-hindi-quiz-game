import React from "react";

// Shows the English word and the 4 Hindi answer choices.
// `feedback` is shown once the player has answered, and disables
// the buttons until the next question loads.
function QuizCard({ question, onAnswer, feedback }) {
  return (
    <div className="quiz-card">
      <p className="english-word">{question.english_word}</p>
      <div className="choices">
        {question.choices.map((choice) => (
          <button
            key={choice}
            className="choice-button"
            onClick={() => onAnswer(choice)}
            disabled={!!feedback}
          >
            {choice}
          </button>
        ))}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default QuizCard;
