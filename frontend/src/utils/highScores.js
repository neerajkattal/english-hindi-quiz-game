// Stores each quiz result in the browser's localStorage so the player can
// see their best score for each topic (or "All Words") across visits.
const STORAGE_KEY = "hindiQuizHighScores";

function categoryKey(category) {
  return category || "All Words";
}

function readScores() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

// Saves a result if it beats the current best for that category.
export function saveScore(category, score, total) {
  const scores = readScores();
  const key = categoryKey(category);
  const existingBest = scores[key];

  if (!existingBest || score > existingBest.score) {
    scores[key] = { score, total };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }
}

// Returns the best { score, total } recorded for a category, or null.
export function getBestScore(category) {
  const scores = readScores();
  return scores[categoryKey(category)] || null;
}
