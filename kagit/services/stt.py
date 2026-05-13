import json
import os
from google import genai
from google.genai import types

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = None
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)

STT_MODEL = "gemini-2.5-flash"

EVALUATE_PROMPT = """You are a Korean pronunciation evaluation assistant.

I will provide you with:
1. An audio recording of someone speaking Korean
2. The original Korean sentence they were trying to say

Your task:
1. Transcribe what you hear in the audio as accurately as possible (in Korean)
2. Compare the transcription with the original sentence
3. Give a similarity score from 0 to 100 based on pronunciation accuracy

Scoring guide:
- 90-100: Almost perfect, very minor differences
- 70-89: Good, understandable but with some pronunciation errors
- 50-69: Fair, partially correct but noticeable errors
- 30-49: Poor, many errors but some words recognizable
- 0-29: Very poor, mostly unintelligible

Original sentence: {original_text}

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation):
{{"score": <number 0-100>, "recognized_text": "<what you heard in Korean>"}}"""


def evaluate_pronunciation(audio_bytes, mime_type, original_text):
    if not client:
        return {"success": False, "error": "Gemini API key not configured", "error_key": "err_stt_failed"}

    if not audio_bytes:
        return {"success": False, "error": "No audio data", "error_key": "err_no_data"}

    if not original_text or not original_text.strip():
        return {"success": False, "error": "No original text", "error_key": "err_enter_text"}

    try:
        prompt = EVALUATE_PROMPT.format(original_text=original_text.strip())

        audio_part = types.Part.from_bytes(data=audio_bytes, mime_type=mime_type)

        response = client.models.generate_content(
            model=STT_MODEL,
            contents=[audio_part, prompt],
        )

        if not response.candidates or not response.candidates[0].content or not response.candidates[0].content.parts:
            return {"success": False, "error": "No response from Gemini", "error_key": "err_stt_failed"}

        text = response.candidates[0].content.parts[0].text.strip()

        if text.startswith("```"):
            text = text.split("\n", 1)[-1] if "\n" in text else text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()

        result = json.loads(text)

        score = max(0, min(100, int(result.get("score", 0))))
        recognized = result.get("recognized_text", "")

        return {
            "success": True,
            "score": score,
            "recognized_text": recognized,
        }

    except json.JSONDecodeError:
        return {"success": False, "error": "Failed to parse AI response", "error_key": "err_stt_failed"}
    except Exception as e:
        return {"success": False, "error": str(e), "error_key": "err_stt_failed"}
