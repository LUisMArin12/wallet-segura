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
