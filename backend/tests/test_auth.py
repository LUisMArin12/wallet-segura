def test_register_user(client, registered_user_payload):
    response = client.post("/api/auth/register", json=registered_user_payload)

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == registered_user_payload["email"]
    assert "hashed_password" not in data
    assert "password" not in data


def test_register_duplicate_email(client, registered_user_payload):
    client.post("/api/auth/register", json=registered_user_payload)
    response = client.post("/api/auth/register", json=registered_user_payload)

    assert response.status_code == 409
    assert response.json()["detail"] == "El email ya está registrado"


def test_login(client, registered_user_payload):
    client.post("/api/auth/register", json=registered_user_payload)
    response = client.post(
        "/api/auth/login",
        json={
            "email": registered_user_payload["email"],
            "password": registered_user_payload["password"],
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == registered_user_payload["email"]


def test_me_requires_authentication(client):
    response = client.get("/api/auth/me")
    assert response.status_code == 401
