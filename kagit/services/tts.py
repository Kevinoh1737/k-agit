import io
import os
import subprocess
import wave
from google import genai
from google.genai import types

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = None
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)

TTS_MODELS = [
    "gemini-2.5-flash-preview-tts",
]

TTS_BASE_PROMPT = (
    "한국어 원어민 선생님처럼 친절하고 명확하게 발음해줘. "
    "특히 초보자가 듣기 좋게 속도를 0.9배속으로 늦춰줘."
)

EMOTION_PROMPTS = {
    "happy": "밝고 활기차게, 기분 좋은 톤으로 읽어줘.",
    "energetic": "신나고 에너지 넘치게, 리듬감 있게 읽어줘.",
    "sad": "슬프고 감성적으로, 조금 느리게 읽어줘.",
    "romantic": "따뜻하고 부드럽게, 다정한 톤으로 읽어줘.",
    "dramatic": "극적이고 강렬하게, 감정을 담아서 읽어줘.",
    "calm": "차분하고 편안하게, 안정된 톤으로 읽어줘.",
}


def pcm_to_mp3(pcm_data, sample_rate=24000, channels=1, sample_width=2):
    proc = subprocess.run(
        [
            "ffmpeg", "-y",
            "-f", "s16le",
            "-ar", str(sample_rate),
            "-ac", str(channels),
            "-i", "pipe:0",
            "-codec:a", "libmp3lame",
            "-b:a", "128k",
            "-f", "mp3",
            "pipe:1",
        ],
        input=pcm_data,
        capture_output=True,
    )
    if proc.returncode != 0:
        return None
    return proc.stdout


def pcm_to_wav(pcm_data, sample_rate=24000, channels=1, sample_width=2):
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(sample_rate)
        wf.writeframes(pcm_data)
    return buf.getvalue()


def _build_prompt(text, emotion=None):
    parts = [TTS_BASE_PROMPT]
    if emotion and emotion in EMOTION_PROMPTS:
        parts.append(EMOTION_PROMPTS[emotion])
    parts.append(f"다음 문장을 읽어줘: {text}")
    return " ".join(parts)


GENDER_VOICES = {
    "female": "Kore",
    "male": "Puck",
    "neutral": "Kore",
}


def _call_tts(model, text, emotion=None, gender=None):
    prompt = _build_prompt(text, emotion)
    voice_name = GENDER_VOICES.get(gender, "Kore")
    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name=voice_name
                    )
                )
            ),
        ),
    )

    if (response.candidates
            and response.candidates[0].content
            and response.candidates[0].content.parts):
        part = response.candidates[0].content.parts[0]
        if part.inline_data and part.inline_data.data:
            return part.inline_data.mime_type or "", part.inline_data.data
    return None, None


def generate_korean_tts(text, emotion=None, gender=None):
    if not client:
        return None, "audio/mp3", "Gemini API key not configured"

    if not text or not text.strip():
        return None, "audio/mp3", "텍스트가 비어 있습니다."

    text = text.strip()
    if len(text) > 500:
        return None, "audio/mp3", "텍스트는 500자 이내로 입력해주세요."

    last_error = None
    for model in TTS_MODELS:
        try:
            mime, raw_data = _call_tts(model, text, emotion, gender=gender)
            if raw_data is None:
                last_error = f"{model}: 음성 데이터 없음"
                continue

            if "pcm" in (mime or "") or "L16" in (mime or ""):
                rate = 24000
                if "rate=" in (mime or ""):
                    try:
                        rate = int(mime.split("rate=")[1].split(";")[0])
                    except (ValueError, IndexError):
                        pass
                mp3_data = pcm_to_mp3(raw_data, sample_rate=rate)
                if mp3_data:
                    return mp3_data, "audio/mp3", None
                wav_data = pcm_to_wav(raw_data, sample_rate=rate)
                return wav_data, "audio/wav", None
            else:
                return raw_data, mime or "audio/mp3", None

        except Exception as e:
            last_error = f"{model}: {str(e)}"
            continue

    return None, "audio/mp3", last_error or "TTS 처리 중 오류가 발생했습니다."
