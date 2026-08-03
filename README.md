# English to Hindi Quiz Game

A small full-stack game for practicing English-to-Hindi vocabulary.

- **Backend:** FastAPI (Python) — serves quiz questions and checks answers
- **Frontend:** React (JavaScript) — shows the English word and multiple-choice Hindi answers

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

1. The player picks how many questions they want in the session (5, 10, 15, or 20).
2. The frontend asks the backend for a random question.
3. The backend picks an English word and 4 possible Hindi translations (1 correct, 3 wrong).
4. The player picks an answer; the frontend sends it to the backend to check.
5. The score updates and the next question loads.
6. After the last question, a results screen shows the final score and every
   question with the player's answer marked correct or wrong.

## Black & White mode

A toggle button at the top of the page switches the whole UI between the
default color theme and a plain black-and-white theme.
