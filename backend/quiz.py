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


def build_question(category: str = None, words: list = None) -> Question:
    """Pick a random English word and build 4 Hindi answer choices.

    - If `words` is given, only pick the target word from that list (used by
      the "review mistakes" mode, which can be a very short list).
    - Otherwise, if `category` is given, only pick from that category.
    - Otherwise pick from the full word list.

    Wrong choices always come from the target word's own category (across
    the full word list, not just the filtered pool), so there are always
    enough plausible options even when `words` is short.
    """
    if words:
        pool = [pair for pair in WORD_PAIRS if pair["english"] in words]
    elif category:
        pool = [pair for pair in WORD_PAIRS if pair["category"] == category]
    else:
        pool = WORD_PAIRS

    chosen = random.choice(pool)

    same_category_hindi = [
        pair["hindi"]
        for pair in WORD_PAIRS
        if pair["category"] == chosen["category"] and pair["english"] != chosen["english"]
    ]
    wrong_choices = random.sample(same_category_hindi, 3)

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
