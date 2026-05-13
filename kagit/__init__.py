import logging

from flask import Flask, request, session
from werkzeug.middleware.proxy_fix import ProxyFix

from .config import get_config
from .extensions import db, login_manager


def create_app(config_class=None):
    app = Flask(__name__, static_folder="static", template_folder="templates")
    app.config.from_object(config_class or get_config())

    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
    app.secret_key = app.config["SECRET_KEY"]

    _configure_logging(app)
    _init_extensions(app)
    _register_blueprints(app)
    _register_hooks(app)

    return app


def _configure_logging(app):
    level = logging.DEBUG if app.config.get("DEBUG") else logging.INFO
    logging.basicConfig(
        level=level,
        format='{"level":"%(levelname)s","logger":"%(name)s","msg":%(message)r}',
    )


def _init_extensions(app):
    db.init_app(app)
    login_manager.init_app(app)

    from . import models  # noqa: F401 — register models with metadata

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(models.User, user_id)


def _register_blueprints(app):
    from .auth import auth_bp, make_google_oauth_blueprint
    from .admin import admin_bp
    from .routes.pages import pages_bp
    from .routes.api_phonetic import api_phonetic_bp
    from .routes.api_ai import api_ai_bp

    app.register_blueprint(make_google_oauth_blueprint(app), url_prefix="/login")
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(pages_bp)
    app.register_blueprint(api_phonetic_bp)
    app.register_blueprint(api_ai_bp)


def _register_hooks(app):
    @app.before_request
    def make_session_permanent():
        session.permanent = True

    @app.after_request
    def add_cache_headers(response):
        if request.path.startswith("/static/") or request.path in ("/", "/app"):
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        return response

    @app.context_processor
    def inject_asset_helpers():
        base = app.config.get("ASSETS_BASE_URL", "")
        version = app.config.get("ASSET_VERSION", "dev")

        def asset(path: str) -> str:
            path = path.lstrip("/")
            if base:
                return f"{base.rstrip('/')}/{path}"
            from flask import url_for
            return url_for("static", filename=path)

        return {"asset": asset, "asset_version": version}


def client_ip():
    return (
        request.headers.get("X-Forwarded-For", request.remote_addr or "127.0.0.1")
        .split(",")[0]
        .strip()
    )
