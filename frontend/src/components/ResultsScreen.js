import React, { useEffect, useState } from "react";

import { speakHindi } from "../utils/speech";
import { playSound } from "../utils/sound";
import { CheckIcon, CrossIcon, SpeakerIcon } from "./Icons";

// Formats a whole number of seconds as "Xm Ys" (or just "Ys" under a minute).
function formatElapsed(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

function verdict(ratio) {
  if (ratio >= 0.9) return { hindi: "शाबाश!", english: "Excellent work." };
  if (ratio >= 0.6) return { hindi: "बहुत अच्छा!", english: "Well done." };
  return { hindi: "अभ्यास", english: "Practice makes it stick. Review the ones you missed." };
}

// Marigold petals that drift down once when the round went well.
function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 7) * 0.12}s`,
            animationDuration: `${2.4 + (i % 5) * 0.35}s`,
            background: i % 3 === 0 ? "#B23A2B" : i % 2 ? "#F29F05" : "#F7C548",
          }}
        />
      ))}
    </div>
  );
}

// Final score, time and best streak, plus every word from the round with its
// pronunciation, so the player can review before playing again.
function ResultsScreen({ history, elapsedSeconds, bestStreak, onRestart, onReviewMistakes }) {
  const correctCount = history.filter((item) => item.correct).length;
  const ratio = history.length ? correctCount / history.length : 0;
  const [copied, setCopied] = useState(false);
  const { hindi, english } = verdict(ratio);
  const circumference = 2 * Math.PI * 52;

  useEffect(() => playSound("finish"), []);

  const handleCopyResults = () => {
    const summary = `Shabd (English → Hindi): ${correctCount}/${history.length} correct in ${formatElapsed(elapsedSeconds)}`;
    // The Clipboard API isn't available in every browser/context, so just
    // skip silently rather than throwing if it's missing.
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="results-screen card screen-enter">
      {ratio >= 0.6 && <Petals />}
      <div className="results-top">
        <svg className="score-ring" viewBox="0 0 120 120" role="img" aria-label={`${correctCount} of ${history.length} correct`}>
          <circle cx="60" cy="60" r="52" className="ring-track" />
          <circle
            cx="60"
            cy="60"
            r="52"
            className="ring-value"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - ratio)}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="58" textAnchor="middle" className="ring-number">
            {correctCount}/{history.length}
          </text>
          <text x="60" y="78" textAnchor="middle" className="ring-label">
            correct
          </text>
        </svg>
        <div>
          <p className="verdict-hindi" lang="hi">
            {hindi}
          </p>
          <p className="verdict-english">{english}</p>
          <p className="muted">
            Time {formatElapsed(elapsedSeconds)} · Best streak {bestStreak}
          </p>
        </div>
      </div>

      <ul className="results-list">
        {history.map((item, index) => (
          <li key={index} className={item.correct ? "result-correct" : "result-wrong"}>
            <span className="result-icon">{item.correct ? <CheckIcon /> : <CrossIcon />}</span>
            <span className="result-word">{item.english_word}</span>
            <span className="result-answer">
              <span lang="hi" className="result-hindi">
                {item.correct_hindi}
              </span>
              <span className="result-roman">{item.correct_roman}</span>
              {!item.correct && (
                <span className="result-yours">
                  you picked <span lang="hi">{item.selected_hindi}</span>
                </span>
              )}
            </span>
            <button
              className="speak-button"
              onClick={() => speakHindi(item.correct_hindi)}
              aria-label={`Hear how ${item.correct_hindi} is pronounced`}
            >
              <SpeakerIcon />
            </button>
          </li>
        ))}
      </ul>

      <div className="results-actions">
        <button className="primary-button" onClick={onRestart}>
          Play again
        </button>
        {correctCount < history.length && (
          <button className="secondary-button" onClick={onReviewMistakes}>
            Review mistakes
          </button>
        )}
        <button className="link-button" onClick={handleCopyResults}>
          {copied ? "Copied!" : "Copy results"}
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;
