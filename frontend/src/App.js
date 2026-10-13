import React, { useCallback, useEffect, useState } from "react";

import Header from "./components/Header";
import QuizCard from "./components/QuizCard";
import ScoreBoard from "./components/ScoreBoard";
import SetupScreen from "./components/SetupScreen";
import ResultsScreen from "./components/ResultsScreen";
import CategoryScreen from "./components/CategoryScreen";
import MistakesScreen from "./components/MistakesScreen";
import { fetchQuestion, fetchTopics, submitAnswer } from "./api";
import { saveScore } from "./utils/highScores";
import { addMistake, removeMistake } from "./utils/mistakes";
import { isSoundOn, playSound, setSoundOn } from "./utils/sound";

// Streak lengths that get a little celebration sound instead of the usual chime.
const STREAK_MILESTONES = [3, 5, 10, 15, 20];

function App() {
  // "category" -> choosing a topic, "setup" -> choosing how many questions,
  // "playing" -> answering them, "results" -> final score screen,
  // "mistakes" -> the list of words the player has gotten wrong
  const [stage, setStage] = useState("category");
  const [topics, setTopics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [bwMode, setBwMode] = useState(false);
  const [soundOn, setSoundOnState] = useState(isSoundOn);

  // Topic metadata (Hindi names) for the setup and question screens. The
  // home screen fetches its own copy so it can show its own loading state.
  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(() => {});
  }, []);

  const topicFor = (name) => {
    if (!name) return { name: "All words", hindi: "सब शब्द" };
    return topics.find((t) => t.name === name) || { name };
  };

  // Ask the backend for a new question from the chosen category (or any
  // category), skipping words already asked this round.
  const loadQuestion = useCallback(() => {
    setResult(null);
    setSelected(null);
    setLoadingQuestion(true);
    setLoadError(false);
    const asked = history.map((item) => item.english_word);
    fetchQuestion({ category: selectedCategory, exclude: asked })
      .then((data) => {
        setQuestion(data);
        setLoadingQuestion(false);
      })
      .catch(() => {
        setLoadingQuestion(false);
        setLoadError(true);
      });
  }, [selectedCategory, history]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setStage("setup");
  };

  const startQuiz = (count) => {
    setQuestionCount(count);
    setScore(0);
    setHistory([]);
    setStreak(0);
    setBestStreak(0);
    setQuestion(null);
    setQuizStartTime(Date.now());
    setStage("playing");
  };

  // Load the first question once the round has started (after state settles,
  // so the chosen category is already applied).
  useEffect(() => {
    if (stage === "playing" && !question && !loadingQuestion && !loadError) loadQuestion();
  }, [stage, question, loadingQuestion, loadError, loadQuestion]);

  // Check the player's choice, record it, and play a sound for the result.
  const handleAnswer = useCallback(
    (selectedHindi) => {
      if (selected) return;
      setSelected(selectedHindi);
      submitAnswer(question.english_word, selectedHindi)
        .then((answer) => {
          setResult(answer);
          setHistory((prev) => [
            ...prev,
            {
              english_word: question.english_word,
              selected_hindi: selectedHindi,
              correct_hindi: answer.correct_hindi,
              correct_roman: answer.correct_roman,
              correct: answer.correct,
            },
          ]);
          if (answer.correct) {
            setScore((prev) => prev + 1);
            removeMistake(question.english_word);
            const newStreak = streak + 1;
            setStreak(newStreak);
            setBestStreak((prev) => Math.max(prev, newStreak));
            playSound(STREAK_MILESTONES.includes(newStreak) ? "streak" : "correct");
          } else {
            setStreak(0);
            addMistake(question.english_word, selectedHindi);
            playSound("wrong");
          }
        })
        .catch(() => {
          setSelected(null);
          setLoadError(true);
        });
    },
    [question, selected, streak]
  );

  // Move to the next question, or show the results if this was the last one.
  const handleNext = useCallback(() => {
    if (history.length >= questionCount) {
      saveScore(selectedCategory, score, history.length);
      setElapsedSeconds(Math.round((Date.now() - quizStartTime) / 1000));
      setStage("results");
    } else {
      loadQuestion();
    }
  }, [history.length, questionCount, selectedCategory, score, quizStartTime, loadQuestion]);

  const toggleSound = () => {
    setSoundOn(!soundOn);
    setSoundOnState(!soundOn);
  };

  const goHome = () => {
    setQuestion(null);
    setStage("category");
  };

  return (
    <div className={`app ${bwMode ? "bw" : ""}`}>
      <Header
        soundOn={soundOn}
        onToggleSound={toggleSound}
        bwMode={bwMode}
        onToggleBw={() => setBwMode((prev) => !prev)}
        onHome={goHome}
      />

      <main className="page">
        {stage === "category" && <CategoryScreen onSelect={selectCategory} onShowMistakes={() => setStage("mistakes")} />}

        {stage === "mistakes" && <MistakesScreen onBack={goHome} />}

        {stage === "setup" && (
          <SetupScreen topic={topicFor(selectedCategory)} onStart={startQuiz} onBack={goHome} />
        )}

        {stage === "playing" && (
          <div className="play-screen">
            <ScoreBoard
              history={history}
              answered={!!result}
              questionCount={questionCount}
              score={score}
              streak={streak}
              bestStreak={bestStreak}
            />
            {loadingQuestion && <p className="loading-text">Loading the next word…</p>}
            {loadError && (
              <div className="load-error card">
                <p>Couldn’t reach the quiz server.</p>
                <button className="primary-button" onClick={loadQuestion}>
                  Retry
                </button>
              </div>
            )}
            {!loadingQuestion && !loadError && question && (
              <QuizCard
                question={question}
                topic={topics.find((t) => t.name === question.category)}
                onAnswer={handleAnswer}
                result={result}
                selected={selected}
                onNext={handleNext}
                isLast={history.length >= questionCount}
              />
            )}
            <button className="link-button quit-button" onClick={goHome}>
              Quit round
            </button>
          </div>
        )}

        {stage === "results" && (
          <ResultsScreen
            history={history}
            elapsedSeconds={elapsedSeconds}
            bestStreak={bestStreak}
            onRestart={goHome}
            onReviewMistakes={() => setStage("mistakes")}
          />
        )}
      </main>

      <footer className="footer-credit">Built with FastAPI + React</footer>
    </div>
  );
}

export default App;
