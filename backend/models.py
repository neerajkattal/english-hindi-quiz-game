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


class AnswerRequest(BaseModel):
    """What the frontend sends when the player picks an answer."""

    english_word: str
    selected_hindi: str


class AnswerResponse(BaseModel):
    """What the backend sends back after checking the answer."""

    correct: bool
    correct_hindi: str
