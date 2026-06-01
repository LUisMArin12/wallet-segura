# Proyecto completo archivo por archivo

Este archivo contiene el código completo del proyecto Wallet Segura, incluyendo las mejoras de activación/desactivación dinámica y rediseño minimalista.

## Árbol de carpetas

```txt
.
./README.md
./backend
./backend/.env.example
./backend/README.md
./backend/alembic
./backend/alembic.ini
./backend/alembic/env.py
./backend/alembic/script.py.mako
./backend/alembic/versions
./backend/alembic/versions/0001_initial.py
./backend/app
./backend/app/__init__.py
./backend/app/core
./backend/app/core/__init__.py
./backend/app/core/config.py
./backend/app/core/dependencies.py
./backend/app/core/security.py
./backend/app/database.py
./backend/app/main.py
./backend/app/models
./backend/app/models/__init__.py
./backend/app/models/audit_log.py
./backend/app/models/payment_method.py
./backend/app/models/user.py
./backend/app/routes
./backend/app/routes/__init__.py
./backend/app/routes/audit_logs.py
./backend/app/routes/auth.py
./backend/app/routes/payment_methods.py
./backend/app/schemas
./backend/app/schemas/__init__.py
./backend/app/schemas/audit_log.py
./backend/app/schemas/auth.py
./backend/app/schemas/payment_method.py
./backend/app/schemas/user.py
./backend/app/services
./backend/app/services/__init__.py
./backend/app/services/audit_service.py
./backend/app/services/payment_security.py
./backend/app/utils
./backend/app/utils/__init__.py
./backend/app/utils/time.py
./backend/requirements.txt
./backend/tests
./backend/tests/conftest.py
./backend/tests/test_auth.py
./backend/tests/test_payment_methods.py
./docs
./docs/architecture.md
./frontend
./frontend/.env.example
./frontend/README.md
./frontend/index.html
./frontend/package-lock.json
./frontend/package.json
./frontend/src
./frontend/src/App.jsx
./frontend/src/api
./frontend/src/api/client.js
./frontend/src/components
./frontend/src/components/NavBar.jsx
./frontend/src/components/PaymentMethodCard.jsx
./frontend/src/components/PaymentMethodForm.jsx
./frontend/src/context
./frontend/src/context/AuthContext.jsx
./frontend/src/main.jsx
./frontend/src/pages
./frontend/src/pages/DashboardPage.jsx
./frontend/src/pages/LoginPage.jsx
./frontend/src/pages/NotFoundPage.jsx
./frontend/src/pages/PaymentMethodCreatePage.jsx
./frontend/src/pages/PaymentMethodDetailPage.jsx
./frontend/src/pages/PaymentMethodsPage.jsx
./frontend/src/pages/RegisterPage.jsx
./frontend/src/routes
./frontend/src/routes/ProtectedRoute.jsx
./frontend/src/styles
./frontend/src/styles/global.css
./frontend/vite.config.js
```

## Archivos

### `README.md`

```markdown
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

```

### `backend/.env.example`

```env
DATABASE_URL=sqlite:///./wallet.db
SECRET_KEY=change_this_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
PAYMENT_IDENTIFIER_SECRET=change_this_payment_secret

```

### `backend/README.md`

```markdown
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

```

### `backend/alembic/env.py`

```python
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

from app.core.config import settings
from app.database import Base
from app.models import User, PaymentMethod, AuditLog

config = context.config
config.set_main_option("sqlalchemy.url", settings.database_url)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
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
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

```

### `backend/alembic/script.py.mako`

```mako
"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = ${repr(up_revision)}
down_revision: Union[str, None] = ${repr(down_revision)}
branch_labels: Union[str, Sequence[str], None] = ${repr(branch_labels)}
depends_on: Union[str, Sequence[str], None] = ${repr(depends_on)}


def upgrade() -> None:
    ${upgrades if upgrades else "pass"}


def downgrade() -> None:
    ${downgrades if downgrades else "pass"}

```

### `backend/alembic/versions/0001_initial.py`

```python
"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-06-01
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.create_table(
        "payment_methods",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("type", sa.String(length=40), nullable=False),
        sa.Column("alias", sa.String(length=120), nullable=False),
        sa.Column("institution", sa.String(length=120), nullable=False),
        sa.Column("currency", sa.String(length=10), nullable=False),
        sa.Column("masked_identifier", sa.String(length=40), nullable=False),
        sa.Column("identifier_hash", sa.String(length=128), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("deleted_at", sa.DateTime(), nullable=True),
    )
    op.create_index("ix_payment_methods_user_id", "payment_methods", ["user_id"])
    op.create_index("ix_payment_methods_identifier_hash", "payment_methods", ["identifier_hash"])

    op.create_table(
        "audit_logs",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("action", sa.String(length=80), nullable=False),
        sa.Column("entity", sa.String(length=80), nullable=False),
        sa.Column("entity_id", sa.Integer(), nullable=True),
        sa.Column("description", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_audit_logs_user_id", "audit_logs", ["user_id"])


def downgrade() -> None:
    op.drop_index("ix_audit_logs_user_id", table_name="audit_logs")
    op.drop_table("audit_logs")
    op.drop_index("ix_payment_methods_identifier_hash", table_name="payment_methods")
    op.drop_index("ix_payment_methods_user_id", table_name="payment_methods")
    op.drop_table("payment_methods")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")

```

### `backend/alembic.ini`

```ini
[alembic]
script_location = alembic
sqlalchemy.url = sqlite:///./wallet.db

[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S

```

### `backend/app/__init__.py`

```python

```

### `backend/app/core/__init__.py`

```python

```

### `backend/app/core/config.py`

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./wallet.db"
    secret_key: str = "change_this_secret_key"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    payment_identifier_secret: str = "change_this_payment_secret"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()

```

### `backend/app/core/dependencies.py`

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.database import get_db
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_access_token(token)
    if payload is None:
        raise credentials_error

    user_id = payload.get("sub")
    if user_id is None:
        raise credentials_error

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_error

    return user

```

### `backend/app/core/security.py`

```python
from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_context.verify(plain_password, hashed_password)


def create_access_token(subject: str | int, expires_delta: timedelta | None = None) -> str:
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.access_token_expire_minutes)
    )
    payload: dict[str, Any] = {"sub": str(subject), "exp": expire}
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
    except JWTError:
        return None

```

### `backend/app/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}

engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

```

### `backend/app/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import User, PaymentMethod, AuditLog
from app.routes import auth, payment_methods, audit_logs

