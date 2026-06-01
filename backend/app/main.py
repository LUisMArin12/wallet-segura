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
