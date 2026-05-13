import os
from datetime import datetime

from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from flask_login import UserMixin
from sqlalchemy import UniqueConstraint

from .extensions import db


SCHEMA = os.environ.get("DB_SCHEMA", "kagit")


class User(UserMixin, db.Model):
    __tablename__ = "users"
    __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.String, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=True)
    password_hash = db.Column(db.String, nullable=True)
    auth_provider = db.Column(db.String, default="email")
    first_name = db.Column(db.String, nullable=True)
    last_name = db.Column(db.String, nullable=True)
    profile_image_url = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


class OAuth(OAuthConsumerMixin, db.Model):
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "browser_session_key",
            "provider",
            name="uq_user_browser_session_key_provider",
        ),
        {"schema": SCHEMA},
    )

    user_id = db.Column(db.String, db.ForeignKey(f"{SCHEMA}.users.id"))
    browser_session_key = db.Column(db.String, nullable=False)
    user = db.relationship(User)


class ExtraSentenceGroup(db.Model):
    __tablename__ = "extra_sentence_groups"
    __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    source_type = db.Column(db.String(20), nullable=False)
    source_title = db.Column(db.String(200), nullable=False)
    sentences = db.Column(db.JSON, nullable=False)
    localized_titles = db.Column(db.JSON, nullable=True)
    localized_artists = db.Column(db.JSON, nullable=True)
    card_image = db.Column(db.String(200), nullable=True)
    created_by = db.Column(db.String, db.ForeignKey(f"{SCHEMA}.users.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    is_approved = db.Column(db.Boolean, default=True)
