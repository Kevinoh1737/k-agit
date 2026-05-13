import os

from flask import Blueprint, current_app, jsonify, render_template, request
from flask_login import current_user

from ..services.phonetic_mapper import LANGUAGE_MAPS

pages_bp = Blueprint("pages", __name__)


_LANDING_META = {
    'en': {'title': 'K-AGIT - Your Secret K-Star Hideout',
           'desc':  'Learn Korean with K-Pop & K-Drama. AI phonetics in 9 languages. Free to start.',
           'og_locale': 'en_US', 'html_lang': 'en'},
    'ja': {'title': 'K-AGIT - あなたのK-Starの秘密アジト',
           'desc':  'K-PopとK-Dramaで韓国語学習。9言語のAI音声変換。無料。',
           'og_locale': 'ja_JP', 'html_lang': 'ja'},
    'es': {'title': 'K-AGIT - Tu Refugio Secreto de K-Stars',
           'desc':  'Aprende coreano con K-Pop y K-Drama. Fonética IA en 9 idiomas. Gratis.',
           'og_locale': 'es_ES', 'html_lang': 'es'},
    'zh': {'title': 'K-AGIT - 你的K-Star秘密基地',
           'desc':  '用K-Pop和K-Drama学韩语。9种语言AI音标转换。免费。',
           'og_locale': 'zh_CN', 'html_lang': 'zh'},
    'id': {'title': 'K-AGIT - Markas Rahasia K-Star Kamu',
           'desc':  'Belajar Korea lewat K-Pop & K-Drama. Fonetik AI 9 bahasa. Gratis.',
           'og_locale': 'id_ID', 'html_lang': 'id'},
    'vi': {'title': 'K-AGIT - Căn Cứ Bí Mật K-Star Của Bạn',
           'desc':  'Học tiếng Hàn qua K-Pop & K-Drama. Phiên âm AI 9 ngôn ngữ. Miễn phí.',
           'og_locale': 'vi_VN', 'html_lang': 'vi'},
    'ar': {'title': 'K-AGIT - مخبأك السري لنجوم K',
           'desc':  'تعلم الكورية مع K-Pop وK-Drama. تحويل صوتي بـ9 لغات. مجاني.',
           'og_locale': 'ar_SA', 'html_lang': 'ar'},
    'fr': {'title': 'K-AGIT - Votre Refuge Secret K-Star',
           'desc':  'Apprenez le coréen avec K-Pop & K-Drama. Phonétique IA en 9 langues. Gratuit.',
           'og_locale': 'fr_FR', 'html_lang': 'fr'},
    'pt': {'title': 'K-AGIT - Seu Esconderijo Secreto K-Star',
           'desc':  'Aprenda coreano com K-Pop & K-Drama. Fonética IA em 9 idiomas. Grátis.',
           'og_locale': 'pt_BR', 'html_lang': 'pt'},
}