# Útil para desarrollo local. En producción se recomienda usar solo Alembic.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Wallet segura de métodos de pago", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(payment_methods.router, prefix="/api/payment-methods", tags=["Payment Methods"])
app.include_router(audit_logs.router, prefix="/api/audit-logs", tags=["Audit Logs"])


@app.get("/")
def health_check():
    return {"message": "Wallet segura API funcionando"}

```

### `backend/app/models/__init__.py`

```python
from app.models.user import User
from app.models.payment_method import PaymentMethod
from app.models.audit_log import AuditLog

__all__ = ["User", "PaymentMethod", "AuditLog"]

```

### `backend/app/models/audit_log.py`

```python
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.utils.time import utc_now


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    action = Column(String(80), nullable=False)
    entity = Column(String(80), nullable=False)
    entity_id = Column(Integer, nullable=True)
    description = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    user = relationship("User", back_populates="audit_logs")

```

### `backend/app/models/payment_method.py`

```python
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.utils.time import utc_now


class PaymentMethod(Base):
    __tablename__ = "payment_methods"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    type = Column(String(40), nullable=False)
    alias = Column(String(120), nullable=False)
    institution = Column(String(120), nullable=False)
    currency = Column(String(10), nullable=False)
    masked_identifier = Column(String(40), nullable=False)
    identifier_hash = Column(String(128), nullable=False, index=True)
    status = Column(String(20), default="active", nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, nullable=True)
    deleted_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="payment_methods")

```

### `backend/app/models/user.py`

```python
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.utils.time import utc_now


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, unique=True, index=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    payment_methods = relationship("PaymentMethod", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")

```

### `backend/app/routes/__init__.py`

```python

```

### `backend/app/routes/audit_logs.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.audit_log import AuditLog
from app.models.user import User
from app.schemas.audit_log import AuditLogResponse

router = APIRouter()


@router.get("", response_model=list[AuditLogResponse])
def list_audit_logs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(AuditLog)
        .filter(AuditLog.user_id == current_user.id)
        .order_by(AuditLog.created_at.desc())
        .all()
    )

```

### `backend/app/routes/auth.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.core.security import create_access_token, hash_password, verify_password
from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserCreate, UserResponse
from app.services.audit_service import create_audit_log

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == payload.email.lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El email ya está registrado",
        )

    user = User(
        name=payload.name.strip(),
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    create_audit_log(
        db,
        user_id=user.id,
        action="USER_REGISTERED",
        entity="users",
        entity_id=user.id,
        description="Usuario registrado correctamente",
    )

    return user


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
        )

    create_audit_log(
        db,
        user_id=user.id,
        action="LOGIN_SUCCESS",
        entity="users",
        entity_id=user.id,
        description="Inicio de sesión exitoso",
    )

    token = create_access_token(subject=user.id)
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

```

### `backend/app/routes/payment_methods.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.payment_method import PaymentMethod
from app.models.user import User
from app.schemas.payment_method import (
    PaymentMethodCreate,
    PaymentMethodDeleteResponse,
    PaymentMethodDetail,
    PaymentMethodResponse,
    PaymentMethodStatusUpdate,
)
from app.services.audit_service import create_audit_log
from app.services.payment_security import create_identifier_hash, mask_identifier
from app.utils.time import utc_now

router = APIRouter()


def get_user_payment_method(
    db: Session,
    *,
    payment_method_id: int,
    user_id: int,
) -> PaymentMethod:
    payment_method = (
        db.query(PaymentMethod)
        .filter(
            PaymentMethod.id == payment_method_id,
            PaymentMethod.user_id == user_id,
        )
        .first()
    )

    if not payment_method:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Método de pago no encontrado",
        )

    return payment_method


@router.post("", response_model=PaymentMethodResponse, status_code=status.HTTP_201_CREATED)
def create_payment_method(
    payload: PaymentMethodCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    identifier_hash = create_identifier_hash(payload.identifier)

    duplicate = (
        db.query(PaymentMethod)
        .filter(
            PaymentMethod.user_id == current_user.id,
            PaymentMethod.identifier_hash == identifier_hash,
        )
        .first()
    )
    if duplicate:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Este método de pago ya está registrado para tu usuario",
        )

    payment_method = PaymentMethod(
        user_id=current_user.id,
        type=payload.type,
        alias=payload.alias.strip(),
        institution=payload.institution.strip(),
        currency=payload.currency,
        masked_identifier=mask_identifier(payload.identifier),
        identifier_hash=identifier_hash,
        status="active",
    )
    db.add(payment_method)
    db.commit()
    db.refresh(payment_method)

    create_audit_log(
        db,
        user_id=current_user.id,
        action="PAYMENT_METHOD_CREATED",
        entity="payment_methods",
        entity_id=payment_method.id,
        description="Método de pago creado correctamente",
    )

    return payment_method


@router.get("", response_model=list[PaymentMethodResponse])
def list_payment_methods(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(PaymentMethod)
        .filter(PaymentMethod.user_id == current_user.id)
        .order_by(PaymentMethod.created_at.desc())
        .all()
    )


