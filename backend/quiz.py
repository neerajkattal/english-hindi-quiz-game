"""
Quiz logic: picking a random question and checking a submitted answer.

Kept separate from main.py so the game rules are easy to find and
easy to change without touching the route definitions.
"""

import random

from data import WORD_PAIRS
from models import AnswerRequest, AnswerResponse, Question


def build_question() -> Question:
    """Pick a random English word and build 4 Hindi answer choices."""
    english_word, correct_hindi = random.choice(WORD_PAIRS)

    # Grab 3 wrong Hindi words from the rest of the list.
    other_hindi_words = [hindi for word, hindi in WORD_PAIRS if word != english_word]
    wrong_choices = random.sample(other_hindi_words, 3)

    choices = wrong_choices + [correct_hindi]
    random.shuffle(choices)

    return Question(english_word=english_word, choices=choices)


def check_answer(answer: AnswerRequest) -> AnswerResponse:
    """Look up the correct Hindi word and compare it to the player's choice."""
    correct_hindi = next(
        hindi for word, hindi in WORD_PAIRS if word == answer.english_word
    )
    is_correct = answer.selected_hindi == correct_hindi

    return AnswerResponse(correct=is_correct, correct_hindi=correct_hindi)
