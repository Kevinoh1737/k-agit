import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import create_engine, pool

from kagit import create_app
from kagit.extensions import db
from kagit import models  # noqa: F401 — register models with metadata

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

app = create_app()
DB_URL = app.config["SQLALCHEMY_DATABASE_URI"]

target_metadata = db.metadata

DB_SCHEMA = os.environ.get("DB_SCHEMA", "kagit")


def include_object(obj, name, type_, reflected, compare_to):
    # Only consider objects that are explicitly in our schema.
    # Reflected tables with no schema (i.e. default/public) belong to other
    # apps sharing this Supabase project and must never be touched.
    if type_ == "table":
        return obj.schema == DB_SCHEMA
    return True


def include_name(name, type_, parent_names):
    # Strict allowlist: only reflect our isolated schema. Supabase internal
    # schemas (auth, storage, realtime, public, ...) are off-limits.
    if type_ == "schema":
        return name == DB_SCHEMA
    if type_ == "table":
        parent_schema = parent_names.get("schema_name")
        return parent_schema == DB_SCHEMA
    return True


def run_migrations_offline():
    context.configure(
        url=DB_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        include_schemas=True,
        version_table_schema=DB_SCHEMA,
        include_object=include_object,
        include_name=include_name,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = create_engine(DB_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_schemas=True,
            version_table_schema=DB_SCHEMA,
            include_object=include_object,
            include_name=include_name,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
