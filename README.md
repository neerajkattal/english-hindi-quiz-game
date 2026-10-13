# Shabd: English to Hindi Quiz Game

A small full-stack game for practicing English-to-Hindi vocabulary, aimed at
absolute beginners. *Shabd* (शब्द) means "word"; the design borrows from where
the language is spoken (indigo, saffron and madder red, arched doorways, a
marigold toran) while keeping the screens calm and readable.

- **Backend:** FastAPI (Python) — serves quiz questions and checks answers
- **Frontend:** React (JavaScript) — shows the English word and multiple-choice Hindi answers

## Contents

- [Project structure](#project-structure)
- [Running the project](#running-the-project)
- [How the game works](#how-the-game-works)
- [Topics and high scores](#topics-and-high-scores)
- [Answer streaks](#answer-streaks)
- [Review Mistakes](#review-mistakes)
- [Black & White mode](#black--white-mode)
- [Hindi pronunciation](#hindi-pronunciation)
- [Word of the day](#word-of-the-day)
- [Sound and animation](#sound-and-animation)
- [Results screen extras](#results-screen-extras)
- [Other small touches](#other-small-touches)

## Project structure

```
english-hindi-quiz-game/
├── backend/     FastAPI app (word list, quiz logic, API endpoints)
└── frontend/    React app (quiz UI)
```

## Running the project

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm start
```

The app will open at http://localhost:3000

## How the game works

1. The player picks a topic to practice (one of 11, such as Market, Food &
   Kitchen or Festivals; All Words; or Review Mistakes if any words have
   been missed before).
2. The player picks how many questions they want in the session (5, 10, 15, or 20).
3. The frontend asks the backend for a random question from that topic,
   skipping words already asked this round.
4. The backend picks an English word and 4 possible Hindi translations (1 correct, 3 wrong).
5. The player picks an answer (by clicking, or by pressing 1-4 on the
   keyboard); the frontend sends it to the backend to check.
6. The right answer is revealed with its romanised pronunciation (e.g.
   थैला, *thaila*). A progress bar, the running score, and the answer streak
   all update; Enter (or "Next word") loads the next question.
7. After the last question, a results screen shows the final score and every
   question with the player's answer marked correct or wrong.

## Topics and high scores

There are 348 words in 11 topics, at least 30 per topic (`backend/data.py`), each topic with a Hindi
name shown on its card (बाज़ार Market, रसोई Food & Kitchen, त्योहार
Festivals, and so on); `GET /topics` returns them with word counts. Words are
grouped into topics on the backend, and the player can focus on
just one (or mix them all together with "All Words"). Each quiz result is
saved in the browser's `localStorage`, so the topic-selection screen shows
the player's best score per topic across visits — no backend or account
needed for that, it's purely a frontend feature.

## Answer streaks

The score board also tracks a live answer streak (consecutive correct
answers) and the best streak of the session, with a 🔥 shown once the streak
reaches 3, and a short celebratory sound at 3, 5, 10 and more in a row.
The streak resets to zero on a wrong answer and starts over at
zero each time a new quiz begins.

## Review Mistakes

Every time the player answers a word wrong, it's saved in `localStorage`
along with the answer they picked. The home screen shows a separate "Your
mistakes" card (apart from the topics) with how many are saved, and the
results screen links to it too. It opens a study list rather than another
quiz: each missed word with the correct Hindi, its pronunciation (with a
speaker button), its topic, and what the player picked instead. A word drops
off the list as soon as it's answered correctly in any round, and a "Clear
list" link resets it. Saved words that are no longer in the word list (after
an update) are dropped automatically, using `GET /words`.

## Black & White mode

A "B&W" button in the header switches the whole UI between the default
colour theme and a plain black-and-white version of it.

## Hindi pronunciation

Every Hindi choice has a speaker button that reads the word out loud using
the browser's built-in text-to-speech (the Web Speech API, `hi-IN` voice).
This is especially useful for beginners who can't read Devanagari yet — they
can hear how a word sounds before or after picking it. There's also a speaker
button in the answer feedback and on the results screen, so the correct
pronunciation is always just a click away. Pronunciation quality depends on
the voices installed in your browser/OS, so it won't always be perfect, but
it still helps connect the script to the sound.

## Word of the day

The home screen features one word each day (`GET /word-of-the-day`), the
same for everyone, with its pronunciation, so there's something new to learn
even before starting a round.

## Sound and animation

Correct and wrong answers, streak milestones and finishing a round each have
a short sound, synthesised with the Web Audio API (no audio files to
download). The speaker button in the header mutes them, and the choice is
remembered. Answer tiles pop when right and shake when wrong, and a good round
ends with falling marigold petals. All motion is turned off for people who
prefer reduced motion.

## Results screen extras

The results screen shows the score as a ring, a short verdict in Hindi, the
best streak, every word with its romanisation, and a shortcut to review the
missed words. It also shows how long the session took, and has a "Copy
Results" button that copies a one-line summary (score and time) to the
clipboard, so it's easy to paste into a chat or notes app to brag about a
score or track progress over time.

## Other small touches

A loading message and a retry-on-failure message cover the moment while a
question is being fetched (or if the backend can't be reached), and a short
footer credits the tech stack used to build the game.
