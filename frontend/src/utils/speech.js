// Uses the browser's built-in Web Speech API to read a Hindi word out loud.
// The pronunciation isn't perfect, but hearing the word next to its
// Devanagari script still helps a beginner connect the sound to the script.
export function speakHindi(text) {
  if (!window.speechSynthesis) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  // Slower than the default (1) so beginners have time to catch the sound.
  utterance.rate = 0.7;

  // Stop whatever word is currently playing before starting the new one.
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
