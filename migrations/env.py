import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from kagit import create_app
from kagit.extensions import db
from kagit import models  # noqa: F401 — register models with metadata

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

app = create_app()
db_url = app.config["SQLALCHEMY_DATABASE_URI"]
if db_url:
    config.set_main_option("sqlalchemy.url", db_url)

target_metadata = db.metadata

DB_SCHEMA = os.environ.get("DB_SCHEMA", "kagit")


def include_object(obj, name, type_, reflected, compare_to):
    if type_ == "table" and obj.schema and obj.schema != DB_SCHEMA:
        return False
    return True


def run_migrations_offline():
    context.configure(
        url=config.get_main_option("sqlalchemy.url"),
        target_metadata=target_metadata,
        literal_binds=True,
        include_schemas=True,
        version_table_schema=DB_SCHEMA,
        include_object=include_object,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_schemas=True,
            version_table_schema=DB_SCHEMA,
            include_object=include_object,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
