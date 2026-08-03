import React, { useState } from "react";

import QuizCard from "./components/QuizCard";
import ScoreBoard from "./components/ScoreBoard";
import SetupScreen from "./components/SetupScreen";
import ResultsScreen from "./components/ResultsScreen";

// The FastAPI backend runs on port 8000 by default (see backend/README.md).
const API_URL = "http://localhost:8000";

function App() {
  // "setup" -> choosing how many questions, "playing" -> answering them,
  // "results" -> final score screen
  const [stage, setStage] = useState("setup");
  const [questionCount, setQuestionCount] = useState(10);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [bwMode, setBwMode] = useState(false);

  // Ask the backend for a new question.
  const loadQuestion = () => {
    setFeedback(null);
    fetch(`${API_URL}/quiz/question`)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  };

  // Start a new quiz session with the chosen number of questions.
  const startQuiz = (count) => {
    setQuestionCount(count);
    setScore(0);
    setHistory([]);
    setStage("playing");
    loadQuestion();
  };

  // Send the player's choice to the backend, record the result, and show if it was right.
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
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            english_word: question.english_word,
            selected_hindi: selectedHindi,
            correct_hindi: result.correct_hindi,
            correct: result.correct,
          },
        ]);
        if (result.correct) {
          setScore((prevScore) => prevScore + 1);
          setFeedback("Correct!");
        } else {
          setFeedback(`Wrong. The correct answer was ${result.correct_hindi}`);
        }
      });
  };

  // Move to the next question, or show the results screen if this was the last one.
  const handleNext = () => {
    if (history.length >= questionCount) {
      setStage("results");
    } else {
      loadQuestion();
    }
  };

  return (
    <div className={`app ${bwMode ? "bw" : ""}`}>
      <div className="theme-toggle">
        <button onClick={() => setBwMode((prevBwMode) => !prevBwMode)}>
          {bwMode ? "Color Mode" : "Black & White Mode"}
        </button>
      </div>
      <h1>English → Hindi Quiz</h1>

      {stage === "setup" && <SetupScreen onStart={startQuiz} />}

      {stage === "playing" && (
        <>
          <ScoreBoard score={score} total={history.length} />
          {question && (
            <QuizCard question={question} onAnswer={handleAnswer} feedback={feedback} />
          )}
          {feedback && (
            <button className="next-button" onClick={handleNext}>
              {history.length >= questionCount ? "See Results" : "Next word"}
            </button>
          )}
        </>
      )}

      {stage === "results" && (
        <ResultsScreen history={history} onRestart={() => setStage("setup")} />
      )}
    </div>
  );
}

export default App;
