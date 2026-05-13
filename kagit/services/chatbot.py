import os
import json
from google import genai
from ..data.personas import build_persona_prompt, build_custom_persona_prompt, PERSONA_MAP

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = None
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)

LANG_NAMES = {
    'english': 'English', 'japanese': 'Japanese', 'chinese': 'Mandarin Chinese',
    'spanish': 'Spanish', 'portuguese': 'Brazilian Portuguese', 'french': 'French',
    'vietnamese': 'Vietnamese', 'indonesian': 'Indonesian', 'arabic': 'Arabic',
    'thai': 'Thai',
}

UI_TO_PHONETIC = {
    'en': 'english', 'ko': 'english', 'ja': 'japanese', 'zh': 'chinese',
    'es': 'spanish', 'pt': 'portuguese', 'fr': 'french',
    'vi': 'vietnamese', 'id': 'indonesian', 'ar': 'arabic'
}


def get_phonetic_lang(ui_lang):
    return UI_TO_PHONETIC.get(ui_lang, 'english')


def detect_gender(nickname):
    if not client:
        return "neutral"
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f'Given the name "{nickname}", what gender is this person most likely? Consider all languages and cultures. Respond with ONLY one word: male, female, or neutral',
            config={"temperature": 0.0, "max_output_tokens": 10},
        )
        result = response.text.strip().lower()
        if result in ("male", "female", "neutral"):
            return result
        if "female" in result or "woman" in result:
            return "female"
        if "male" in result or "man" in result:
            return "male"
        return "neutral"
    except Exception:
        return "neutral"


def chat(message, ui_lang, history, star_id=None, custom_name=None, nickname=None, gender=None):
    if not client:
        return {"error": "API key not configured"}

    lang_key = get_phonetic_lang(ui_lang)
    lang_name = LANG_NAMES.get(lang_key, 'English')

    if star_id and star_id in PERSONA_MAP:
        system_prompt = build_persona_prompt(star_id, lang_name, nickname=nickname, gender=gender)
    elif custom_name:
        system_prompt = build_custom_persona_prompt(custom_name, lang_name, nickname=nickname, gender=gender)
    else:
        system_prompt = build_custom_persona_prompt("a friendly Korean celebrity", lang_name, nickname=nickname, gender=gender)

    contents = []
    for msg in history[-10:]:
        if not isinstance(msg, dict):
            continue
        role = "user" if msg.get("role") == "user" else "model"
        text = msg.get("text", "")
        if not text or not isinstance(text, str):
            continue
        contents.append({"role": role, "parts": [{"text": text}]})

    # If nickname is provided from profile, use it. Otherwise use the fan-friend nickname.
    display_name = nickname if nickname else "User"
    
        # If nickname is provided from profile, use it. Otherwise use the fan-friend nickname.
    display_name = nickname if nickname else "User"
    
    if not history or len(history) == 0:
        # If no history, this is the first message (intro)
        # We want the persona to take the lead
        message_to_ai = f"Hello! Please start our conversation as your persona. Use icebreaking, keep it short, use my name ({display_name}) to address me, and ask me a simple closed question to get things started."
    else:
        message_to_ai = message

    contents.append({"role": "user", "parts": [{"text": message_to_ai}]})

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=contents,
            config={
                "temperature": 0.8,
                "max_output_tokens": 512,
                "system_instruction": system_prompt,
                "response_mime_type": "application/json",
            }
        )

        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()

        result = json.loads(text)

        return {
            "reply": result.get("reply", ""),
            "korean_tip": result.get("korean_tip"),
            "korean_tip_romanized": result.get("korean_tip_romanized"),
            "korean_tip_meaning": result.get("korean_tip_meaning"),
            "correction": result.get("correction"),
            "explanation": result.get("explanation"),
        }
    except Exception as e:
        return {"error": str(e), "reply": "Sorry, something went wrong. Let's try again!", "correction": None, "explanation": None}
