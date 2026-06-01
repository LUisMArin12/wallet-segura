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
