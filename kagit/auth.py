import logging
import uuid

from flask import Blueprint, jsonify, redirect, request
from flask_dance.consumer import oauth_authorized
from flask_dance.consumer.storage.sqla import SQLAlchemyStorage
from flask_dance.contrib.google import make_google_blueprint
from flask_login import current_user, login_user, logout_user
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from .extensions import db
from .models import OAuth, User

auth_bp = Blueprint("auth", __name__)


def make_google_oauth_blueprint(app):
    google_bp = make_google_blueprint(
        client_id=app.config.get("GOOGLE_CLIENT_ID", ""),
        client_secret=app.config.get("GOOGLE_CLIENT_SECRET", ""),
        scope=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
        storage=SQLAlchemyStorage(OAuth, db.session, user=current_user),
        redirect_url="/app",
    )

    @oauth_authorized.connect_via(google_bp)
    def google_logged_in(blueprint, token):
        if not token:
            return False

        resp = blueprint.session.get("/oauth2/v2/userinfo")
        if not resp.ok:
            logging.warning("Failed to fetch Google user info")
            return False

        info = resp.json()
        email = info.get("email", "")

        try:
            user = User.query.filter_by(email=email).first()
            if not user:
                user = User()
                user.id = str(uuid.uuid4())
                user.email = email
                user.auth_provider = "google"
                user.first_name = info.get("given_name", "")
                user.last_name = info.get("family_name", "")
                user.profile_image_url = info.get("picture", "")
                db.session.add(user)
                db.session.commit()
            else:
                if not user.profile_image_url and info.get("picture"):
                    user.profile_image_url = info.get("picture", "")
                if not user.first_name and info.get("given_name"):
                    user.first_name = info.get("given_name", "")
                if not user.last_name and info.get("family_name"):
                    user.last_name = info.get("family_name", "")
                db.session.commit()

            login_user(user)
        except IntegrityError:
            db.session.rollback()
            user = User.query.filter_by(email=email).first()
            if user:
                login_user(user)

        return False

    return google_bp


@auth_bp.route("/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request", "error_key": "auth_error_invalid"}), 400

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    first_name = (data.get("first_name") or "").strip()

    if not email or "@" not in email:
        return jsonify({"error": "Please enter a valid email address.", "error_key": "auth_error_invalid_email"}), 400

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters.", "error_key": "auth_error_password_short"}), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"error": "An account with this email already exists.", "error_key": "auth_error_email_exists"}), 409

    try:
        user = User()
        user.id = str(uuid.uuid4())
        user.email = email
        user.password_hash = generate_password_hash(password)
        user.auth_provider = "email"
        user.first_name = first_name or email.split("@")[0]
        db.session.add(user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "An account with this email already exists.", "error_key": "auth_error_email_exists"}), 409

    login_user(user)
    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_image_url": user.profile_image_url,
            "is_premium": False,
            "created_at": user.created_at.isoformat() if user.created_at else None,
        },
    })


@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request", "error_key": "auth_error_invalid"}), 400

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "Please enter email and password.", "error_key": "auth_error_missing_fields"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.password_hash:
        return jsonify({"error": "Invalid email or password.", "error_key": "auth_error_invalid_credentials"}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password.", "error_key": "auth_error_invalid_credentials"}), 401

    login_user(user)
    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_image_url": user.profile_image_url,
            "is_premium": user.is_premium,
            "created_at": user.created_at.isoformat() if user.created_at else None,
        },
    })


@auth_bp.route("/auth/logout", methods=["GET", "POST"])
def logout():
    logout_user()
    return redirect("/app")


@auth_bp.route("/auth/login-required", methods=["GET"])
def login_required_redirect():
    return jsonify({"error": "Login required", "error_key": "auth_error_login_required"}), 401


@auth_bp.route("/auth/update-profile-final", methods=["POST"])
def update_profile_final():
    if not current_user.is_authenticated:
        return jsonify({"success": False, "error": "Not logged in"}), 401

    data = request.get_json()
    if not data:
        return jsonify({"success": False, "error": "No data provided"}), 400

    first_name = data.get("first_name")
    if first_name is not None:
        current_user.first_name = first_name.strip()
        db.session.commit()

    return jsonify({
        "success": True,
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "first_name": current_user.first_name,
            "profile_image_url": current_user.profile_image_url,
        },
    })
