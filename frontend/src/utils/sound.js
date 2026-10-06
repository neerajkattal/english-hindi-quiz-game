// Small game sounds, synthesised with the Web Audio API so there are no
// audio files to download. The player can mute them; the choice is saved.
const STORAGE_KEY = "hindiQuizSound";
let context = null;

export function isSoundOn() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch (err) {
    return true;
  }
}

export function setSoundOn(on) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch (err) {
    // Storage can be unavailable (e.g. private mode); sound just won't persist.
  }
}

function audioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!context) context = new AudioContext();
  if (context.state === "suspended") context.resume();
  return context;
}

// One soft note: quick fade in, exponential fade out.
function tone(frequency, start, duration, type = "sine", volume = 0.14) {
  const ctx = audioContext();
  if (!ctx) return;
  const at = ctx.currentTime + start;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, at);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(at);
  oscillator.stop(at + duration + 0.05);
}

const SOUNDS = {
  // Rising two-note chime.
  correct: () => {
    tone(659.25, 0, 0.18);
    tone(987.77, 0.09, 0.3);
  },
  // Low, soft falling buzz.
  wrong: () => {
    tone(196, 0, 0.22, "triangle", 0.12);
    tone(164.81, 0.12, 0.32, "triangle", 0.12);
  },
  // Quick arpeggio when a streak milestone is hit.
  streak: () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.07, 0.24, "sine", 0.12)),
  // Short fanfare on the results screen.
  finish: () => {
    [523.25, 659.25, 783.99].forEach((f, i) => tone(f, i * 0.12, 0.35));
    tone(1046.5, 0.36, 0.7);
  },
};

export function playSound(name) {
  if (!isSoundOn() || !SOUNDS[name]) return;
  try {
    SOUNDS[name]();
  } catch (err) {
    // Audio is a nice-to-have; never let it break the game.
  }
}
