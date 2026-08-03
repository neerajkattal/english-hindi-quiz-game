# Frontend (React)

Basic React app that plays the English to Hindi quiz.

## Files

- `src/App.js` — main component: manages the setup/playing/results flow, loads
  questions, tracks score and answer history, handles the Black & White toggle
- `src/components/SetupScreen.js` — lets the player choose how many questions
  to play
- `src/components/QuizCard.js` — shows the English word and 4 Hindi choices
- `src/components/ScoreBoard.js` — shows the current score
- `src/components/ResultsScreen.js` — shows the final score and a
  correct/wrong breakdown of every question
- `src/App.css` — styling, including the Black & White theme overrides

## Setup

```bash
npm install
npm start
```

Opens at http://localhost:3000. Make sure the backend is running at
http://localhost:8000 first (see `../backend/README.md`).
