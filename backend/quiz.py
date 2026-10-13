"""
Quiz logic: picking a random question and checking a submitted answer.

Kept separate from main.py so the game rules are easy to find and
easy to change without touching the route definitions.
"""

import datetime
import random

from fastapi import HTTPException

from data import TOPICS, WORD_PAIRS
from models import AnswerRequest, AnswerResponse, Question, Topic, Word


def get_categories():
    """Return the topic names, in display order."""
    return [topic["name"] for topic in TOPICS]


def get_words():
    """Return every word with its Hindi and pronunciation. The frontend uses
    it to show the player's saved mistakes with their correct answers, and to
    drop saved words that are no longer in the list."""
    return [Word(**pair) for pair in WORD_PAIRS]


def get_topics():
    """Return every topic with its Hindi name and how many words it has."""
    return [
        Topic(
            name=topic["name"],
            hindi=topic["hindi"],
            roman=topic["roman"],
            word_count=sum(1 for pair in WORD_PAIRS if pair["category"] == topic["name"]),
        )
        for topic in TOPICS
    ]


def build_question(category: str = None, words: list = None, exclude: list = None) -> Question:
    """Pick a random English word and build 4 Hindi answer choices.

    - If `words` is given, only pick a word from that list (used by the
      "review mistakes" mode, which can be a very short list).
    - Otherwise, if `category` is given, only pick from that category.
    - Otherwise pick from the full word list.

    Words in `exclude` (already asked this round) are skipped so a round
    doesn't repeat itself, unless that would leave nothing to ask.

    If the filter matches nothing (e.g. a saved mistake word that has since
    been removed from the list), fall back to the full word list rather than
    failing.

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

    if exclude:
        fresh = [pair for pair in pool if pair["english"] not in exclude]
        pool = fresh or pool

    chosen = random.choice(pool or WORD_PAIRS)

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
    pair = next((p for p in WORD_PAIRS if p["english"] == answer.english_word), None)
    if pair is None:
        raise HTTPException(status_code=404, detail="Unknown word")

    return AnswerResponse(
        correct=answer.selected_hindi == pair["hindi"],
        correct_hindi=pair["hindi"],
        correct_roman=pair["roman"],
    )


def word_of_the_day(today: datetime.date = None) -> Word:
    """The same word for everyone on a given day, cycling through the list."""
    today = today or datetime.date.today()
    pair = WORD_PAIRS[today.toordinal() % len(WORD_PAIRS)]
    return Word(**pair)
