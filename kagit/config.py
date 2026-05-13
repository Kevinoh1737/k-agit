import os


class BaseConfig:
    SECRET_KEY = os.environ.get("SESSION_SECRET", "")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
        "pool_size": 5,
        "max_overflow": 5,
    }

    DB_SCHEMA = os.environ.get("DB_SCHEMA", "kagit")

    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "")

    ADMIN_EMAILS = [
        e.strip()
        for e in os.environ.get("ADMIN_EMAILS", "kevin@synthya.ai").split(",")
        if e.strip()
    ]

    ASSETS_BASE_URL = os.environ.get("ASSETS_BASE_URL", "")
    ASSET_VERSION = os.environ.get("ASSET_VERSION", "dev")


class DevConfig(BaseConfig):
    DEBUG = True
    PREFERRED_URL_SCHEME = "http"


class ProdConfig(BaseConfig):
    DEBUG = False
    PREFERRED_URL_SCHEME = "https"
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"


def get_config():
    env = os.environ.get("FLASK_ENV", "production").lower()
    return DevConfig if env in ("development", "dev") else ProdConfig
