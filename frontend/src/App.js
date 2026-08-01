import React, { useEffect, useState } from "react";

import QuizCard from "./components/QuizCard";
import ScoreBoard from "./components/ScoreBoard";

// The FastAPI backend runs on port 8000 by default (see backend/README.md).
const API_URL = "http://localhost:8000";

function App() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Ask the backend for a new question.
  const loadQuestion = () => {
    setFeedback(null);
    fetch(`${API_URL}/quiz/question`)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  };

  // Load the first question when the app starts.
  useEffect(() => {
    loadQuestion();
  }, []);

  // Send the player's choice to the backend and show if it was right.
  const handleAnswer = (selectedHindi) => {
    fetch(`${API_URL}/quiz/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        english_word: question.english_word,
        selected_hindi: selectedHindi,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setTotal((prevTotal) => prevTotal + 1);
        if (result.correct) {
          setScore((prevScore) => prevScore + 1);
          setFeedback("Correct!");
        } else {
          setFeedback(`Wrong. The correct answer was ${result.correct_hindi}`);
        }
      });
  };

  return (
    <div className="app">
      <h1>English → Hindi Quiz</h1>
      <ScoreBoard score={score} total={total} />
      {question && (
        <QuizCard question={question} onAnswer={handleAnswer} feedback={feedback} />
      )}
      {feedback && (
        <button className="next-button" onClick={loadQuestion}>
          Next word
        </button>
      )}
    </div>
  );
}

export default App;
