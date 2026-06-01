import sys
from pathlib import Path

import pytest

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app


@pytest.fixture()
def client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def registered_user_payload():
    return {
        "name": "Carlos Marin",
        "email": "carlos@example.com",
        "password": "Password123",
    }


@pytest.fixture()
def auth_headers(client, registered_user_payload):
    client.post("/api/auth/register", json=registered_user_payload)
    response = client.post(
        "/api/auth/login",
        json={
            "email": registered_user_payload["email"],
            "password": registered_user_payload["password"],
        },
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
