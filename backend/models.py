"""
Pydantic models describing the shapes of the quiz API's requests and
responses. FastAPI uses these to validate incoming data and to build
the automatic API docs.
"""

from typing import List

from pydantic import BaseModel


class Question(BaseModel):
    """A quiz question: one English word plus 4 possible Hindi answers."""

    english_word: str
    choices: List[str]
    category: str


class AnswerRequest(BaseModel):
    """What the frontend sends when the player picks an answer."""

    english_word: str
    selected_hindi: str


class AnswerResponse(BaseModel):
    """What the backend sends back after checking the answer."""

    correct: bool
    correct_hindi: str
    # Romanised pronunciation of the correct answer, for beginners.
    correct_roman: str


class Topic(BaseModel):
    """A word category, with its Hindi name and how many words it holds."""

    name: str
    hindi: str
    roman: str
    word_count: int


class Word(BaseModel):
    """A single vocabulary entry (used for the word of the day)."""

    english: str
    hindi: str
    roman: str
    category: str
