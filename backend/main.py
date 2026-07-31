"""
FastAPI app entry point for the English to Hindi quiz game.

Exposes two quiz endpoints on top of the health-check route:
  - GET  /quiz/question  -> a new random question
  - POST /quiz/answer    -> check a submitted answer
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import AnswerRequest, AnswerResponse, Question
from quiz import build_question, check_answer

app = FastAPI(title="English to Hindi Quiz Game")

# Allow the React dev server (usually http://localhost:3000) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Basic health check so you know the API is running."""
    return {"message": "English to Hindi Quiz Game API is running"}


@app.get("/quiz/question", response_model=Question)
def get_question():
    """Return a new random quiz question with 4 Hindi answer choices."""
    return build_question()


@app.post("/quiz/answer", response_model=AnswerResponse)
def submit_answer(answer: AnswerRequest):
    """Check whether the submitted Hindi word matches the English word."""
    return check_answer(answer)
