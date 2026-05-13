import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from tts import generate_korean_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'static', 'audio', 'jamo')

CONSONANTS = [
    ('ㄱ', '가'), ('ㄴ', '나'), ('ㄷ', '다'), ('ㄹ', '라'),
    ('ㅁ', '마'), ('ㅂ', '바'), ('ㅅ', '사'), ('ㅇ', '아'),
    ('ㅈ', '자'), ('ㅊ', '차'), ('ㅋ', '카'), ('ㅌ', '타'),
    ('ㅍ', '파'), ('ㅎ', '하'),
]

DOUBLE_CONSONANTS = [
    ('ㄲ', '까'), ('ㄸ', '따'), ('ㅃ', '빠'), ('ㅆ', '싸'), ('ㅉ', '짜'),
]

BASIC_VOWELS = [
    ('ㅏ', '아'), ('ㅑ', '야'), ('ㅓ', '어'), ('ㅕ', '여'),
    ('ㅗ', '오'), ('ㅛ', '요'), ('ㅜ', '우'), ('ㅠ', '유'),
    ('ㅡ', '으'), ('ㅣ', '이'),
]

COMPLEX_VOWELS = [
    ('ㅐ', '애'), ('ㅒ', '얘'), ('ㅔ', '에'), ('ㅖ', '예'),
    ('ㅘ', '와'), ('ㅙ', '왜'), ('ㅚ', '외'), ('ㅝ', '워'),
    ('ㅞ', '웨'), ('ㅟ', '위'), ('ㅢ', '의'),
]

ALL_JAMO = CONSONANTS + DOUBLE_CONSONANTS + BASIC_VOWELS + COMPLEX_VOWELS

MAX_RETRIES = 3


def generate_all():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total = len(ALL_JAMO)
    success = 0
    failed = []

    for i, (jamo_char, tts_text) in enumerate(ALL_JAMO):
        code = format(ord(jamo_char), 'x')
        filename = f"{code}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)

        if os.path.exists(filepath) and os.path.getsize(filepath) > 100:
            print(f"[{i+1}/{total}] SKIP {jamo_char} ({tts_text}) -> {filename} (already exists)")
            success += 1
            continue

        generated = False
        for attempt in range(1, MAX_RETRIES + 1):
            print(f"[{i+1}/{total}] Generating {jamo_char} ({tts_text}) -> {filename} (attempt {attempt})...", end=' ', flush=True)

            audio_data, mime, error = generate_korean_tts(tts_text)
            if audio_data and not error:
                with open(filepath, 'wb') as f:
                    f.write(audio_data)
                print(f"OK ({len(audio_data)} bytes)")
                success += 1
                generated = True
                break
            else:
                print(f"FAILED: {error}")
                if attempt < MAX_RETRIES:
                    time.sleep(2)

        if not generated:
            failed.append((jamo_char, tts_text, error))

        time.sleep(0.5)

    print(f"\nDone: {success}/{total} succeeded")
    if failed:
        print("Failed:")
        for char, text, err in failed:
            print(f"  {char} ({text}): {err}")


if __name__ == '__main__':
    generate_all()
