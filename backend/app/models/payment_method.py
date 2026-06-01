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
