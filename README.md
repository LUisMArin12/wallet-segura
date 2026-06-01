# Wallet Segura de Métodos de Pago

Aplicación web full stack para registrar usuarios, iniciar sesión y administrar métodos de pago de forma segura.

El proyecto está diseñado como una prueba técnica realista para un perfil **Full Stack Junior**: simple, funcional, organizado y seguro.

## Demo desplegada

Frontend:

```txt
https://walletseg.netlify.app
```

Backend / API:

```txt
https://wallet-segura-api.onrender.com
```

Documentación Swagger:

```txt
https://wallet-segura-api.onrender.com/docs
```

## Tecnologías usadas

### Backend

* Python 3.11
* FastAPI
* SQLAlchemy
* SQLite
* Alembic
* JWT con `python-jose`
* Passlib + bcrypt
* Pydantic
* Pytest
* Uvicorn
* Render para despliegue

### Frontend

* JavaScript
* React + Vite
* React Router DOM
* Fetch API
* CSS moderno, minimalista y organizado
* Netlify para despliegue

## Funcionalidades principales

* Registro de usuario.
* Login con JWT.
* Cierre de sesión.
* Perfil del usuario autenticado.
* Alta de métodos de pago.
* Listado de métodos de pago del usuario autenticado.
* Detalle de método de pago.
* Activación y desactivación dinámica de métodos de pago.
* Soft delete mediante `status = inactive` y `deleted_at`.
* Identificadores sensibles enmascarados.
* Hash HMAC para prevenir duplicados.
* Auditoría de operaciones relevantes.
* Rutas protegidas en frontend.
* Manejo de sesión con token JWT.
* Diseño moderno, limpio y minimalista.
* Configuración preparada para entorno local y despliegue.
* Redirecciones configuradas para React Router en Netlify.
* Pruebas básicas de backend con `pytest`.

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
│   ├── alembic.ini
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── _redirects
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
├── .gitignore
├── netlify.toml
└── README.md
```

## Instalación y ejecución local

### 1. Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Crear entorno virtual:

```bash
python -m venv .venv
```

Activar entorno virtual:

```bash
# Windows CMD
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Copiar variables de entorno:

```bash
# Windows CMD
copy .env.example .env

# macOS / Linux / Git Bash
cp .env.example .env
```

Configurar `PYTHONPATH` en Windows:

```bash
set PYTHONPATH=%cd%
```

Ejecutar migraciones:

```bash
alembic upgrade head
```

Levantar servidor local en puerto `8001`:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
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

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

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

Ejecutar frontend:

```bash
npm run dev
```

Frontend disponible en:

```txt
http://localhost:5173
```

Si el puerto `5173` está ocupado, se puede usar otro puerto:

```bash
npm run dev -- --port 5174
```

## Variables de entorno

### Backend

Archivo:

```txt
backend/.env
```

Ejemplo:

```env
DATABASE_URL=sqlite:///./wallet.db
SECRET_KEY=change_this_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
PAYMENT_IDENTIFIER_SECRET=change_this_payment_secret
FRONTEND_URL=http://localhost:5173
```

Para producción en Render:

```env
DATABASE_URL=sqlite:///./wallet.db
SECRET_KEY=your_secure_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
PAYMENT_IDENTIFIER_SECRET=your_secure_payment_secret
FRONTEND_URL=https://walletseg.netlify.app
PYTHON_VERSION=3.11.10
```

### Frontend

Archivo:

```txt
frontend/.env
```

Ejemplo local:

```env
VITE_API_URL=http://localhost:8001/api
```

Ejemplo producción en Netlify:

