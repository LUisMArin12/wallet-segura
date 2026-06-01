# Backend - Wallet segura

API REST construida con FastAPI para autenticación, métodos de pago seguros y auditoría.

## Instalación

```bash
python -m venv .venv

# Windows CMD
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

Copiar variables de entorno:

```bash
# Windows CMD
copy .env.example .env

# macOS / Linux / Git Bash
cp .env.example .env
```

## Migraciones

```bash
alembic upgrade head
```

## Ejecutar servidor

```bash
uvicorn app.main:app --reload --port 8001
```

## Ejecutar pruebas

```bash
pytest
```

## Documentación API

```txt
http://localhost:8001/docs
```

## Endpoint de estado de método de pago

```http
PATCH /api/payment-methods/{id}/status
```

Body:

```json
{
  "status": "active"
}
```

También acepta:

```json
{
  "status": "inactive"
}
```
