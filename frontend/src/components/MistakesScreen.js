import React, { useEffect, useState } from "react";

import { fetchWordList } from "../api";
import { clearMistakes, getMistakePicks, pruneMistakes } from "../utils/mistakes";
import { speakHindi } from "../utils/speech";
import { SpeakerIcon } from "./Icons";

// A study list of every word the player has gotten wrong: the English word,
// the correct Hindi with its pronunciation, and what they picked instead.
// A word leaves the list as soon as it's answered correctly in any round.
function MistakesScreen({ onBack }) {
  const [words, setWords] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const picks = getMistakePicks();

  const load = () => {
    setLoadError(false);
    fetchWordList()
      .then((list) => {
        setMistakes(pruneMistakes(list.map((w) => w.english)));
        setWords(Object.fromEntries(list.map((w) => [w.english, w])));
      })
      .catch(() => setLoadError(true));
  };

  useEffect(load, []);

  const handleClear = () => {
    if (window.confirm("Clear your saved mistake list?")) {
      clearMistakes();
      setMistakes([]);
    }
  };

  // Most recent mistakes first.
  const rows = words ? [...mistakes].reverse().map((english) => words[english]).filter(Boolean) : [];

  return (
    <div className="mistakes-screen card screen-enter">
      <p className="setup-hindi" lang="hi">
        दोहराना
      </p>
      <h2>Your mistakes</h2>
      {loadError && (
        <div className="load-error">
          <p>Couldn’t reach the quiz server.</p>
          <button className="primary-button" onClick={load}>
            Retry
          </button>
        </div>
      )}
      {!words && !loadError && <p className="loading-text">Loading your list…</p>}
      {words && rows.length === 0 && (
        <p className="muted">No mistakes saved. Words you get wrong in a round will show up here.</p>
      )}
      {rows.length > 0 && (
        <>
          <p className="muted">
            {rows.length} word{rows.length === 1 ? "" : "s"} to go over. Get one right in any round and it leaves this
            list.
          </p>
          <ul className="results-list mistakes-list">
            {rows.map((word) => (
              <li key={word.english}>
                <span className="result-word">{word.english}</span>
                <span className="result-answer">
                  <span lang="hi" className="result-hindi">
                    {word.hindi}
                  </span>
                  <span className="result-roman">{word.roman}</span>
                  {picks[word.english] && (
                    <span className="result-yours">
                      you picked <span lang="hi">{picks[word.english]}</span>
                    </span>
                  )}
                </span>
                <span className="mistake-topic">{word.category}</span>
                <button
                  className="speak-button"
                  onClick={() => speakHindi(word.hindi)}
                  aria-label={`Hear how ${word.hindi} is pronounced`}
                >
                  <SpeakerIcon />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="results-actions">
        <button className="primary-button" onClick={onBack}>
          Back to topics
        </button>
        {rows.length > 0 && (
          <button className="link-button" onClick={handleClear}>
            Clear list
          </button>
        )}
      </div>
    </div>
  );
}

export default MistakesScreen;