```env
VITE_API_URL=https://wallet-segura-api.onrender.com/api
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

Ejecutar pruebas:

```bash
cd backend
pytest
```

Las pruebas cubren funcionalidades básicas como:

* Registro de usuario.
* Login.
* Creación de método de pago.
* Prevención de duplicados.
* Desactivación de método de pago.
* Activación/desactivación dinámica.

## Endpoints principales

### Auth

| Método | Endpoint             | Descripción                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Registrar usuario           |
| POST   | `/api/auth/login`    | Iniciar sesión              |
| GET    | `/api/auth/me`       | Obtener usuario autenticado |

### Métodos de pago

| Método | Endpoint                           | Descripción                                    |
| ------ | ---------------------------------- | ---------------------------------------------- |
| POST   | `/api/payment-methods`             | Crear método de pago                           |
| GET    | `/api/payment-methods`             | Listar métodos del usuario autenticado         |
| GET    | `/api/payment-methods/{id}`        | Ver detalle de un método                       |
| PATCH  | `/api/payment-methods/{id}/status` | Activar o desactivar método de pago            |
| DELETE | `/api/payment-methods/{id}`        | Desactivar método de pago mediante soft delete |

Ejemplo para activar un método:

```json
{
  "status": "active"
}
```

Ejemplo para desactivar un método:

```json
{
  "status": "inactive"
}
```

### Auditoría

| Método | Endpoint          | Descripción                      |
| ------ | ----------------- | -------------------------------- |
| GET    | `/api/audit-logs` | Ver logs del usuario autenticado |

## Decisiones técnicas

* Se usa SQLite para facilitar la ejecución local y simplificar la prueba técnica.
* El backend está separado por capas: rutas, servicios, modelos, esquemas, configuración y utilidades.
* El frontend está separado en páginas, componentes, contexto, rutas, API y estilos.
* Las contraseñas se guardan con hash usando bcrypt.
* La autenticación se maneja con JWT.
* Los métodos de pago pertenecen siempre a un usuario autenticado.
* No se elimina físicamente un método de pago; se desactiva con `status = inactive` y `deleted_at`.
* El estado del método se puede cambiar dinámicamente con `PATCH /api/payment-methods/{id}/status`.
* El identificador sensible no se guarda completo en texto plano.
* Se guarda un `masked_identifier` para mostrar solo los últimos 4 caracteres.
* Se guarda un `identifier_hash` con HMAC-SHA256 para prevenir duplicados sin exponer el valor real.
* Se registran eventos relevantes en `audit_logs`.
* Se usa `FRONTEND_URL` para configurar CORS en producción.
* Se usa `VITE_API_URL` para conectar el frontend con el backend.
* Se configuró Netlify para soportar rutas internas de React Router.

## Consideraciones de seguridad

* No se devuelve `hashed_password` en las respuestas.
* No se muestra el identificador completo del método de pago.
* Los endpoints privados requieren token JWT.
* Se valida que cada método consultado, activado o desactivado pertenezca al usuario autenticado.
* Las claves del sistema se configuran mediante variables de entorno.
* Los identificadores sensibles se procesan con HMAC para prevenir duplicados sin almacenar el valor original.
* El frontend nunca muestra datos sensibles completos.

## Despliegue

### Backend en Render

Configuración recomendada:

| Campo          | Valor                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| Root Directory | `backend`                                                                                            |
| Runtime        | `Python`                                                                                             |
| Build Command  | `pip install -r requirements.txt`                                                                    |
| Start Command  | `PYTHONPATH=. alembic upgrade head && PYTHONPATH=. uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

Variables de entorno requeridas en Render:

```env
PYTHON_VERSION=3.11.10
DATABASE_URL=sqlite:///./wallet.db
SECRET_KEY=1q2w3e4r5t6y
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
PAYMENT_IDENTIFIER_SECRET=1q2w3e4r5t6y7u8i
FRONTEND_URL=https://walletseg.netlify.app
```

### Frontend en Netlify

Archivo de configuración:

```txt
netlify.toml
```

Contenido:

```toml
[build]
  base = "frontend"
  command = "npm install && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.19.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Variable de entorno requerida en Netlify:

```env
VITE_API_URL=https://wallet-segura-api.onrender.com/api
```

También se incluye el archivo:

```txt
frontend/public/_redirects
```

con el contenido:

```txt
/* /index.html 200
```

Esto evita errores 404 al recargar rutas internas como:

```txt
/login
/register
/dashboard
/payment-methods
```

## Problemas comunes y solución

### Error CORS

Si el frontend no puede comunicarse con el backend y aparece un error de CORS, revisar en Render:

```env
FRONTEND_URL=https://walletseg.netlify.app
```

No debe llevar `/api` al final.

Correcto:

```env
FRONTEND_URL=https://walletseg.netlify.app
```

Incorrecto:

```env
FRONTEND_URL=https://walletseg.netlify.app/api
```

### Error al recargar rutas en Netlify

Si aparece 404 al recargar `/dashboard`, `/login` o `/payment-methods`, revisar que exista:

```txt
frontend/public/_redirects
```

con:

```txt
/* /index.html 200
```

o que `netlify.toml` tenga:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Error `vite: Permission denied`

Este error suele ocurrir si `node_modules` fue subido al repositorio. Debe estar ignorado por Git.

Verificar `.gitignore`:

```gitignore
node_modules/
frontend/node_modules/
frontend/dist/
dist/
```

Si `node_modules` ya fue subido, ejecutar:

```bash
git rm -r --cached frontend/node_modules
git add .
git commit -m "Remove node_modules from repository"
git push
```

### Error `ModuleNotFoundError: No module named 'app'` en Render

Usar el siguiente Start Command en Render:

```bash
PYTHONPATH=. alembic upgrade head && PYTHONPATH=. uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
* Mejorar validaciones visuales en formularios.
* Agregar pruebas end-to-end.