@router.get("/{payment_method_id}", response_model=PaymentMethodDetail)
def get_payment_method_detail(
    payment_method_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payment_method = get_user_payment_method(
        db,
        payment_method_id=payment_method_id,
        user_id=current_user.id,
    )

    create_audit_log(
        db,
        user_id=current_user.id,
        action="PAYMENT_METHOD_DETAIL_VIEWED",
        entity="payment_methods",
        entity_id=payment_method.id,
        description="Consulta de detalle de método de pago",
    )

    return payment_method


@router.patch("/{payment_method_id}/status", response_model=PaymentMethodResponse)
def update_payment_method_status(
    payment_method_id: int,
    payload: PaymentMethodStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payment_method = get_user_payment_method(
        db,
        payment_method_id=payment_method_id,
        user_id=current_user.id,
    )

    if payment_method.status == payload.status:
        return payment_method

    now = utc_now()
    payment_method.status = payload.status
    payment_method.updated_at = now
    payment_method.deleted_at = now if payload.status == "inactive" else None

    db.commit()
    db.refresh(payment_method)

    is_active = payload.status == "active"
    create_audit_log(
        db,
        user_id=current_user.id,
        action="PAYMENT_METHOD_ACTIVATED" if is_active else "PAYMENT_METHOD_DEACTIVATED",
        entity="payment_methods",
        entity_id=payment_method.id,
        description=(
            "Método de pago activado correctamente"
            if is_active
            else "Método de pago desactivado correctamente"
        ),
    )

    return payment_method


@router.delete("/{payment_method_id}", response_model=PaymentMethodDeleteResponse)
def deactivate_payment_method(
    payment_method_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payment_method = get_user_payment_method(
        db,
        payment_method_id=payment_method_id,
        user_id=current_user.id,
    )

    now = utc_now()
    payment_method.status = "inactive"
    payment_method.deleted_at = now
    payment_method.updated_at = now
    db.commit()
    db.refresh(payment_method)

    create_audit_log(
        db,
        user_id=current_user.id,
        action="PAYMENT_METHOD_DEACTIVATED",
        entity="payment_methods",
        entity_id=payment_method.id,
        description="Método de pago desactivado correctamente",
    )

    return {
        "message": "Método de pago desactivado correctamente",
        "id": payment_method.id,
        "status": payment_method.status,
    }

```

### `backend/app/schemas/__init__.py`

```python

```

### `backend/app/schemas/audit_log.py`

```python
from datetime import datetime

from pydantic import BaseModel


class AuditLogResponse(BaseModel):
    id: int
    user_id: int | None
    action: str
    entity: str
    entity_id: int | None
    description: str
    created_at: datetime

    model_config = {"from_attributes": True}

```

### `backend/app/schemas/auth.py`

```python
from pydantic import BaseModel, EmailStr, Field

from app.schemas.user import UserResponse


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

```

### `backend/app/schemas/payment_method.py`

```python
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, field_validator

PaymentType = Literal["tarjeta", "cuenta_bancaria", "clabe", "otro"]
PaymentStatus = Literal["active", "inactive"]


class PaymentMethodCreate(BaseModel):
    type: PaymentType
    alias: str = Field(..., min_length=2, max_length=120)
    institution: str = Field(..., min_length=2, max_length=120)
    currency: str = Field(..., min_length=3, max_length=3)
    identifier: str = Field(..., min_length=4, max_length=40)

    @field_validator("currency")
    @classmethod
    def normalize_currency(cls, value: str) -> str:
        return value.upper()


class PaymentMethodStatusUpdate(BaseModel):
    status: PaymentStatus


class PaymentMethodResponse(BaseModel):
    id: int
    type: str
    alias: str
    institution: str
    currency: str
    masked_identifier: str
    status: str
    created_at: datetime
    updated_at: datetime | None = None
    deleted_at: datetime | None = None

    model_config = {"from_attributes": True}


class PaymentMethodDetail(PaymentMethodResponse):
    pass


class PaymentMethodDeleteResponse(BaseModel):
    message: str
    id: int
    status: str

```

### `backend/app/schemas/user.py`

```python
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=80)


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    model_config = {"from_attributes": True}

```

### `backend/app/services/__init__.py`

```python

```

### `backend/app/services/audit_service.py`

```python
from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def create_audit_log(
    db: Session,
    *,
    user_id: int | None,
    action: str,
    entity: str,
    entity_id: int | None,
    description: str,
) -> AuditLog:
    log = AuditLog(
        user_id=user_id,
        action=action,
        entity=entity,
        entity_id=entity_id,
        description=description,
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

```

### `backend/app/services/payment_security.py`

```python
import hashlib
import hmac
import re

from app.core.config import settings


def normalize_identifier(identifier: str) -> str:
    """Elimina espacios y separadores comunes antes de calcular hash/máscara."""
    return re.sub(r"[\s\-]", "", identifier.strip())


def mask_identifier(identifier: str) -> str:
    normalized = normalize_identifier(identifier)
    last_four = normalized[-4:]
    return f"**** **** **** {last_four}"


def create_identifier_hash(identifier: str) -> str:
    normalized = normalize_identifier(identifier)
    return hmac.new(
        settings.payment_identifier_secret.encode("utf-8"),
        normalized.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()

```

### `backend/app/utils/__init__.py`

```python

```

### `backend/app/utils/time.py`

```python
from datetime import datetime, timezone


def utc_now() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)

```

### `backend/requirements.txt`

```text
fastapi==0.115.6
uvicorn[standard]==0.34.0
SQLAlchemy==2.0.36
alembic==1.14.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
bcrypt==4.0.1
pydantic==2.10.4
pydantic-settings==2.7.0
python-dotenv==1.0.1
email-validator==2.2.0
pytest==8.3.4
httpx==0.28.1

```

### `backend/tests/conftest.py`

```python
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

```

### `backend/tests/test_auth.py`

```python
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

```

### `backend/tests/test_payment_methods.py`

```python
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

```

### `docs/architecture.md`

```markdown
# Arquitectura del proyecto

## Diagrama simple

```txt
┌──────────────────────────┐
│      React + Vite        │
│                          │
│  Login / Register        │
│  Dashboard               │
│  Métodos de pago         │
│  Activar / Desactivar    │
└─────────────┬────────────┘
              │ HTTP + JWT Bearer
              ▼
┌──────────────────────────┐
│         FastAPI          │
│                          │
│  Auth routes             │
│  Payment routes          │
│  Audit routes            │
└─────────────┬────────────┘
              │ SQLAlchemy
              ▼
┌──────────────────────────┐
│         SQLite           │
│                          │
│  users                   │
│  payment_methods         │
│  audit_logs              │
└──────────────────────────┘
```

## Flujo de autenticación

1. El usuario se registra con nombre, email y contraseña.
2. El backend valida que el email no exista.
3. La contraseña se hashea con bcrypt.
4. El usuario inicia sesión con email y contraseña.
5. El backend valida las credenciales.
6. Si son correctas, genera un JWT.
7. El frontend guarda el token en `localStorage`.
8. En cada petición privada, el frontend envía:

```txt
Authorization: Bearer <token>
```

9. El backend valida el token y obtiene el usuario autenticado.

## Manejo de datos sensibles

El identificador completo del método de pago no se guarda ni se muestra.

Cuando el usuario registra un método de pago:

1. Se normaliza el identificador.
2. Se genera `masked_identifier` mostrando solo los últimos 4 caracteres.
3. Se genera `identifier_hash` usando HMAC-SHA256 con una clave privada.
4. Se compara `identifier_hash` para prevenir duplicados por usuario.
5. En frontend solo se muestra un valor como:

```txt
**** **** **** 1234
```

Esto permite identificar visualmente el método sin exponer información sensible.

## Activación y desactivación de métodos

Los métodos de pago no se eliminan físicamente.

El frontend puede cambiar su estado usando:

```http
PATCH /api/payment-methods/{id}/status
```

Ejemplo para desactivar:

```json
{
  "status": "inactive"
}
```

Ejemplo para activar:

```json
{
  "status": "active"
}
```

Cuando el método queda inactivo:

- `status` cambia a `inactive`.
- `deleted_at` recibe la fecha actual.
- Se registra un evento en `audit_logs`.

Cuando el método se reactiva:

- `status` cambia a `active`.
- `deleted_at` vuelve a `null`.
- Se registra un evento en `audit_logs`.

## Trazabilidad

La tabla `audit_logs` registra operaciones importantes:

- Registro de usuario.
- Login exitoso.
- Creación de método de pago.
- Consulta de detalle.
- Activación de método de pago.
- Desactivación de método de pago.

Campos principales:

```txt
id
user_id
action
entity
entity_id
description
created_at
```

La auditoría ayuda a revisar actividad del usuario y demostrar trazabilidad básica en la prueba técnica.

```

### `frontend/.env.example`

```env
VITE_API_URL=http://localhost:8001/api

```

### `frontend/README.md`

```markdown
# Frontend - Wallet segura

Interfaz web construida con React + Vite.

Incluye rutas protegidas, gestión de sesión, alta de métodos de pago, detalle y control dinámico para activar o desactivar métodos.

## Instalación

```bash
npm install
```

Copiar variables de entorno:

```bash
# Windows CMD
copy .env.example .env

# macOS / Linux / Git Bash
cp .env.example .env
```

## Ejecutar

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Variables

```env
VITE_API_URL=http://localhost:8001/api
```

```

### `frontend/index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wallet Segura</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### `frontend/package-lock.json`

```json
{
  "name": "wallet-segura-frontend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "wallet-segura-frontend",
      "version": "1.0.0",
      "dependencies": {
        "@vitejs/plugin-react": "latest",
        "react": "latest",
        "react-dom": "latest",
        "react-router-dom": "latest",
        "vite": "latest"
      },
      "devDependencies": {}
    },
    "node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.4",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.4.tgz",
      "integrity": "sha512-3NQNNgA1YSlJb/kMH1ildASP9HW7/7kYnRI2szWJaofaS1hWmbGI4H+d3+22aGzXXN9IJ+n+GiFVcGipJP18ow==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.133.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@oxc-project/types/-/types-0.133.0.tgz",
      "integrity": "sha512-KzkdCd6Uxqnf6l3HOw1xfatAlUURA0g14cvBYFyJ5SaNOQbOUvBr9PKArcPcrNIeRsBdgcUzOGrhKveVpvOIGA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-android-arm64/-/binding-android-arm64-1.0.3.tgz",
      "integrity": "sha512-454rs7jHngixp/NMxd5srYD57OnzSlZ/eFTETjORQHLwJG1lRtmNOJcBerZlfu4GjKqeq8aCCIQrMdHyhI51Hw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.0.3.tgz",
      "integrity": "sha512-PcAhP+ynjURNyy8SKGl5DQP94aGuB/7JrXJb/t7P+hanXvQVMWzUvRRhBAcg/lNRadBhoUPqSoP4xw5tR/KBEA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.0.3.tgz",
      "integrity": "sha512-9YpfeUvSE2RS7wysJ81uOZkXJz7f7Q55H2Gvp3VEw/EsahqDtrphrZ0EwDLK5vvKOzaCrBsjF8JmnMLcUt78Gg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.0.3.tgz",
      "integrity": "sha512-yB1IlAsSNHncV6SCTL27/MVGR5htvQsoGxIv5KMGXALp+Ll1wYsn+x98M9MW7qa+NdSbvrrY7ANI4wLJ0n1e6g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.0.3.tgz",
      "integrity": "sha512-Yi30IVAAfLUCy2MseFjbB1jAMDl1VMCAas5StnYp8da9+CKvMd2H2cbEjWcw5NPaPqzvYkVIaF1nNUG+b7u/sw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.0.3.tgz",
      "integrity": "sha512-jsO7R8To+AdlYgUmN5sHSCZbfhtMBkO0WUx8iORQnPcMMdgr7qM2DQmMwgabs3GhNztdmoKkMKQFHD6DTMCIQw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.0.3.tgz",
      "integrity": "sha512-VWkUHwWriDciit80wleYwKILoR/KMvxh/IdwS/paX+ZgpuRpCrKLUdadJbc0NpBEiyhpYawsJ73j9aCvOH+f7Q==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.0.3.tgz",
      "integrity": "sha512-5f1laC0SlIR0yDbFCd8acUhvJIag6N3zC5P7oUPN6wX0aOma+uKJ0wBDH5aq7I1PVI2ttTlhJwzwRIBnLiSGEg==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.0.3.tgz",
      "integrity": "sha512-Iq4ko0r4XsgbrF/LunNgHtAGLRRVE2kXonAXQ/MV0mC6jQpMOhW1SvtZja2EhC/kd05++bP78dsqBeIQyYJ6Yg==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.0.3.tgz",
      "integrity": "sha512-B8m6tD5+/N5FeNQFbKlLA/2yVq9ycQP1SeedyEYYKWBNR3ZQbkvIUcNnDNM03lO1l5F2roiiFJGgvoLLyZXtSg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.0.3.tgz",
      "integrity": "sha512-pSdpdUJHkuCxun9LE7jvgUB9qsRgaiyNNCX7m/AvHTcq67AiT/Yhoxvw5zPfhrM8k/BfP8ce/hMOpthKDpEUow==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.0.3.tgz",
      "integrity": "sha512-OXXS3RKJgX2uLwM+gYyuH5omcH8fL1LJs96pZGgtetVCahON57+d4SJHzTgZiOjxgGkSnpXpOsWuPDGAKAigEg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.0.3.tgz",
      "integrity": "sha512-JTtb8BWFynicNSoPrehsCzBtOKjZ6jhMiPFEmOiuXg1Fl8dn2KHQob+GuPSGR0dryQa1PQJbzjF3dqO/whhjLg==",
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.10.0",
        "@emnapi/runtime": "1.10.0",
        "@napi-rs/wasm-runtime": "^1.1.4"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.0.3.tgz",
      "integrity": "sha512-gEdFFEN70A/jxb2svrWsN3aDL7OUtmvlOy+6fa2jxG8K0wQ1ZbdeLGnidov6Yu5/733dI5ySfzFlQ/cb0bSz1g==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.0.3.tgz",
      "integrity": "sha512-eXB7CHuaQdqmJcc3koCNtNPmT/bj2gc999kUFgBxG8Ac0NdgXc4rkCHhqrgrhN3zddvvvrgzj1e90SuSfmyIXA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "license": "MIT"
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.2",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@tybys/wasm-util/-/wasm-util-0.10.2.tgz",
      "integrity": "sha512-RoBvJ2X0wuKlWFIjrwffGw1IqZHKQqzIchKaadZZfnNpsAYp2mM0h36JtPCjNDAHGgYez/15uMBpfGwchhiMgg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.0.2",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@vitejs/plugin-react/-/plugin-react-6.0.2.tgz",
      "integrity": "sha512-DlSMqo4WhThw4vB8Mpn0Woe9J+Jfq1geJ61AKW0QEgLzGMNwtIMdxbDUzLxcun8W7NbJO0e2Jg/Nxm3cCSVzzg==",
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        }
      }
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.12",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/nanoid/-/nanoid-3.3.12.tgz",
      "integrity": "sha512-ZB9RH/39qpq5Vu6Y+NmUaFhQR6pp+M2Xt76XBnEwDaGcVAqhlvxrl3B2bKS5D3NH3QR76v3aSrKaF/Kiy7lEtQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.15",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/postcss/-/postcss-8.5.15.tgz",
      "integrity": "sha512-FfR8sjd4em2T6fb3I2MwAJU7HWVMr9zba+enmQeeWFfCbm+UOC/0X4DS8XtpUTMwWMGbjKYP7xjfNekzyGmB3A==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.12",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/react": {
      "version": "19.2.6",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/react/-/react-19.2.6.tgz",
      "integrity": "sha512-sfWGGfavi0xr8Pg0sVsyHMAOziVYKgPLNrS7ig+ivMNb3wbCBw3KxtflsGBAwD3gYQlE/AEZsTLgToRrSCjb0Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.6",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/react-dom/-/react-dom-19.2.6.tgz",
      "integrity": "sha512-0prMI+hvBbPjsWnxDLxlCGyM8PN6UuWjEUCYmZhO67xIV9Xasa/r/vDnq+Xyq4Lo27g8QSbO5YzARu0D1Sps3g==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.6"
      }
    },
    "node_modules/react-router": {
      "version": "7.16.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/react-router/-/react-router-7.16.0.tgz",
      "integrity": "sha512-wArC8lVyJb3+jM9OpDyW6hLCizACWkvQR/sSGqSs+o5uEXEtGlqdZ4v8hENR3Jad6i+LRkK93q/+bQAcvl6V1A==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.16.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/react-router-dom/-/react-router-dom-7.16.0.tgz",
      "integrity": "sha512-kMUAbimWB5FVbF4Bce4bJsiKJWLIUHq/mEG8+CFDnCSgltptBiG5nguducmsJeGKytlCvQud9Qhzpn49iduTlA==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.16.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/rolldown": {
      "version": "1.0.3",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/rolldown/-/rolldown-1.0.3.tgz",
      "integrity": "sha512-i00lAJ2ks1BYr7rjNjKC7BcqAS7nVfiT3QX1SI5aY+AFHblCmaUf9OE9dbdzDvW6dJxbi2ZCZiy9v3CcwOiX3g==",
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.133.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm64": "1.0.3",
        "@rolldown/binding-darwin-arm64": "1.0.3",
        "@rolldown/binding-darwin-x64": "1.0.3",
        "@rolldown/binding-freebsd-x64": "1.0.3",
        "@rolldown/binding-linux-arm-gnueabihf": "1.0.3",
        "@rolldown/binding-linux-arm64-gnu": "1.0.3",
        "@rolldown/binding-linux-arm64-musl": "1.0.3",
        "@rolldown/binding-linux-ppc64-gnu": "1.0.3",
        "@rolldown/binding-linux-s390x-gnu": "1.0.3",
        "@rolldown/binding-linux-x64-gnu": "1.0.3",
        "@rolldown/binding-linux-x64-musl": "1.0.3",
        "@rolldown/binding-openharmony-arm64": "1.0.3",
        "@rolldown/binding-wasm32-wasi": "1.0.3",
        "@rolldown/binding-win32-arm64-msvc": "1.0.3",
        "@rolldown/binding-win32-x64-msvc": "1.0.3"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD",
      "optional": true
    },
    "node_modules/vite": {
      "version": "8.0.16",
      "resolved": "https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/vite/-/vite-8.0.16.tgz",
      "integrity": "sha512-h9bXPmJichP5fLmVQo3PyaGSDE2n3aPuomeAlVRm0JLmt4rY6zmPKd59HYI4LNW8oTK7tlTsuC7l/m7awx9Jcw==",
      "dependencies": {
        "lightningcss": "^1.32.0",
        "picomatch": "^4.0.4",
        "postcss": "^8.5.15",
        "rolldown": "1.0.3",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.1.18",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    }
  }
}

```

### `frontend/package.json`

```json
{
  "name": "wallet-segura-frontend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest",
    "react-router-dom": "latest"
  },
  "devDependencies": {}
}

```

### `frontend/src/App.jsx`

```jsx
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PaymentMethodsPage from './pages/PaymentMethodsPage.jsx';
import PaymentMethodCreatePage from './pages/PaymentMethodCreatePage.jsx';
import PaymentMethodDetailPage from './pages/PaymentMethodDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <>
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/payment-methods/new" element={<PaymentMethodCreatePage />} />
            <Route path="/payment-methods/:id" element={<PaymentMethodDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

```

### `frontend/src/api/client.js`

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

export function getToken() {
  return localStorage.getItem('wallet_token');
}

export function setToken(token) {
  localStorage.setItem('wallet_token', token);
}

export function removeToken() {
  localStorage.removeItem('wallet_token');
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const message = data?.detail || 'Ocurrió un error en la petición';
    throw new Error(message);
  }

  return data;
}

```

### `frontend/src/components/NavBar.jsx`

```jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">
        <span className="brand-mark">W</span>
        <span>Wallet Segura</span>
      </Link>

      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Perfil</NavLink>
            <NavLink to="/payment-methods">Métodos</NavLink>
            <button type="button" className="link-button" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;

```

### `frontend/src/components/PaymentMethodCard.jsx`

```jsx
import { Link } from 'react-router-dom';

function formatPaymentType(type) {
  const labels = {
    tarjeta: 'Tarjeta',
    cuenta_bancaria: 'Cuenta bancaria',
    clabe: 'CLABE',
    otro: 'Otro',
  };

  return labels[type] || type;
}

function PaymentMethodCard({ paymentMethod, onStatusChange, changingStatus }) {
  const isActive = paymentMethod.status === 'active';
  const nextStatus = isActive ? 'inactive' : 'active';

  return (
    <article className="payment-card">
      <div className="card-topline">
        <span className={`status-dot ${isActive ? 'active' : 'inactive'}`} aria-hidden="true" />
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      </div>

      <div className="payment-card-main">
        <p className="card-eyebrow">{formatPaymentType(paymentMethod.type)}</p>
        <h3>{paymentMethod.alias}</h3>
        <p className="muted">{paymentMethod.institution}</p>
      </div>

      <div className="payment-identifier">{paymentMethod.masked_identifier}</div>

      <dl className="meta-list">
        <div>
          <dt>Moneda</dt>
          <dd>{paymentMethod.currency}</dd>
        </div>
        <div>
          <dt>ID</dt>
          <dd>#{paymentMethod.id}</dd>
        </div>
      </dl>

      <div className="card-actions">
        <Link className="button secondary" to={`/payment-methods/${paymentMethod.id}`}>
          Detalle
        </Link>
        <button
          className={`button ${isActive ? 'ghost' : 'primary'}`}
          type="button"
          disabled={changingStatus}
          onClick={() => onStatusChange(paymentMethod.id, nextStatus)}
        >
          {changingStatus ? 'Actualizando...' : isActive ? 'Desactivar' : 'Activar'}
        </button>
      </div>
    </article>
  );
}

export default PaymentMethodCard;

```

### `frontend/src/components/PaymentMethodForm.jsx`

```jsx
import { useState } from 'react';

const initialForm = {
  type: 'tarjeta',
  alias: '',
  institution: '',
  currency: 'MXN',
  identifier: '',
};

function PaymentMethodForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="form-card clean-form" onSubmit={handleSubmit}>
      <div className="form-grid two-columns">
        <label>
          Tipo de método
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="tarjeta">Tarjeta</option>
            <option value="cuenta_bancaria">Cuenta bancaria</option>
            <option value="clabe">CLABE</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Moneda
          <input
            name="currency"
            value={form.currency}
            onChange={handleChange}
            placeholder="MXN"
            minLength="3"
            maxLength="3"
            required
          />
        </label>
      </div>

      <label>
        Alias
        <input
          name="alias"
          value={form.alias}
          onChange={handleChange}
          placeholder="Ej. Tarjeta principal"
          minLength="2"
          required
        />
      </label>

      <label>
        Institución
        <input
          name="institution"
          value={form.institution}
          onChange={handleChange}
          placeholder="Ej. Banco Demo"
          minLength="2"
          required
        />
      </label>

      <label>
        Identificador
        <input
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Número de tarjeta, cuenta o CLABE"
          minLength="4"
          required
        />
        <small>Se guardará enmascarado y con hash seguro para evitar duplicados.</small>
      </label>

      <button className="button primary full-width" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar método'}
      </button>
    </form>
  );
}

