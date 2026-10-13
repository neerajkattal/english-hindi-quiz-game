"""
FastAPI app entry point for the English to Hindi quiz game.

Exposes quiz endpoints on top of the health-check route:
  - GET  /categories     -> the list of word categories
  - GET  /topics         -> categories with Hindi names and word counts
  - GET  /words          -> every word with its Hindi and pronunciation
  - GET  /word-of-the-day -> one featured word, the same for everyone each day
  - GET  /quiz/question  -> a new random question, optionally filtered by
                            category or by a specific list of English words
  - POST /quiz/answer    -> check a submitted answer
"""

from typing import List, Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from models import AnswerRequest, AnswerResponse, Question, Topic, Word
from quiz import build_question, check_answer, get_categories, get_topics, get_words, word_of_the_day

app = FastAPI(title="English to Hindi Quiz Game")

# The API is public and read-only with no auth/cookies, so it's safe to
# allow any origin. Without this, the browser blocks the frontend's fetch()
# calls entirely, since the API and the frontend run on different origins.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


@app.get("/topics", response_model=List[Topic])
def list_topics():
    """Return each category with its Hindi name, romanised name and word count."""
    return get_topics()


@app.get("/words", response_model=List[Word])
def list_words():
    """Return every word with its Hindi, pronunciation and topic."""
    return get_words()


@app.get("/word-of-the-day", response_model=Word)
def get_word_of_the_day():
    """Return today's featured word."""
    return word_of_the_day()


@app.get("/quiz/question", response_model=Question)
def get_question(
    category: Optional[str] = Query(default=None),
    words: Optional[str] = Query(default=None),
    exclude: Optional[str] = Query(default=None),
):
    """Return a new random quiz question.

    Optionally limited to one category, or to a comma-separated list of
    specific English words (used by the "review mistakes" mode). `exclude`
    lists words already asked this round, so they aren't repeated.
    """
    word_list = words.split(",") if words else None
    exclude_list = exclude.split(",") if exclude else None
    return build_question(category, word_list, exclude_list)


@app.post("/quiz/answer", response_model=AnswerResponse)
def submit_answer(answer: AnswerRequest):
    """Check whether the submitted Hindi word matches the English word."""
    return check_answer(answer)
