"""
The English -> Hindi vocabulary used by the quiz.

TOPICS describes each category (its Hindi name and a romanised spelling for
beginners who can't read Devanagari yet). WORD_PAIRS lists every word: the
English prompt, the Hindi answer, a romanised pronunciation guide, and the
topic it belongs to.

There's no database here on purpose — this is a teaching project, so a plain
Python list keeps things easy to read and easy to extend. Rules to keep when
adding words:
  - every English prompt must be unique (answers are looked up by it), so add
    a short clarifier in brackets when a word is ambiguous;
  - every topic needs at least 4 words, so quiz.py can always pick 3 wrong
    choices from the same topic.
"""

TOPICS = [
    {"name": "Everyday Words", "hindi": "बोलचाल", "roman": "bolchaal"},
    {"name": "Family & People", "hindi": "परिवार", "roman": "parivaar"},
    {"name": "Food & Kitchen", "hindi": "रसोई", "roman": "rasoi"},
    {"name": "Market", "hindi": "बाज़ार", "roman": "bazaar"},
    {"name": "Festivals", "hindi": "त्योहार", "roman": "tyohaar"},
    {"name": "Home", "hindi": "घर", "roman": "ghar"},
    {"name": "Nature", "hindi": "प्रकृति", "roman": "prakriti"},
    {"name": "Animals", "hindi": "जानवर", "roman": "jaanvar"},
    {"name": "Body", "hindi": "शरीर", "roman": "shareer"},
    {"name": "Colours", "hindi": "रंग", "roman": "rang"},
    {"name": "Numbers", "hindi": "गिनती", "roman": "ginti"},
]


def _words(category, rows):
    return [{"english": e, "hindi": h, "roman": r, "category": category} for e, h, r in rows]


