import React, { useEffect, useState } from "react";

import { fetchTopics, fetchWordList, fetchWordOfTheDay } from "../api";
import { getBestScore } from "../utils/highScores";
import { getMistakes, pruneMistakes } from "../utils/mistakes";
import { speakHindi } from "../utils/speech";
import { SpeakerIcon } from "./Icons";
import Rangoli from "./Rangoli";

// Arch colours cycle through the palette so neighbouring topics differ.
const ARCH_COLOURS = ["madder", "peacock", "turmeric", "indigo", "plum"];

// Home screen: a short intro, today's word, the player's mistakes (kept apart
// from the topics, since it's a study list rather than a quiz), and the topic
// picker. Picking "All words" mixes every topic. Each topic shows the
// player's best score, if any.
function CategoryScreen({ onSelect, onShowMistakes }) {
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
    fetchWordList()
      .then((words) => setMistakeCount(pruneMistakes(words.map((w) => w.english)).length))
      .catch(() => {});
  };

  useEffect(load, []);

  const bestScore = (category) => {
    const best = getBestScore(category);
    return best ? `Best ${best.score}/${best.total}` : "Not tried yet";
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

      <div className="home-cards">
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

        <section className="mistakes-card" aria-label="Your mistakes">
          <p className="label">Your mistakes</p>
          {mistakeCount > 0 ? (
            <>
              <p className="mistakes-count">
                {mistakeCount} <span>word{mistakeCount === 1 ? "" : "s"} to go over</span>
              </p>
              <button className="secondary-button" onClick={onShowMistakes}>
                See the list
              </button>
            </>
          ) : (
            <p className="muted mistakes-empty">Words you get wrong in a round will be listed here, with the right answer.</p>
          )}
        </section>
      </div>

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
      </section>
    </div>
  );
}

export default CategoryScreen;
