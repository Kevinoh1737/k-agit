import os
import secrets
from functools import wraps

from flask import Blueprint, render_template, request, redirect, jsonify, abort, session
from flask_login import current_user
from sqlalchemy import func, desc
from datetime import datetime, timedelta

from .extensions import db
from .models import User, Payment

admin_bp = Blueprint('admin', __name__)

ITEMS_PER_PAGE = 20


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect('/login/google')
        admin_emails_raw = os.environ.get('ADMIN_EMAILS', '')
        admin_emails = [e.strip().lower() for e in admin_emails_raw.split(',') if e.strip()]
        user_email = (current_user.email or '').lower()
        if user_email not in admin_emails:
            abort(403)
        return f(*args, **kwargs)
    return decorated


@admin_bp.route('/admin')
@admin_required
def dashboard():
    total_users = User.query.count()
    premium_users = User.query.filter_by(is_premium=True).count()
    today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_signups = User.query.filter(User.created_at >= today_start).count()

    user_page = request.args.get('page', 1, type=int)
    payment_page = request.args.get('pp', 1, type=int)
    search_q = request.args.get('q', '', type=str).strip()

    users_query = User.query
    if search_q:
        users_query = users_query.filter(User.email.ilike(f'%{search_q}%'))
    users_query = users_query.order_by(desc(User.created_at))
    users_paginated = users_query.paginate(page=user_page, per_page=ITEMS_PER_PAGE, error_out=False)

    payments_query = Payment.query.join(User).order_by(desc(Payment.created_at))
    payments_paginated = payments_query.paginate(page=payment_page, per_page=ITEMS_PER_PAGE, error_out=False)

    csrf_token = secrets.token_hex(32)
    session['admin_csrf'] = csrf_token

    return render_template('admin.html',
        admin_email=current_user.email,
        total_users=total_users,
        premium_users=premium_users,
        today_signups=today_signups,
        users=users_paginated,
        payments=payments_paginated,
        search_q=search_q,
        user_page=user_page,
        payment_page=payment_page,
        csrf_token=csrf_token,
    )


@admin_bp.route('/admin/toggle-premium/<user_id>', methods=['POST'])
@admin_required
def toggle_premium(user_id):
    token = request.form.get('csrf_token', '')
    if not token or token != session.get('admin_csrf'):
        abort(403)

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.is_premium:
        user.is_premium = False
        user.premium_expires_at = None
    else:
        user.is_premium = True
        user.premium_expires_at = datetime.now() + timedelta(days=365)

    db.session.commit()

    page = request.args.get('page', 1, type=int)
    q = request.args.get('q', '', type=str)
    redirect_url = f'/admin?page={page}'
    if q:
        redirect_url += f'&q={q}'
    return redirect(redirect_url)
