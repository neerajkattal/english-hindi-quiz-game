import React, { useEffect, useState } from "react";

import { getBestScore } from "../utils/highScores";

const API_URL = "http://localhost:8000";

// Lets the player choose which topic to practice before picking how many
// questions to answer. Picking "All Words" mixes every category together.
// Each button shows the player's best score for that topic, if any.
function CategoryScreen({ onSelect }) {
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

  return (
    <div className="category-screen">
      <p>Pick a topic to practice</p>
      <div className="category-options">
        <button className="category-button" onClick={() => onSelect(null)}>
          <span>All Words</span>
          {renderBestScore(null)}
        </button>
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
