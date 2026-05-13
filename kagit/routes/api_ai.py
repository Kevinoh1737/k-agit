import base64
import json
import os

from flask import Blueprint, Response, current_app, jsonify, request

from ..services.chatbot import chat as chatbot_chat
from ..services.chatbot import detect_gender as chatbot_detect_gender
from ..services.stt import evaluate_pronunciation
from ..services.tts import generate_korean_tts

api_ai_bp = Blueprint("api_ai", __name__)


_TRANSLATE_LANG_NAMES = {
    'english': 'English', 'japanese': 'Japanese', 'chinese': 'Mandarin Chinese',
    'spanish': 'Spanish', 'portuguese': 'Brazilian Portuguese', 'french': 'French',
    'vietnamese': 'Vietnamese', 'indonesian': 'Indonesian', 'arabic': 'Arabic',
    'thai': 'Thai',
}

_UI_LANG_NAMES = {
    'en': 'English', 'ko': 'Korean', 'ja': 'Japanese', 'zh': 'Chinese',
    'es': 'Spanish', 'pt': 'Portuguese', 'fr': 'French',
    'vi': 'Vietnamese', 'id': 'Indonesian', 'ar': 'Arabic',
}

_translate_cache: dict = {}
_grammar_cache: dict = {}


@api_ai_bp.route('/api/translate', methods=['POST'])
def translate():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400

    text = data.get('text', '').strip()
    target = data.get('target_lang', '').strip()

    if not text or not target:
        return jsonify({'error': 'Missing fields.'}), 400

    lang_name = _TRANSLATE_LANG_NAMES.get(target)
    if not lang_name:
        return jsonify({'error': 'Unsupported language.'}), 400

    cache_key = f"{text}|{target}"
    if cache_key in _translate_cache:
        return jsonify({'translation': _translate_cache[cache_key]})

    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return jsonify({'translation': ''})

    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Translate this Korean sentence to {lang_name}. Return ONLY the translation, nothing else.\n\n{text}",
        )
        translation = response.text.strip()
        _translate_cache[cache_key] = translation
        return jsonify({'translation': translation})
    except Exception as e:
        current_app.logger.exception("translate failed")
        return jsonify({'translation': '', 'error': str(e)}), 200


@api_ai_bp.route('/api/detect-gender', methods=['POST'])
def detect_gender_endpoint():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400
    nickname = data.get('nickname', '').strip()
    if not nickname:
        return jsonify({'gender': 'neutral'})
    return jsonify({'gender': chatbot_detect_gender(nickname)})


@api_ai_bp.route('/api/chat', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400

    message = data.get('message', '').strip()
    if not message:
        return jsonify({'error': 'Please enter a message.'}), 400

    if len(message) > 500:
        return jsonify({'error': 'Message too long.'}), 400

    result = chatbot_chat(
        message,
        data.get('lang', 'en'),
        data.get('history', []),
        star_id=data.get('star_id'),
        custom_name=data.get('custom_name'),
        nickname=data.get('nickname'),
        gender=data.get('gender'),
    )
    return jsonify(result)


@api_ai_bp.route('/api/tts', methods=['POST'])
def tts():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.', 'error_key': 'err_no_data'}), 400

    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'Please enter text.', 'error_key': 'err_enter_text'}), 400

    if len(text) > 500:
        return jsonify({'error': 'Text must be under 500 characters.', 'error_key': 'err_text_500'}), 400

    audio_data, mimetype, error = generate_korean_tts(
        text, data.get('emotion'), gender=data.get('gender')
    )
    if error:
        return jsonify({'error': error, 'error_key': 'err_tts_failed'}), 500

    return Response(audio_data, mimetype=mimetype)


@api_ai_bp.route('/api/stt', methods=['POST'])
def stt():
    if 'audio' not in request.files:
        return jsonify({'success': False, 'error': 'No audio file provided.', 'error_key': 'err_no_data'}), 400

    audio_file = request.files['audio']
    original_text = request.form.get('original_text', '').strip()
    if not original_text:
        return jsonify({'success': False, 'error': 'No original text provided.', 'error_key': 'err_enter_text'}), 400

    audio_bytes = audio_file.read()
    if not audio_bytes:
        return jsonify({'success': False, 'error': 'Empty audio file.', 'error_key': 'err_no_data'}), 400

    mime_type = audio_file.content_type or 'audio/webm'
    result = evaluate_pronunciation(audio_bytes, mime_type, original_text)
    status_code = 200 if result.get('success') else 500
    return jsonify(result), status_code


@api_ai_bp.route('/api/hangul/meaning', methods=['POST'])
def hangul_meaning():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400

    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided.'}), 400
    if len(text) > 20:
        return jsonify({'error': 'Text too long.'}), 400

    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return jsonify({'has_meaning': False, 'meaning': ''})

    target_lang = _UI_LANG_NAMES.get(data.get('lang', 'en'), 'English')

    try:
        from google import genai
        client_local = genai.Client(api_key=api_key)
        prompt = (
            f'Is "{text}" a real Korean word or meaningful syllable? '
            f'If yes, respond with JSON: {{"has_meaning": true, "meaning": "<meaning in {target_lang}>", "word_kr": "{text}"}}. '
            f'If no, respond with JSON: {{"has_meaning": false, "meaning": ""}}. '
            f'Return ONLY valid JSON, nothing else.'
        )
        response = client_local.models.generate_content(model="gemini-2.0-flash", contents=prompt)
        result_text = response.text.strip()
        if result_text.startswith("```"):
            result_text = result_text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
        return jsonify(json.loads(result_text))
    except Exception as e:
        current_app.logger.exception("hangul meaning failed")
        return jsonify({'has_meaning': False, 'meaning': '', 'error': str(e)})