WORD_PAIRS = (
    _words("Everyday Words", [
        ("hello", "नमस्ते", "namaste"),
        ("thank you", "धन्यवाद", "dhanyavaad"),
        ("yes", "हाँ", "haan"),
        ("no", "नहीं", "nahin"),
        ("please", "कृपया", "kripya"),
        ("sorry", "माफ़ कीजिए", "maaf kijiye"),
        ("good", "अच्छा", "achchha"),
        ("bad", "बुरा", "bura"),
        ("today", "आज", "aaj"),
        ("tomorrow", "कल", "kal"),
        ("now", "अभी", "abhi"),
        ("time", "समय", "samay"),
        ("day", "दिन", "din"),
        ("night", "रात", "raat"),
        ("morning", "सुबह", "subah"),
        ("love", "प्यार", "pyaar"),
    ])
    + _words("Family & People", [
        ("mother", "माँ", "maa"),
        ("father", "पिता", "pita"),
        ("brother", "भाई", "bhai"),
        ("sister", "बहन", "behen"),
        ("son", "बेटा", "beta"),
        ("daughter", "बेटी", "beti"),
        ("grandmother (father's mother)", "दादी", "daadi"),
        ("grandfather (father's father)", "दादा", "daada"),
        ("uncle (father's younger brother)", "चाचा", "chaacha"),
        ("aunt (mother's sister)", "मौसी", "mausi"),
        ("husband", "पति", "pati"),
        ("wife", "पत्नी", "patni"),
        ("child", "बच्चा", "bachcha"),
        ("friend", "दोस्त", "dost"),
        ("teacher", "शिक्षक", "shikshak"),
        ("student", "छात्र", "chhaatr"),
    ])
    + _words("Food & Kitchen", [
        ("food", "खाना", "khaana"),
        ("tea", "चाय", "chai"),
        ("milk", "दूध", "doodh"),
        ("flatbread", "रोटी", "roti"),
        ("rice", "चावल", "chaawal"),
        ("lentils", "दाल", "daal"),
        ("salt", "नमक", "namak"),
        ("sugar", "चीनी", "cheeni"),
        ("vegetable", "सब्ज़ी", "sabzi"),
        ("fruit", "फल", "phal"),
        ("egg", "अंडा", "anda"),
        ("butter", "मक्खन", "makkhan"),
        ("yogurt", "दही", "dahi"),
        ("spoon", "चम्मच", "chammach"),
        ("plate", "थाली", "thaali"),
        ("knife", "चाकू", "chaaku"),
    ])
    + _words("Market", [
        ("market", "बाज़ार", "bazaar"),
        ("shop", "दुकान", "dukaan"),
        ("shopkeeper", "दुकानदार", "dukaandaar"),
        ("customer", "ग्राहक", "graahak"),
        ("money", "पैसा", "paisa"),
        ("rupee", "रुपया", "rupaya"),
        ("price", "दाम", "daam"),
        ("how much?", "कितना?", "kitna?"),
        ("cheap", "सस्ता", "sasta"),
        ("expensive", "महँगा", "mehenga"),
        ("discount", "छूट", "chhoot"),
        ("to buy", "खरीदना", "khareedna"),
        ("to sell", "बेचना", "bechna"),
        ("bag", "थैला", "thaila"),
        ("clothes", "कपड़े", "kapde"),
        ("shoes", "जूते", "joote"),
    ])
    + _words("Festivals", [
        ("festival", "त्योहार", "tyohaar"),
        ("lamp", "दीया", "diya"),
        ("sweets", "मिठाई", "mithaai"),
        ("fireworks", "पटाखे", "pataakhe"),
        ("gift", "उपहार", "upahaar"),
        ("celebration", "जश्न", "jashn"),
        ("worship", "पूजा", "pooja"),
        ("wedding", "शादी", "shaadi"),
        ("garland", "माला", "maala"),
        ("guest", "मेहमान", "mehmaan"),
        ("temple", "मंदिर", "mandir"),
        ("happiness", "ख़ुशी", "khushi"),
        ("holiday", "छुट्टी", "chhutti"),
        ("dance", "नाच", "naach"),
        ("song", "गाना", "gaana"),
        ("music", "संगीत", "sangeet"),
    ])
    + _words("Home", [
        ("house", "घर", "ghar"),
        ("room", "कमरा", "kamra"),
        ("kitchen", "रसोई", "rasoi"),
        ("door", "दरवाज़ा", "darwaaza"),
        ("window", "खिड़की", "khidki"),
        ("roof", "छत", "chhat"),
        ("wall", "दीवार", "deewaar"),
        ("bed", "बिस्तर", "bistar"),
        ("table", "मेज़", "mez"),
        ("chair", "कुर्सी", "kursi"),
        ("key", "चाबी", "chaabi"),
        ("lock", "ताला", "taala"),
        ("mirror", "आईना", "aaina"),
        ("clock", "घड़ी", "ghadi"),
        ("fan", "पंखा", "pankha"),
        ("book", "किताब", "kitaab"),
    ])
    + _words("Nature", [
        ("water", "पानी", "paani"),
        ("fire", "आग", "aag"),
        ("sun", "सूरज", "sooraj"),
        ("moon", "चाँद", "chaand"),
        ("star", "तारा", "taara"),
        ("sky", "आसमान", "aasmaan"),
        ("cloud", "बादल", "baadal"),
        ("rain", "बारिश", "baarish"),
        ("wind", "हवा", "hawa"),
        ("tree", "पेड़", "ped"),
        ("flower", "फूल", "phool"),
        ("river", "नदी", "nadi"),
        ("mountain", "पहाड़", "pahaad"),
        ("sea", "समुद्र", "samudra"),
        ("earth", "धरती", "dharti"),
        ("stone", "पत्थर", "patthar"),
    ])
    + _words("Animals", [
        ("dog", "कुत्ता", "kutta"),
        ("cat", "बिल्ली", "billi"),
        ("cow", "गाय", "gaay"),
        ("horse", "घोड़ा", "ghoda"),
        ("goat", "बकरी", "bakri"),
        ("camel", "ऊँट", "oont"),
        ("elephant", "हाथी", "haathi"),
        ("lion", "शेर", "sher"),
        ("tiger", "बाघ", "baagh"),
        ("monkey", "बंदर", "bandar"),
        ("snake", "साँप", "saanp"),
        ("mouse", "चूहा", "chooha"),
        ("bird", "पक्षी", "pakshi"),
        ("parrot", "तोता", "tota"),
        ("peacock", "मोर", "mor"),
        ("fish", "मछली", "machhli"),
    ])
    + _words("Body", [
        ("head", "सिर", "sir"),
        ("face", "चेहरा", "chehra"),
        ("hair", "बाल", "baal"),
        ("eye", "आँख", "aankh"),
        ("ear", "कान", "kaan"),
        ("nose", "नाक", "naak"),
        ("mouth", "मुँह", "munh"),
        ("tooth", "दाँत", "daant"),
        ("neck", "गर्दन", "gardan"),
        ("hand", "हाथ", "haath"),
        ("finger", "उँगली", "ungli"),
        ("stomach", "पेट", "pet"),
        ("back", "पीठ", "peeth"),
        ("knee", "घुटना", "ghutna"),
        ("foot", "पैर", "pair"),
        ("heart", "दिल", "dil"),
    ])
    + _words("Colours", [
        ("colour", "रंग", "rang"),
        ("red", "लाल", "laal"),
        ("blue", "नीला", "neela"),
        ("green", "हरा", "hara"),
        ("yellow", "पीला", "peela"),
        ("black", "काला", "kaala"),
        ("white", "सफ़ेद", "safed"),
        ("orange", "नारंगी", "naarangi"),
        ("pink", "गुलाबी", "gulaabi"),
        ("brown", "भूरा", "bhoora"),
        ("purple", "बैंगनी", "baingani"),
        ("grey", "स्लेटी", "sleti"),
    ])
    + _words("Numbers", [
        ("one", "एक", "ek"),
        ("two", "दो", "do"),
        ("three", "तीन", "teen"),
        ("four", "चार", "chaar"),
        ("five", "पाँच", "paanch"),
        ("six", "छह", "chhah"),
        ("seven", "सात", "saat"),
        ("eight", "आठ", "aath"),
        ("nine", "नौ", "nau"),
        ("ten", "दस", "das"),
        ("hundred", "सौ", "sau"),
        ("thousand", "हज़ार", "hazaar"),
    ])
)