_APP_META = {
    'en': {'title': 'K-AGIT - Learn Korean with K-Pop & K-Drama',
           'desc':  'Learn Korean with K-Pop & K-Drama. AI phonetics in 9 languages. Free to start.',
           'og_locale': 'en_US', 'html_lang': 'en'},
    'ja': {'title': 'K-AGIT - K-Popで韓国語を学ぼう',
           'desc':  'K-PopとK-Dramaで韓国語学習。9言語のAI発音変換、ハングル練習。無料。',
           'og_locale': 'ja_JP', 'html_lang': 'ja'},
    'es': {'title': 'K-AGIT - Aprende Coreano con K-Pop',
           'desc':  'Aprende coreano con K-Pop y K-Drama. Fonética IA en 9 idiomas, práctica Hangul. Gratis.',
           'og_locale': 'es_ES', 'html_lang': 'es'},
    'zh': {'title': 'K-AGIT - 用K-Pop学韩语',
           'desc':  '用K-Pop和K-Drama学韩语。9种语言AI音标转换、韩文练习。免费。',
           'og_locale': 'zh_CN', 'html_lang': 'zh'},
    'id': {'title': 'K-AGIT - Belajar Korea dengan K-Pop',
           'desc':  'Belajar Korea lewat K-Pop & K-Drama. Fonetik AI 9 bahasa, latihan Hangul. Gratis.',
           'og_locale': 'id_ID', 'html_lang': 'id'},
    'vi': {'title': 'K-AGIT - Học Tiếng Hàn Qua K-Pop',
           'desc':  'Học tiếng Hàn qua K-Pop & K-Drama. Phiên âm AI 9 ngôn ngữ, luyện Hangul. Miễn phí.',
           'og_locale': 'vi_VN', 'html_lang': 'vi'},
    'ar': {'title': 'K-AGIT - تعلم الكورية مع K-Pop',
           'desc':  'تعلم الكورية مع K-Pop وK-Drama. تحويل صوتي بـ9 لغات، تدريب الهانغل. مجاني.',
           'og_locale': 'ar_SA', 'html_lang': 'ar'},
    'fr': {'title': 'K-AGIT - Apprenez le Coréen avec K-Pop',
           'desc':  'Apprenez le coréen avec K-Pop & K-Drama. Phonétique IA en 9 langues, pratique Hangul. Gratuit.',
           'og_locale': 'fr_FR', 'html_lang': 'fr'},
    'pt': {'title': 'K-AGIT - Aprenda Coreano com K-Pop',
           'desc':  'Aprenda coreano com K-Pop & K-Drama. Fonética IA em 9 idiomas, prática Hangul. Grátis.',
           'og_locale': 'pt_BR', 'html_lang': 'pt'},
}

_SUPPORTED_LANGS = set(_LANDING_META.keys())


def _detect_lang():
    for lang, _ in request.accept_languages:
        code = lang.split('-')[0].lower()
        if code in _SUPPORTED_LANGS:
            return code
    return 'en'


@pages_bp.route('/sw.js')
def service_worker():
    return current_app.send_static_file('sw.js'), 200, {
        'Content-Type': 'application/javascript',
        'Service-Worker-Allowed': '/',
    }


@pages_bp.route('/robots.txt')
def robots_txt():
    return current_app.send_static_file('robots.txt'), 200, {'Content-Type': 'text/plain'}


@pages_bp.route('/sitemap.xml')
def sitemap_xml():
    return current_app.send_static_file('sitemap.xml'), 200, {'Content-Type': 'application/xml'}


@pages_bp.route('/naver004783a02f778259f4b362915c6e6793.html')
def naver_verify():
    return current_app.send_static_file('naver004783a02f778259f4b362915c6e6793.html'), 200, {
        'Content-Type': 'text/html'
    }


@pages_bp.route('/')
def landing():
    meta = _LANDING_META[_detect_lang()]
    return render_template('landing.html', **meta)


@pages_bp.route('/terms')
def terms():
    return render_template('terms.html')


@pages_bp.route('/privacy')
def privacy():
    return render_template('privacy.html')


@pages_bp.route('/app')
def index():
    languages = {k: {'name': v['name'], 'flag': v['flag']} for k, v in LANGUAGE_MAPS.items()}
    has_gemini = bool(os.environ.get('GEMINI_API_KEY'))
    user_data = None
    if current_user.is_authenticated:
        user_data = {
            'id': current_user.id,
            'email': current_user.email,
            'first_name': current_user.first_name,
            'last_name': current_user.last_name,
            'profile_image_url': current_user.profile_image_url,
            'created_at': current_user.created_at.isoformat() if current_user.created_at else None,
        }
    meta = _APP_META[_detect_lang()]
    return render_template('index.html', languages=languages, has_gemini=has_gemini,
                           user_data=user_data, **meta)


@pages_bp.route('/api/auth/me')
def auth_me():
    if current_user.is_authenticated:
        return jsonify({
            'authenticated': True,
            'id': current_user.id,
            'email': current_user.email,
            'first_name': current_user.first_name,
            'last_name': current_user.last_name,
            'profile_image_url': current_user.profile_image_url,
        })
    return jsonify({'authenticated': False})
