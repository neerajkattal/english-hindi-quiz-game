import React, { useState } from "react";

import QuizCard from "./components/QuizCard";
import ScoreBoard from "./components/ScoreBoard";
import SetupScreen from "./components/SetupScreen";
import ResultsScreen from "./components/ResultsScreen";
import CategoryScreen from "./components/CategoryScreen";
import { saveScore } from "./utils/highScores";
import { addMistake, removeMistake, getMistakes } from "./utils/mistakes";

// The FastAPI backend runs on port 8000 by default (see backend/README.md).
const API_URL = "http://localhost:8000";

function App() {
  // "category" -> choosing a topic, "setup" -> choosing how many questions,
  // "playing" -> answering them, "results" -> final score screen
  const [stage, setStage] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [correctHindi, setCorrectHindi] = useState(null);
  const [bwMode, setBwMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [reviewMistakes, setReviewMistakes] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Ask the backend for a new question, limited to the chosen category or to
  // the saved mistake words, depending on what the player picked.
  const loadQuestion = () => {
    setFeedback(null);
    setCorrectHindi(null);
    setLoadingQuestion(true);
    setLoadError(false);
    let url = `${API_URL}/quiz/question`;
    if (reviewMistakes) {
      url += `?words=${encodeURIComponent(getMistakes().join(","))}`;
    } else if (selectedCategory) {
      url += `?category=${encodeURIComponent(selectedCategory)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setLoadingQuestion(false);
      })
      .catch(() => {
        setLoadingQuestion(false);
        setLoadError(true);
      });
  };

  // Remember the chosen topic and move on to picking a question count.
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setReviewMistakes(false);
    setStage("setup");
  };

  // Practice only the words the player has previously gotten wrong.
  const selectReviewMistakes = () => {
    setSelectedCategory(null);
    setReviewMistakes(true);
    setStage("setup");
  };

  // Start a new quiz session with the chosen number of questions.
  const startQuiz = (count) => {
    setQuestionCount(count);
    setScore(0);
    setHistory([]);
    setStreak(0);
    setBestStreak(0);
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
        setCorrectHindi(result.correct_hindi);
        if (result.correct) {
          setScore((prevScore) => prevScore + 1);
          setFeedback("Correct!");
          removeMistake(question.english_word);
          // Compute the new streak from the previous state (React batches
          // updates, so `streak` here could still be stale) and compare it
          // against the best streak in the same updater.
          setStreak((prevStreak) => {
            const newStreak = prevStreak + 1;
            setBestStreak((prevBest) => Math.max(prevBest, newStreak));
            return newStreak;
          });
        } else {
          setFeedback(`Wrong. The correct answer was ${result.correct_hindi}`);
          setStreak(0);
          addMistake(question.english_word);
        }
      });
  };

  // Move to the next question, or show the results screen if this was the last one.
  const handleNext = () => {
    if (history.length >= questionCount) {
      // Keep review-mistakes scores separate from the "All Words" high score.
      saveScore(reviewMistakes ? "Review Mistakes" : selectedCategory, score, history.length);
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

      {stage === "category" && (
        <CategoryScreen onSelect={selectCategory} onSelectMistakes={selectReviewMistakes} />
      )}

      {stage === "setup" && <SetupScreen onStart={startQuiz} />}

      {stage === "playing" && (
        <>
          <ScoreBoard
            current={Math.min(history.length + 1, questionCount)}
            questionCount={questionCount}
            score={score}
            total={history.length}
            streak={streak}
            bestStreak={bestStreak}
          />
          {loadingQuestion && <p className="loading-text">Loading question...</p>}
          {loadError && (
            <div className="load-error">
              <p>Couldn't reach the quiz server.</p>
              <button className="next-button" onClick={loadQuestion}>
                Retry
              </button>
            </div>
          )}
          {!loadingQuestion && !loadError && question && (
            <QuizCard
              question={question}
              onAnswer={handleAnswer}
              feedback={feedback}
              correctHindi={correctHindi}
            />
          )}
          {feedback && (
            <button className="next-button" onClick={handleNext}>
              {history.length >= questionCount ? "See Results" : "Next word"}
            </button>
          )}
        </>
      )}

      {stage === "results" && (
        <ResultsScreen history={history} onRestart={() => setStage("category")} />
      )}
    </div>
  );
}

export default App;
