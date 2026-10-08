import React, { useEffect } from "react";

import { speakHindi } from "../utils/speech";
import { ArrowIcon, CheckIcon, CrossIcon, SpeakerIcon } from "./Icons";

// Shows the English word and the 4 Hindi answer choices. Once answered, the
// right tile turns green (and pops), a wrong pick turns red (and shakes), and
// the correct word's pronunciation is revealed. Keys 1-4 answer; Enter moves on.
function QuizCard({ question, topic, onAnswer, result, selected, onNext, isLast }) {
  const answered = !!result;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (answered) {
        if (event.key === "Enter") {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const index = Number(event.key) - 1;
      if (index >= 0 && index < question.choices.length) {
        onAnswer(question.choices[index]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answered, question, onAnswer, onNext]);

  const tileState = (choice) => {
    if (!answered) return "";
    if (choice === result.correct_hindi) return "right";
    if (choice === selected) return "wrong";
    return "dim";
  };

  return (
    <div className="quiz-card card" key={question.english_word}>
      <p className="topic-chip">
        {topic?.hindi && (
          <span lang="hi" className="topic-chip-hindi">
            {topic.hindi}
          </span>
        )}
        {question.category}
      </p>
      <p className="prompt">What’s the Hindi for</p>
      <p className="english-word">{question.english_word}</p>

      <div className="choices">
        {question.choices.map((choice, index) => (
          <div className={`choice ${tileState(choice)}`} key={choice}>
            <button className="choice-button" onClick={() => onAnswer(choice)} disabled={answered}>
              <span className="choice-number">{index + 1}</span>
              <span className="choice-hindi" lang="hi">
                {choice}
              </span>
              {answered && choice === result.correct_hindi && <span className="choice-roman">{result.correct_roman}</span>}
            </button>
            <button
              className="speak-button tile-speak"
              onClick={() => speakHindi(choice)}
              aria-label={`Hear how ${choice} is pronounced`}
            >
              <SpeakerIcon />
            </button>
          </div>
        ))}
      </div>

      {!answered && <p className="keyboard-hint">Press 1–4 to answer · tap the speaker to hear a word</p>}

      {answered && (
        <div className={`feedback ${result.correct ? "is-right" : "is-wrong"}`} role="status">
          <span className="feedback-icon">{result.correct ? <CheckIcon /> : <CrossIcon />}</span>
          <div className="feedback-text">
            <strong>{result.correct ? "सही! Correct." : "Not quite."}</strong>
            <span>
              “{question.english_word}” is{" "}
              <span lang="hi" className="feedback-hindi">
                {result.correct_hindi}
              </span>{" "}
              ({result.correct_roman})
            </span>
          </div>
          <button
            className="speak-button"
            onClick={() => speakHindi(result.correct_hindi)}
            aria-label={`Hear how ${result.correct_hindi} is pronounced`}
          >
            <SpeakerIcon />
          </button>
          <button className="primary-button next-button" onClick={onNext} autoFocus>
            {isLast ? "See results" : "Next word"} <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
