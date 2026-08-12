import React, { useEffect, useState } from "react";

import { getBestScore } from "../utils/highScores";
import { getMistakes, clearMistakes } from "../utils/mistakes";

const API_URL = "http://localhost:8000";

// Lets the player choose which topic to practice before picking how many
// questions to answer. Picking "All Words" mixes every category together.
// Each button shows the player's best score for that topic, if any.
function CategoryScreen({ onSelect, onSelectMistakes }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const renderBestScore = (category) => {
    const best = getBestScore(category);
    return (
      <span className="best-score">
        {best ? `Best: ${best.score}/${best.total}` : "No attempts yet"}
      </span>
    );
  };

  const [mistakeCount, setMistakeCount] = useState(getMistakes().length);

  const handleClearMistakes = () => {
    if (window.confirm("Clear your saved mistake list?")) {
      clearMistakes();
      setMistakeCount(0);
    }
  };

  return (
    <div className="category-screen">
      <p>Pick a topic to practice</p>
      <div className="category-options">
        <button className="category-button" onClick={() => onSelect(null)}>
          <span>All Words</span>
          {renderBestScore(null)}
        </button>
        {mistakeCount > 0 && (
          <button className="category-button review-button" onClick={onSelectMistakes}>
            <span>Review Mistakes</span>
            <span className="best-score">
              {mistakeCount} word{mistakeCount === 1 ? "" : "s"}
            </span>
          </button>
        )}
        {mistakeCount > 0 && (
          <button className="clear-mistakes-button" onClick={handleClearMistakes}>
            Clear mistake list
          </button>
        )}
        {categories.map((category) => (
          <button
            key={category}
            className="category-button"
            onClick={() => onSelect(category)}
          >
            <span>{category}</span>
            {renderBestScore(category)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
