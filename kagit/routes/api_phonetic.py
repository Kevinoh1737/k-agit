import json
import os

from flask import Blueprint, current_app, jsonify, request
from flask_login import current_user

from ..data.personas import get_persona_list
from ..data.sentences import (
    get_all_sentences,
    get_categories,
    get_grouped_sentences,
    get_random_sentence,
)
from ..extensions import db
from ..models import ExtraSentenceGroup
from ..services.g2p import korean_g2p
from ..services.phonetic_mapper import (
    LANGUAGE_MAPS,
    convert_to_language,
    get_all_conversions,
)
from ..services.verifier import verify_phonetic

api_phonetic_bp = Blueprint("api_phonetic", __name__)


@api_phonetic_bp.route('/api/convert', methods=['POST'])
def convert():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Please enter text.', 'error_key': 'err_enter_text'}), 400

    text = data['text'].strip()
    if not text:
        return jsonify({'error': 'Please enter text.', 'error_key': 'err_enter_text'}), 400

    if len(text) > 1000:
        return jsonify({'error': 'Text must be under 1000 characters.', 'error_key': 'err_text_too_long'}), 400

    language = data.get('language', 'all')
    phonetic = korean_g2p(text)

    if language == 'all':
        result = get_all_conversions(phonetic)
        return jsonify({'original': text, 'base_phonetic': phonetic, 'conversions': result})

    converted = convert_to_language(phonetic, language)
    lang_data = LANGUAGE_MAPS.get(language, {})
    return jsonify({
        'original': text,
        'base_phonetic': phonetic,
        'language': language,
        'name': lang_data.get('name', language),
        'flag': lang_data.get('flag', ''),
        'phonetic': converted,
    })


@api_phonetic_bp.route('/api/verify', methods=['POST'])
def verify():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.', 'error_key': 'err_no_data'}), 400

    original = data.get('original', '').strip()
    phonetic = data.get('phonetic', '').strip()
    language = data.get('language', '').strip()

    if not original or not phonetic or not language:
        return jsonify({'error': 'Required fields are missing.', 'error_key': 'err_missing_fields'}), 400

    result = verify_phonetic(original, phonetic, language)
    return jsonify(result)


@api_phonetic_bp.route('/api/sentences')
def sentences():
    category = request.args.get('category', None)
    items = get_all_sentences(category)
    categories = get_categories()
    return jsonify({'sentences': items, 'categories': categories})


@api_phonetic_bp.route('/api/sentences/random')
def random_sentence():
    category = request.args.get('category', None)
    item = get_random_sentence(category)
    if not item:
        return jsonify({'error': 'No sentence found.', 'error_key': 'err_no_sentence'}), 404
    return jsonify(item)


@api_phonetic_bp.route('/api/sentences/grouped')
def grouped_sentences():
    return jsonify(get_grouped_sentences())


@api_phonetic_bp.route('/api/personas')
def personas_endpoint():
    return jsonify(get_persona_list())


@api_phonetic_bp.route('/api/sentences/generate', methods=['POST'])
def generate_sentences():
    data = request.get_json() or {}
    source_type = data.get('source_type', 'kpop')
    if source_type not in ('kpop', 'drama', 'trending'):
        source_type = 'kpop'

    raw_seen = data.get('seen_ids', [])
    seen_ids = []
    if isinstance(raw_seen, list):
        for sid in raw_seen[:100]:
            try:
                seen_ids.append(int(sid))
            except (ValueError, TypeError):
                pass

    query = ExtraSentenceGroup.query.filter_by(source_type=source_type, is_approved=True)
    if seen_ids:
        query = query.filter(~ExtraSentenceGroup.id.in_(seen_ids))
    existing = query.order_by(db.func.random()).first()

    if existing:
        return jsonify({
            'id': existing.id,
            'source_type': existing.source_type,
            'source_title': existing.source_title,
            'sentences': existing.sentences,
            'localized_titles': existing.localized_titles,
            'localized_artists': existing.localized_artists,
            'card_image': existing.card_image,
            'reused': True,
        })

    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return jsonify({'error': 'AI generation not available'}), 503

    type_prompts = {
        'kpop': 'a fictional K-Pop song (make up a creative song title and artist name)',
        'drama': 'a fictional Korean drama (make up a creative drama title)',
        'trending': 'trending Korean slang and expressions used by young Koreans (MZ generation)',
    }

    prompt = f"""Generate a set of 5 Korean sentences inspired by {type_prompts[source_type]}.

Return ONLY valid JSON with this exact structure:
{{
  "source_title": "creative title in Korean",
  "source_artist": "artist/drama name in Korean (use empty string for trending)",
  "localized_titles": {{
    "ko": "Korean title", "en": "English title", "ja": "Japanese title",
    "zh": "Chinese title", "es": "Spanish title", "pt": "Portuguese title",
    "fr": "French title", "vi": "Vietnamese title", "id": "Indonesian title",
    "ar": "Arabic title"
  }},
  "localized_artists": {{
    "ko": "Korean artist", "en": "English artist", "ja": "Japanese artist",
    "zh": "Chinese artist", "es": "Spanish artist", "pt": "Portuguese artist",
    "fr": "French artist", "vi": "Vietnamese artist", "id": "Indonesian artist",
    "ar": "Arabic artist"
  }},
  "sentences": [
    {{"text": "Korean sentence", "emotion": "romantic|happy|sad|energetic|dramatic|calm", "category": "love|longing|breakup|daily|friendship"}}
  ]
}}

Make the sentences natural and commonly used in {source_type} context. Each sentence should be 5-15 Korean characters long."""

    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(model='gemini-2.0-flash', contents=prompt)
        result_text = response.text.strip()
        if result_text.startswith("```"):
            result_text = result_text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
        result = json.loads(result_text)

        new_group = ExtraSentenceGroup(
            source_type=source_type,
            source_title=result.get('source_title', 'Unknown'),
            sentences=result.get('sentences', []),
            localized_titles=result.get('localized_titles', {}),
            localized_artists=result.get('localized_artists', {}),
            created_by=current_user.id if current_user.is_authenticated else None,
        )
        db.session.add(new_group)
        db.session.commit()

        return jsonify({
            'id': new_group.id,
            'source_type': new_group.source_type,
            'source_title': new_group.source_title,
            'sentences': new_group.sentences,
            'localized_titles': new_group.localized_titles,
            'localized_artists': new_group.localized_artists,
            'card_image': None,
            'reused': False,
        })
    except Exception as e:
        db.session.rollback()
        current_app.logger.exception("sentence generation failed")
        return jsonify({'error': str(e)}), 500
