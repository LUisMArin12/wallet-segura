def payment_payload(identifier="4111 1111 1111 1234"):
    return {
        "type": "tarjeta",
        "alias": "Tarjeta principal",
        "institution": "Banco Demo",
        "currency": "mxn",
        "identifier": identifier,
    }


def create_payment_method(client, auth_headers):
    return client.post(
        "/api/payment-methods",
        json=payment_payload(),
        headers=auth_headers,
    )


def test_create_payment_method(client, auth_headers):
    response = create_payment_method(client, auth_headers)

    assert response.status_code == 201
    data = response.json()
    assert data["alias"] == "Tarjeta principal"
    assert data["currency"] == "MXN"
    assert data["masked_identifier"] == "**** **** **** 1234"
    assert data["status"] == "active"
    assert "identifier" not in data
    assert "identifier_hash" not in data


def test_prevent_duplicate_payment_method(client, auth_headers):
    client.post("/api/payment-methods", json=payment_payload(), headers=auth_headers)
    response = client.post(
        "/api/payment-methods",
        json=payment_payload(identifier="4111111111111234"),
        headers=auth_headers,
    )

    assert response.status_code == 409
    assert response.json()["detail"] == "Este método de pago ya está registrado para tu usuario"


def test_list_payment_methods(client, auth_headers):
    create_payment_method(client, auth_headers)
    response = client.get("/api/payment-methods", headers=auth_headers)

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["masked_identifier"] == "**** **** **** 1234"


def test_get_payment_method_detail(client, auth_headers):
    create_response = create_payment_method(client, auth_headers)
    payment_id = create_response.json()["id"]

    response = client.get(f"/api/payment-methods/{payment_id}", headers=auth_headers)

    assert response.status_code == 200
    assert response.json()["id"] == payment_id


def test_deactivate_payment_method_with_delete(client, auth_headers):
    create_response = create_payment_method(client, auth_headers)
    payment_id = create_response.json()["id"]

    response = client.delete(f"/api/payment-methods/{payment_id}", headers=auth_headers)

    assert response.status_code == 200
    assert response.json()["status"] == "inactive"

    detail_response = client.get(f"/api/payment-methods/{payment_id}", headers=auth_headers)
    detail = detail_response.json()
    assert detail["status"] == "inactive"
    assert detail["deleted_at"] is not None


def test_update_payment_method_status_to_inactive(client, auth_headers):
    create_response = create_payment_method(client, auth_headers)
    payment_id = create_response.json()["id"]

    response = client.patch(
        f"/api/payment-methods/{payment_id}/status",
        json={"status": "inactive"},
        headers=auth_headers,
    )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "inactive"
    assert data["deleted_at"] is not None


def test_update_payment_method_status_to_active(client, auth_headers):
    create_response = create_payment_method(client, auth_headers)
    payment_id = create_response.json()["id"]

    client.patch(
        f"/api/payment-methods/{payment_id}/status",
        json={"status": "inactive"},
        headers=auth_headers,
    )
    response = client.patch(
        f"/api/payment-methods/{payment_id}/status",
        json={"status": "active"},
        headers=auth_headers,
    )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert data["deleted_at"] is None
