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
