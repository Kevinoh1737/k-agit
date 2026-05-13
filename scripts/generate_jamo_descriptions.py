import os
import sys
import json
import time

sys.path.insert(0, os.path.dirname(__file__))

from google import genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

LANGUAGES = {
    'en': 'English',
    'ko': 'Korean',
    'ja': 'Japanese',
    'zh': 'Chinese (Mandarin)',
    'es': 'Spanish',
    'pt': 'Portuguese (Brazilian)',
    'fr': 'French',
    'vi': 'Vietnamese',
    'id': 'Indonesian (Bahasa Indonesia)',
    'ar': 'Arabic',
}

JAMO_LIST = [
    {'char': 'ㄱ', 'name': '기역', 'roman': 'giyeok', 'sound': 'g/k', 'type': 'consonant'},
    {'char': 'ㄴ', 'name': '니은', 'roman': 'nieun', 'sound': 'n', 'type': 'consonant'},
    {'char': 'ㄷ', 'name': '디귿', 'roman': 'digeut', 'sound': 'd/t', 'type': 'consonant'},
    {'char': 'ㄹ', 'name': '리을', 'roman': 'rieul', 'sound': 'r/l', 'type': 'consonant'},
    {'char': 'ㅁ', 'name': '미음', 'roman': 'mieum', 'sound': 'm', 'type': 'consonant'},
    {'char': 'ㅂ', 'name': '비읍', 'roman': 'bieup', 'sound': 'b/p', 'type': 'consonant'},
    {'char': 'ㅅ', 'name': '시옷', 'roman': 'siot', 'sound': 's', 'type': 'consonant'},
    {'char': 'ㅇ', 'name': '이응', 'roman': 'ieung', 'sound': 'ng/silent', 'type': 'consonant'},
    {'char': 'ㅈ', 'name': '지읒', 'roman': 'jieut', 'sound': 'j', 'type': 'consonant'},
    {'char': 'ㅊ', 'name': '치읓', 'roman': 'chieut', 'sound': 'ch', 'type': 'consonant'},
    {'char': 'ㅋ', 'name': '키읔', 'roman': 'kieuk', 'sound': 'k', 'type': 'consonant'},
    {'char': 'ㅌ', 'name': '티읕', 'roman': 'tieut', 'sound': 't', 'type': 'consonant'},
    {'char': 'ㅍ', 'name': '피읖', 'roman': 'pieup', 'sound': 'p', 'type': 'consonant'},
    {'char': 'ㅎ', 'name': '히읗', 'roman': 'hieut', 'sound': 'h', 'type': 'consonant'},
    {'char': 'ㄲ', 'name': '쌍기역', 'roman': 'ssang-giyeok', 'sound': 'kk', 'type': 'double'},
    {'char': 'ㄸ', 'name': '쌍디귿', 'roman': 'ssang-digeut', 'sound': 'tt', 'type': 'double'},
    {'char': 'ㅃ', 'name': '쌍비읍', 'roman': 'ssang-bieup', 'sound': 'pp', 'type': 'double'},
    {'char': 'ㅆ', 'name': '쌍시옷', 'roman': 'ssang-siot', 'sound': 'ss', 'type': 'double'},
    {'char': 'ㅉ', 'name': '쌍지읒', 'roman': 'ssang-jieut', 'sound': 'jj', 'type': 'double'},
    {'char': 'ㅏ', 'name': '아', 'roman': 'a', 'sound': 'ah', 'type': 'vowel'},
    {'char': 'ㅑ', 'name': '야', 'roman': 'ya', 'sound': 'yah', 'type': 'vowel'},
    {'char': 'ㅓ', 'name': '어', 'roman': 'eo', 'sound': 'uh', 'type': 'vowel'},
    {'char': 'ㅕ', 'name': '여', 'roman': 'yeo', 'sound': 'yuh', 'type': 'vowel'},
    {'char': 'ㅗ', 'name': '오', 'roman': 'o', 'sound': 'oh', 'type': 'vowel'},
    {'char': 'ㅛ', 'name': '요', 'roman': 'yo', 'sound': 'yoh', 'type': 'vowel'},
    {'char': 'ㅜ', 'name': '우', 'roman': 'u', 'sound': 'oo', 'type': 'vowel'},
    {'char': 'ㅠ', 'name': '유', 'roman': 'yu', 'sound': 'yoo', 'type': 'vowel'},
    {'char': 'ㅡ', 'name': '으', 'roman': 'eu', 'sound': 'uh (unrounded)', 'type': 'vowel'},
    {'char': 'ㅣ', 'name': '이', 'roman': 'i', 'sound': 'ee', 'type': 'vowel'},
    {'char': 'ㅐ', 'name': '애', 'roman': 'ae', 'sound': 'eh', 'type': 'complex_vowel'},
    {'char': 'ㅒ', 'name': '얘', 'roman': 'yae', 'sound': 'yeh', 'type': 'complex_vowel'},
    {'char': 'ㅔ', 'name': '에', 'roman': 'e', 'sound': 'eh', 'type': 'complex_vowel'},
    {'char': 'ㅖ', 'name': '예', 'roman': 'ye', 'sound': 'yeh', 'type': 'complex_vowel'},
    {'char': 'ㅘ', 'name': '와', 'roman': 'wa', 'sound': 'wah', 'type': 'complex_vowel'},
    {'char': 'ㅙ', 'name': '왜', 'roman': 'wae', 'sound': 'weh', 'type': 'complex_vowel'},
    {'char': 'ㅚ', 'name': '외', 'roman': 'oe', 'sound': 'weh', 'type': 'complex_vowel'},
    {'char': 'ㅝ', 'name': '워', 'roman': 'wo', 'sound': 'wuh', 'type': 'complex_vowel'},
    {'char': 'ㅞ', 'name': '웨', 'roman': 'we', 'sound': 'weh', 'type': 'complex_vowel'},
    {'char': 'ㅟ', 'name': '위', 'roman': 'wi', 'sound': 'wee', 'type': 'complex_vowel'},
    {'char': 'ㅢ', 'name': '의', 'roman': 'ui', 'sound': 'eui', 'type': 'complex_vowel'},
]

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'static', 'jamo_descriptions.js')


