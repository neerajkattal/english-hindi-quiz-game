import React, { useEffect } from "react";

import { speakHindi } from "../utils/speech";

// Shows the English word and the 4 Hindi answer choices.
// `feedback` is shown once the player has answered, and disables
// the buttons until the next question loads. Each choice has a speaker
// button so the player can hear how that Hindi word sounds.
function QuizCard({ question, onAnswer, feedback, correctHindi }) {
  // Let the player press 1-4 on the keyboard to pick an answer instead of
  // clicking, so answering is quick once you know the choices.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (feedback) {
        return;
      }
      const index = Number(event.key) - 1;
      if (index >= 0 && index < question.choices.length) {
        onAnswer(question.choices[index]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, question, onAnswer]);

  return (
    <div className="quiz-card">
      <p className="category-label">{question.category}</p>
      <p className="english-word">{question.english_word}</p>
      <div className="choices">
        {question.choices.map((choice) => (
          <div className="choice-row" key={choice}>
            <button
              className="choice-button"
              onClick={() => onAnswer(choice)}
              disabled={!!feedback}
            >
              {choice}
            </button>
            <button
              className="speak-button"
              onClick={() => speakHindi(choice)}
              aria-label={`Hear how ${choice} is pronounced`}
            >
              🔊
            </button>
          </div>
        ))}
      </div>
      {feedback && (
        <p className="feedback">
          {feedback}
          {correctHindi && (
            <button
              className="speak-button"
              onClick={() => speakHindi(correctHindi)}
              aria-label={`Hear how ${correctHindi} is pronounced`}
            >
              🔊
            </button>
          )}
        </p>
      )}
    </div>
  );
}

export default QuizCard;
