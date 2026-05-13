import os
import json
from google import genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = None
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)

LANGUAGE_NAMES = {
    'english': 'English',
    'spanish': 'Spanish',
    'portuguese': 'Brazilian Portuguese',
    'vietnamese': 'Vietnamese',
    'indonesian': 'Indonesian',
    'thai': 'Thai',
    'japanese': 'Japanese',
    'chinese': 'Chinese (Mandarin)',
    'french': 'French',
    'arabic': 'Arabic',
}


def verify_phonetic(original_korean, phonetic_text, language):
    if not client:
        return {
            'success': False,
            'error': 'Gemini API key not configured'
        }

    lang_name = LANGUAGE_NAMES.get(language, language)

    prompt = f"""You are a Korean language pronunciation expert. Your task is to evaluate how accurately a phonetic transcription represents Korean pronunciation for {lang_name} speakers.

**Original Korean text:** {original_korean}
**Phonetic transcription for {lang_name} speakers:** {phonetic_text}

Evaluate:
1. If a native {lang_name} speaker reads the phonetic transcription aloud, how closely would it sound like the original Korean?
2. Back-translate: What Korean text would it sound like if a {lang_name} speaker reads this phonetic text?

Respond in this exact JSON format only, with no other text:
{{
  "back_translation": "<the Korean text a {lang_name} speaker would produce when reading the phonetic>",
  "score": <integer 0-100>,
  "feedback_ko": "<brief feedback in Korean about accuracy, max 2 sentences>",
  "feedback_detail": "<specific issues if any, in Korean, max 2 sentences>"
}}

Scoring guide:
- 90-100: Native speaker would clearly recognize the original Korean
- 70-89: Mostly recognizable with minor differences
- 50-69: Partially recognizable, some syllables off
- 0-49: Difficult to recognize as the original Korean"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "temperature": 0.1,
                "max_output_tokens": 512,
            }
        )

        response_text = response.text.strip()
        if response_text.startswith('```'):
            lines = response_text.split('\n')
            response_text = '\n'.join(lines[1:-1])

        result = json.loads(response_text)

        return {
            'success': True,
            'back_translation': result.get('back_translation', ''),
            'score': min(100, max(0, int(result.get('score', 0)))),
            'feedback_ko': result.get('feedback_ko', ''),
            'feedback_detail': result.get('feedback_detail', ''),
            'language': language,
        }

    except json.JSONDecodeError:
        return {
            'success': False,
            'error': 'Failed to parse verification response'
        }
    except Exception:
        return {
            'success': False,
            'error': '검증 처리 중 오류가 발생했습니다.'
        }
