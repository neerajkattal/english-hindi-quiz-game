import React, { useEffect, useState } from "react";

import { fetchTopics, fetchWordOfTheDay } from "../api";
import { getBestScore } from "../utils/highScores";
import { getMistakes, clearMistakes } from "../utils/mistakes";
import { speakHindi } from "../utils/speech";
import { SpeakerIcon } from "./Icons";
import Rangoli from "./Rangoli";

// Arch colours cycle through the palette so neighbouring topics differ.
const ARCH_COLOURS = ["madder", "peacock", "turmeric", "indigo", "plum"];

// Home screen: a short intro, today's word, and the topic picker. Picking
// "All words" mixes every topic; "Review mistakes" replays missed words.
// Each topic shows the player's best score, if any.
function CategoryScreen({ onSelect, onSelectMistakes }) {
  const [topics, setTopics] = useState(null);
  const [wordOfDay, setWordOfDay] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(getMistakes().length);

  const load = () => {
    setLoadError(false);
    fetchTopics()
      .then(setTopics)
      .catch(() => setLoadError(true));
    fetchWordOfTheDay()
      .then(setWordOfDay)
      .catch(() => {});
  };

  useEffect(load, []);

  const bestScore = (category) => {
    const best = getBestScore(category);
    return best ? `Best ${best.score}/${best.total}` : "Not tried yet";
  };

  const handleClearMistakes = () => {
    if (window.confirm("Clear your saved mistake list?")) {
      clearMistakes();
      setMistakeCount(0);
    }
  };

  const totalWords = topics ? topics.reduce((sum, t) => sum + t.word_count, 0) : 0;

  return (
    <div className="category-screen screen-enter">
      <section className="hero">
        <div className="hero-text">
          <p className="kicker">English → Hindi, one word at a time</p>
          <h1>
            Learn Hindi the way it’s <em>spoken at home.</em>
          </h1>
          <p className="intro">
            Short rounds of everyday words, from the bazaar to the kitchen. Hear each word, see how it’s said,
            and come back to the ones you miss.
          </p>
        </div>
        <Rangoli />
      </section>

      {wordOfDay && (
        <section className="word-of-day" aria-label="Word of the day">
          <p className="label">Word of the day</p>
          <div className="wod-body">
            <span className="wod-hindi" lang="hi">
              {wordOfDay.hindi}
            </span>
            <button
              className="speak-button"
              onClick={() => speakHindi(wordOfDay.hindi)}
              aria-label={`Hear how ${wordOfDay.hindi} is pronounced`}
            >
              <SpeakerIcon />
            </button>
          </div>
          <p className="wod-roman">{wordOfDay.roman}</p>
          <p className="wod-english">
            “{wordOfDay.english}” · {wordOfDay.category}
          </p>
        </section>
      )}

      <section className="topics">
        <h2 className="section-title">Pick a topic</h2>
        {loadError && (
          <div className="load-error">
            <p>Couldn’t reach the quiz server.</p>
            <button className="primary-button" onClick={load}>
              Retry
            </button>
          </div>
        )}
        {!topics && !loadError && <p className="loading-text">Loading topics…</p>}
        {topics && (
          <div className="topic-grid">
            <button className="arch arch-all" onClick={() => onSelect(null)}>
              <span className="arch-hindi" lang="hi">
                सब शब्द
              </span>
              <span className="arch-english">All words</span>
              <span className="arch-meta">
                {totalWords} words · {bestScore(null)}
              </span>
            </button>
            {mistakeCount > 0 && (
              <button className="arch arch-review" onClick={onSelectMistakes}>
                <span className="arch-hindi" lang="hi">
                  दोहराना
                </span>
                <span className="arch-english">Review mistakes</span>
                <span className="arch-meta">
                  {mistakeCount} word{mistakeCount === 1 ? "" : "s"} to practise
                </span>
              </button>
            )}
            {topics.map((topic, index) => (
              <button
                key={topic.name}
                className={`arch arch-${ARCH_COLOURS[index % ARCH_COLOURS.length]}`}
                onClick={() => onSelect(topic.name)}
              >
                <span className="arch-hindi" lang="hi">
                  {topic.hindi}
                </span>
                <span className="arch-english">{topic.name}</span>
                <span className="arch-meta">
                  {topic.word_count} words · {bestScore(topic.name)}
                </span>
              </button>
            ))}
          </div>
        )}
        {mistakeCount > 0 && (
          <button className="link-button" onClick={handleClearMistakes}>
            Clear mistake list
          </button>
        )}
      </section>
    </div>
  );
}

export default CategoryScreen;
