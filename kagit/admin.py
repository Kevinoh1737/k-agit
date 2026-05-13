import os
from datetime import datetime
from functools import wraps

from flask import Blueprint, abort, redirect, render_template, request
from flask_login import current_user
from sqlalchemy import desc

from .models import User

admin_bp = Blueprint("admin", __name__)

ITEMS_PER_PAGE = 20


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect("/login/google")
        admin_emails_raw = os.environ.get("ADMIN_EMAILS", "")
        admin_emails = [e.strip().lower() for e in admin_emails_raw.split(",") if e.strip()]
        user_email = (current_user.email or "").lower()
        if user_email not in admin_emails:
            abort(403)
        return f(*args, **kwargs)
    return decorated


@admin_bp.route("/admin")
@admin_required
def dashboard():
    total_users = User.query.count()
    today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_signups = User.query.filter(User.created_at >= today_start).count()

    user_page = request.args.get("page", 1, type=int)
    search_q = request.args.get("q", "", type=str).strip()

    users_query = User.query
    if search_q:
        users_query = users_query.filter(User.email.ilike(f"%{search_q}%"))
    users_query = users_query.order_by(desc(User.created_at))
    users_paginated = users_query.paginate(page=user_page, per_page=ITEMS_PER_PAGE, error_out=False)

    return render_template(
        "admin.html",
        admin_email=current_user.email,
        total_users=total_users,
        today_signups=today_signups,
        users=users_paginated,
        search_q=search_q,
        user_page=user_page,
    )