export default PaymentMethodForm;

```

### `frontend/src/context/AuthContext.jsx`

```jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest, getToken, removeToken, setToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await apiRequest('/auth/me');
      setUser(data);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

```

### `frontend/src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

```

### `frontend/src/pages/DashboardPage.jsx`

```jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Perfil</p>
          <h1>Hola, {user?.name}</h1>
          <p className="muted">Administra tu wallet con datos enmascarados y sesión segura.</p>
        </div>
        <Link className="button primary" to="/payment-methods/new">Agregar método</Link>
      </div>

      <div className="profile-card">
        <div>
          <span>Nombre</span>
          <strong>{user?.name}</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>{user?.email}</strong>
        </div>
        <div>
          <span>ID usuario</span>
          <strong>#{user?.id}</strong>
        </div>
      </div>

      <div className="action-panel">
        <div>
          <h2>Wallet segura</h2>
          <p className="muted">Consulta, activa o desactiva tus métodos de pago desde un solo lugar.</p>
        </div>
        <Link className="button secondary" to="/payment-methods">Ver métodos</Link>
      </div>
    </section>
  );
}

export default DashboardPage;

```

### `frontend/src/pages/LoginPage.jsx`

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-panel">
        <p className="section-label">Acceso</p>
        <h1>Iniciar sesión</h1>
        <p className="muted">Entra para administrar tus métodos de pago.</p>

        {error && <div className="alert error">{error}</div>}

        <form className="form-card clean-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Contraseña
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>

          <button className="button primary full-width" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer">¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
      </div>
    </section>
  );
}

export default LoginPage;

```

