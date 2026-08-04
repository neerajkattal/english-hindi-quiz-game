import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

// Lets the player choose which topic to practice before picking how many
// questions to answer. Picking "All Words" mixes every category together.
function CategoryScreen({ onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="category-screen">
      <p>Pick a topic to practice</p>
      <div className="category-options">
        <button className="category-button" onClick={() => onSelect(null)}>
          All Words
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="category-button"
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