@api_ai_bp.route('/api/talkbot', methods=['POST'])
def talkbot():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided.'}), 400

    audio_file = request.files['audio']
    star_id = request.form.get('star_id', '').strip() or None
    custom_name = request.form.get('custom_name', '').strip() or None
    ui_lang = request.form.get('lang', 'en').strip()
    nickname = request.form.get('nickname', '').strip() or None
    gender = request.form.get('gender', '').strip() or None
    history_json = request.form.get('history', '[]')

    try:
        history = json.loads(history_json)
    except Exception:
        history = []

    audio_bytes = audio_file.read()
    if not audio_bytes:
        return jsonify({'error': 'Empty audio file.'}), 400

    mime_type = audio_file.content_type or 'audio/webm'
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return jsonify({'error': 'API key not configured.'}), 500

    stt_prompt = (
        "You are a Korean speech recognition assistant. "
        "Transcribe the following audio in Korean. "
        'Return ONLY a JSON object: {"text": "<Korean transcription>"}'
    )

    try:
        from google import genai
        from google.genai import types

        stt_client = genai.Client(api_key=api_key)
        audio_part = types.Part.from_bytes(data=audio_bytes, mime_type=mime_type)
        stt_response = stt_client.models.generate_content(
            model="gemini-2.0-flash", contents=[audio_part, stt_prompt]
        )
        stt_text = stt_response.candidates[0].content.parts[0].text.strip()
        if stt_text.startswith("```"):
            stt_text = stt_text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
        recognized_text = json.loads(stt_text).get("text", "")

        if not recognized_text:
            return jsonify({'error': 'Could not recognize speech.'}), 400

        chat_result = chatbot_chat(
            recognized_text, ui_lang, history,
            star_id=star_id, custom_name=custom_name,
            nickname=nickname, gender=gender,
        )
        reply_text = chat_result.get('reply', '')

        reply_audio_b64 = ''
        if reply_text:
            audio_data, _, tts_error = generate_korean_tts(reply_text, gender=gender)
            if audio_data and not tts_error:
                reply_audio_b64 = base64.b64encode(audio_data).decode('utf-8')

        return jsonify({
            'recognized_text': recognized_text,
            'reply_text': reply_text,
            'reply_audio': reply_audio_b64,
            'korean_tip': chat_result.get('korean_tip'),
            'korean_tip_romanized': chat_result.get('korean_tip_romanized'),
            'korean_tip_meaning': chat_result.get('korean_tip_meaning'),
            'correction': chat_result.get('correction'),
            'explanation': chat_result.get('explanation'),
        })
    except json.JSONDecodeError:
        return jsonify({'error': 'Failed to parse AI response.'}), 500
    except Exception as e:
        current_app.logger.exception("talkbot failed")
        return jsonify({'error': str(e)}), 500


@api_ai_bp.route('/api/grammar', methods=['POST'])
def grammar():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400

    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided.'}), 400
    if len(text) > 200:
        return jsonify({'error': 'Text too long.'}), 400

    ui_lang = data.get('lang', 'en')
    target_lang = _UI_LANG_NAMES.get(ui_lang, 'English')

    cache_key = f"{text}|{ui_lang}"
    if cache_key in _grammar_cache:
        return jsonify(_grammar_cache[cache_key])

    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return jsonify({'error': 'API key not configured.'}), 500

    prompt = f"""You are a Korean language teacher explaining to a {target_lang}-speaking student.
Analyze this Korean sentence and explain it in {target_lang}.

Sentence: "{text}"

CRITICAL: All explanations, meanings, roles, comparisons, and notes MUST be written in {target_lang}.
When comparing Korean grammar to the student's language ({target_lang}), highlight concepts that do NOT exist in {target_lang}.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{{
  "sentence": "{text}",
  "words": [
    {{
      "word": "<Korean word as it appears>",
      "root": "<dictionary form>",
      "root_meaning": "<meaning in {target_lang}>",
      "role": "<grammatical role in {target_lang}>",
      "explanation": "<how this word works here, explained in {target_lang}>"
    }}
  ],
  "grammar_patterns": [
    {{
      "pattern": "<Korean grammar pattern>",
      "meaning": "<what it means in {target_lang}>",
      "user_lang_comparison": "<how this concept maps to {target_lang} grammar>",
      "examples": ["<example 1>", "<example 2>"]
    }}
  ],
  "pronunciation_tips": [
    {{"text": "<Korean text → [pronunciation]>", "rule": "<rule name>", "explanation": "<why, in {target_lang}>"}}
  ],
  "cultural_note": "<brief cultural context, in {target_lang}>"
}}"""

    try:
        from google import genai
        client_local = genai.Client(api_key=api_key)
        response = client_local.models.generate_content(model="gemini-2.0-flash", contents=prompt)
        result_text = response.text.strip()
        if result_text.startswith("```"):
            result_text = result_text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
        result = json.loads(result_text)
        _grammar_cache[cache_key] = result
        return jsonify(result)
    except Exception as e:
        current_app.logger.exception("grammar failed")
        return jsonify({'error': str(e)}), 500