### `frontend/src/pages/NotFoundPage.jsx`

```jsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>Página no encontrada</h1>
      <p className="muted">La ruta solicitada no existe.</p>
      <Link className="button" to="/dashboard">Ir al inicio</Link>
    </section>
  );
}

export default NotFoundPage;

```

### `frontend/src/pages/PaymentMethodCreatePage.jsx`

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import PaymentMethodForm from '../components/PaymentMethodForm.jsx';

function PaymentMethodCreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(payload) {
    setError('');

    if (payload.identifier.trim().length < 4) {
      setError('El identificador debe tener mínimo 4 caracteres');
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest('/payment-methods', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      navigate(`/payment-methods/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Nuevo método</p>
          <h1>Alta de método de pago</h1>
          <p className="muted">El identificador completo nunca se muestra ni se guarda en texto plano.</p>
        </div>
        <Link className="button secondary" to="/payment-methods">Volver</Link>
      </div>

      {error && <div className="alert error">{error}</div>}
      <PaymentMethodForm onSubmit={handleCreate} loading={loading} />
    </section>
  );
}

export default PaymentMethodCreatePage;

```

### `frontend/src/pages/PaymentMethodDetailPage.jsx`

```jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../api/client.js';

function formatPaymentType(type) {
  const labels = {
    tarjeta: 'Tarjeta',
    cuenta_bancaria: 'Cuenta bancaria',
    clabe: 'CLABE',
    otro: 'Otro',
  };

  return labels[type] || type;
}

function PaymentMethodDetailPage() {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [changingStatus, setChangingStatus] = useState(false);

  async function loadDetail() {
    try {
      const data = await apiRequest(`/payment-methods/${id}`);
      setPaymentMethod(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange() {
    if (!paymentMethod) return;

    const nextStatus = paymentMethod.status === 'active' ? 'inactive' : 'active';
    const confirmed = window.confirm(
      nextStatus === 'inactive'
        ? '¿Seguro que deseas desactivar este método de pago?'
        : '¿Deseas activar nuevamente este método de pago?'
    );

    if (!confirmed) return;

    setChangingStatus(true);
    setError('');

    try {
      const updated = await apiRequest(`/payment-methods/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      setPaymentMethod(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setChangingStatus(false);
    }
  }

  useEffect(() => {
    loadDetail();
  }, [id]);

  if (loading) return <p className="muted">Cargando detalle...</p>;

  const isActive = paymentMethod?.status === 'active';

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Detalle</p>
          <h1>{paymentMethod?.alias || 'Método de pago'}</h1>
          <p className="muted">Información segura y enmascarada.</p>
        </div>
        <Link className="button secondary" to="/payment-methods">Volver</Link>
      </div>

      {error && <div className="alert error">{error}</div>}

      {paymentMethod && (
        <div className="detail-layout">
          <article className="detail-hero-card">
            <div className="card-topline">
              <span className={`status-dot ${isActive ? 'active' : 'inactive'}`} aria-hidden="true" />
              <span>{isActive ? 'Activo' : 'Inactivo'}</span>
            </div>
            <p className="card-eyebrow">{formatPaymentType(paymentMethod.type)}</p>
            <h2>{paymentMethod.masked_identifier}</h2>
            <p className="muted">{paymentMethod.institution}</p>

            <button
              className={`button ${isActive ? 'ghost' : 'primary'}`}
              type="button"
              onClick={handleStatusChange}
              disabled={changingStatus}
            >
              {changingStatus ? 'Actualizando...' : isActive ? 'Desactivar método' : 'Activar método'}
            </button>
          </article>

          <article className="detail-card">
            <dl className="detail-list">
              <div>
                <dt>Alias</dt>
                <dd>{paymentMethod.alias}</dd>
              </div>
              <div>
                <dt>Institución</dt>
                <dd>{paymentMethod.institution}</dd>
              </div>
              <div>
                <dt>Tipo</dt>
                <dd>{formatPaymentType(paymentMethod.type)}</dd>
              </div>
              <div>
                <dt>Moneda</dt>
                <dd>{paymentMethod.currency}</dd>
              </div>
              <div>
                <dt>Creado</dt>
                <dd>{new Date(paymentMethod.created_at).toLocaleString()}</dd>
              </div>
              {paymentMethod.updated_at && (
                <div>
                  <dt>Última actualización</dt>
                  <dd>{new Date(paymentMethod.updated_at).toLocaleString()}</dd>
                </div>
              )}
            </dl>
          </article>
        </div>
      )}
    </section>
  );
}

export default PaymentMethodDetailPage;

```

### `frontend/src/pages/PaymentMethodsPage.jsx`

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import PaymentMethodCard from '../components/PaymentMethodCard.jsx';

function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [changingId, setChangingId] = useState(null);

  async function loadPaymentMethods() {
    try {
      const data = await apiRequest('/payment-methods');
      setPaymentMethods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(paymentMethodId, status) {
    setChangingId(paymentMethodId);
    setError('');

    try {
      const updated = await apiRequest(`/payment-methods/${paymentMethodId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });

      setPaymentMethods((current) =>
        current.map((paymentMethod) =>
          paymentMethod.id === paymentMethodId ? updated : paymentMethod
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setChangingId(null);
    }
  }

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const activeCount = paymentMethods.filter((method) => method.status === 'active').length;
  const inactiveCount = paymentMethods.length - activeCount;

  return (
    <section>
      <div className="page-header compact-header">
        <div>
          <p className="section-label">Wallet</p>
          <h1>Métodos de pago</h1>
          <p className="muted">Administra tus métodos sin exponer datos sensibles.</p>
        </div>
        <Link className="button primary" to="/payment-methods/new">Nuevo método</Link>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total</span>
          <strong>{paymentMethods.length}</strong>
        </div>
        <div className="summary-card">
          <span>Activos</span>
          <strong>{activeCount}</strong>
        </div>
        <div className="summary-card">
          <span>Inactivos</span>
          <strong>{inactiveCount}</strong>
        </div>
      </div>

      {loading && <p className="muted">Cargando métodos...</p>}
      {error && <div className="alert error">{error}</div>}

      {!loading && paymentMethods.length === 0 && (
        <div className="empty-state">
          <h2>No hay métodos registrados</h2>
          <p className="muted">Agrega tu primer método de pago para comenzar.</p>
          <Link className="button primary" to="/payment-methods/new">Agregar método</Link>
        </div>
      )}

      <div className="payment-grid">
        {paymentMethods.map((paymentMethod) => (
          <PaymentMethodCard
            key={paymentMethod.id}
            paymentMethod={paymentMethod}
            changingStatus={changingId === paymentMethod.id}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </section>
  );
}

export default PaymentMethodsPage;

```

### `frontend/src/pages/RegisterPage.jsx`

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('La contraseña debe tener mínimo 8 caracteres');
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-panel">
        <p className="section-label">Registro</p>
        <h1>Crear cuenta</h1>
        <p className="muted">Registra tu usuario para comenzar con la wallet.</p>

        {error && <div className="alert error">{error}</div>}

        <form className="form-card clean-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} minLength="2" required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Contraseña
            <input name="password" type="password" value={form.password} onChange={handleChange} minLength="8" required />
          </label>

          <button className="button primary full-width" type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <p className="auth-footer">¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </div>
    </section>
  );
}

export default RegisterPage;

```

### `frontend/src/routes/ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p className="muted">Validando sesión...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

```

### `frontend/src/styles/global.css`

```css
:root {
  color: #111827;
  background: #f7f7f4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
}

body::before {
  background:
    radial-gradient(circle at top left, rgba(17, 24, 39, 0.06), transparent 30%),
    radial-gradient(circle at bottom right, rgba(17, 24, 39, 0.04), transparent 28%);
  content: "";
  inset: 0;
  pointer-events: none;
  position: fixed;
  z-index: -1;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
}

button {
  border: 0;
}

.navbar {
  align-items: center;
  backdrop-filter: blur(18px);
  background: rgba(247, 247, 244, 0.82);
  border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  display: flex;
  justify-content: space-between;
  padding: 18px clamp(18px, 4vw, 42px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  align-items: center;
  color: #111827;
  display: inline-flex;
  font-weight: 800;
  gap: 10px;
  letter-spacing: -0.04em;
}

.brand-mark {
  align-items: center;
  background: #111827;
  border-radius: 12px;
  color: #ffffff;
  display: inline-flex;
  height: 34px;
  justify-content: center;
  width: 34px;
}

.nav-links {
  align-items: center;
  display: flex;
  gap: 8px;
}

.nav-links a,
.link-button {
  background: transparent;
  border-radius: 999px;
  color: #6b7280;
  cursor: pointer;
  font-weight: 700;
  padding: 9px 13px;
}

.nav-links a.active,
.nav-links a:hover,
.link-button:hover {
  background: #ffffff;
  color: #111827;
}

.main-container {
  margin: 0 auto;
  max-width: 1080px;
  padding: clamp(28px, 5vw, 56px) 20px;
}

.page-header {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 26px;
}

.compact-header {
  align-items: flex-end;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  color: #111827;
  font-size: clamp(34px, 5vw, 58px);
  letter-spacing: -0.07em;
  line-height: 0.95;
  margin-bottom: 12px;
}

h2 {
  color: #111827;
  font-size: 26px;
  letter-spacing: -0.04em;
  margin-bottom: 8px;
}

h3 {
  color: #111827;
  font-size: 21px;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 8px;
}

.muted,
.auth-footer {
  color: #6b7280;
  line-height: 1.6;
}

.section-label,
.card-eyebrow {
  color: #6b7280;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.auth-layout {
  display: grid;
  min-height: calc(100vh - 160px);
  place-items: center;
}

.auth-panel {
  width: min(100%, 440px);
}

.form-card,
.empty-state,
.profile-card,
.action-panel,
.summary-card,
.payment-card,
.detail-card,
.detail-hero-card {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 28px;
  box-shadow: 0 24px 70px rgba(17, 24, 39, 0.08);
}

.form-card {
  display: grid;
  gap: 18px;
  padding: 24px;
}

.clean-form {
  backdrop-filter: blur(14px);
}

.form-grid {
  display: grid;
  gap: 16px;
}

.two-columns {
  grid-template-columns: 1.4fr 0.8fr;
}

label {
  color: #374151;
  display: grid;
  font-size: 14px;
  font-weight: 800;
  gap: 8px;
}

input,
select {
  background: #ffffff;
  border: 1px solid rgba(17, 24, 39, 0.12);
  border-radius: 16px;
  color: #111827;
  min-height: 48px;
  padding: 12px 14px;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  width: 100%;
}

input:focus,
select:focus {
  border-color: #111827;
  box-shadow: 0 0 0 4px rgba(17, 24, 39, 0.08);
  outline: none;
}

small {
  color: #6b7280;
  font-weight: 500;
  line-height: 1.5;
}

.button {
  align-items: center;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  font-weight: 900;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;
  transition: opacity 160ms ease, transform 160ms ease, background 160ms ease;
}

.button:hover,
.link-button:hover {
  transform: translateY(-1px);
}

.button.primary,
.button:not(.secondary):not(.ghost) {
  background: #111827;
  color: #ffffff;
}

.button.secondary {
  background: #ffffff;
  border: 1px solid rgba(17, 24, 39, 0.1);
  color: #111827;
}

.button.ghost {
  background: #f3f4f6;
  color: #374151;
}

.button.full-width {
  width: 100%;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.62;
  transform: none;
}

.alert {
  border-radius: 18px;
  font-weight: 700;
  margin-bottom: 18px;
  padding: 14px 16px;
}

.alert.error {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #be123c;
}

.auth-footer {
  margin: 18px 0 0;
  text-align: center;
}

.auth-footer a {
  color: #111827;
  font-weight: 900;
}

.profile-card {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 18px;
  padding: 22px;
}

.profile-card div,
.summary-card {
  display: grid;
  gap: 8px;
}

.profile-card span,
.summary-card span,
.meta-list dt,
.detail-list dt {
  color: #6b7280;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-card strong,
.summary-card strong {
  color: #111827;
  font-size: 18px;
  overflow-wrap: anywhere;
}

.action-panel {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 26px;
}

.action-panel p {
  margin-bottom: 0;
}

.summary-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 24px;
}

.summary-card {
  padding: 20px;
}

.summary-card strong {
  font-size: 30px;
  letter-spacing: -0.05em;
}

.payment-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}

.payment-card {
  display: grid;
  gap: 18px;
  padding: 22px;
}

.card-topline {
  align-items: center;
  color: #4b5563;
  display: inline-flex;
  font-size: 13px;
  font-weight: 900;
  gap: 8px;
}

.status-dot {
  border-radius: 999px;
  height: 9px;
  width: 9px;
}

.status-dot.active {
  background: #16a34a;
}

.status-dot.inactive {
  background: #9ca3af;
}

.payment-card-main p {
  margin-bottom: 0;
}

.payment-identifier {
  background: #f9fafb;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 20px;
  color: #111827;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.02em;
  padding: 18px;
}

.meta-list,
.detail-list {
  display: grid;
  gap: 14px;
  margin: 0;
}

.meta-list {
  grid-template-columns: repeat(2, 1fr);
}

.meta-list div,
.detail-list div {
  display: grid;
  gap: 5px;
}

.meta-list dd,
.detail-list dd {
  color: #111827;
  font-weight: 800;
  margin: 0;
}

.card-actions {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}

.detail-layout {
  display: grid;
  gap: 18px;
  grid-template-columns: 0.9fr 1.1fr;
}

.detail-hero-card,
.detail-card {
  padding: 26px;
}

.detail-hero-card {
  align-content: start;
  display: grid;
  gap: 18px;
}

.detail-hero-card h2 {
  font-size: clamp(30px, 4vw, 44px);
  letter-spacing: -0.06em;
  margin-bottom: 0;
}

.detail-list {
  gap: 18px;
}

.empty-state {
  padding: 42px 24px;
  text-align: center;
}

.empty-state .button {
  margin-top: 10px;
}

@media (max-width: 760px) {
  .navbar,
  .page-header,
  .action-panel {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    flex-wrap: wrap;
  }

  .profile-card,
  .summary-grid,
  .detail-layout,
  .two-columns {
    grid-template-columns: 1fr;
  }

  .card-actions {
    grid-template-columns: 1fr;
  }
}

```

### `frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

```