def generate_for_language(lang_code, lang_name):
    jamo_info = json.dumps([{
        'char': j['char'], 'name': j['name'], 'roman': j['roman'],
        'sound': j['sound'], 'type': j['type']
    } for j in JAMO_LIST], ensure_ascii=False)

    prompt = f"""You are a Korean language teacher creating descriptions for Korean Hangul characters (jamo) for {lang_name}-speaking learners.

For each jamo below, write a JSON object with these fields:
- "compare": A concise comparison to sounds in {lang_name} (1-2 sentences max). If a similar sound exists, mention the specific word/letter. If not, describe how to produce it. Write in {lang_name}.
- "tip": A very short practical tip for remembering this sound (1 sentence). Write in {lang_name}.

Important rules:
- Write ALL text in {lang_name} (not English, not Korean).
- Be specific: mention actual {lang_name} words/letters that have similar sounds.
- For double consonants (ㄲ,ㄸ,ㅃ,ㅆ,ㅉ), explain they are tensed/stressed versions.
- For complex vowels, explain the combination.
- Keep each description very concise (max 2 short sentences for compare).
- For Korean (ko) language: compare to how a native Korean would explain it to a beginner.

Here are all 40 jamo characters:
{jamo_info}

Respond with ONLY a valid JSON object mapping each jamo character to its description:
{{"ㄱ": {{"compare": "...", "tip": "..."}}, "ㄴ": {{"compare": "...", "tip": "..."}}, ...}}

No markdown, no code blocks, just the raw JSON object."""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    text = response.text.strip()
    if text.startswith('```'):
        text = text.split('\n', 1)[1] if '\n' in text else text[3:]
        if text.endswith('```'):
            text = text[:-3]
        text = text.strip()
    if text.startswith('json'):
        text = text[4:].strip()

    return json.loads(text)


def generate_all():
    if not client:
        print("ERROR: GEMINI_API_KEY not set")
        return

    all_descriptions = {}
    total = len(LANGUAGES)

    for i, (lang_code, lang_name) in enumerate(LANGUAGES.items()):
        print(f"[{i+1}/{total}] Generating descriptions for {lang_name} ({lang_code})...", end=' ', flush=True)

        for attempt in range(3):
            try:
                descriptions = generate_for_language(lang_code, lang_name)
                if len(descriptions) >= 35:
                    all_descriptions[lang_code] = descriptions
                    print(f"OK ({len(descriptions)} jamo)")
                    break
                else:
                    print(f"INCOMPLETE ({len(descriptions)} jamo), retrying...", end=' ', flush=True)
            except Exception as e:
                print(f"ERROR: {e}", end=' ', flush=True)
                if attempt < 2:
                    print("retrying...", end=' ', flush=True)
                    time.sleep(2)

        if lang_code not in all_descriptions:
            print("FAILED after 3 attempts")

        time.sleep(1)

    js_content = "const JAMO_DESCRIPTIONS = " + json.dumps(all_descriptions, ensure_ascii=False, indent=2) + ";\n"

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\nDone: {len(all_descriptions)}/{total} languages generated")
    print(f"Output: {OUTPUT_FILE}")


if __name__ == '__main__':
    generate_all()
