// Tracks which English words the player has gotten wrong, across sessions,
// so they can come back later and specifically review just those words.
// Stored as a plain array of English words in localStorage.
const STORAGE_KEY = "hindiQuizMistakes";

function readMistakes() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function writeMistakes(mistakes) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
}

// Adds a word to the mistake list if it isn't already there.
export function addMistake(englishWord) {
  const mistakes = readMistakes();
  if (!mistakes.includes(englishWord)) {
    mistakes.push(englishWord);
    writeMistakes(mistakes);
  }
}

// Removes a word from the mistake list once it's been answered correctly.
export function removeMistake(englishWord) {
  writeMistakes(readMistakes().filter((word) => word !== englishWord));
}

// Returns the current list of English words the player has gotten wrong.
export function getMistakes() {
  return readMistakes();
}
