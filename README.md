# Wallet segura de métodos de pago

Aplicación web full stack para registrar usuarios, iniciar sesión y administrar métodos de pago de forma segura.

El proyecto está diseñado como una prueba técnica realista para un perfil Full Stack Junior: simple, funcional, organizado y defendible en entrevista.

## Tecnologías usadas

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Alembic
- JWT con `python-jose`
- Passlib + bcrypt
- Pydantic
- Pytest

### Frontend

- JavaScript
- React + Vite
- React Router DOM
- Fetch API
- CSS moderno, minimalista y organizado

## Funcionalidades principales

- Registro de usuario.
- Login con JWT.
- Perfil del usuario autenticado.
- Alta y listado de métodos de pago.
- Detalle de método de pago.
- Activación y desactivación dinámica de métodos de pago.
- Soft delete mediante `status = inactive` y `deleted_at`.
- Identificadores sensibles enmascarados.
- Hash HMAC para prevenir duplicados.
- Auditoría de operaciones relevantes.
- Pruebas básicas de backend con `pytest`.

## Estructura del proyecto

```txt
wallet-segura/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── core/
│   │   └── utils/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   └── styles/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── docs/
│   └── architecture.md
└── README.md
```

## Instalación y ejecución

### 1. Backend

```bash
cd backend
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

Ejecutar migraciones y servidor:

```bash
alembic upgrade head
uvicorn app.main:app --reload --port 8001
```

Backend disponible en:

```txt
http://localhost:8001
```

Documentación Swagger:

```txt
http://localhost:8001/docs
```

### 2. Frontend

```bash
cd frontend
npm install
```

Copiar variables de entorno:

```bash
# Windows CMD
copy .env.example .env

# macOS / Linux / Git Bash
cp .env.example .env
```

Ejecutar frontend:

```bash
npm run dev
```

Frontend disponible en:

```txt
http://localhost:5173
```

## Variables de entorno

### Backend

```env
DATABASE_URL=sqlite:///./wallet.db
SECRET_KEY=change_this_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
PAYMENT_IDENTIFIER_SECRET=change_this_payment_secret
```

### Frontend

```env
VITE_API_URL=http://localhost:8001/api
```

## Migraciones

Crear una nueva migración:

```bash
cd backend
alembic revision --autogenerate -m "mensaje"
```

Ejecutar migraciones:

```bash
alembic upgrade head
```

## Pruebas backend

```bash
cd backend
pytest
```

## Endpoints principales

### Auth

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario autenticado |

### Métodos de pago

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/payment-methods` | Crear método de pago |
| GET | `/api/payment-methods` | Listar métodos del usuario |
| GET | `/api/payment-methods/{id}` | Ver detalle |
| PATCH | `/api/payment-methods/{id}/status` | Activar o desactivar método de pago |
| DELETE | `/api/payment-methods/{id}` | Desactivar método de pago |

### Auditoría

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/audit-logs` | Ver logs del usuario autenticado |

## Decisiones técnicas

- Se usa SQLite para facilitar la ejecución local.
- Las contraseñas se guardan con hash usando bcrypt.
- La autenticación se maneja con JWT.
- Los métodos de pago pertenecen siempre a un usuario.
- No se elimina físicamente un método de pago; se desactiva con `status = inactive` y `deleted_at`.
- El estado del método se puede cambiar dinámicamente con `PATCH /payment-methods/{id}/status`.
- El identificador sensible no se guarda completo en texto plano.
- Se guarda un `masked_identifier` para mostrar solo los últimos 4 caracteres.
- Se guarda un `identifier_hash` con HMAC-SHA256 para prevenir duplicados sin exponer el valor real.
- Se registran eventos relevantes en `audit_logs`.

## Consideraciones de seguridad

- No se devuelve `hashed_password` en respuestas.
- No se muestra el identificador completo del método de pago.
- Los endpoints privados requieren token JWT.
- Se valida que cada método consultado, activado o desactivado pertenezca al usuario autenticado.
- Las claves del sistema se configuran con variables de entorno.

## Mejoras futuras

- Refresh tokens.
- Recuperación de contraseña.
- Rate limiting en login.
- Cifrado adicional de datos sensibles si se decide almacenarlos.
- Roles de usuario.
- Docker Compose.
- CI/CD con GitHub Actions.
