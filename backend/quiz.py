"""
Quiz logic: picking a random question and checking a submitted answer.

Kept separate from main.py so the game rules are easy to find and
easy to change without touching the route definitions.
"""

import random

from data import WORD_PAIRS
from models import AnswerRequest, AnswerResponse, Question


def get_categories():
    """Return the list of unique categories, in the order words are listed."""
    categories = []
    for pair in WORD_PAIRS:
        if pair["category"] not in categories:
            categories.append(pair["category"])
    return categories


def build_question(category: str = None) -> Question:
    """Pick a random English word (optionally limited to one category) and
    build 4 Hindi answer choices."""
    pool = WORD_PAIRS
    if category:
        pool = [pair for pair in WORD_PAIRS if pair["category"] == category]

    chosen = random.choice(pool)

    # Grab 3 wrong Hindi words from the rest of the pool.
    other_hindi_words = [
        pair["hindi"] for pair in pool if pair["english"] != chosen["english"]
    ]
    wrong_choices = random.sample(other_hindi_words, 3)

    choices = wrong_choices + [chosen["hindi"]]
    random.shuffle(choices)

    return Question(
        english_word=chosen["english"],
        choices=choices,
        category=chosen["category"],
    )


def check_answer(answer: AnswerRequest) -> AnswerResponse:
    """Look up the correct Hindi word and compare it to the player's choice."""
    correct_hindi = next(
        pair["hindi"] for pair in WORD_PAIRS if pair["english"] == answer.english_word
    )
    is_correct = answer.selected_hindi == correct_hindi

    return AnswerResponse(correct=is_correct, correct_hindi=correct_hindi)
