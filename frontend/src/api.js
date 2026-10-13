// The FastAPI backend runs on port 8000 locally (see backend/README.md).
// In production, REACT_APP_API_URL points at the deployed backend.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const getJson = (path) =>
  fetch(`${API_URL}${path}`).then((res) => {
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  });

export const fetchTopics = () => getJson("/topics");
export const fetchWordOfTheDay = () => getJson("/word-of-the-day");
export const fetchWordList = () => getJson("/words");

// A question limited to the given words (review mode) or category, if any,
// skipping words already asked this round (`exclude`).
export function fetchQuestion({ words, category, exclude = [] } = {}) {
  const params = new URLSearchParams();
  if (words) params.set("words", words.join(","));
  else if (category) params.set("category", category);
  if (exclude.length) params.set("exclude", exclude.join(","));
  const query = params.toString();
  return getJson(`/quiz/question${query ? `?${query}` : ""}`);
}

export function submitAnswer(englishWord, selectedHindi) {
  return fetch(`${API_URL}/quiz/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ english_word: englishWord, selected_hindi: selectedHindi }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  });
}
