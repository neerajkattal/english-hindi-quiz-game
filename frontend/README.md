# Frontend (React)

Basic React app that plays the English to Hindi quiz.

## Files

- `src/App.js` — main component: manages the category/setup/playing/results
  flow, loads questions (by category or by a saved mistake list), tracks
  score, answer history, and the answer streak, handles the Black & White
  toggle
- `src/components/CategoryScreen.js` — lets the player pick a topic or
  Review Mistakes, and shows their best score per topic
- `src/components/SetupScreen.js` — lets the player choose how many questions
  to play
- `src/components/QuizCard.js` — shows the category, the English word, and
  the 4 Hindi choices (with keyboard shortcuts 1-4)
- `src/components/ScoreBoard.js` — shows question progress, current score,
  and the current/best answer streak
- `src/components/ResultsScreen.js` — shows the final score and a
  correct/wrong breakdown of every question
- `src/utils/speech.js` — Hindi text-to-speech helper (Web Speech API)
- `src/utils/highScores.js` — reads/writes best scores per topic in `localStorage`
- `src/utils/mistakes.js` — reads/writes the Review Mistakes word list in `localStorage`
- `src/App.css` — styling, including the Black & White theme overrides

## Setup

```bash
npm install
npm start
```

Opens at http://localhost:3000. Make sure the backend is running at
http://localhost:8000 first (see `../backend/README.md`).
