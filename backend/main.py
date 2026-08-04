"""
FastAPI app entry point for the English to Hindi quiz game.

Exposes quiz endpoints on top of the health-check route:
  - GET  /categories     -> the list of word categories
  - GET  /quiz/question  -> a new random question, optionally filtered by category
  - POST /quiz/answer    -> check a submitted answer
"""

from typing import List, Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from models import AnswerRequest, AnswerResponse, Question
from quiz import build_question, check_answer, get_categories

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


@app.get("/categories", response_model=List[str])
def list_categories():
    """Return the list of available word categories."""
    return get_categories()


@app.get("/quiz/question", response_model=Question)
def get_question(category: Optional[str] = Query(default=None)):
    """Return a new random quiz question, optionally limited to one category."""
    return build_question(category)


@app.post("/quiz/answer", response_model=AnswerResponse)
def submit_answer(answer: AnswerRequest):
    """Check whether the submitted Hindi word matches the English word."""
    return check_answer(answer)
