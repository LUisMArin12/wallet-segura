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
