// Tracks which English words the player has gotten wrong, across sessions,
// so they can look back at them later. Stored in localStorage as a plain
// array of English words, plus a map of what the player picked for each.
const STORAGE_KEY = "hindiQuizMistakes";
const PICKS_KEY = "hindiQuizMistakePicks";

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Storage can be unavailable (e.g. private mode); mistakes just won't persist.
  }
}

// Adds a word to the mistake list (if it isn't there already) and remembers
// the wrong answer the player picked for it.
export function addMistake(englishWord, pickedHindi) {
  const mistakes = read(STORAGE_KEY, []);
  if (!mistakes.includes(englishWord)) {
    mistakes.push(englishWord);
    write(STORAGE_KEY, mistakes);
  }
  if (pickedHindi) {
    write(PICKS_KEY, { ...read(PICKS_KEY, {}), [englishWord]: pickedHindi });
  }
}

// Removes a word from the mistake list once it's been answered correctly.
export function removeMistake(englishWord) {
  write(STORAGE_KEY, read(STORAGE_KEY, []).filter((word) => word !== englishWord));
  const picks = read(PICKS_KEY, {});
  delete picks[englishWord];
  write(PICKS_KEY, picks);
}

// Returns the current list of English words the player has gotten wrong.
export function getMistakes() {
  return read(STORAGE_KEY, []);
}

// Returns { englishWord: hindiThePlayerPicked } for saved mistakes.
export function getMistakePicks() {
  return read(PICKS_KEY, {});
}

// Drops saved words that are no longer in the word list (e.g. words removed
// in an update), so the list only shows real words. Returns the result.
export function pruneMistakes(validWords) {
  const valid = new Set(validWords);
  const kept = getMistakes().filter((word) => valid.has(word));
  write(STORAGE_KEY, kept);
  return kept;
}

// Wipes the whole mistake list, e.g. if the player wants a fresh start.
export function clearMistakes() {
  write(STORAGE_KEY, []);
  write(PICKS_KEY, {});
}
