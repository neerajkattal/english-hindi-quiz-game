"""
A small hardcoded English -> Hindi vocabulary list used by the quiz.

Each entry is a dict with the English word, its Hindi translation, and a
category so the player can practice one topic at a time. There's no
database here on purpose — this is a basic teaching project, so a plain
Python list keeps things easy to read and easy to extend.
"""

WORD_PAIRS = [
    {"english": "water", "hindi": "पानी", "category": "Nature"},
    {"english": "fire", "hindi": "आग", "category": "Nature"},
    {"english": "sun", "hindi": "सूरज", "category": "Nature"},
    {"english": "moon", "hindi": "चाँद", "category": "Nature"},
    {"english": "tree", "hindi": "पेड़", "category": "Nature"},
    {"english": "flower", "hindi": "फूल", "category": "Nature"},
    {"english": "mother", "hindi": "माँ", "category": "Family & People"},
    {"english": "father", "hindi": "पिता", "category": "Family & People"},
    {"english": "friend", "hindi": "दोस्त", "category": "Family & People"},
    {"english": "teacher", "hindi": "शिक्षक", "category": "Family & People"},
    {"english": "student", "hindi": "छात्र", "category": "Family & People"},
    {"english": "love", "hindi": "प्यार", "category": "Family & People"},
    {"english": "house", "hindi": "घर", "category": "Places & Things"},
    {"english": "school", "hindi": "विद्यालय", "category": "Places & Things"},
    {"english": "city", "hindi": "शहर", "category": "Places & Things"},
    {"english": "book", "hindi": "किताब", "category": "Places & Things"},
    {"english": "food", "hindi": "खाना", "category": "Places & Things"},
    {"english": "music", "hindi": "संगीत", "category": "Places & Things"},
    {"english": "dog", "hindi": "कुत्ता", "category": "Animals"},
    {"english": "cat", "hindi": "बिल्ली", "category": "Animals"},
    {"english": "bird", "hindi": "पक्षी", "category": "Animals"},
    {"english": "fish", "hindi": "मछली", "category": "Animals"},
    {"english": "cow", "hindi": "गाय", "category": "Animals"},
    {"english": "horse", "hindi": "घोड़ा", "category": "Animals"},
]
